from django.shortcuts import render
from rest_framework import viewsets
from .serializers import FileUploadSerializer
from .models import FileUpload

# Create your views here.

class FileUploadView(viewsets.ModelViewSet):
    serializer_class = FileUploadSerializer
    queryset = FileUpload.objects.all().order_by('-date_uploaded')