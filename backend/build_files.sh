#!/usr/bin/env bash

echo "Building project packages"
pip3 install numpy==1.21.4 --no-cache-dir
pip3 install -r requirements.txt
