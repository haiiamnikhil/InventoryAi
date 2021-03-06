from django.http import JsonResponse, HttpResponse
from django.shortcuts import redirect, render
from django.http.response import Http404
from .models import ProductCountHistory, ProductTotalCount, UserCSVRecord, UploadData, UserModel, UserPackage, UserProcessCount, BatchProcessing, BatchFile
from .detector import detector
import os
import cv2 as cv
from django.views.decorators.csrf import csrf_exempt
from .serializer import BatchFileSerializer, BatchProcessingSerializer, CsvSerializer, DetectionSerializer, ProductCountHistorySerializer, ProductTotalCountSerializer, SingleDetectionHistorySerializer, UserPackageSerializer, RecordsCountSerializer
import pandas as pd
from django.contrib.auth import authenticate, login, logout
from rest_framework.parsers import JSONParser
from django.contrib.auth.hashers import make_password
import datetime as dt
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMessage
import razorpay
import zipfile
import datetime
from io import StringIO, BytesIO


COUNT_PACKAGES = {
    'Basic': 100,
    'Normal': 500,
    'Professional': 800,
    'Warehouse': 1500
}


@csrf_exempt
def single_image_processor(request):
    if request.method == 'POST':
        mode = 'single_object_detection'
        detectType = request.POST.get('detectType')
        file = request.FILES.get('image')

        data = UploadData.objects.create(
            user=request.user, category=detectType, image=file, detection_type="Single")
        try:
            filename = data.image.name.split('/')[1]
        except:
            pass

        count, count_objects = detector.detect(filename, detectType, mode)

        cv.imwrite(os.path.join('media/singledetection',
                                f'{filename}'), count_objects)

        name = filename.split('.')[0]
        data.filename = name
        data.singledetection = f"singledetection/{filename}"
        data.uploadedName = request.POST.get('filename').split('.')[0]
        data.count = count
        data.save()

        upload_details, status = UserProcessCount.objects.get_or_create(
            user=request.user)
        upload_details.totalCount += 1

        try:
            add_total_count = ProductTotalCount.objects.get(
                user=request.user, item=detectType)
            add_total_count.totalCount += 1
            add_total_count.save()

        except:
            add_total_count = ProductTotalCount.objects.create(
                user=request.user, item=detectType)
            add_total_count.totalCount += 1
            add_total_count.save()

        if status:
            upload_details.singleCount += 1
            upload_details.save()

        else:
            upload_details.singleCount += 1
            upload_details.save()

        processed_data = UploadData.objects.filter(filename=name)

        try:
            getProduct = ProductCountHistory.objects.get(
                user=request.user, addedDate=dt.date.today(), item=detectType)
            getProduct.count += count
            getProduct.save()

        except:
            ProductCountHistory.objects.create(
                user=request.user, item=detectType, count=count)

        try:
            serializer = DetectionSerializer(processed_data, many=True)
            return JsonResponse({'data': serializer.data, 'status': True, 'count': count}, safe=False, status=200)
        except:
            return JsonResponse({'status': False}, safe=False, status=200)


