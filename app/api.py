from app.serializer import GuestImageProcessingSerializer
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import GuestDetections
from django.http import JsonResponse
from .detector import detector
import cv2 as cv
import os


@csrf_exempt       
def userApiView(request):
    return render(request,'userView.html')


@csrf_exempt
def apiProcessor(request):
    getUserIp = request.META.get('HTTP_X_FORWARDED_FOR')
    
    if getUserIp:
        ip = getUserIp.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    print(ip)
    # if ip and GuestDetections.objects.filter(uploaderIp=ip).count() > 5:
    #     return JsonResponse({'status': False, 'message':'Your Limit has passed'}, safe=False, status=200)
    
    # else:
    if request.method == 'POST':
        
        try:
            os.mkdir(os.path.join('media/Guest-Detections','detected/'))
        except:pass
        
        mode = 'guestDetection'
        image = request.FILES.get('image')
        filename = request.POST.get('name')
        detectType = request.POST.get('class')

        guestFiles = GuestDetections.objects.create(filename=filename,uploadFile=image,uploaderIp=ip,detectClass=detectType)
        filename = guestFiles.uploadFile.name.split('/')[1]
        detectedCount, detectedImage = detector.detect(filename, detectType, mode)
        
        cv.imwrite(os.path.join('media/Guest-Detections/detected/',f"{filename}"),detectedImage)
        guestFiles.detectedFile = f"Guest-Detections/detected/{filename}"
        guestFiles.count = detectedCount
        guestFiles.save()
        
        serializer = GuestImageProcessingSerializer(guestFiles) 
        
        return JsonResponse({'status':True, 'message':'File Saved','data':serializer.data},safe=False, status=200)