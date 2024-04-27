#!/usr/bin/env bash

echo "Building project packages"

python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt

mkdir -p dist