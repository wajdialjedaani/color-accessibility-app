# Color Accesibility App

## Overview
This document serves as a guide for deploying and running the Color Accessibility App in a production environment. The Color Accessibility App is designed to help developers and designers ensure their content is accessible to users with color vision deficiencies. It utilizes machine learning to classify colors into 11 classes to provide tools for color recognition, colors highlight, color simulation and color palette.

## Assumptions
- The deployment target is a server capable of handling machine learning models, implying sufficient CPU/GPU processing power and memory allocation.
- The server has internet access for downloading necessary dependencies.
- The user has sudo privileges on the server.

## Dependencies
The Color Accessibility App relies on the following external libraries and APIs:

- Node.js: Version 14.x or higher
- npm: Version 6.x or higher (comes with Node.js)
- Next.js: Version 14.x or higher
- Python: Version 3.10 or higher
- Tensorflow: Version 2.14
- Django: Version 4.2 or higher
- OpenAI: Version 4.28.0
External APIs:
- Colormind API

## Constraints
- Model is not runnable on Windows.
- At least 500MB of free disk space is required for the installation and runtime data.

## Description
/backend: contains all source code for Django backend
/frontend: contains all source code for NExt.js frontend
Procfile: configuration file for backend deployment in production
requirements.txt: all dependencies for Django backend
runtime.txt: file to specify python version for deployment compilation
README.md: deployment artifacts

## Deployment Process
### Frontend 
In /frontend:
1. Install Node.js and npm
2. Run `npm i`
3. Run `npm run dev`

### Backend
In /backend:
1. Install Python and Pip
2. Run a virtual environment of your choice, examples are Venv or Pipenv
3. Activate your virtual environment shell
4. Run `pip install ./requirements.txt -r`
5. Run `python3 manage.py runserver` or `python manage.py runserver`
