// Génère le header et le footer de chaque page à partir de SITE (site.js).
const brand = '<img src="images/logo_robotx.jpeg" alt="" width="40" height="40"><span>Robot<b>X</b></span>';
const current = location.pathname.split('/').pop() || 'index.html';

const header = document.querySelector('header.site');
if (header) {
  const links = SITE.nav.map((l) => {
    const attrs = [
      `href="${l.href}"`,
      l.cta ? 'class="btn nav-cta"' : '',
      l.href === current ? 'aria-current="page"' : '',
    ].filter(Boolean).join(' ');
    return `<a ${attrs}>${l.label}</a>`;
  }).join('');
  header.innerHTML = `
  <div class="wrap">
    <a href="index.html" class="brand" aria-label="RobotX, accueil">${brand}</a>
    <button class="burger" aria-label="Menu" aria-expanded="false">☰</button>
    <nav class="main">${links}</nav>
  </div>`;
}

const footer = document.querySelector('footer.site');
if (footer) {
  const nav = SITE.nav.filter((l) => l.footer !== false)
    .map((l) => `<a href="${l.href}">${l.label}</a>`).join('');
  const socials = SITE.socials
    .map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`).join('');
  footer.innerHTML = `
  <div class="wrap">
    <div class="cols">
      <div>
        <div class="brand" style="margin-bottom:.6rem">${brand}</div>
        <p>${SITE.tagline}</p>
      </div>
      <div><h4>Navigation</h4>${nav}</div>
      <div><h4>Contact</h4><a href="mailto:${SITE.email}">${SITE.email}</a>${socials}</div>
    </div>
    <p class="legal">${SITE.legal}</p>
  </div>`;
}

// <a data-email></a> dans le contenu → lien mailto vers SITE.email
document.querySelectorAll('[data-email]').forEach((el) => {
  el.href = `mailto:${SITE.email}`;
  if (!el.textContent.trim()) el.textContent = SITE.email;
});
