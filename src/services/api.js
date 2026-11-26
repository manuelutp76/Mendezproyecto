// Dirección base de la API de prácticas
const API_URL = 'https://rubrika.mx/api/v1'
// Envía correo y licencia, y regresa la respuesta de la API
export async function obtenerToken(correo, licencia) {
const respuesta = await fetch(`${API_URL}/auth/token`, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Accept': 'application/json'
},
body: JSON.stringify({
email: correo, // revisa el nombre en la documentación
license_key: licencia // revisa el nombre en la documentación
})
})
const datos = await respuesta.json()

// Si la API responde con error (401, 422, etc.), avisamos
if (!respuesta.ok) {
throw new Error(datos.message || 'No se pudo obtener el token')
}
return datos
}

// Consulta los datos del alumno dueño del token
export async function obtenerPerfil() {
// 1. Leer el token que guardamos en el Entregable 2
const token = localStorage.getItem('token')
if (!token) {
throw new Error('No hay token guardado. Inicia sesión primero.')
}
// 2. Pedir el perfil enviando el token en el header Authorization
const respuesta = await fetch(`${API_URL}/me`, {
method: 'GET',
headers: {
'Authorization': `Bearer ${token}`,
'Content-Type': 'application/json',
'Accept': 'application/json'
}
})
const datos = await respuesta.json()
// 3. Si el token no sirve o expiró, lo borramos
if (respuesta.status === 401) {
localStorage.removeItem('token')
throw new Error('Tu token no es válido o ya expiró. Vuelve a iniciar sesión.')

}
// 4. Cualquier otro error
if (!respuesta.ok) {
throw new Error(datos.error || 'No se pudo consultar el perfil')
}
return datos
}
