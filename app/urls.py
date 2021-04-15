from .api import *
from django.urls import path
from .views import  *
from .template import *

urlpatterns = [
    path('',home,name='home'),
    
    path('login/',loginView,name='loginView'),
    path('login-auth/',loginAuth,name='loginauth'),
    path('is-authenticated/',isLoggedIn,name='isLoggedIn'),
    path('register/',registerView,name='registerView'),
    path('register-auth/',registerAuth,name='registerAuth'),
    path('logout/',logoutUser,name='logoutView'),
    
    path('profile/',userProfileView,name='userProfileView'),
    path('user-details/',userCountAPI,name='userDetails'),
    
    path('upload/',uploadFiles,name='singledetector'),
    path('process-image/',single_image_processor,name='process'),
    
    path('upload/show-image/',showimage,name='showimage'),
    
    path('multidetector/',multi_detector,name='multi_detector'),
    path('multi-image-processor/',multi_image_processor,name='multi-image-processor'),
    path('multidetector/detector/',multi_detector_processor,name='multi_detector_processor'),
    
    path('inventory/',getInventory,name='inventory'),
    path('product-analytics/',productAnalytics,name='productAnalytics'),
    path('product-history/',productHistory,name='productHistory'),
    
    path('periodical-select/',periodicalSelector,name='periodicalSelector'),
    
    path('packages/payment/',paymentView,name='paymentView'),
    path('packages/payment/razorpay/',payment_gateway,name='razorPay'),
    
    path('history/',historyView,name='historyView'),
    path('api-single-detection/',detectionHistory,name='detectionHistory'),
    
    path('packages/',packagesView,name='packagesView'),
    
    path('activate/<uidb64>/<token>/',activate,name='activate'),
    
    path('get-batch-files/',getBatchFiles,name='getBatchFiles'),
    
    path('upload/detected/',detectedView,name='detectedView'),
    
    path('user/package/', userPackage, name='userPackage'),
    
    path('api/v1/user/object-counter/',userApiView,name='userView'),
    path('api/v1/object-counter/',apiProcessor,name='apiProcessor'),
]