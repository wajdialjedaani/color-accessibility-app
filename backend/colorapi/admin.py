from django.contrib import admin
from .models import FileUpload

class FileUploadAdmin(admin.ModelAdmin):
    list_display = ('image', 'result', 'label', 'date_uploaded')

admin.site.register(FileUpload, FileUploadAdmin)