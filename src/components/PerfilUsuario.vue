<script setup>
import { ref, onMounted } from 'vue'
import { obtenerPerfil } from '../services/api.js'
// Evento que este componente le envía a App.vue
const emit = defineEmits(['sesion-cerrada'])
const perfil = ref(null)
const cargando = ref(true)
const error = ref('')
async function cargarPerfil() {
cargando.value = true
error.value = ''
try {
perfil.value = await obtenerPerfil()
} catch (e) {
error.value = e.message
} finally {
cargando.value = false
}
}
function cerrarSesion() {
emit('sesion-cerrada')
}
onMounted(cargarPerfil)
</script>
<template>
<h1>Mi perfil</h1>
<p v-if="cargando">Cargando perfil...</p>
<p v-else-if="error">Error: {{ error }}</p>
<div v-else-if="perfil">
<p><strong>Nombre:</strong> {{ perfil.first_name }} {{ perfil.last_name
}}</p>
<p><strong>Correo:</strong> {{ perfil.email }}</p>
<p><strong>Escuela:</strong> {{ perfil.school }}</p>
<p><strong>Items:</strong> {{ perfil.items_count }} de {{
perfil.items_limit }}</p>
</div>
<button @click="cargarPerfil" :disabled="cargando">Actualizar</button>
<button @click="cerrarSesion">Cerrar sesión</button>
</template>
