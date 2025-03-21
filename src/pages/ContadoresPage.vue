<template>
    <q-page class="pagina">
      <div class="titulo">
        <span class="text-h3">Agregar contadores</span>
        <br>
        <span class="text-h6">{{ equipo.NOM }}</span>
        <br>
        <span class="text-overline">ID {{ equipo.id }}</span>
        <br>
        <div class="row" style="display:flex; justify-content: center; align-items: stretch;">
          <img :src="'data:image/png;base64,'+equipo.imagen" style="object-fit: cover;" ref="imagen" v-if="equipo.imagen != ''"/>
          <div style="width: 50px;"></div>
          <pre style="text-align: left; font-size: x-small; flex-shrink: 0;" ref="descripcion" v-if="equipo.descripcion != ''">{{ equipo.descripcion }}</pre>
        </div>
      </div>
      <div class="cuerpo">
        <FormContadores :equipo="equipo"/>
      </div>
    </q-page>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import FormContadores from 'src/components/FormContadores.vue';

const $q = useQuasar();
const equipo = ref({});
const route = useRoute();
const descripcion = ref(null);
const imagen = ref(null);

const cargarEquipo = async() => {
  const token = route.params.token; //jqA4uQPcfacrC5gaVNaiOVug055213IfjRhNlleu
  $q.loading.show();
  try{
    const response = await api.get("/equipos.php?tkn="+token);
    if(response.data.success){
      equipo.value = response.data.message;
    }
    console.log('Verificación', response.data.message);
  } catch (error) {
      console.error('Error: ', error);
  }
  $q.loading.hide();
};

const ajustarAlturaImagen = async () => {
  await nextTick(); // Asegura que el DOM esté completamente renderizado
  if (descripcion.value && imagen.value) {
    const descriptionHeight = descripcion.value.offsetHeight;
    console.log(descriptionHeight)
    imagen.value.style.height = `${descriptionHeight}px`;
  }
};

watch(()=> equipo.value.descripcion, ()=>ajustarAlturaImagen());

onMounted(()=>{
  ajustarAlturaImagen();
  cargarEquipo();
});
</script>

<style scooped lang="scss">
//@import "../css/app.scss";
.pagina {
  padding: 0% 5%;
}
.titulo {
  position: relative;
  text-align: center;
}

</style>