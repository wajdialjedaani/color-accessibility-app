"""
WSGI config for backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

from django.core.wsgi import get_wsgi_application
import os

# Get the path to the current file (wsgi.py)
file_path = os.path.abspath(__file__)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

print("DJANGO_SETTINGS_MODULE:", os.environ.get('DJANGO_SETTINGS_MODULE'))

application = get_wsgi_application()
