<script setup>
import { ref, onMounted } from 'vue'
import { obtenerItems } from '../services/api.js'
const emit = defineEmits(['ver-detalle'])
const items = ref([])
const meta = ref(null)
const busqueda = ref('')
const pagina = ref(1)
const cargando = ref(true)
const error = ref('')
async function cargarItems() {
cargando.value = true
error.value = ''
try {
const respuesta = await obtenerItems(busqueda.value, pagina.value)
items.value = respuesta.data
meta.value = respuesta.meta
} catch (e) {
error.value = e.message
} finally {
cargando.value = false
}
}
// Cada búsqueda nueva empieza en la página 1
function buscar() {
pagina.value = 1
cargarItems()
}
function limpiarBusqueda() {
busqueda.value = ''
buscar()
}
function irAPagina(numero) {
pagina.value = numero
cargarItems()
}
onMounted(cargarItems)
</script>
<template>
<h2>Mis items</h2>
<form @submit.prevent="buscar">
<input v-model="busqueda" type="search" placeholder="Buscar por nombre"
/>
<button type="submit">Buscar</button>
<button type="button" @click="limpiarBusqueda">Limpiar</button>
</form>
<p v-if="cargando">Cargando items...</p>
<p v-else-if="error">Error: {{ error }}</p>
<p v-else-if="items.length === 0">No hay items para mostrar.</p>
<template v-else>
<table>
<thead>
<tr>
<th>Nombre</th>
<th>Precio</th>
<th>Cantidad</th>
<th></th>
</tr>
</thead>
<tbody>
<tr v-for="item in items" :key="item.id">
<td>{{ item.name }}</td>
<td>${{ Number(item.price).toFixed(2) }}</td>
<td>{{ item.quantity }}</td>
<td>
<button @click="emit('ver-detalle', item.id)">Ver
detalle</button>
</td>
</tr>
</tbody>
</table>
<p>
<button :disabled="pagina <= 1" @click="irAPagina(pagina -
1)">Anterior</button>
Página {{ meta.page }} de {{ meta.total_pages }} ({{ meta.total }}
items)
<button :disabled="pagina >= meta.total_pages" @click="irAPagina(pagina
+ 1)">Siguiente</button>
</p>
</template>
</template>
