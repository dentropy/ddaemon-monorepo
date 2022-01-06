
``` bash
yarn add react-vega
```
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Building container Locally

``` bash
bash build-react.sh
cd backend
bash built-container.sh

# Test Container
docker-compose up --env-file ./backend/.env
# Go to http://localhost:8081 and verify app is working


# Production container
# Save password and hash somewhere
rsync -avzhe ssh --progress ./backend complexity@elasticsearch.complexityweekend.xyz:~
# SSH into server
# Install [Paul Mullins / DentropyCloud-traefik · GitLab](https://gitlab.com/dentropy/dentropycloud-traefik) on server
# Either remove password or change password for production container
# Below command can be run locally on on server
sudo apt-get update
sudo apt-get install -y apache2-utils
echo $(htpasswd -nbB complexity mysecurepassword) | sed -e s/\\$/\\$\\$/g


# change the myhashhere to the output of the above command
vim ~/backend/docker-compose-prod.yml

cd ~/backend && docker-compose -f docker-compose-prod.yml --env-file .env up -d
```
