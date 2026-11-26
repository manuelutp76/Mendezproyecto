<script setup>
import { ref, onMounted } from 'vue'
import { obtenerItem } from '../services/api.js'
// Dato que recibe este componente desde App.vue
const props = defineProps({
id: { type: [Number, String], required: true }
})
// Aviso para regresar a la lista
const emit = defineEmits(['volver'])
const item = ref(null)
const cargando = ref(true)
const error = ref('')
function formatearFecha(fecha) {
return new Date(fecha).toLocaleString('es-MX')
}
onMounted(async () => {
try {
const respuesta = await obtenerItem(props.id)
console.log(respuesta)
// Si la API envía el item dentro de "data", lo sacamos de ahí
item.value = respuesta.data || respuesta
} catch (e) {
error.value = e.message
} finally {
cargando.value = false
}
})
</script>
<template>
<h2>Detalle del item</h2>
<p v-if="cargando">Cargando item...</p>
<p v-else-if="error">Error: {{ error }}</p>
<dl v-else-if="item">
<dt>ID</dt>
<dd>{{ item.id }}</dd>
<dt>Nombre</dt>
<dd>{{ item.name }}</dd>
<dt>Descripción</dt>
<dd>{{ item.description || 'Sin descripción' }}</dd>
<dt>Precio</dt>
<dd>${{ Number(item.price).toFixed(2) }}</dd>
<dt>Cantidad</dt>
<dd>{{ item.quantity }}</dd>
<dt>Creado</dt>
<dd>{{ formatearFecha(item.created_at) }}</dd>
<dt>Actualizado</dt>
<dd>{{ formatearFecha(item.updated_at) }}</dd>
</dl>
<button @click="emit('volver')">Volver a la lista</button>
</template>