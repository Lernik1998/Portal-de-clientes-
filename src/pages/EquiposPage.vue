<template>
    <q-page class="q-pa-md">
        <div class="cabecera">
            <span class="text-h6">Lista de Servicios</span>
            <span class="text-subtitle2">Consulte sus servicios contratados</span>
        </div>
        <div class="tabla-tarjetas">
            <TarjetaEquipo v-for="equipo in equipos" :key="equipo.tkn" :equipo="equipo"/>
        </div>
    </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from "quasar";
import TarjetaEquipo from 'src/components/TarjetaEquipo.vue';

const $q = useQuasar();
const equipos = ref([]);
const numEquipos = ref(0);
const cargados = ref(20); // Carga 20 equipos por defecto
const paginacion = ref(1); // Paginación desde la primera página
const cargando = ref(false);

const cargarEquipos = async () => {
    if (cargando.value) return;
    $q.loading.show();
    cargando.value = true;
    try{
        const response = await api.get("/equipos.php?pag="+paginacion.value, {withCredentials:true});
        if(response.data.success){
            numEquipos.value = response.data.message.total;
            equipos.value = [...equipos.value, ...response.data.message.equipos];
        }else{
        }
    }catch(error){
        console.log("Error:", error);
    }
    cargando.value = false;
    $q.loading.hide();
};

const paginar = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (!cargando.value && scrollPosition >= documentHeight - 10 && cargados.value <= numEquipos.value) {
        paginacion.value += 1;
        cargados.value += 20;
        cargarEquipos();
    }
};
onMounted(()=>{
    window.addEventListener('scroll', paginar);
    cargarEquipos();
});
onUnmounted(() => {
  window.removeEventListener('scroll', paginar);
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