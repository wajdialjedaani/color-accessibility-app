from django.urls import path
from .views import ColorRecognitionAPI, SignificantColorsAPI

urlpatterns = [
    path('color-recognition/', ColorRecognitionAPI.as_view(), name='color_recognition'),
    path('significant_colors/', SignificantColorsAPI.as_view(), name='significant_colors')
]