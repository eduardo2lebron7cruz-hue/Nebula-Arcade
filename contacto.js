// contacto.js — validación del formulario de contacto
document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('form-contacto');
  if (!formulario) return;

  const mensajeExito = document.getElementById('mensaje-envio');

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    let valido = true;

    formulario.querySelectorAll('[data-requerido]').forEach((campo) => {
      const errorSpan = document.getElementById(campo.id + '-error');
      if (!campo.checkValidity()) {
        valido = false;
        if (errorSpan) errorSpan.textContent = mensajeError(campo);
        campo.setAttribute('aria-invalid', 'true');
      } else {
        if (errorSpan) errorSpan.textContent = '';
        campo.removeAttribute('aria-invalid');
      }
    });

    if (valido) {
      mensajeExito.textContent = '¡Gracias! Tu mensaje fue validado correctamente y quedaría listo para enviarse.';
      mensajeExito.classList.add('visible');
      formulario.reset();
    } else {
      mensajeExito.classList.remove('visible');
    }
  });

  function mensajeError(campo) {
    if (campo.validity.valueMissing) return 'Este campo es obligatorio.';
    if (campo.validity.typeMismatch && campo.type === 'email') return 'Ingresa un correo válido, ej: nombre@dominio.com';
    if (campo.validity.tooShort) return `Escribe al menos ${campo.minLength} caracteres.`;
    if (campo.validity.patternMismatch) return 'El formato ingresado no es válido.';
    return 'Revisa este campo.';
  }
});
