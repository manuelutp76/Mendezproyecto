const API_URL = 'https://rubrika.mx/api/v1'


export async function obtenerToken(correo, licencia) {
  const respuesta = await fetch(`${API_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      email: correo,
      license_key: licencia
    })
  })

  const datos = await respuesta.json()

  if (!respuesta.ok) {
    throw new Error(datos.error || 'No se pudo obtener el token')
  }

  return datos
}


export async function obtenerPerfil() {
  const token = localStorage.getItem('token')

  if (!token) {
    throw new Error('No hay token guardado. Inicia sesión primero.')
  }

  const respuesta = await fetch(`${API_URL}/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })

  const datos = await respuesta.json()

  if (respuesta.status === 401) {
    localStorage.removeItem('token')
    throw new Error('Tu token no es válido o ya expiró. Vuelve a iniciar sesión.')
  }

  if (!respuesta.ok) {
    throw new Error(datos.error || 'No se pudo consultar el perfil')
  }

  return datos
}


async function peticionConToken(ruta, opciones = {}) {
  const token = localStorage.getItem('token')

  if (!token) {
    throw new Error('No hay token guardado. Inicia sesión primero.')
  }

  const respuesta = await fetch(`${API_URL}${ruta}`, {
    ...opciones,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })

  if (respuesta.status === 401) {
    localStorage.removeItem('token')
    throw new Error('Tu token no es válido o ya expiró. Vuelve a iniciar sesión.')
  }

  if (respuesta.status === 204) {
    return null
  }

  const datos = await respuesta.json()

  if (!respuesta.ok) {
    throw new Error(datos.error || `Error ${respuesta.status}`)
  }

  return datos
}


export async function obtenerItems(busqueda = '', pagina = 1) {
  const parametros = new URLSearchParams({
    page: pagina,
    per_page: 5
  })

  if (busqueda) {
    parametros.append('q', busqueda)
  }

  return peticionConToken(`/items?${parametros}`)
}


export async function obtenerItem(id) {
  return peticionConToken(`/items/${id}`)
}
