# Landing Base HTML/CSS/JS

Plantilla base profesional para una landing page reutilizable, responsive, accesible y preparada para una futura migración a Ionic Angular. Esta versión no usa dependencias externas ni frameworks: solo HTML5, CSS3 y JavaScript ES6 con módulos nativos.

## Estructura

```text
landing-base/
├── index.html
├── assets/
│   ├── images/
│   └── icons/
├── css/
│   ├── components/
│   ├── sections/
│   ├── variables.css
│   └── main.css
└── js/
    ├── components/
    ├── utils/
    ├── app.js
    └── config.js
```

`assets/icons/.gitkeep` conserva la carpeta de iconos vacía hasta que se agreguen iconos reales.

## Ejecución local

Por usar módulos JavaScript nativos, abre la plantilla desde un servidor local:

```bash
cd landing-base
python -m http.server 8080
```

Luego visita `http://localhost:8080`.

## Personalización rápida

Colores y tipografías: edita `css/variables.css`. Las variables están pensadas para trasladarse luego a `src/theme/variables.scss` en Ionic.

Textos: reemplaza los marcadores como `[NOMBRE DE LA EMPRESA]`, `[PROPUESTA DE VALOR]`, `[DESCRIPCIÓN DEL SERVICIO]`, `[CORREO ELECTRÓNICO]`, `[CIUDAD]` y similares en `index.html`.

Imágenes: cambia los SVG provisionales en `assets/images/` por imágenes reales. Mantén `width`, `height`, `alt` y `loading="lazy"` cuando corresponda.

WhatsApp: edita `whatsappNumber` y `whatsappMessage` en `js/config.js`. Los enlaces con `data-whatsapp-link` se actualizan automáticamente.

Formulario: `js/components/contact-form.js` simula el envío. La función `sendContactRequest()` es el punto preparado para conectar una API con `fetch`.

Analítica: `js/utils/analytics.js` expone `trackEvent()` y registra eventos simulados en consola. Ahí se pueden conectar Google Analytics, GTM, Meta Pixel u otra herramienta.

## Eventos preparados

- `click_primary_cta`
- `click_secondary_cta`
- `click_whatsapp`
- `open_mobile_menu`
- `submit_contact_form`
- `contact_form_success`
- `contact_form_error`
- `open_faq`
- `scroll_50_percent`
- `scroll_90_percent`

## Tabla de migración a Ionic

| Sección actual | Archivo relacionado | Componente futuro | Equivalente Ionic posible | Cambios durante migración |
|---|---|---|---|---|
| `site-header` | `index.html`, `css/components/navbar.css`, `js/components/navbar.js` | `HeaderComponent` | `ion-header`, `ion-toolbar`, Angular Router | Mover estado del menú a TypeScript y reemplazar navegación si hay rutas. |
| `hero-section` | `css/sections/hero.css` | `HeroComponent` | HTML semántico dentro de `ion-content` | Mantener `h1`, enlaces y SEO como HTML semántico. |
| `benefits-section` | `css/sections/benefits.css`, `css/components/cards.css` | `BenefitsComponent` | `ion-card` opcional | Convertir datos a arreglo tipado y renderizar con `*ngFor`. |
| `services-section` | `css/sections/services.css` | `ServicesComponent` | `ion-card`, `ion-button` | Separar servicios en modelo o servicio de contenido. |
| `process-section` | `css/sections/process.css` | `ProcessComponent` | HTML/`ion-list` opcional | Mantener numeración accesible con lista ordenada si favorece SEO. |
| `testimonials-section` | `css/sections/testimonials.css` | `TestimonialsComponent` | `ion-card`, futuro carrusel | Implementar carrusel propio o librería aprobada si se requiere. |
| `faq-section` | `css/sections/faq.css`, `js/components/accordion.js` | `FaqComponent` | `ion-accordion-group` o componente Angular accesible | Reescribir control de estado con bindings Angular y ARIA. |
| `contact-section` | `css/sections/contact.css`, `js/components/contact-form.js` | `ContactComponent` / `ContactFormComponent` | `ion-input`, `ion-select`, `ion-textarea`, Reactive Forms | Migrar validación a Angular Reactive Forms y `ContactService`. |
| `site-footer` | `css/sections/footer.css` | `FooterComponent` | HTML semántico | Mantener enlaces reales y datos estructurados donde aplique. |
| `floating-actions` | `css/components/floating-actions.css`, `js/components/floating-actions.js` | `FloatingActionsComponent` | `ion-fab`, `ion-fab-button` | Controlar visibilidad con listener Angular o directiva. |

## Propuesta de estructura Ionic Angular

```text
src/
├── app/
│   ├── components/
│   │   ├── header/
│   │   ├── hero/
│   │   ├── benefits/
│   │   ├── services/
│   │   ├── process/
│   │   ├── testimonials/
│   │   ├── faq/
│   │   ├── contact-form/
│   │   ├── floating-actions/
│   │   └── footer/
│   ├── pages/
│   │   └── landing/
│   ├── services/
│   │   ├── analytics.service.ts
│   │   └── contact.service.ts
│   └── models/
├── assets/
└── theme/
    └── variables.scss
```

## Recomendaciones Ionic

Reemplaza `<button>` por `ion-button` cuando sea una acción de interfaz. Usa `ion-input`, `ion-textarea` e `ion-select` en formularios. Considera `ion-card` para beneficios, servicios y testimonios si el sistema visual de Ionic aporta consistencia.

No reemplaces automáticamente todo el HTML. Conviene conservar `header`, `main`, `section`, `footer`, `h1`-`h3`, listas y enlaces reales para mantener SEO, accesibilidad y semántica.

## Código reutilizable

Reutilizable casi directo: variables visuales, nombres de clases, contenido HTML semántico, estructura de secciones, estrategia mobile-first y tokens de diseño.

Debe reescribirse: manipulación DOM de `navbar.js`, `accordion.js`, `contact-form.js` y `floating-actions.js`. En Ionic Angular debería convertirse en componentes, servicios TypeScript y formularios reactivos.

Archivos candidatos para `src/theme`: `css/variables.css`, parte de `typography.css`, tokens de `layout.css` y utilidades globales.

Lógica candidata a servicios TypeScript: `analytics.js` como `analytics.service.ts`, envío del formulario como `contact.service.ts`, configuración editable como modelos o environment/config.

## Checklist antes de publicar

- Reemplazar todos los marcadores entre corchetes.
- Cambiar imágenes provisionales por activos reales optimizados.
- Actualizar `title`, `meta description`, canonical, Open Graph y Twitter Card.
- Revisar JSON-LD con datos reales.
- Configurar WhatsApp en `js/config.js`.
- Conectar el formulario a una API real si se necesita recepción de datos.
- Añadir enlaces reales a privacidad, términos y redes sociales.
- Verificar contraste con la paleta final.
- Probar desde 320 px de ancho.
- Revisar navegación por teclado, foco visible y mensajes de error.
- Validar que no exista desplazamiento horizontal.
- Confirmar que no haya errores de consola.
- Medir rendimiento con Lighthouse o herramienta equivalente.
