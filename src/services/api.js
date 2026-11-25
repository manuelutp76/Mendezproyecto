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
