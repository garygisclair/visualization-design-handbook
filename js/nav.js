/* ── SITE NAVIGATION ────────────────────────────────────────
   Auto-injects nav bar and sets active state based on filename.
   ──────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', function () {
  const pages = [
    { href: 'index.html',            label: 'About' },
    { href: 'lib-foundations.html',   label: 'Foundations' },
    { href: 'lib-components.html',    label: 'Components' },
    { href: 'lib-charts.html',        label: 'Charts' },
    { href: 'lib-antipatterns.html',  label: 'Anti-Patterns' },
    { href: 'lib-template.html',      label: 'Template' },
  ];

  var path = location.pathname.split('/').pop() || 'index.html';
  if (path === '' || path === '/') path = 'index.html';

  var links = pages.map(function (p) {
    var cls = (p.href === path) ? ' class="active"' : '';
    return '<li><a href="' + p.href + '"' + cls + '>' + p.label + '</a></li>';
  }).join('\n      ');

  var nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.innerHTML =
    '<a href="index.html" class="site-nav-logo">Visualization Design Handbook</a>\n' +
    '  <ul class="site-nav-links">\n      ' + links + '\n  </ul>';

  document.body.insertBefore(nav, document.body.firstChild);
})();
