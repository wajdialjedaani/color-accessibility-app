from django.urls import path, re_path
from .views import ColorRecognitionAPI, SignificantColorsAPI, SimulationAPI, GeneratePaletteAPI

urlpatterns = [
    path('color-recognition/', ColorRecognitionAPI.as_view(), name='color_recognition'),
    path('significant_colors/', SignificantColorsAPI.as_view(), name='significant_colors'),
    path('simulation/', SimulationAPI.as_view(), name='simulation'),
    path('generate-palette/', GeneratePaletteAPI.as_view(), name='generate_palette'),

]