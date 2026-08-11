// catalog.js — carga datos.xml, aplica data/catalogo.xsl (XSLT) en el navegador
// y genera el catálogo dentro de #catalogo-salida en catalog.html

document.addEventListener('DOMContentLoaded', () => {
  const salida  = document.getElementById('catalogo-salida');
  const estado  = document.getElementById('catalogo-estado');
  const filtros = document.getElementById('catalogo-filtros');

  if (!salida) return;

  cargarCatalogo();

  async function cargarCatalogo() {
    try {
      const [xmlTexto, xslTexto] = await Promise.all([
        fetch('data/datos.xml').then(r => {
          if (!r.ok) throw new Error('No se pudo leer datos.xml');
          return r.text();
        }),
        fetch('data/catalogo.xsl').then(r => {
          if (!r.ok) throw new Error('No se pudo leer catalogo.xsl');
          return r.text();
        })
      ]);

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlTexto, 'application/xml');
      const xslDoc = parser.parseFromString(xslTexto, 'application/xml');

      if (xmlDoc.querySelector('parsererror') || xslDoc.querySelector('parsererror')) {
        throw new Error('El XML o el XSLT contienen errores de sintaxis');
      }

      if (typeof XSLTProcessor === 'undefined') {
        throw new Error('Este navegador no soporta XSLTProcessor');
      }

      const procesador = new XSLTProcessor();
      procesador.importStylesheet(xslDoc);
      const fragmento = procesador.transformToFragment(xmlDoc, document);

      // El XSLT genera un <html><body><div class="cartucho-grid">...</div></body></html>
      const grid = fragmento.querySelector('.cartucho-grid') || fragmento;

      salida.innerHTML = '';
      salida.appendChild(grid.cloneNode(true));
      salida.className = 'cartucho-grid';

      if (estado) estado.remove();

      construirFiltros();
    } catch (error) {
      console.error(error);
      if (estado) {
        estado.textContent =
          'No se pudo cargar el catálogo dinámico (' + error.message + '). ' +
          'Revisa que el sitio se sirva por HTTP (GitHub Pages) y no abierto como archivo local.';
      }
    }
  }

  function construirFiltros() {
    if (!filtros) return;
    const tarjetas = Array.from(salida.querySelectorAll('.cartucho'));
    const generos = ['Todos', ...new Set(tarjetas.map(t => t.dataset.genero))];

    filtros.innerHTML = generos.map((g, i) =>
      `<button class="filtro" type="button" aria-pressed="${i === 0}">${g}</button>`
    ).join('');

    filtros.addEventListener('click', (e) => {
      const boton = e.target.closest('.filtro');
      if (!boton) return;

      filtros.querySelectorAll('.filtro').forEach(b => b.setAttribute('aria-pressed', 'false'));
      boton.setAttribute('aria-pressed', 'true');

      const genero = boton.textContent.trim();
      tarjetas.forEach(t => {
        const visible = genero === 'Todos' || t.dataset.genero === genero;
        t.style.display = visible ? '' : 'none';
      });
    });
  }
});
