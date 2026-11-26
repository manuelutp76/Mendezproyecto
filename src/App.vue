<script setup>
import { ref } from 'vue'
import LoginForm from './components/LoginForm.vue'
import PerfilUsuario from './components/PerfilUsuario.vue'
import ListaItems from './components/ListaItems.vue'
import DetalleItem from './components/DetalleItem.vue'
const token = ref(localStorage.getItem('token'))
const itemSeleccionado = ref(null)
function alIniciarSesion(nuevoToken) {
token.value = nuevoToken
}
function alCerrarSesion() {
localStorage.removeItem('token')
token.value = null
itemSeleccionado.value = null
}
function verDetalle(id) {
itemSeleccionado.value = id
}
function volverALista() {
itemSeleccionado.value = null
}
</script>
<template>
<template v-if="token">
<PerfilUsuario @sesion-cerrada="alCerrarSesion" />
<DetalleItem
v-if="itemSeleccionado"
:id="itemSeleccionado"
@volver="volverALista"
/>
<ListaItems v-else @ver-detalle="verDetalle" />
</template>
<LoginForm v-else @sesion-iniciada="alIniciarSesion" />
</template>


