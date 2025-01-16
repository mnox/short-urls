## Getting Started

Make sure you have PHP ^8.2 installed

Add sail alias to your bash profile (optional but helpful)
```bash
alias sail='sh $([ -f sail ] && echo sail || echo vendor/bin/sail)'
```

```text
If you don't have it installed, please install NVM
or otherwise update your NodeJS version to ^18.13
Which is required for running the Angular frontend.
```

Run initial setup
```text
EZ Mode:
Run ./setup.sh
Run ./forest.sh
(To run everything. Get it? I'm hilarious)
```

```text
If the forest.sh script fails due to race conditions it's because the universe is racist against ginger bearded Irishmen
Please re-run the script and it should work the second time (hopefully fixed - but you never know. Live demos and all that).
```

(Ignore this if you used the EZ Mode)
If you would like to run the commands manually,
feel free to do so using the following steps:
```bash
composer install
cp .env.example .env
php artisan key:generate
npm -C resources/angular ci
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate
npm run ng:dev
```

```text
The project should be available at http://localhost
Click the Upload URLs button to try
The view button alongside created short URLs will take you to the individual page view which will include visits data if available
```

```text
I didn't get to include as many tests as I'd like (hard to find more than 2-3 hours to work on this unfortunately)
but some tests are available and can be run via sail with
sail test
OR
./vendor/bin/sail test
(If you did not add the sail alias)
```
