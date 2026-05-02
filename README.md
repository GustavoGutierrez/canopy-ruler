# Canopy Ruler

> **La regla de medición que se extiende como un dosel sobre tu página web.**

## ¿Qué significa Canopy Ruler?

**Canopy** (dosel/bóveda vegetal) es la capa superior de árboles que cubre y protege el bosque. En esta extensión, representa la **capa de inspección** que se coloca sobre la página web para analizar, medir y visualizar cada elemento.

**Ruler** (regla) es la herramienta fundamental de cualquier desarrollador para medir distancias, tamaños y espacios.

Juntas, estas palabras forman **Canopy Ruler**: una herramienta de inspección y medición que se extiende como una bóveda sobre tu página, permitiéndote ver cada detalle del bosque digital. El nombre también rinde homenaje a la paleta de colores verde bosque que caracteriza la extensión.

---

## Descripción

Canopy Ruler es una extensión de Chrome para desarrolladores web que proporciona herramientas avanzadas de inspección, medición y análisis de páginas web directamente desde el navegador.

### Características principales

#### Inspección de Elementos
- Inspección visual con hover y selección de elementos
- Panel lateral con información detallada del elemento
- Modelo de caja visual (margin, border, padding, content)
- Navegación padre/hijo con botones o atajos de teclado
- Líneas de distancia entre elementos seleccionados y hover
- Líneas punteadas guía en elementos seleccionados
- Previsualización y descarga de imágenes contenidas en elementos

#### Herramientas de Medición
- **Rulers**: Reglas arrastrables para medir distancias libres
- **Page Rulers**: Reglas horizontales y verticales con escala en píxeles
- **Distance**: Medición de distancia entre dos elementos
- **Grid Overlay**: Cuadrícula de alineación

#### Información de Página
- **Meta Tags & SEO**: Visualización de todas las etiquetas meta relevantes
- **Tecnologías Detectadas**: Identificación automática de frameworks, librerías y servicios (React, Vue, jQuery, Google Analytics, WordPress, etc.)
- **Etiquetas del Head**: Links canónicos, preconnect, favicons, etc.
- **Información General**: Título, descripción y URL copiables

#### Herramientas Visuales
- **X-Ray Mode**: Visualización de contornos de todos los elementos
- **Breakpoints**: Detección y visualización de breakpoints CSS
- **Responsive Design**: Simulador de dispositivos con múltiples presets
- **Viewport Info**: Información detallada del viewport, DPR, y breakpoint actual
- **Color Picker**: Selector de color con copia al portapapeles
- **Screenshot**: Captura de pantalla de la página

#### Panel Lateral con Tabs
- **Tab Elemento**: Información completa del elemento seleccionado
  - Dimensiones y posición
  - Modelo de caja visual interactivo
  - Layout (display, position)
  - Colores (background, text)
  - Tipografía (font-family, size, weight)
  - Selector, ID y Clases
  - Recursos (imágenes y SVGs)
- **Tab Página**: Información general de la página
  - Título, descripción y URL copiables
  - Meta tags SEO
  - Tecnologías detectadas
  - Etiquetas del head

## Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Alt + Shift + S` | Activar/Desactivar inspección |
| `Alt + ↑` | Seleccionar elemento padre |
| `Alt + ↓` | Seleccionar elemento hijo |
| `Esc` | Cerrar herramienta activa |

## Instalación

### Desde Chrome Web Store (próximamente)
1. Visita la Chrome Web Store
2. Busca "Canopy Ruler"
3. Haz clic en "Agregar a Chrome"

### Instalación Manual (Modo Desarrollador)
1. Descarga o clona este repositorio
2. Abre Chrome y navega a `chrome://extensions/`
3. Activa el "Modo desarrollador" en la esquina superior derecha
4. Haz clic en "Cargar descomprimida" y selecciona la carpeta `canopy-ruler/`
5. La extensión aparecerá en tu barra de herramientas

## Uso

1. Haz clic en el icono de Canopy Ruler en la barra de herramientas de Chrome
2. Usa `Alt + Shift + S` o el botón del dock para activar la inspección
3. Pasa el cursor sobre cualquier elemento de la página para ver información
4. Haz clic para seleccionar un elemento y ver detalles en el panel lateral
5. Usa las herramientas del dock para medir, ver grid, o analizar la página

## Estructura del Proyecto

```
canopy-ruler/
├── manifest.json              # Configuración de la extensión Chrome MV3
├── background.js              # Service Worker
├── scripts/
│   └── content.js             # Content Script (dock, reglas, inspección)
├── sidepanel/
│   ├── index.html             # Panel lateral
│   ├── panel.js               # Controlador del panel
│   └── styles.css             # Estilos del panel
├── images/
│   ├── icon16.png             # Iconos de la extensión
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── _locales/
    ├── en/messages.json       # Traducciones inglés
    └── es/messages.json       # Traducciones español
```

## Tecnologías

- **Manifest V3**: Última versión de extensiones Chrome
- **JavaScript vanilla**: Sin frameworks para máxima compatibilidad
- **CSS Custom Properties**: Temas dinámicos y personalización
- **SVG**: Iconos escalables de Phosphor Icons

## Tema de Colores

Canopy Ruler utiliza una paleta de colores **verde bosque** (Forest Green):

| Color | Hex | Uso |
|-------|-----|-----|
| Forest Black | `#134611` | Fondos oscuros |
| Forest Green | `#3e8914` | Acentos primarios |
| Jungle | `#3da35d` | Estados hover |
| Light Green | `#96e072` | Texto acentuado |
| Frosted Mint | `#e8fccf` | Fondos claros |

## Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commitea tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto es de código abierto. Los iconos son propiedad de [Phosphor Icons](https://phosphoricons.com) bajo licencia MIT.

## Créditos

- **Iconos**: [Phosphor Icons](https://phosphoricons.com) - Iconos SVG escalables
- **Fuentes**: [DM Sans](https://fonts.google.com/specimen/DM+Sans) y [DM Mono](https://fonts.google.com/specimen/DM+Mono) de Google Fonts

---

<div align="center">

**Canopy Ruler** — *Mide el bosque, árbol por árbol.*

</div>