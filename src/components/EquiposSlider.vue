<template>
  <Splide ref="splideRef" :options="splideOptions">
    <SplideSlide v-for="equipo in equipos" :key="equipo.id" class="pl-40">
      <TarjetaEquipo :equipo="equipo" :mostrar-contrato="false"/>
    </SplideSlide>
  </Splide>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import '@splidejs/vue-splide/css/skyblue';
import '@splidejs/vue-splide/css/sea-green';

import TarjetaEquipo from 'src/components/TarjetaEquipo.vue';

const props = defineProps({
  equipos: {
    type: Array,
    required: true
  },
  cargados: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(["paginar"]);

const splideOptions = {
  perPage: 3,           // Muestra 3 elementos por página
  gap: '1rem',
  pagination: false,
  focus: 0,
  breakpoints: {
    600: {
      perPage: 1,       // Mostrar 1 equipo en pantallas pequeñas
    },
    900: {
      perPage: 2,       // Mostrar 2 equipos en pantallas medianas
    },
  },
};

const splideRef = ref(null);

onMounted(()=>{
  console.log("cargado")
  const splide = splideRef.value.splide;
  splide.on('moved', (event)=>{
    console.log(event);
    console.log(props.cargados);
    if(event == props.cargados - 1){
      emit('paginar');
    }
  });
});
</script>

<style lang="scss">

</style>