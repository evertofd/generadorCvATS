# Generador de CV PDF

Aplicación web para crear currículums vitae de forma visual. El usuario completa un formulario, ve una vista previa en tiempo real y descarga el resultado como PDF con un diseño profesional y compatible con sistemas ATS.

## Características

- Formulario dividido por secciones: datos personales, perfil, experiencia, estudios y habilidades
- Listas dinámicas: agrega y elimina experiencias, estudios y categorías de habilidades
- Vista previa en tiempo real sincronizada con el formulario
- Exportación a PDF (A4) con diseño limpio y legible
- Estructura HTML semántica compatible con parsers ATS
- Links clicables para LinkedIn y GitHub en el PDF

## Tecnologías

- [Vue 3](https://vuejs.org/) — Composition API con `<script setup>`
- [Bootstrap 5](https://getbootstrap.com/) — estilos del formulario e interfaz
- [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/) — generación del PDF desde el HTML del preview

## Estructura del proyecto

```
src/
├── App.vue                        # Layout principal (dos columnas)
├── main.js                        # Entrada, importa Bootstrap
├── composables/
│   └── useCvData.js               # Estado reactivo del CV + métodos CRUD
└── components/
    ├── CvForm.vue                 # Contenedor del formulario
    ├── CvPreview.vue              # Vista previa / fuente del PDF
    └── form/
        ├── PersonalInfoForm.vue   # Nombre, cargo, contacto
        ├── SummaryForm.vue        # Perfil profesional
        ├── ExperienceForm.vue     # Experiencia laboral (dinámica)
        ├── EducationForm.vue      # Estudios (dinámica)
        └── SkillsForm.vue         # Habilidades por categorías
```

## Instalación y uso

**Requisitos:** Node.js >= 14

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run serve

# Build para producción
npm run build
```

> Si el sistema usa Node < 14 por defecto, activar la versión correcta con nvm:
> ```bash
> nvm use 20
> ```

## Uso de la app

1. Completa el formulario en el panel izquierdo
2. La vista previa se actualiza en tiempo real en el panel derecho
3. Haz clic en **Descargar PDF** para guardar el CV

### Sección de Habilidades

Cada categoría (ej: "Backend", "Frontend") se agrega por separado. Dentro de cada categoría, se ingresan los ítems uno a uno presionando Enter o el botón `+`.

### Descripción de experiencia

En el campo descripción de cada experiencia, las líneas que comiencen con `-` se renderizan como bullets en el CV:

```
- Desarrollé la integración con la API de pagos
- Implementé autenticación con Active Directory
Stack: Vue.js, Node.js, PostgreSQL
```

## Compatibilidad ATS

El HTML generado sigue las reglas básicas de compatibilidad con Applicant Tracking Systems:

- Layout de una sola columna
- Headings semánticos (`h1`, `h2`) con nombres de sección estándar
- Listas con `<ul>/<li>` correctamente anidadas
- Sin tablas, sin imágenes, sin columnas múltiples
- Fuente sans-serif (Calibri / Helvetica / Arial)
