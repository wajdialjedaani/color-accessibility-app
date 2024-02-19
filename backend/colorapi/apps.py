from django.apps import AppConfig
from django.conf import settings
import os
import joblib


class ColorapiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'colorapi'
    MODEL_FILE = os.path.join(settings.MODELS, "color.pkl")
    model = joblib.load(MODEL_FILE)   
    
#When the application runs here, the trained model is loaded only one time. 
#The response time will therefore be slower.