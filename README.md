# 🎮 Wordle Elementos

**Wordle Elementos** es una recreación interactiva del clásico juego *Wordle*, desarrollada con **React**, **Bootstrap** y **Framer Motion**.  
Incluye tres versiones del juego:  
- Wordle de **5 letras**  
- Wordle de **6 letras**  
- Wordle de **7 letras**

Además, cuenta con un sistema de **registro de partidas** guardado en `localStorage`, animaciones fluidas y un diseño adaptable y elegante.

---

## 🚀 Tecnologías utilizadas

- ⚛️ **React** – Librería principal para la interfaz.  
- 💄 **Bootstrap 5** – Para estilos y componentes visuales.  
- 🎬 **Framer Motion** – Animaciones de las casillas.  
- 💾 **localStorage** – Registro local de partidas.  
- 🧩 **Create React App** – Entorno base del proyecto.

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
│   │   ├── Header.jsx        # Barra de navegación superior
│   │   ├── GameBoard.jsx     # Lógica y render del tablero
│   │   └── Registro.jsx      # Historial de partidas
│   │
│   ├── App.jsx               # Enrutador principal y navegación
│   ├── index.js              # Punto de entrada React
│   ├── index.css             # Estilos generales
│
├── package.json
├── README.md
└── ...otros archivos de configuración
```

---

## ⚙️ Instalación y ejecución

Sigue estos pasos para ejecutar el proyecto en tu máquina local 👇

### 1️⃣ Clona el repositorio
```bash
git clone https://github.com/Viktor1712/WordleElementos.git
```

### 2️⃣ Ingresa al directorio del proyecto
```bash
cd WordleElementos
```

### 3️⃣ Instala las dependencias
```bash
npm install
```

> Si ves algún error con `react-bootstrap`, asegúrate de instalarlo con:
> ```bash
> npm install react-bootstrap@2 bootstrap@5 framer-motion
> ```

### 4️⃣ Inicia el servidor de desarrollo
```bash
npm start
```

El juego se abrirá automáticamente en tu navegador en:  
👉 [http://localhost:3000](http://localhost:3000)

---

## 🕹️ Cómo jugar

1. Elige el modo de juego desde la barra superior: **Wordle 5**, **Wordle 6** o **Wordle 7**.  
2. Escribe una palabra del tamaño correspondiente y presiona **Enter** o el botón **Enviar**.  
3. Los colores indican:
   - 🟩 **Verde** → letra correcta en posición correcta.  
   - 🟨 **Amarillo** → letra correcta en posición incorrecta.  
   - ⬜ **Gris** → letra no presente.  
4. Tienes **5 intentos** para adivinar la palabra.  
5. Cuando termines una partida (ganes o pierdas), puedes comenzar un **Nuevo Juego**.  
   - Si intentas reiniciar antes de terminar, el sistema te pedirá que finalices la partida actual.

---

## 🧾 Registro de partidas

El juego guarda automáticamente tus resultados (ganado/perdido, longitud, fecha e intentos) en el **historial local** del navegador (`localStorage`).

Puedes ver tu historial desde la sección **Registro** en la barra superior.

---

## 🎨 Estilo y diseño

- Colores y distribución inspirados en el *Wordle* original.  
- Animaciones suaves en los cuadros de letras (efecto “flip”).  
- Diseño adaptativo (responsive) mediante **Bootstrap 5**.

---

## 🧠 Mejoras futuras

- Ranking global o integración con base de datos.  
- Modo oscuro / claro.  
- Palabras temáticas (animales, países, etc.).  
- Versión en inglés.

---

## 👨‍💻 Autor

Desarrollado por **Víctor Mejías**  
📦 Repositorio: [https://github.com/Viktor1712/WordleElementos](https://github.com/Viktor1712/WordleElementos)

---


