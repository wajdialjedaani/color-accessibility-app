from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from PIL import Image
import numpy as np
import os
import joblib
import pandas as pd
from sklearn.cluster import KMeans

class ColorRecognitionAPI(APIView):
    def post(self, request):
        try:
            # Load the color recognition model
            model_path = os.path.join(os.path.dirname(__file__), 'models', 'color.pkl')
            color_model = joblib.load(model_path)

            if not request:
                return Response({'error': 'Image file is required.'}, status=status.HTTP_400_BAD_REQUEST)

            # Process the uploaded image
            img = Image.open(request)

            img_array = np.array(img)
            resized_array = img_array

            # Extract RGB values from the processed image
            red_channel = resized_array[:, :, 0]
            green_channel = resized_array[:, :, 1]
            blue_channel = resized_array[:, :, 2]

            # Create a DataFrame from RGB values
            image_df = pd.DataFrame({'red': red_channel.ravel(),
                                     'green': green_channel.ravel(),
                                     'blue': blue_channel.ravel()})

            # Make predictions using the color model
            predictions = color_model.predict(image_df)

            predicted = np.argmax(predictions, axis=1)
            predicted = pd.DataFrame(predicted, columns=['label']).to_json()

            return Response(predicted, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': f'Color recognition failed: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SignificantColorsAPI(APIView):
    def post(self, request):
        try:
            img = Image.open(request)

            img_array = np.array(img)
            reshaped_array = img_array.reshape((-1, 3))

            # Perform k-means clustering to find dominant colors
            num_colors = 5  # You can adjust this based on the number of colors you want in the palette
            kmeans = KMeans(n_clusters=num_colors, random_state=42)
            kmeans.fit(reshaped_array)
            dominant_colors = kmeans.cluster_centers_.astype(int)

            return Response({'palette': dominant_colors.tolist()}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': f'Color recognition failed: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)