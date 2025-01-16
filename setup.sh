#Install composer dependencies
composer install;
#Set environment vars
cp ./.env.example ./.env;
#Ensure Laravel has a generated key
php artisan key:generate;
#Install npm dependencies
npm install;
#Install angular npm dependencies
npm -C resources/angular install;
#Start containers
./vendor/bin/sail up -d
