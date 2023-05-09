#!/bin/bash

# Launch redis-microserver
cd redis-microserver/
docker-compose up -d

# Launch python-microserver
cd ../python-microserver/
docker-compose up -d

# Launch dashboard-microserver
cd ../dashboard-microserver/
docker-compose up -d
