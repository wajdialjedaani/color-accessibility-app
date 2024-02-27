"""
WSGI config for backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

from django.core.wsgi import get_wsgi_application
import sys
import os

# Get the path to the current file (wsgi.py)
file_path = os.path.abspath(__file__)

# Get the directory containing wsgi.py (your project's root directory)
# your_project_path = os.path.dirname(file_path)

# import sys
# sys.path.append(your_project_path)
# sys.path.append(os.path.join(your_project_path, 'backend'))  

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

print("DJANGO_SETTINGS_MODULE:", os.environ.get('DJANGO_SETTINGS_MODULE'))

application = get_wsgi_application()
# application = WhiteNoise(application)
