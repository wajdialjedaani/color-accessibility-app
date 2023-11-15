import cv2
import os
import ssl
import numpy as np
import tensorflow as tf
from django.conf import settings
from django.db import models
from PIL import Image


class FileUpload(models.Model):
    image = models.ImageField(upload_to='images')
    result = models.CharField(max_length=250, blank=True)
    date_uploaded = models.DateTimeField(auto_now_add=True)
    
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
    def convert_prediction_to_color_name(prediction):
    # Logic to map model predictions to color names or labels
    # Example logic:
        color_names = ['Red', 'Green', 'Blue', 'Yellow', 'Orange', 'Pink', 'Purple', 'Brown', 'Grey', 'Black', 'White']
        predicted_label = np.argmax(prediction)  # Assuming prediction is an array of probabilities
        color_label = color_names[predicted_label]
        return color_label

    def save(self, *args, **kwargs):
        try:
            # Load the color recognition model
            color_model = tf.keras.models.load_model('path_to_color_recognition_model.h5')  # Replace with the actual path

            # Existing code to process the uploaded image
            img = Image.open(self.image)
            img_array = cv2.imread(self.image.path)
            # ... additional processing ...

            # Extract RGB values from the processed image
            red_channel = img_array[:, :, 0]
            green_channel = img_array[:, :, 1]
            blue_channel = img_array[:, :, 2]

            # Combine RGB channels into a single array
            image_rgb = np.array([red_channel.ravel(), green_channel.ravel(), blue_channel.ravel()]).T

            # Use color recognition model to predict the color
            color_prediction = color_model.predict(image_rgb)

            color_names = ['Red', 'Green', 'Blue', 'Yellow', 'Orange', 'Pink', 'Purple', 'Brown', 'Grey', 'Black', 'White']
            predicted_label = np.argmax(color_prediction)  # Assuming prediction is an array of probabilities
            color_label = color_names[predicted_label]

            # Save the predicted color label to self.result
            self.result = color_label
            print('Color recognized successfully:', color_label)
        except Exception as e:
            print('Color recognition failed:', e)

        return super().save(*args, **kwargs)