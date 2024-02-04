from rest_framework import viewsets, status
from .serializers import FileUploadSerializer
from .models import FileUpload
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

class FileUploadView(viewsets.ModelViewSet):
    serializer_class = FileUploadSerializer
    queryset = FileUpload.objects.all().order_by('-date_uploaded')

@api_view(['POST'])
def FindSignificantColors(request):
    try:
        serializer = FileUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        instance.find_significant_colors()
        return Response({"label": instance.label}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)