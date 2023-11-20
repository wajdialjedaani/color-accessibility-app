import os
import numpy as np
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

    def save(self, *args, **kwargs):
        try:
            # Load the color recognition model
            model_path = os.path.join(os.path.dirname(__file__), 'models', 'color.pkl')
            color_model = joblib.load(model_path)            

            # Existing code to process the uploaded image
            img = Image.open(self.image)

            img_array = np.array(img)
            dimensions = (299, 299, 299)
            # resized_array = np.resize(img_array, dimensions)
            resized_array = img_array

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