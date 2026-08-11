// main.js — comportamiento compartido en todas las páginas
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav__toggle');
  const lista = document.querySelector('.nav__lista');

  if (toggle && lista) {
    toggle.addEventListener('click', () => {
      const abierto = lista.classList.toggle('abierta');
      toggle.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });
  }
});
