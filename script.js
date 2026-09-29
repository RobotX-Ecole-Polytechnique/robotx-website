const burger = document.querySelector('.burger');
const nav = document.querySelector('nav.main');
if (burger && nav) {
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
}

const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Le formulaire ouvre le client mail (à remplacer par un vrai backend / Formspree)
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const d = new FormData(form);
    const body = `${d.get('message')}\n\n— ${d.get('nom')} (${d.get('promo')})`;
    location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(d.get('sujet'))}&body=${encodeURIComponent(body)}`;
  });
}
