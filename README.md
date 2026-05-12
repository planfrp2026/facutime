# FacuTIME — Horarios UTN FRP

Sitio público con los horarios y espacios de la **Facultad Regional Paraná** de la UTN.

URL: https://planfrp2026.github.io/facutime/

## Qué es esto

Este repositorio sirve únicamente el HTML estático del dashboard **FacuTIME**, generado a partir del Excel maestro de horarios que arroja el sistema de la facultad. El código fuente, los Excel y los scripts viven fuera de este repo (no se publican).

Mantenido por la **Subsecretaría de Planeamiento, Obras, Servicios y Modernización de la Administración** — UTN FRP.

## Cómo se actualiza

Desde la oficina:

1. Se edita el Excel maestro como siempre.
2. Se corre `actualizar_dashboard.bat` para regenerar el HTML local.
3. Se corre `publicar.bat` para empujar el HTML actualizado a este repositorio. GitHub Pages publica el cambio en uno o dos minutos.

## Nota sobre indexación

El HTML lleva una meta tag `noindex` y este repo incluye un `robots.txt` que pide a los buscadores no indexar el sitio. Es información pública institucional, pero por ahora preferimos que el acceso sea por enlace directo, no por búsquedas en Google.
