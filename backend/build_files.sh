#!/usr/bin/env bash

echo "Building project packages"
python3 -m pip install -r requirements.txt

python3.9 manage.py collectstatic