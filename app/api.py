from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import GuestDetections
from django.http import JsonResponse
from .detector import detector


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
    if ip and GuestDetections.objects.filter(uploaderIp=ip).count() > 5:
        return JsonResponse({'status': False, 'message':'Your Limit has passed'}, safe=False, status=200)
    
    else:
        if request.method == 'POST':
            mode = 'guestDetection'
            image = request.FILES.get('image')
            filename = request.POST.get('name')
            detectType = request.POST.get('class')
            print(detectType)
            guestFiles = GuestDetections.objects.create(filename=filename,file=image,uploaderIp=ip,detectClass=detectType)
            filename = guestFiles.file.name.split('/')[1]
            detected = detector.detect(filename, detectType, mode)
            return JsonResponse({'status':True, 'message':'File Saved'},safe=False, status=200)