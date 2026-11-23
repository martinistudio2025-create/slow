# SLOW Concreto Circular | Landing para arquitectos y diseñadores

Landing page estática (HTML, CSS y JavaScript, sin dependencias) para captar clientes del segmento de arquitectos, interioristas y estudios de diseño, y llevarlos a pedir muestras o una cotización por WhatsApp.

## Estructura

```
.
├── index.html
├── css/styles.css
├── js/main.js
├── assets/img/        (fotos y logo)
├── .nojekyll
└── README.md
```

## Probarla en local

Abre `index.html` en el navegador, o levanta un servidor simple:

```bash
python3 -m http.server 8000
# luego entra a http://localhost:8000
```

## Publicarla gratis con GitHub Pages

1. Crea un repositorio en GitHub (por ejemplo `slow-landing`).
2. Sube todos los archivos de esta carpeta a la rama `main`:
   ```bash
   git init
   git add .
   git commit -m "Landing SLOW Concreto Circular"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/slow-landing.git
   git push -u origin main
   ```
3. En el repositorio ve a **Settings > Pages**.
4. En **Build and deployment**, elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`.
5. Guarda. En un par de minutos la página queda en `https://TU-USUARIO.github.io/slow-landing/`.

## Qué editar

| Qué | Dónde |
|---|---|
| Número de WhatsApp del formulario | `js/main.js`, variable `CONFIG.whatsapp` |
| Número de WhatsApp en botones y enlaces | `index.html`, busca `573054215050` |
| Correo e Instagram | `index.html`, sección `#contacto` y pie de página |
| Testimonio | `index.html`, busca `TESTIMONIO` (sección de prueba social) |
| Colores | `css/styles.css`, variables en `:root` |
| Fotos y logo | `assets/img/` (mantén los mismos nombres o actualiza las rutas) |

## Pendientes antes de publicar

- Reemplazar el testimonio de ejemplo por uno real.
- Validar con datos técnicos las afirmaciones sobre LEED y el menor peso frente al concreto regular.
- Si lo vas a mover a un dominio propio, agrega las etiquetas de Open Graph con imagen y la URL final.

## Cómo funciona el formulario

No hay backend. Al escribir el nombre, el botón se activa y arma un enlace `wa.me` con los datos del formulario (estudio, tipo de proyecto, necesidad y detalles). La persona lo envía desde su propio WhatsApp.
