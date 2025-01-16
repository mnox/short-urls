module.exports = (targetOptions, indexHtml) => {
  if (targetOptions.target === 'serve') {
    return indexHtml;
  }

  return indexHtml
    .replace(/styles(\.[a-z\d]+)?\.css/i, "{{ asset('angular/styles$1.css') }}")
    .replace('assets/favicon.ico', "{{ asset('angular/assets/favicon.ico') }}")
    .replace('assets/logo.webp', "{{ asset('angular/assets/logo.webp') }}")
    .replaceAll(/src="([^"]+)"/g, `src="{{ asset('angular/$1') }}"`);
};
