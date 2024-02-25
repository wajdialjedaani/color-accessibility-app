"""
WSGI config for backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
from whitenoise import WhiteNoise
import sys

file_path = os.path.abspath(__file__)

project_path = os.path.dirname(file_path)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

import sys
sys.path.append(project_path)

application = get_wsgi_application()
application = WhiteNoise(application)
