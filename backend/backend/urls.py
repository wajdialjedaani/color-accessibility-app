from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from colorapi import views

router = routers.DefaultRouter()
router.register(r'files', views.FileUploadView, 'files')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]