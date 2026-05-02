# Canopy Ruler - Guía para Desarrolladores

## Iconos SVG - Phosphor Icons

### Fuente
Los iconos SVG utilizados en esta extensión provienen de **Phosphor Icons**:
- **Website**: https://phosphoricons.com
- **Repositorio GitHub**: https://github.com/phosphor-icons/core
- **Licencia**: MIT License

### Cómo Descargar Iconos

#### Método 1: Descarga Directa desde GitHub (Recomendado)
Los iconos están disponibles directamente en el repositorio de GitHub:

```
https://raw.githubusercontent.com/phosphor-icons/core/main/assets/{peso}/{nombre-icono}.svg
```

**Pesos disponibles:**
- `thin` - Iconos delgados
- `light` - Iconos ligeros  
- `regular` - Iconos regulares (recomendado)
- `bold` - Iconos gruesos
- `fill` - Iconos rellenos
- `duotone` - Iconos duotono

**Ejemplo de descarga:**
```bash
# Descargar icono de regla (ruler) en peso regular
curl -L "https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/ruler.svg" -o ruler.svg

# Descargar icono de ojo (eye) en peso bold
curl -L "https://raw.githubusercontent.com/phosphor-icons/core/main/assets/bold/eye.svg" -o eye-bold.svg
```

#### Método 2: Desde la Página Web
1. Visitar https://phosphoricons.com
2. Buscar el icono deseado en la barra de búsqueda
3. Seleccionar el peso (weight) deseado
4. Hacer click en el icono para copiar el SVG o descargar

#### Método 3: Instalación vía npm
```bash
npm install @phosphor-icons/core
```

Los iconos estarán disponibles en:
```
node_modules/@phosphor-icons/core/assets/{peso}/{nombre-icono}.svg
```

### Iconos Utilizados en Canopy Ruler

| Icono | Nombre Archivo | Uso | Ubicación |
|-------|---------------|-----|-----------|
| sidebar | sidebar.svg | Botón Panel Lateral | Dock |
| cursor-click | cursor-click.svg | Botón Inspeccionar | Dock + Panel |
| magnifying-glass | magnifying-glass.svg | Botón Buscar Elemento | Dock |
| ruler | ruler.svg | Logo + Botón Regla | Header + Dock |
| arrows-out-line-horizontal | arrows-distance.svg | Botón Distancia | Dock |
| eyedropper | eyedropper.svg | Botón Selector de Color | Dock |
| ruler | ruler.svg | Botón Reglas de Página | Dock |
| pencil-ruler | pencil-ruler.svg | Botón Cinta Métrica (Add Ruler) | Dock |
| eye | eye.svg | Botón X-Ray | Dock + Panel |
| grid-four | grid-four.svg | Botón Grid | Dock |
| devices | devices.svg | Botón CSS Breakpoints | Dock |
| monitor | monitor.svg | Botón Responsive Design | Dock |
| camera | camera.svg | Botón Screenshot | Dock |
| x | x.svg | Botón Cerrar Extensión | Dock |
| copy | copy.svg | Botón Copiar | Panel |

### Estructura de Iconos

```
canopy-ruler/
├── images/
│   └── icons/           # Iconos SVG descargados
│       ├── sidebar.svg
│       ├── cursor-click.svg
│       ├── magnifying-glass.svg
│       ├── ruler.svg
│       ├── arrows-distance.svg
│       ├── eyedropper.svg
│       ├── eye.svg
│       ├── grid-four.svg
│       ├── devices.svg
│       ├── monitor.svg
│       ├── camera.svg
│       ├── x.svg
│       └── copy.svg
```

### Formato SVG

Los iconos Phosphor tienen las siguientes características:
- **ViewBox**: `0 0 256 256`
- **Fill**: `currentColor` (hereda el color del texto)
- **Tamaño recomendado**: 20px para dock, 16px para panel

Ejemplo de uso inline:
```html
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor">
  <path d="..."/>
</svg>
```

### Búsqueda de Nuevos Iconos

Para encontrar nuevos iconos:

1. **Buscar por categoría** en https://phosphoricons.com
2. **Usar términos en inglés** (la librería está en inglés)
3. **Términos comunes para herramientas de desarrollo:**
   - Panel: `sidebar`, `panel`, `columns`
   - Inspector: `cursor-click`, `cursor`, `inspector`
   - Medición: `ruler`, `measure`, `arrows-out`
   - Color: `eyedropper`, `palette`, `paint-brush`
   - Captura: `camera`, `screenshot`, `image`
   - Vista: `eye`, `eye-slash`, `scan`
   - Grid: `grid-four`, `layout`, `columns`
   - Limpiar: `x`, `trash`, `eraser`
   - Copiar: `copy`, `clipboard`
   - Descargar: `download`, `export`
   - Configuración: `gear`, `sliders`
   - Información: `info`, `question`

