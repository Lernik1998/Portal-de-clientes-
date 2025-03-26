<template>
  <q-page class="q-pa-md">
    <div class="cabecera">
      <span class="text-h6">{{ $t('pagina_servicios.cabecera.titulo') }}</span>
      <span class="text-subtitle2">{{ $t('pagina_servicios.cabecera.descripcion') }}</span>
      <div class="row justify-end">
        <q-input
          dense
          debounce="300"
          color="primary"
          v-model="equipoBuscado"
          @update:model-value="actualizarFiltro"
          class="position-relative"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="tabla-tarjetas">
      <TarjetaEquipo
        v-for="equipo in equiposFiltrados"
        :key="equipo.tkn"
        :equipo="equipo"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import TarjetaEquipo from "src/components/TarjetaEquipo.vue";
import { useI18n } from 'vue-i18n'

const { locale } = useI18n(); // Establecer el idioma al inicio

const $q = useQuasar();
const equipos = ref([]);
const numEquipos = ref(0);
const cargados = ref(20); // Carga 20 equipos por defecto
const paginacion = ref(1); // Paginación desde la primera página
const cargando = ref(false);

const equipoBuscado = ref("");
const equiposFiltrados = ref([]);

const actualizarFiltro = () => {
  if (!equipoBuscado.value.trim()) {
    equiposFiltrados.value = [...equipos.value]; // Si no hay filtro, mostramos todos
  } else {
    // Buscar dentro de equipos el nombre del equipo introducido
    equiposFiltrados.value = equipos.value.filter(equipo =>
      equipo.nombre.toLowerCase().includes(equipoBuscado.value.toLowerCase())
    );
  }
};


const cargarEquipos = async () => {
  if (cargando.value) return;
  $q.loading.show();
  cargando.value = true;
  try {
    const response = await api.get("/equipos.php?pag=" + paginacion.value + "&nombre=" + equipoBuscado.value, {
      withCredentials: true,
    });

    if (response.data.success) {
      numEquipos.value = response.data.message.total;
      equipos.value = [...equipos.value, ...response.data.message.equipos];
      // Actualizo el array del filtro
      equiposFiltrados.value = [...equiposFiltrados.value, ...response.data.message.equipos];
      console.log(equipos.value);
    } else {
    }
  } catch (error) {
    console.log("Error:", error);
  }
  cargando.value = false;
  $q.loading.hide();
};

const paginar = () => {
  const scrollPosition = window.scrollY + window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (
    !cargando.value &&
    scrollPosition >= documentHeight - 10 &&
    cargados.value <= numEquipos.value
  ) {
    paginacion.value += 1;
    cargados.value += 20;
    cargarEquipos();
  }
};
onMounted(() => {
  window.addEventListener("scroll", paginar);
  cargarEquipos();
      // Establecer el idioma al inicio
      locale.value = locale.value === 'es-ES' ? 'en-US' : 'es-ES';
  console.log('Idioma actual pasado al LoginPage:', locale.value);
  // Recibo el idioma del padre
  locale.value = locale.value === 'es-ES' ? 'en-US' : 'es-ES';

});
onUnmounted(() => {
  window.removeEventListener("scroll", paginar);
});
</script>

<style scoped lang="scss">
.cabecera {
  margin: 2%;
  display: flex;
  flex-direction: column;
  span {
    color: grey;
  }
}
.tabla-tarjetas {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  justify-content: center;
}
</style>
