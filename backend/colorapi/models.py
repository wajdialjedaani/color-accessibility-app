import cv2
import os
import numpy as np
import tensorflow as tf
from django.conf import settings
from django.db import models
from PIL import Image
import pandas as pd
import joblib


class FileUpload(models.Model):
    image = models.ImageField(upload_to='images')
    result = models.CharField(max_length=250, blank=True)
    date_uploaded = models.DateTimeField(auto_now_add=True)
    label = models.JSONField(null=True, blank=True)
    
    def __str__(self):
        return 'Image uploaded at {}'.format(self.date_uploaded.strftime('%Y-%m-%d %H:%M'))
    ''' Original Code
    def save(self, *args, **kwargs):
        try:
            # SSL certificate necessary so we can download weights of the InceptionResNetV2 model
            ssl._create_default_https_context = ssl._create_unverified_context

            img = Image.open(self.image)
            img_array = tf.keras.preprocessing.image.img_to_array(img)
            dimensions = (299, 299)

            # Interpolation - a method of constructing new data points within the range
            # of a discrete set of known data points.
            resized_image = cv2.resize(img_array, dimensions, interpolation=cv2.INTER_AREA)
            ready_image = np.expand_dims(resized_image, axis=0)
            ready_image = tf.keras.applications.inception_resnet_v2.preprocess_input(ready_image)

            model = tf.keras.applications.InceptionResNetV2(weights='imagenet')
            prediction = model.predict(ready_image)
            decoded = tf.keras.applications.inception_resnet_v2.decode_predictions(prediction)[0][0][1]
            self.result = str(decoded)
            print('Success')
        except Exception as e:
            print('Classification failed:', e)

        return super().save(*args, **kwargs)
    '''
    def save(self, *args, **kwargs):
        try:
            # Load the color recognition model
            model_path = os.path.join(os.path.dirname(__file__), 'models', 'color.pkl')
            color_model = joblib.load(model_path)            

            # Existing code to process the uploaded image
            img = Image.open(self.image)
            #img_array = cv2.imread(img)
            img_array = np.array(img)
            dimensions = (299, 299, 299)
            resized_array = np.resize(img_array, dimensions)

            # Extract RGB values from the processed image
            red_channel = resized_array[:, :, 0]
            green_channel = resized_array[:, :, 1]
            blue_channel = resized_array[:, :, 2]

            # from trim model
            image_df = pd.DataFrame({'red': red_channel.ravel(),
                                     'green': green_channel.ravel(),
                                     'blue': blue_channel.ravel()})
            
            
            predictions = color_model.predict(image_df)

            predicted = np.argmax(predictions, axis=1)
            predicted = pd.DataFrame(predicted, columns=['Labels']).to_json()

            self.label = predicted
        except Exception as e:
            print('Color recognition failed:', e)

        return super().save(*args, **kwargs)