@csrf_exempt
def multi_image_processor(request):

    filenames = []
    count = []
    detected_details = []

    if request.method == 'POST':

        mode = 'multi_object_detection'
        dataType = request.POST.get('detectType')
        productCount = 0

        userPackage = UserPackage.objects.get(user=request.user)

        if userPackage.remainingCounts <= 0:
            return JsonResponse({"status": False, "message": "Your Limit has finised"}, safe=False, status=200)

        for file in request.FILES.getlist('image'):

            data = UploadData.objects.create(
                user=request.user, category=dataType, image=file, detection_type="Multiple")
            try:
                filename = data.image.name.split('/')[1]
            except:
                pass

            try:
                getCount, getDetection = detector.detect(
                    filename, dataType, mode)
            except:
                pass

            productCount += getCount

            cv.imwrite(os.path.join(
                'media/multidetection', filename), getDetection)

            name = filename.split('.')[0]
            data.filename = name
            data.uploadedName = request.POST.get('filename').split('.')[0]
            data.multidetection = f"multidetection/{filename}"
            data.count = getCount
            data.save()

            filenames.append(name)
            count.append(getCount)

        for data in filenames:
            getDetails = UploadData.objects.filter(filename=data)
            imageSerilaizer = DetectionSerializer(getDetails, many=True)
            detected_details.append(imageSerilaizer.data)

        upload_details, status = UserProcessCount.objects.get_or_create(
            user=request.user)
        upload_details.totalCount += len(filenames)

        if status:
            upload_details.multiCount += len(filenames)
            upload_details.save()

        else:
            upload_details.multiCount += len(filenames)
            upload_details.save()

        try:
            getProduct = ProductCountHistory.objects.get(
                user=request.user, addedDate=dt.date.today(), item=dataType)
            getProduct.count += getCount
            getProduct.save()

        except:
            ProductCountHistory.objects.create(
                user=request.user, item=dataType, count=getCount)

        try:
            getLastRecord = BatchProcessing.objects.filter(
                user=request.user).last()
            if getLastRecord is not None:
                lastRecordCount = int(getLastRecord.batchName.split('-')[1])
            else:
                lastRecordCount = 0

        except:
            pass

        batch_id = f"Batch-{lastRecordCount+1}-{dataType.capitalize()}"

        batchProcessSegregate = BatchProcessing.objects.create(user=request.user, batchName=batch_id,
                                                        batchObjectName=dataType, batchFileCount=len(
                                                            request.FILES.getlist('image')),
                                                        batchItemsTotalCount=productCount)
        
        for i,names in enumerate(filenames):
            batchFiles = BatchFile.objects.create(user=request.user, batchName=batchProcessSegregate, 
                                                  fileName=names,ObjectType=dataType,ObjectCount=count[i])
            

        data = {'Files': filenames, 'Count': count}
        df = pd.DataFrame(data)

        time = dt.datetime.now().time()
        time = time.strftime('%H:%M:%S')
        date = dt.datetime.today().date()
        date = date.strftime('%d-%m-%Y')

        csvSaveName = f"{request.user.username}-{date}-{time.replace(':','-')}"

        try:
            os.mkdir('./media/reports')
        except:
            pass

        df.to_csv(os.path.join('media/reports',
                               f"{csvSaveName}.csv"), index=None)

        csvFile = f"reports/{csvSaveName}.csv"

        reports = UserCSVRecord.objects.get_or_create(
            user=request.user, batchName=batchProcessSegregate,   filename=csvSaveName, csvFile=csvFile)

        try:
            add_total_count = ProductTotalCount.objects.get(
                user=request.user, item=dataType)
            add_total_count.totalCount += productCount
            add_total_count.save()

        except:
            add_total_count = ProductTotalCount.objects.create(
                user=request.user, item=dataType)
            add_total_count.totalCount += productCount
            add_total_count.save()

        serializer = CsvSerializer(reports, many=True)
        updateCount = UserPackage.objects.get(user=request.user)
        updateCount.remainingCounts -= len(request.FILES.getlist('image'))
        updateCount.save()

        return JsonResponse({"status": True, "csv": serializer.data[0], "data": detected_details}, safe=False, status=200)


@csrf_exempt
def registerAuth(request):
    if request.method == 'POST':
        credentials = JSONParser().parse(request)

        if UserModel.objects.filter(username=credentials['username']).exists() or UserModel.objects.filter(email=credentials['email']).exists():
            return JsonResponse({"status": False, "message": "User With Same Username or Email Exists"}, safe=False, status=200)

        else:
            user = UserModel.objects.create(
                username=credentials['username'],
                password=make_password(credentials['password']),
                email=credentials['email'],
                full_name=f"{credentials['first_name'] } {credentials['last_name']}",
                organisation_name=credentials['organisation_name']
            )
            plan = UserPackage.objects.create(user=user, packageType=credentials['plan'],
                                              allotatedCounts=COUNT_PACKAGES[credentials['plan']], remainingCounts=COUNT_PACKAGES[credentials['plan']])

            curret_site = get_current_site(request)
            subject = "Account Activation OTL"
            name = credentials['first_name'] + " " + credentials['last_name']
            message = render_to_string('activate-account.html', {
                'user': name, 'domain': curret_site.domain, 'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': default_token_generator.make_token(user),
            })
            email = credentials['email']
            sendEmail = EmailMessage(subject, message, to=[email])
            sendEmail.send()
            user.is_active = False
            user.save()

            return JsonResponse({'status': True, "message": "User Created"}, safe=False, status=200)


