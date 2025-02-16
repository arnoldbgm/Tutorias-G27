# Vamos a importar Flask
from flask import Flask, jsonify
from flask_cors import CORS
# Creamos una instancia de Flask

app = Flask(__name__)
CORS(app)

# Base de Datos de USUARIOS
usuarios = [
    {"id": 1, "nombre": "Juan Pérez", "edad": 25, "ciudad": "Ciudad de México"},
    {"id": 2, "nombre": "Ana Gómez", "edad": 30, "ciudad": "Buenos Aires"},
    {"id": 3, "nombre": "Carlos López", "edad": 22, "ciudad": "Madrid"}
]

@app.route('/mundo')
def hello_world():
   return 'Hola, Mundo!'

# Vamos a crear una ruta para mostrar los usuarios
# El Backend se encargará de enviar los datos al Frontend
# El Frontend se encargará de mostrar los datos
# EL backend siempre va a manejar solicitudes y respuestas
# Las respusetas en su mayoria estan en formato JSON

@app.route('/api/v1/usuarios', methods=['GET'])
def obtener_usuarios():
   return jsonify(usuarios)

# Para que se ejecute la aplicación
if __name__ == '__main__':
   app.run(debug = True)