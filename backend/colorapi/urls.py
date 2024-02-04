from django.urls import path, include
from rest_framework import routers
from .views import FileUploadView, FindSignificantColors

router = routers.DefaultRouter()
router.register(r'files', FileUploadView)

urlpatterns = [
    path('', include(router.urls)),
    path('find_significant_colors/', FindSignificantColors, name='find_significant_colors')
]