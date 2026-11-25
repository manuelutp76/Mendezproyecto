<script setup>
import { ref } from 'vue'
import { obtenerToken } from '../services/api.js'
const correo = ref('')
const licencia = ref('')
const mensaje = ref('')
async function iniciarSesion() {
try {
const respuesta = await obtenerToken(correo.value, licencia.value)
console.log(respuesta)
localStorage.setItem('token', respuesta.token)
mensaje.value = 'Sesión iniciada. Token guardado.'
} catch (error) {
mensaje.value = 'Error: ' + error.message
}
}
function cerrarSesion() {
localStorage.removeItem('token')
mensaje.value = 'Sesión cerrada.'
}
</script>
<template>
<h1>Acceso a la API</h1>
<form @submit.prevent="iniciarSesion">
<label>Correo</label>
<input v-model="correo" type="email" required />
<label>Licencia</label>
<input v-model="licencia" type="password" required />
<button type="submit">Obtener token</button>
</form>
<button @click="cerrarSesion">Cerrar sesión</button>
<p>{{ mensaje }}</p>
</template>