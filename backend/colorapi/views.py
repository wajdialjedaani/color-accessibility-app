from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, renderers
from PIL import Image
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from .apps import ColorapiConfig
import base64
from io import BytesIO
from PIL import Image, ImageOps
import requests, json

class GeneratePaletteAPI(APIView):
    def post(self, request):
        try:
            url = "http://colormind.io/api/"
            data = request.data

            # model is the color model specified in the request data. 
            # It defaults to 'default' if not provided.
            # input_colors is a list of colors provided in the request data. 
            # It defaults to an empty list if not provided.
            model = data.get('model', 'default')
            input_colors = data.get('input', [])

            payload = {
                'model': model,
                'input': input_colors if input_colors else ["N"] * 5  # Replace 5 with your desired number of colors
            }

            response = requests.post(url, data=json.dumps(payload))

            if response.status_code == 200:
                result = response.json().get('result', [])
                
                palette = []
                for idx, color in enumerate(result):
                    if idx < len(input_colors) and input_colors[idx] != "N":
                        palette.append({'rgb': input_colors[idx], 'isLocked': True})
                    else:
                        palette.append({'rgb': color, 'isLocked': False})

                return Response({'palette': palette})
            else:
                return Response({'error': 'Failed to generate palette', 'status_code': response.status_code}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ColorRecognitionAPI(APIView):
    def post(self, request):
        try:
            # Load the color recognition model
            color_model = ColorapiConfig.model 

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

class ImageRenderer(renderers.BaseRenderer):
    media_type = 'image/jpeg'
    format = 'jpeg'
    charset = None
    render_style = 'binary'

    def render(self, data, media_type=None, renderer_context=None):
        return data
    
class SimulationAPI(APIView):

    colorMats = {
        # Red-Blind
        'Protanopia':   
        [0.567,0.433,0.000,
        0.558,0.442,0.000,
        0.000,0.242,0.758],
        # Green-Blind
        'Deuteranopia': 
        [0.625,0.375,0.000,
        0.700,0.300,0.000,
        0.000,0.300,0.700],
        # Blue-Blind
        'Tritanopia':   
        [0.950,0.050,0.000,
        0.000,0.433,0.567,
        0.000,0.475,0.525],
        # Monochromacy
        'Achromatopsia':
        [0.299,0.587,0.114,
        0.299,0.587,0.114,
        0.299,0.587,0.114],
        }
    
    def simulate_colorblindness(self, red, green, blue, color_matrix):

        # Apply the protanomaly matrix to the original RGB values
        new_rgb_values = np.dot(np.array(color_matrix).reshape((3,3)), [red, green, blue])

        # Extract the simulated RGB values
        new_red, new_green, new_blue = new_rgb_values

        return new_red, new_green, new_blue
    
    def post(self, request):
        try:
            
            simulationType = request.query_params.get('simulateType')
            img = Image.open(request.FILES.get('image'))

            img_array = np.array(img)

            # Extract RGB values from the processed image
            red_channel = img_array[:, :, 0]
            green_channel = img_array[:, :, 1]
            blue_channel = img_array[:, :, 2]

            for i in range(img_array.shape[0]):
                for j in range(img_array.shape[1]):
                    # Get the original RGB values
                    red = img_array[i, j, 0]
                    green = img_array[i, j, 1]
                    blue = img_array[i, j, 2]
                        
                    # Choose a color matrix based on the type of colorblindness
                    color_matrix = self.colorMats.get(simulationType)

                    # Update RGB values
                    new_red, new_green, new_blue = self.simulate_colorblindness(red, green, blue, color_matrix)

                    # Update RGB values of the pixel
                    img_array[i, j, 0] = new_red
                    img_array[i, j, 1] = new_green
                    img_array[i, j, 2] = new_blue
                
                modified_img_array = np.stack([red_channel, green_channel, blue_channel], axis=-1)
                modified_img = Image.fromarray(modified_img_array)

                compressed_buffer = BytesIO()

                # Resize the image to a reasonable size
                modified_img = ImageOps.exif_transpose(modified_img)
                modified_img.thumbnail((800, 800))

                # Save the compressed image to the buffer
                modified_img.save(compressed_buffer, format="JPEG", quality=85)

                # Get the base64-encoded string of the compressed image
                img_str = base64.b64encode(compressed_buffer.getvalue()).decode("utf-8")

            return Response({'simulationType': simulationType, 'modifiedImage': img_str}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': f'Color recognition failed: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)