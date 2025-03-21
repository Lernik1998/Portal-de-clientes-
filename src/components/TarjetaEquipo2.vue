<template>
  <q-page class="q-pa-md bg-gray-100">
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-bold text-gray-800">Lista de Servicios</h1>
      <p class="text-lg text-gray-600">Consulte sus servicios contratados</p>
    </div>
    <div class="relative">
      <!-- Contenedor horizontal con scroll -->
      <div class="overflow-x-auto scrollbar-hide" ref="scrollContainer">
        <div class="flex space-x-4 px-4">
          <div
            v-for="equipo in equipos"
            :key="equipo.tkn"
            class="flex-shrink-0 w-72"
          >
            <TarjetaEquipo :equipo="equipo" />
          </div>
        </div>
      </div>
      <!-- Botones de navegación opcionales -->
      <button @click="scrollLeft" class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300">
        <q-icon name="chevron_left" />
      </button>
      <button @click="scrollRight" class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300">
        <q-icon name="chevron_right" />
      </button>
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

// Para controlar el scroll horizontal
const scrollContainer = ref(null)
const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -300, behavior: 'smooth' })
  }
}
const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 300, behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* Opcional: oculta la barra de scroll */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

  