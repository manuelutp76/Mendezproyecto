<script setup>
import { ref } from 'vue'
import { obtenerToken } from '../services/api.js'
// Evento que este componente le envía a App.vue
const emit = defineEmits(['sesion-iniciada'])
const correo = ref('')
const licencia = ref('')
const mensaje = ref('')
async function iniciarSesion() {
try {
const respuesta = await obtenerToken(correo.value, licencia.value)
localStorage.setItem('token', respuesta.token)
mensaje.value = 'Sesión iniciada. Token guardado.'
emit('sesion-iniciada', respuesta.token)
} catch (error) {
mensaje.value = 'Error: ' + error.message
}
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
<p>{{ mensaje }}</p>
</template>