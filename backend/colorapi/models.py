from django.db import models

# Create your models here.
def upload_path(instance, file):
    return '/'.join([])

class FileUpload(models.Model):
    name = models.TextField()
    type = models.TextField()
    # image = models.ImageField(upload_to= 'img')

    def _str_(self):
        return self.name