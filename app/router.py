from django.urls import path
from .consumers import VideoConsumer

ws_urlpatterns = [
    path('ws/testurl/',VideoConsumer.as_asgi())
]