import { useEffect, useState } from "react"

function App() {
  // Para consumir una api en REACT
  // Debemos de usar useState y useEffect

  // PASO 01: Crear un estado para guardar la data
  const [data, setData] = useState([])

  // PASO 02: Crear un useEffect para consumir la api
  // useEffect(() => {}, [])

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch("http://127.0.0.1:5000/api/v1/usuarios")
      const dataBackend = await response.json();
      console.log(dataBackend)
      setData(dataBackend)
    }
    getUsers()    
  }, [])

  // PASO 03: Mostrar la data en el componente
  //   <ul>
  //   {
  //     data.map((user)=> (
  //       <li key={user.id}> {user.nombre}  {user.edad}</li>
  //     ))
  //   }
  // </ul>
  return (
    <>
      <h1>Lista de usuarios</h1>
      <ul>
        {
          data.map((user)=> (
            <li key={user.id}> {user.nombre}  {user.edad}</li>
          ))
        }
      </ul>
    </>
  )
}

export default App
