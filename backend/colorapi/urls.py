from django.urls import path, re_path
from .views import ColorRecognitionAPI, SignificantColorsAPI, SimulationAPI

urlpatterns = [
    path('color-recognition/', ColorRecognitionAPI.as_view(), name='color_recognition'),
    path('significant_colors/', SignificantColorsAPI.as_view(), name='significant_colors'),
    path('simulation/', SimulationAPI.as_view(), name='simulation'),
    # re_path('', TemplateView.as_view(template_name='index.html'))

]