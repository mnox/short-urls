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
