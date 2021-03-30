from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt


def historyView(request):
    return render(request, 'history.html')


def paymentView(request):
    return render(request, 'payment.html')


def home(request):
    return render(request, "demo.html")


def uploadFiles(request):
    return render(request, 'upload.html')


def showimage(request):
    return render(request, 'showimage.html')


def multi_detector(request):
    return render(request, 'multidetector.html')


def multi_detector_processor(request):
    return render(request, 'detector.html')


@csrf_exempt
def loginView(request):
    return render(request, 'login.html')


@csrf_exempt
def registerView(request):
    return render(request, 'register.html')


def userProfileView(request):
    return render(request, 'profile.html')


def drag_and_drop(request):
    return render(request, 'draganddrop.html')


def packagesView(request):
    return render(request, 'packages.html')
