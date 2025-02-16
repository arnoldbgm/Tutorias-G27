const API_URL = 'http://127.0.0.1:5000/api/v1/usuarios';

// Para traer todos los usuarios usando fetch
// Creamos una función asíncrona con fetch para conectar
// Backend y Frontend

async function getUsuarios() {
   const response = await fetch(API_URL);
   const data = await response.json()
   
   console.log(data)

   // Voy a capturar el ul 
   let lista = document.getElementById("lista-usuarios");
   // Voy a limpiar mi lista
   lista.innerHTML = "";
   // Recorro el arreglo de usuarios
   data.forEach( usuario => {
      let item  = document.createElement("li");
      item.textContent = `${usuario.id} - ${usuario.nombre}  ${usuario.ciudad}`
      lista.appendChild(item)
   });
}

// Cuando se cargue la página, se ejecuta la función getUsuarios
getUsuarios();