### Comandos Útiles

```bash
# Crear directorio de iconos
mkdir -p images/icons

# Descargar múltiples iconos
cd images/icons

# Panel y navegación
curl -L "https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/sidebar.svg" -o sidebar.svg
curl -L "https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/cursor.svg" -o cursor.svg

# Herramientas de inspección
curl -L "https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/cursor-click.svg" -o cursor-click.svg
curl -L "https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/eye.svg" -o eye.svg

# Herramientas de medición
curl -L "https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/ruler.svg" -o ruler.svg
curl -L "https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/arrows-out-line-horizontal.svg" -o arrows-distance.svg

# Color
curl -L "https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/eyedropper.svg" -o eyedropper.svg

# Reglas de página
curl -L "https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/ruler.svg" -o ruler.svg

# Cinta métrica / Add Ruler
curl -L "https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/pencil-ruler.svg" -o pencil-ruler.svg

# Herramientas de layout
curl -L "https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/grid-four.svg" -o grid-four.svg
curl -L "https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/devices.svg" -o devices.svg
curl -L "https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/layout.svg" -o layout.svg

# Captura y acciones
curl -L "https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/camera.svg" -o camera.svg
curl -L "https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/x.svg" -o x.svg
curl -L "https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/copy.svg" -o copy.svg
curl -L "https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/trash.svg" -o trash.svg
curl -L "https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/download.svg" -o download.svg

# Navegación
curl -L "https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/arrow-up.svg" -o arrow-up.svg
curl -L "https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/arrow-down.svg" -o arrow-down.svg

# Información
curl -L "https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/info.svg" -o info.svg
curl -L "https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/question.svg" -o question.svg
```

### Notas Importantes

1. **Siempre usar `fill="currentColor"`** para que los iconos hereden el color del tema
2. **Mantener viewBox="0 0 256 256"** para consistencia
3. **Usar width/height explícitos** para controlar el tamaño
4. **Los iconos se descargan una sola vez** y se almacenan localmente
5. **No modificar los paths SVG** para mantener la integridad del diseño

### Atribución

Cuando se agreguen nuevos iconos, mantener la atribución:
```
Icons by Phosphor Icons (https://phosphoricons.com)
Licensed under MIT License
```

## Estructura del Proyecto

```
canopy-ruler/
├── manifest.json              # Configuración de la extensión Chrome
├── background.js              # Service Worker
├── scripts/
│   └── content.js             # Content Script (dock, reglas, distancia)
├── sidepanel/
│   ├── index.html             # Panel lateral
│   ├── panel.js               # Controlador del panel
│   └── styles.css             # Estilos del panel
├── images/
│   ├── icon16.png             # Iconos de la extensión
│   ├── icon32.png
│   ├── icon48.png
│   ├── icon64.png
│   └── icon128.png
│   └── icons/                 # Iconos SVG de Phosphor
├── _locales/
│   ├── en/messages.json       # Traducciones inglés
│   └── es/messages.json       # Traducciones español
└── AGENTS.md                  # Este archivo
```

## Desarrollo

### Tecnologías
- **Manifest V3**: Última versión de extensiones Chrome
- **JavaScript vanilla**: Sin frameworks para máxima compatibilidad
- **CSS Custom Properties**: Para temas dinámicos
- **SVG**: Iconos escalables de Phosphor

### Temas
La extensión usa una paleta de colores verde bosque (Forest Green):
- `--forest-black: #134611` - Fondos oscuros
- `--forest-green: #3e8914` - Acentos primarios
- `--jungle: #3da35d` - Estados hover
- `--light-green: #96e072` - Texto acentuado
- `--frosted-mint: #e8fccf` - Fondos claros

### Funcionalidades Principales
1. **Dock flotante**: Barra de herramientas en la parte inferior (NO abre panel automáticamente)
2. **Panel lateral**: Información detallada del elemento (se abre solo con botón del dock)
3. **Inspección de elementos**: Hover y click para seleccionar
4. **Reglas**: Medición libre con click y arrastre
5. **Distancia**: Medición entre dos elementos
6. **Selector de color (Eyedropper)**: Click para copiar color al portapapeles
7. **Screenshot**: Captura pantalla y descarga automáticamente como PNG
8. **X-Ray**: Visualización de todos los elementos
9. **Grid Overlay**: Cuadrícula de alineación
10. **Reglas de Página**: Reglas horizontales y verticales con escala en píxeles en los bordes
11. **Copiar CSS/Selector**: Al portapapeles desde el panel

## Licencia

Este proyecto es de código abierto. Los iconos son propiedad de Phosphor Icons bajo licencia MIT.
