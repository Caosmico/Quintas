# Círculo de Quintas Interactivo

Una aplicación web interactiva para explorar el círculo de quintas, las relaciones armónicas entre escalas y el ciclo de terceras mayores (Modo Coltrane).

## 🎵 Características

### Visualización Dual
- **Círculo exterior**: Tonalidades mayores
- **Círculo interior**: Tonalidades menores relativas
- **Conexiones visuales**: Líneas punteadas conectan relativas mayor-menor

### Interacción Dinámica
- **Hover**: Pasa el cursor sobre una nota para ver temporalmente su escala
- **Click para fijar**: Haz click en una nota para mantener visible su escala (borde naranja)
- **Click para desfijar**: Vuelve a hacer click en la nota fijada para volver al modo dinámico

### Código de Colores por Grados
- 🔵 **Azul**: Tónica (I/i)
- 🔴 **Rojo**: Dominante (V/v)
- 🟢 **Verde**: Subdominante (IV/iv)
- 🟠 **Naranja**: Supertónica (ii/ii°)
- 🔵 **Azul claro**: Superdominante (vi/VI)
- 🟠 **Naranja oscuro**: Mediante (iii/III)
- ⚪ **Gris**: Sensible (vii°/VII)
- 🟣 **Púrpura**: Relativa mayor/menor

### 🎼 Modo Coltrane (NUEVO)
- Visualiza el **ciclo de terceras mayores** que forma un triángulo equilátero en el círculo
- Inspirado en la técnica de improvisación de John Coltrane ("Giant Steps")
- Las notas del ciclo se marcan con **borde azul**
- Ejemplo: C → E → A♭ → C

### Información Educativa
- **Grados de la escala** con sus cualidades (mayor, menor, disminuido)
- **Progresiones armónicas** más comunes en mayor y menor
- **Explicación del Modo Coltrane** y su aplicación en jazz

## 🚀 Instalación y Uso

### Opción 1: Uso Directo (sin instalación) - RECOMENDADO

Simplemente abre el archivo `index.html` en tu navegador. No requiere instalación ni servidor.

### Opción 2: Con Servidor de Desarrollo (React)

```bash
# Clona el repositorio
git clone https://github.com/TU_USUARIO/circle-of-fifths.git
cd circle-of-fifths

# Instala las dependencias
npm install

# Inicia el servidor de desarrollo
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 📋 Requisitos

- Navegador moderno con soporte para ES6+ (Chrome, Firefox, Safari, Edge)
- No requiere instalación de dependencias para la versión HTML standalone

## 🎮 Cómo Usar

### Exploración Básica
1. Mueve el cursor sobre cualquier nota para ver sus relaciones armónicas
2. Las notas de la escala se iluminarán con colores según su función

### Fijar una Escala
1. Haz **click** en una nota para fijarla (aparece borde naranja)
2. La escala permanecerá visible aunque muevas el cursor
3. Haz click en otra nota para cambiar la escala fijada
4. Haz click nuevamente en la nota fijada para desfijar

### Modo Coltrane
1. Haz click en el botón **"Activar Modo Coltrane"**
2. Selecciona una nota (hover o click)
3. Verás las dos notas de su ciclo de terceras mayores con **borde azul**
4. Ejemplo: Selecciona C y verás E y A♭ marcadas

## 🎓 Conceptos Musicales

### Escala Mayor
Los acordes de una escala mayor siguen este patrón:
- **I, IV, V**: Acordes mayores (mayúsculas)
- **ii, iii, vi**: Acordes menores (minúsculas)
- **vii°**: Acorde disminuido

**Ejemplo - C Mayor**: C (I), Dm (ii), Em (iii), F (IV), G (V), Am (vi), B° (vii°)

### Escala Menor Natural
Los acordes de una escala menor natural siguen este patrón:
- **i, iv, v**: Acordes menores (minúsculas)
- **III, VI, VII**: Acordes mayores (mayúsculas)
- **ii°**: Acorde disminuido

**Ejemplo - A menor**: Am (i), B° (ii°), C (III), Dm (iv), Em (v), F (VI), G (VII)

### Progresiones Armónicas Comunes

#### En Mayor:
- **I - IV - V - I** (Clásica básica)
- **I - V - vi - IV** (Pop moderna: C - G - Am - F)
- **ii - V - I** (Cadencia jazz/blues)
- **I - vi - IV - V** (Doo-wop, años 50s)

#### En Menor:
- **i - iv - v - i** (Básica)
- **i - VI - III - VII** (Natural)
- **i - iv - VII - III** (Andaluza/Flamenco)

### Ciclo de Terceras Mayores (Coltrane)
El ciclo de terceras mayores divide la octava en tres partes iguales:
- Cada paso es una tercera mayor (4 semitonos)
- Forma un **triángulo equilátero** en el círculo de quintas
- Usado por Coltrane en "Giant Steps" para crear tensión armónica
- **Ejemplo**: C → E → G♯/A♭ → C

Existen solo **4 ciclos** posibles:
1. C - E - A♭
2. D♭ - F - A
3. D - F♯ - B♭
4. E♭ - G - B

## 🛠️ Tecnologías

- React 18
- Tailwind CSS (vía CDN)
- SVG para visualización del círculo

## 📝 Estructura del Proyecto

```
circle-of-fifths/
├── README.md
├── LICENSE
├── package.json
├── .gitignore
├── index.html          # Versión standalone (usar esta)
├── public/
│   └── index.html      # HTML base para React
└── src/
    ├── App.jsx         # Componente principal
    └── index.js        # Punto de entrada React
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## ✨ Créditos

Desarrollado como herramienta educativa para el estudio de teoría musical, armonía y técnicas avanzadas de improvisación.

### Referencias
- Teoría del círculo de quintas
- "Giant Steps" - John Coltrane
- Técnicas de sustitución armónica en jazz

## 🎯 Roadmap

- [x] Círculo de quintas básico
- [x] Visualización de escalas
- [x] Modo Coltrane (ciclo de terceras mayores)
- [ ] Reproducción de audio de acordes
- [ ] Exportar escalas como MIDI
- [ ] Modo de práctica con ejercicios
- [ ] Soporte para escalas modales
- [ ] Visualización de otros ciclos (cuartas, segundas)

## 📧 Contacto

Si tienes preguntas o sugerencias, por favor abre un issue en GitHub.

## 🙏 Agradecimientos

Gracias a la comunidad de músicos y teóricos que han contribuido al desarrollo de estas herramientas educativas.

---

⭐ Si te resulta útil esta herramienta, considera darle una estrella en GitHub!
