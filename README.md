# Nébula Arcade — Catálogo de videojuegos (HTML5 + XML/XSLT)

## Estructura del proyecto
```
videojuegos-site/
├── index.html
├── about.html
├── catalog.html
├── contact.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js         (menú móvil, todas las páginas)
│   ├── catalog.js       (carga XML + aplica XSLT + filtros)
│   └── contacto.js       (validación del formulario)
└── data/
    ├── datos.xml        (8 registros de videojuegos)
    ├── datos.dtd        (valida la estructura del XML)
    └── catalogo.xsl      (transforma XML → HTML)
```

## Cómo probarlo en localhost
El catálogo usa `fetch()` para leer `data/datos.xml` y `data/catalogo.xsl`, así que
**no funciona abriendo el archivo directamente con doble clic** (protocolo `file://`).
Necesitas un servidor local sencillo:

```bash
cd videojuegos-site
python3 -m http.server 8000
```
Luego abre `http://localhost:8000/index.html` en el navegador.

Alternativas: extensión "Live Server" de VS Code, o `npx serve`.

## Cómo publicarlo en GitHub Pages
1. Crea un repositorio nuevo en GitHub (ej. `nebula-arcade`).
2. Sube todo el contenido de esta carpeta a la raíz del repositorio:
   ```bash
   cd videojuegos-site
   git init
   git add .
   git commit -m "Proyecto Nébula Arcade"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/nebula-arcade.git
   git push -u origin main
   ```
3. En GitHub: **Settings → Pages → Source** selecciona la rama `main` y la carpeta `/root`.
4. Guarda y espera 1–2 minutos. Tu sitio quedará en:
   `https://TU_USUARIO.github.io/nebula-arcade/`
5. Verifica en incógnito que las 4 páginas y el catálogo carguen bien (el catálogo depende
   de `fetch`, así que solo funciona servido por HTTP/HTTPS — GitHub Pages cumple esto).

## Validar el XML contra el DTD (opcional, para tu PDF de sustentación)
```bash
xmllint --noout --dtdvalid data/datos.dtd data/datos.xml && echo "XML válido"
```

## Para el video de presentación (3 minutos)
Ver la guía que te dio Claude en el chat — cubre guion sugerido, herramientas de
grabación gratuitas y qué mostrar en pantalla para cada requisito de la rúbrica.
