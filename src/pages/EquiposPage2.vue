<template>
<q-page class="p-10 bg-gray-50">
    <div class="max-w-6xl mx-auto">
    <!-- Encabezado profesional -->
    <div class="text-center mb-10">
        <h1 class="text-4xl font-semibold text-gray-800">Nuestros Servicios</h1>
        <p class="mt-3 text-lg text-gray-500">Descubra los servicios que ofrecemos</p>
    </div>
    <!-- Slider de equipos -->
    <div class="relative">
        <div ref="scrollContainer" class="overflow-x-auto no-scrollbar">
        <div class="flex space-x-8 px-4">
            <div
            v-for="equipo in equipos"
            :key="equipo.tkn"
            class="flex-shrink-0 w-80"
            >
            <TarjetaEquipo :equipo="equipo" />
            </div>
        </div>
        </div>
        <!-- Botón de navegación izquierda -->
        <button
        @click="scrollLeft"
        class="absolute top-1/2 left-0 ml-4 transform -translate-y-1/2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 p-3"
        >
        <q-icon name="chevron_left" class="text-gray-700" />
        </button>
        <!-- Botón de navegación derecha -->
        <button
        @click="scrollRight"
        class="absolute top-1/2 right-0 mr-4 transform -translate-y-1/2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 p-3"
        >
        <q-icon name="chevron_right" class="text-gray-700" />
        </button>
    </div>
    </div>
</q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'
import TarjetaEquipo from 'src/components/TarjetaEquipo.vue'

const equipos = ref([])

const cargarEquipos = async () => {
try {
    const response = await api.get("/equipos.php", { withCredentials: true })
    if (response.data.success) {
    equipos.value = response.data.message.equipos
    } else {
    console.error("Error al cargar equipos")
    }
} catch (error) {
    console.error("Error:", error)
}
}

onMounted(() => {
cargarEquipos()
})

const scrollContainer = ref(null)
const scrollLeft = () => {
scrollContainer.value?.scrollBy({ left: -300, behavior: 'smooth' })
}
const scrollRight = () => {
scrollContainer.value?.scrollBy({ left: 300, behavior: 'smooth' })
}
</script>

<style scoped>
/* Oculta la barra de scroll de forma limpia */
.no-scrollbar::-webkit-scrollbar {
display: none;
}
.no-scrollbar {
-ms-overflow-style: none;
scrollbar-width: none;
}
</style>
  