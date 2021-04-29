import os
from django.http.response import StreamingHttpResponse
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
import cv2 as cv
from .models import VideoDetection,CameraCredentials
from django.views.decorators.csrf import csrf_exempt
from .detector import detector
from .models import VideoUpload


@csrf_exempt
def cameraCredentialsSaver(request):
    if request.method == 'POST':
        cameraAuth = CameraCredentials.objects.filter(user=request.user).exists()
        if cameraAuth:
            return JsonResponse({'staus':True,'message':'User Credentials Exists'},safe=False, status=200)
        else:
            data = JSONParser().parse(request)
            print(data)
            return JsonResponse({'staus':True,'message':'User Credentials Saved'},safe=False, status=200)

@csrf_exempt
def videoDetector(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        print(data)
        detector.videoDetector(data['detectClass'])
        return JsonResponse({'staus':True,'message':'User Credentials'},status=200,safe=False)


cam = cv.VideoCapture(0)
def extract_frames():
    __ret__,__frames__ = cam.read()
    return __frames__


def get_frames(data):
    __frames__ = extract_frames()
    # print(__frames__)
    # while True:
    #     __ret__,__frame__ = cam.read()
    if __frames__ is not None:
        print(__frames__)
        image = detector.videoDetector(__frames__,data['detectClass'])
        ret,out = cv.imencode('.jpg',image)
        return out.tobytes()
    else:
        pass


def video_streaming(extractframes,data):
    while True:
        frame = get_frames(data)
        yield(b'--frame\r\n' b'Content-Type:image/jpeg\r\n\r\n'+frame+b'\r\n\r\n')
        
@csrf_exempt
def video_streaming_view(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        print(data)
        return StreamingHttpResponse(video_streaming(get_frames(data),data),content_type='multipart/x-mixed-replace; boundary=frame')


def videoDetection(request):
    if request.method == 'POST':
        pass
    text = "hello World"
    return render(request,'videoDetections.html',{'word':text})

@csrf_exempt
def videoUploader(request):
    if request.method == 'POST':
        videoFile = request.FILES.get('file')
        fileName = request.POST.get('filename')
        detectClass = request.POST.get('class')
        uploadVideo = VideoUpload.objects.create(user=request.user,fileName=fileName,videoFile=videoFile,detectedClass=detectClass)
        return JsonResponse({'status': True},status=200, safe=False)


def videoUploadDetectProcessor(request):
    if request.method == 'POST':
        return JsonResponse({'staus':True,'message':'Video Uploaded'},safe=False, status=200)