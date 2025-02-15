
# **🛠️ Guía de Laboratorio: API Flask + Frontend Separado con async/await**

💡 En este laboratorio aprenderás a crear una API con **Flask** que almacena datos en memoria y un **frontend separado** que consume la API usando `async/await`.  

✅ **Sin base de datos (solo listas en memoria).**  
✅ **Frontend separado en HTML, CSS y JavaScript.**  
✅ **Uso de `fetch()` con `async/await` para consumir la API.**  
✅ **Se pierde la información al apagar el servidor (por ahora).**  

---

## **🔹 1. Configurar el entorno virtual**
**Creamos un entorno virtual para evitar conflictos con otras instalaciones de Python.**  

```bash
python -m venv venv
```
Si no funciona:  
```bash
python -m venv venv --without-pip
```

---

## **🔹 2. Activar el entorno virtual**
Dependiendo del sistema operativo:  

📌 **Windows (CMD o PowerShell):**  
```bash
venv\Scripts\activate
```
📌 **Git Bash, macOS o Linux:**  
```bash
source venv/bin/activate
```

---

## **🔹 3. Instalar Flask**
Ejecutamos:  
```bash
pip install flask
```
Para verificar la instalación:  
```bash
pip list
```

---

## **🔹 4. Crear `app.py` (Servidor Flask)**
📄 **Crear `app.py`** y pegar el siguiente código:

```python
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permite que el frontend acceda a la API

# Base de datos en memoria (se pierde cuando se apaga el servidor)
usuarios = [
    {"id": 1, "nombre": "Juan Pérez", "edad": 25, "ciudad": "Ciudad de México"},
    {"id": 2, "nombre": "Ana Gómez", "edad": 30, "ciudad": "Buenos Aires"},
    {"id": 3, "nombre": "Carlos López", "edad": 22, "ciudad": "Madrid"}
]

# Ruta para obtener todos los usuarios
@app.route("/api/usuarios", methods=["GET"])
def obtener_usuarios():
    return jsonify(usuarios)

# Ruta para agregar un nuevo usuario
@app.route("/api/usuarios", methods=["POST"])
def agregar_usuario():
    datos = request.get_json()
    if not datos or "nombre" not in datos or "edad" not in datos or "ciudad" not in datos:
        return jsonify({"error": "Datos inválidos"}), 400

    nuevo_usuario = {
        "id": len(usuarios) + 1,  # Generar un ID automático
        "nombre": datos["nombre"],
        "edad": datos["edad"],
        "ciudad": datos["ciudad"]
    }
    usuarios.append(nuevo_usuario)
    return jsonify(nuevo_usuario), 201

if __name__ == "__main__":
    app.run(debug=True)
```

📌 **Explicación:**  
- Se usa una lista `usuarios` como base de datos en memoria.  
- `GET /api/usuarios`: Devuelve todos los usuarios.  
- `POST /api/usuarios`: Agrega un usuario nuevo desde una petición JSON.  
- `CORS(app)`: Permite que el **frontend separado** acceda a la API sin problemas de CORS.  

---

## **🔹 5. Ejecutar el servidor Flask**
Ejecutamos el servidor con:  
```bash
python app.py
```
o  
```bash
flask run
```

Si todo está bien, deberías ver en la terminal:  
```
 * Running on http://127.0.0.1:5000/
```

---

## **🔹 6. Crear el Frontend (HTML, CSS, JS)**
Vamos a separar el frontend en su propia carpeta.

📄 **Estructura del frontend:**  
```
/frontend
  ├── index.html
  ├── style.css
  ├── script.js
```

---

### **📄 7. Crear `index.html` (Interfaz Web)**
📄 **Crear `frontend/index.html`** con este código:  

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Usuarios Registrados</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Lista de Usuarios</h1>
    <ul id="lista-usuarios"></ul>

    <h2>Agregar Usuario</h2>
    <input type="text" id="nombre" placeholder="Nombre">
    <input type="number" id="edad" placeholder="Edad">
    <input type="text" id="ciudad" placeholder="Ciudad">
    <button onclick="agregarUsuario()">Agregar</button>

    <script src="script.js"></script>
</body>
</html>
```

---

### **📜 8. Crear `script.js` (Conectar API con Frontend usando async/await)**
📄 **Crear `frontend/script.js`** con este código optimizado:

```js
const API_URL = "http://127.0.0.1:5000/api/usuarios";

// Función para obtener y mostrar usuarios
async function cargarUsuarios() {
    try {
        let response = await fetch(API_URL);
        let data = await response.json();

        let lista = document.getElementById("lista-usuarios");
        lista.innerHTML = ""; // Limpiar la lista

        data.forEach(usuario => {
            let item = document.createElement("li");
            item.textContent = `${usuario.nombre}, ${usuario.edad} años - ${usuario.ciudad}`;
            lista.appendChild(item);
        });
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

// Función para agregar un usuario
async function agregarUsuario() {
    let nombre = document.getElementById("nombre").value;
    let edad = document.getElementById("edad").value;
    let ciudad = document.getElementById("ciudad").value;

    if (!nombre || !edad || !ciudad) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    try {
        let response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, edad, ciudad })
        });

        if (!response.ok) {
            throw new Error("Error al agregar usuario");
        }

        let data = await response.json();
        alert(`Usuario ${data.nombre} agregado correctamente!`);
        cargarUsuarios(); // Volver a cargar la lista
    } catch (error) {
        console.error("Error al agregar usuario:", error);
    }
}

// Cargar usuarios al inicio
document.addEventListener("DOMContentLoaded", cargarUsuarios);
```

---

### **🎨 9. Crear `style.css` (Diseño opcional)**
📄 **Crear `frontend/style.css`**:

```css
body {
    font-family: Arial, sans-serif;
    text-align: center;
}
ul {
    list-style-type: none;
}
input, button {
    margin: 5px;
    padding: 10px;
}
```

---

## **🚀 10. Probar el Proyecto**
1️⃣ **Ejecutar el backend:**  
```bash
python app.py
```
2️⃣ **Abrir `index.html` en el navegador.**  
3️⃣ **Verificar que aparecen los usuarios.**  
4️⃣ **Agregar un usuario y ver si se actualiza la lista.**  

---

## **🎯 Conclusión**
✅ **API en Flask con datos en memoria.**  
✅ **Frontend separado (HTML, CSS, JS).**  
✅ **Uso de `async/await` en las peticiones.**  
✅ **Solucionado el problema de CORS con `Flask-CORS`.**  

🚀 **¿Quieres mejorar el proyecto? Agrega funciones para editar y eliminar usuarios.**  

🔗 **¿Dudas? Pregunta y seguimos mejorando.** 😃