# 🎮 Wordle Elementos

**Wordle Elementos** es una recreación interactiva del clásico juego **Wordle**, desarrollada con **React**, **Bootstrap** y **Framer Motion**.  
Incluye tres versiones del juego y un sistema de estadísticas locales para guardar tu rendimiento.

---

## 🧩 Modos de juego

- 🔠 **Wordle 5** – Palabras de 5 letras.  
- 🧱 **Wordle 6** – Palabras de 6 letras.  
- 🧬 **Wordle 7** – Palabras de 7 letras.

Cada modo tiene sus propias palabras y desafíos.  
El juego guarda tu progreso y estadísticas en el **almacenamiento local** (`localStorage`).

---

## 🚀 Tecnologías utilizadas

| Tecnología | Descripción |
|-------------|--------------|
| ⚛️ **React** | Librería principal para construir la interfaz interactiva. |
| 💄 **Bootstrap 5** | Estilos y componentes responsivos. |
| 🎬 **Framer Motion** | Animaciones fluidas para las casillas y transiciones. |
| 💾 **localStorage** | Persistencia de las estadísticas del jugador. |
| 🧩 **Create React App** | Entorno base para desarrollo con React. |

---

## 📁 Estructura del proyecto

```
WordleElementos/
│
├── public/
│   ├── index.html
│   ├── words5.json
│   ├── words6.json
│   ├── words7.json
│
├── src/
│   ├── components/
│   │   ├── Header.jsx        # Barra de navegación y selección de modo
│   │   ├── GameBoard.jsx     # Lógica principal y renderizado del tablero
│   │   ├── Stats.jsx         # Estadísticas del jugador (porcentaje de victorias, intentos, etc.)
│   │
│   ├── App.jsx               # Rutas y vistas principales
│   ├── index.js              # Punto de entrada React
│   ├── index.css             # Estilos globales
│
├── package.json
├── README.md
└── ...otros archivos de configuración
```

---

## ⚙️ Instalación y ejecución local

Sigue estos pasos para ejecutar el proyecto en tu máquina 👇

### 1️⃣ Clona el repositorio
```bash
git clone https://github.com/Viktor1712/WordleElementos.git
```

### 2️⃣ Entra al directorio
```bash
cd WordleElementos
```

### 3️⃣ Instala dependencias
```bash
npm install
```

> Si aparece algún error, instala manualmente:
> ```bash
> npm install react-bootstrap bootstrap framer-motion
> ```

### 4️⃣ Inicia el servidor de desarrollo
```bash
npm start
```

El juego se abrirá automáticamente en tu navegador:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🕹️ Cómo jugar

1. Selecciona el modo (5, 6 o 7 letras) desde la barra superior.  
2. Escribe tu intento y presiona **Enter** o **Enviar**.  
3. Observa los colores de las casillas:
   - 🟩 **Verde** → letra correcta y posición correcta.  
   - 🟨 **Amarillo** → letra correcta en otra posición.  
   - ⬜ **Gris** → letra no está en la palabra.  
4. Tienes **5 intentos** para adivinar la palabra.  
5. Al terminar, podrás ver tus estadísticas actualizadas.

---

## 📊 Estadísticas del jugador

El juego guarda automáticamente tus estadísticas generales:
- ✅ Partidas jugadas  
- 🏆 Partidas ganadas  
- 📈 Porcentaje de victorias  
- 🔢 Promedio de intentos por partida  
- ⏱️ Racha actual y racha máxima  

Estas se almacenan de forma local en `localStorage`, por lo que no se pierden al cerrar el navegador.

---

## 🎨 Diseño y animaciones

- Inspirado en el diseño original de **Wordle**.  
- Animaciones con **Framer Motion** para efecto “flip” en las letras.  
- Diseño **responsive** y adaptable a diferentes pantallas.  

---

## 💡 Futuras mejoras

- 🌐 Ranking global (con base de datos o API).  
- 🌙 Modo oscuro / claro.  
- 📚 Categorías temáticas (animales, países, etc.).  
- 🏆 Sistema de logros o niveles.

---

## 👨‍💻 Autor

**Desarrollado por:** [Víctor Mejías](https://github.com/Viktor1712)  
📦 **Repositorio:** [WordleElementos](https://github.com/Viktor1712/WordleElementos)

---

> 🧠 Proyecto educativo desarrollado con fines de práctica y aprendizaje de React y animaciones web.
