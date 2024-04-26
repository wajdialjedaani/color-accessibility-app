#!/usr/bin/env bash

python3.9 -m pip install numpy==1.19.5

echo "Building project packages"
python3 -m pip install -r requirements.txt
