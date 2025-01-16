const fs = require("fs");

fs.readFile('./public/angular/index.html', 'utf-8', (err, data) => {
  if (err) {
    return console.log(err);
  }

  const transformed = data
    .replace(/styles(\.[a-z\d]+)?\.css/i, "{{ asset('angular/styles$1.css') }}")
    .replace('assets/favicon.ico', "{{ asset('angular/assets/favicon.ico') }}")
    .replaceAll(/src="([^"]+)"/g, `src="{{ asset('angular/$1') }}"`);

  fs.writeFile('./public/angular/index.html', transformed, () => {});
});
