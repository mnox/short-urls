#Set nvm context
export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;
#Run containers via Artisan sail
./vendor/bin/sail up -d && sleep 2;
#Sleep to ensure containers are ready before attempting to run migrations

#Run Migrations
./vendor/bin/sail artisan migrate;
#Use latest stable version of Node
nvm use stable;
#Run Angular dev/watch process
npm run ng:watch;
