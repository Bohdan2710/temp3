var AFF_URL = "/atefiapolandnet/";

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-aff]').forEach(function (el) {
    el.style.cursor = 'pointer';
    el.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      window.open(AFF_URL, '_blank', 'noopener,noreferrer');
    });
  });
});
