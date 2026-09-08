# Landing page Multienvíos

Landing en HTML, CSS y JavaScript con módulos nativos. La organización actual busca facilitar el mantenimiento y una próxima migración a Ionic Angular.

## Dónde trabajar

- `index.html`: contiene la página completa, incluidos sus SVG. Las secciones siguen juntas para poder trasladarlas inicialmente a una sola plantilla Angular.
- `privacidad.html` y `terminos.html`: páginas legales con contenido pendiente de completar.
- `css/main.css`: entrada de estilos compartida. El orden de sus importaciones es importante.
- `css/landing.css`: composición de la página, footer y reglas responsive, agrupados por bloques.
- `css/components/`: estilos compartidos del menú, botones y acordeón; `motion.css` contiene animaciones y algunos ajustes visuales que dependen de cargarse después del landing.
- `css/pages/legal.css`: composición de las páginas legales.
- `css/variables.css`, `reset.css`, `typography.css`, `layout.css` y `utilities.css`: base visual común.
- `js/app.js`: inicializa las interacciones. Cada módulo comprueba si su contenido existe, porque esta entrada también se usa en las páginas legales.
- `assets/`: imágenes, logos e iconos.

Los archivos de `css/sections/` y los estilos `cards.css`, `forms.css` y `floating-actions.css` no se importan actualmente. Se conservan como material de la base anterior; editarlos no cambia la página publicada. Los módulos `contact-form.js`, `floating-actions.js`, `config.js` y `utils/validation.js` tampoco forman parte del grafo de importaciones de `app.js`. Revisar su utilidad cuando se incorporen esas funciones.

## Ejecución local

Desde la carpeta del proyecto, con Python instalado:

```sh
python -m http.server 8080
```

Abrir `http://localhost:8080`. Los módulos JavaScript necesitan que la página se sirva por HTTP.

## Convenciones de mantenimiento

Usamos dos espacios de sangría y comentarios breves para explicar decisiones y dependencias.

La tipografía de la web es Montserrat, cargada desde Google Fonts en las tres páginas y definida en `css/variables.css`.

Los logos completos están en `assets/logos/`, el favicon en `assets/icons/` y las fotografías y el mapa en `assets/images/`. Los SVG de la base anterior se conservan en `assets/images/provisionales/`. Los nombres describen el contenido o el fondo para el que se utiliza cada recurso.

Mantener los nombres de clases y atributos `data-*`: conectan HTML, estilos e interacciones. Agregar comentarios cuando expliquen una dependencia, una decisión o una limitación; no hace falta narrar cada propiedad.

En `landing.css`, los estilos base siguen el orden de la página y los ajustes responsive permanecen al final. No reordenar declaraciones o media queries sin revisar la cascada. Los parámetros `?v=` de los recursos se usan para renovar la caché cuando se publican cambios.

## Preparación para Ionic Angular

La primera migración puede tener una sola `LandingPage` con su HTML, SCSS y TypeScript. No es necesario crear un componente por sección ni reemplazar automáticamente las etiquetas semánticas por controles Ionic.

Extraer componentes cuando haya reutilización o comportamiento propio que lo justifique. Header y footer son candidatos porque también aparecen en las páginas legales; los bloques de contenido pueden seguir dentro de la página.

- Conservar textos, SVG, clases y atributos de accesibilidad al trasladar el HTML.
- Llevar los tokens visuales a los estilos de tema y mantener reset, tipografía y utilidades como estilos globales.
- Separar estilos de página y compartidos teniendo en cuenta que los selectores de tema actuales dependen de `data-theme` en `html`. El encapsulamiento de Angular requiere revisar ese alcance.
- Sustituir la inicialización con `DOMContentLoaded` y los listeners manuales por estado y eventos de Angular. Los observadores y temporizadores deberán liberarse cuando la página se destruya.
- Mantener la analítica detrás de un único servicio y conectar las consultas cuando exista la API.
- Adaptar enlaces y desplazamiento al contenedor de scroll elegido: actualmente dependen de `window` y del documento; una página con `ion-content` puede usar otro contenedor.

## Comportamiento que conviene preservar

La página comienza en tema claro. El cambio de tema también cambia el logo del header. Los enlaces al cotizador desplazan la vista sin añadir un fragmento a la URL. El comparador conserva una transición visual de 850 ms mientras se incorpora su integración real.

El carrusel utiliza dos grupos iguales para cerrar el bucle. Las animaciones de entrada se activan una vez; las rutas continuas se controlan en CSS o SVG. Conservar la alternativa para usuarios que prefieren movimiento reducido.

## Revisión después de un cambio

Comprobar escritorio y móvil, tema claro y oscuro, menú con teclado, acordeón, navegación al cotizador y regreso desde las páginas legales. Revisar especialmente los saltos de línea, la ausencia de desplazamiento horizontal y los bucles de las animaciones.