def activate(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = UserModel._default_manager.get(pk=uid)

    except (TypeError, ValueError, OverflowError, UserModel.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        return redirect('loginView')
    else:
        return Http404('Invalid Activation Link')


@csrf_exempt
def loginAuth(request):
    if request.method == 'POST':
        auth = JSONParser().parse(request)
        user = authenticate(
            username=auth['username'], password=auth['password'])
        if user:
            login(request, user)
            return JsonResponse({'status': True}, safe=False, status=200)
        else:
            return JsonResponse({'status': False}, safe=False, status=200)


@csrf_exempt
def isLoggedIn(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            return JsonResponse({'status': True, 'message': 'User Alredy Logged In'})
        else:
            return JsonResponse({'status': False})


@csrf_exempt
def userCountAPI(request):
    if request.method == 'GET':
        getCount = UserProcessCount.objects.filter(user=request.user)
        package = UserPackage.objects.filter(user=request.user)
        package_serializer = UserPackageSerializer(package, many=True)
        count_serializer = RecordsCountSerializer(getCount, many=True)
        return JsonResponse({'status': True, 'count': count_serializer.data, 'package': package_serializer.data}, safe=False, status=200)


@csrf_exempt
def logoutUser(request):
    logout(request)
    return JsonResponse({'status': True}, safe=False, status=200)


def getInventory(request):
    if request.method == 'GET':
        productCount = ProductTotalCount.objects.filter(
            user=request.user).order_by('-lastUpdated')
        csvFiles = UserCSVRecord.objects.filter(user=request.user)

        countSerializer = ProductTotalCountSerializer(productCount, many=True)
        csvSerializer = CsvSerializer(csvFiles, many=True)

        return JsonResponse({'status': True, 'productCounts': countSerializer.data, "csvFiles": csvSerializer.data}, safe=False, status=200)


def productAnalytics(request):
    if request.method == 'GET':
        product = JSONParser().parse(request)


@csrf_exempt
def periodicalSelector(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        getDetails = ProductCountHistory.objects.filter(
            user=request.user, item=data['item'], addedDate__range=[data['startDate'], data['endDate']])
        serializer = ProductCountHistorySerializer(getDetails, many=True)
        return JsonResponse({'status': True, 'message': serializer.data}, safe=False, status=200)


@csrf_exempt
def productHistory(request):
    if request.method == 'GET':
        getItem = JSONParser().parse(request)
        item = ProductCountHistory.objects.filter(user=request.user, item=getItem['item'], addedDate__range=[
                                                  getItem['startDate'], getItem['endDate']])
        serializer = ProductCountHistorySerializer(item, many=True)
        return JsonResponse({'status': True, 'message': serializer.data}, status=200, safe=False)


def detectionHistory(request):
    if request.method == 'GET':
        getSingleDetection = UploadData.objects.filter(
            user=request.user, detection_type="Single").all()
        # getMultipleDetection = UploadData.objects.filter(
        #     user=request.user, detection_type="Multiple").all()

        getBatchProcessing = BatchProcessing.objects.filter(user=request.user)

        batchProcessingSerializer = BatchProcessingSerializer(
            getBatchProcessing, many=True)
        singleDetectionserializer = SingleDetectionHistorySerializer(
            getSingleDetection, many=True)
        # multipleDetectionserializer = MultiDetectionHistorySerializer(
        #     getMultipleDetection, many=True)

        return JsonResponse({'status': True, 'singleDetection': singleDetectionserializer.data,
                             'batchProcessing': batchProcessingSerializer.data
                             }, safe=False, status=200)


@csrf_exempt
def getBatchFiles(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        print(data)
        getBatchFileProcessing = BatchFile.objects.filter(
            user=request.user, batchId__batchName=data['processId'])
        print(getBatchFileProcessing)
        batchFileSerializer = BatchFileSerializer(
            getBatchFileProcessing, many=True)
        return JsonResponse({'status': True, 'batchFiles': batchFileSerializer.data}, safe=False, status=200)


@csrf_exempt
def userPackage(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        print(data['package'].capitalize())
        getPresentPackage = UserPackage.objects.filter(user=request.user, packageType=data['package'].capitalize()).exists()
        print(getPresentPackage)
        if getPresentPackage:
            print("asdasghjdajs")
            return JsonResponse({'status': False, 'message':'Your Subscription has been Renewied'}, safe=False, status=200)
        return JsonResponse({'status':True}, safe=False, status=200)
    
@csrf_exempt
def payment_gateway(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        print(data)
        order_amount = 50000
        order_currency = 'INR'
        client = razorpay.Client(auth=('rzp_test_yYjR1Ke61gVKzM','P72uFUBJl62a1Cho9Hgub5eN'))
        payment = client.order.create({'amount':order_amount,'currency':order_currency,'payment_capture':'0'})
        order_receipt = 'order_rcptid_11'
        notes = {'Shipping address': 'Bommanahalli, Bangalore'}
        

@csrf_exempt
def generateCSV(request):

    try:
        os.mkdir(os.path.join('./media',"zip"))
    except:
        pass

    csvRecord = []
    if request.method == 'POST':
        data = JSONParser().parse(request)
        for fileNames in data['batchId']:
            csvFiles = UserCSVRecord.objects.filter(user=request.user,batchName__batchName=fileNames)
            csvSerializer = CsvSerializer(csvFiles,many=True)
            csvRecord.append(csvSerializer.data[0]['csvFile'])

        zipFoldername = os.path.join("./media/zip/",f"{request.user}-{datetime.datetime.now().strftime('%d-%b-%Y')}.zip")

        # stringIo = BytesIO()

        compressor = zipfile.ZipFile(zipFoldername,'w',zipfile.ZIP_DEFLATED)

        for files in csvRecord:
            dirName, fileName = os.path.split(files)
            dirName = f".{dirName}"
            compressor.write(os.path.join(dirName, fileName), 
                       os.path.relpath(os.path.join(dirName, fileName), 
                                       os.path.join(dirName, '..')))
        compressor.close()

        return JsonResponse({'status': True,'data':zipFoldername},safe=False,status=200)