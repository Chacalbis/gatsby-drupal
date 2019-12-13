# AtolCD : Template Drupal 8

## .env
You need to change some information in the .env

-- PROJECT SETTINGS --
PROJECT_NAME=example_drupal
PROJECT_BASE_URL=example_drupal.docker.localhost

-- DATABASE --
DB_NAME=example_name

## Docker & Docker Compose
Install docker
Install docker-compose : https://docs.docker.com/compose/install/

To run the development stack just run : `docker-compose up -d`
To stop it : `docker-compose stop`

If you need to initiate the database (the first time) just place your SQL dump in `sql/import`
all SQL are imported at docker stack creation.

## Composer
Install composer : https://getcomposer.org/doc/00-intro.md
You can now initiate all dependency : `./bin/composer install`
If you need new module or update existing on, edit composer.json and launch : `./bin/composer update`

## Connect to Docker database
Use the script sql2docker.
You can connect with drupal user : `./pg2docker connect`
You can connect with root user : `./pg2docker connect-root`
You can dump your drupal database : `./pg2docker dump`

## Configuration of Drupal
You can start the Drupal configuration.
