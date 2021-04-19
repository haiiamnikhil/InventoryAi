from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
import cv2 as cv
from .models import VideoDetection,CameraCredentials
from django.views.decorators.csrf import csrf_exempt


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


def videoDetector(request):
    pass



# class CameraCredentialsSaver(APIView):
#     model = CameraCredentials
#     serializer_class = CameraCredentialsSerializer
#     permission_classes = (AllowAny, )
    
#     def post(self, request, *args, **kwargs):
#         data = JSONParser.parse(request)
#         cameraAuth = CameraCredentials.objects.filter(user=request.user).exists()
#         if cameraAuth:
#             return Response(status = 200, data = {'staus':True,'message': 'User Credentials Exists'})
#             # return JsonResponse({'staus':True,'message':'User Credentials Exists'},safe=False, status=200)
#         else:
#             data = JSONParser().parse(request)
#             print(data)
#             return Response(status = 200, data = {'staus':True,'message': 'User Credentials Exists'})