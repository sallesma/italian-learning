#! /bin/bash

# Update package list and upgrade all packages
sudo apt-get update

# Install debug tools
sudo apt-get -y install curl

# Install git
sudo apt-get -y install git
sudo apt-get -y install tig

# Install nodejs
sudo apt-get -y install python-software-properties python g++ make
sudo apt-get -y install software-properties-common
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get -y install nodejs

# Install MongoDB
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org