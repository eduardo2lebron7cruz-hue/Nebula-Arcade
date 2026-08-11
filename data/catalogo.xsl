<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>

<!-- Plantilla raíz: genera un documento HTML completo (útil si datos.xml se abre directo) -->
<xsl:template match="/catalogo">
  <html lang="es">
    <head>
      <meta charset="UTF-8"/>
      <title>Catálogo transformado</title>
      <link rel="stylesheet" href="../css/styles.css"/>
    </head>
    <body>
      <div class="cartucho-grid">
        <xsl:apply-templates select="juego"/>
      </div>
    </body>
  </html>
</xsl:template>

<!-- Plantilla por cada videojuego: tarjeta tipo "cartucho" -->
<xsl:template match="juego">
  <article class="cartucho" data-genero="{genero}">
    <div class="cartucho__etiqueta">
      <span class="cartucho__anio"><xsl:value-of select="anio"/></span>
      <span class="cartucho__genero"><xsl:value-of select="genero"/></span>
    </div>
    <h3 class="cartucho__titulo"><xsl:value-of select="titulo"/></h3>
    <p class="cartucho__dev">
      <xsl:value-of select="desarrollador"/> · <xsl:value-of select="plataforma"/>
    </p>
    <p class="cartucho__desc"><xsl:value-of select="descripcion"/></p>
    <div class="cartucho__pie">
      <span class="cartucho__precio">
        $<xsl:value-of select="precio"/>
      </span>
      <span class="cartucho__calificacion">
        ★ <xsl:value-of select="calificacion"/>
      </span>
    </div>
  </article>
</xsl:template>

</xsl:stylesheet>
