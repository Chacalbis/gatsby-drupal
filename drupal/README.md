# AtolCD : Template Drupal 8

## .env
You need to copy .env.dist content in .env

## Import SQL dump
Just copy the needed SQL dump from `sql` to `sql/import`
All SQL will be imported at docker stack creation.
* `0_fresh_installed_drupal.sql` => The freshest drupal database you could dream of (only user shortcuts were removed)

## Docker & Docker Compose
Install docker
Install docker-compose : https://docs.docker.com/compose/install/

To run the development stack : `docker-compose up -d`
To stop it : `docker-compose stop`

## Composer
You could use composer with docker without having to install it : https://redmine.atolcd.com/questions/173-utiliser-composer-sans-l-installer-avec-docker

You can now initiate all dependency : `./bin/composer install`
If you need new module or update existing on, edit composer.json and launch : `./bin/composer update`

At this point you should have a functional Drupal 8 site

## Connect to Docker database
Use the script sql2docker.
You can connect with drupal user : `./pg2docker connect`
You can connect with root user : `./pg2docker connect-root`
You can dump your drupal database : `./pg2docker dump`

## Default Admin user
User: `admin`
Password: `bw8l$D1x989nHTcQ`
