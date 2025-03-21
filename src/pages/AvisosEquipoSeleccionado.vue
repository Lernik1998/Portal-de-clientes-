<template>
  <q-page class="q-pa-md">
    <h1>Pendiente gestión del ENDPOINT</h1>
  <!-- <div class="cabecera">
      <span class="text-h6">Sus avisos</span>
      <span class="text-subtitle2">Visualice sus partes de trabajo generados</span>
  </div>
  <div id="tabla-avisos">
      <TablaAvisos :items="avisos" :totalItems="numAvisos" :posicion="paginacion"
      @abrir="abrirDetalle" @filtrarEstado="filtrarEstado($event)" @paginar="paginarTabla($event)"/>
  </div>
  <div id="lista-avisos">
      <q-list bordered separator>
          <TarjetaAviso v-for="aviso in avisos" :key="aviso.id" :aviso="aviso" @click="abrirDetalle(aviso)"/>
      </q-list>
  </div>
  <q-dialog v-model="abrirParte" class="dialogo">
      <q-card>
          <q-bar class="barra-titulo">
              <div>Resolución aviso</div>
              <q-space />
              <q-btn dense flat icon="close" v-close-popup>
                  <q-tooltip>Cerrar</q-tooltip>
              </q-btn>
          </q-bar>

              <q-card-section class="scroll">
                  <div class="text-h5">{{ parteSeleccionado.codigo }}</div>
                  <q-separator/>
                  <q-timeline align="left" dense>
                      <q-timeline-entry
                      v-for="(etapa, index) in etapas"
                      :key="index"
                      :color="etapa.completado ? 'green' : 'grey'"
                      :icon="etapa.completado ? 'check_circle' : 'hourglass_empty'"
                      >
                          <template v-slot:title v-if="etapa.fecha != '-'"><div class="text-overline">{{ etapa.fecha }}</div></template>
                          <template v-slot:subtitle><div class="text-body1"></div>{{ etapa.titulo }}</template>
                          <div class="caption-text">{{ etapa.descripcion }}</div>
                          <div v-if="etapa.id === 'P' && etapa.informes">
                              <q-expansion-item  expand-separator default-opened label="informes técnico" class="expansor">
                                  <div v-for="(informe, index) in etapa.informes" :key="index" class="elemento-informe">
                                      <p class="text-body2 informe-titulo">{{ informe.tecnico + " - " + informe.fin }}</p>
                                      <p class="text-caption informe-texto">{{ informe.informe }}</p>
                                  </div>
                              </q-expansion-item>
                          </div>
                      </q-timeline-entry>
                  </q-timeline>
              </q-card-section>

              <q-card-section>
                  <q-separator/>
              </q-card-section>

      </q-card>
  </q-dialog> -->
  </q-page>
</template>

<script setup>

// const props = defineProps(["equipo"]);

// import { ref, onMounted, onUnmounted } from 'vue';
// import { api } from 'src/boot/axios';
// import { useQuasar } from "quasar";
// import { useRouter, useRoute } from 'vue-router';
// import { useAvisoStore } from 'src/stores/avisos';
// import TarjetaAviso from 'src/components/TarjetaAviso.vue';
// import TablaAvisos from 'src/components/TablaAvisos.vue';


// const $q = useQuasar();
// const router = useRouter();
// const route = useRoute();
// const avisosStore = useAvisoStore();
// const avisos = ref([]);
// const numAvisos = ref(0);
// const cargados = ref(20);
// const paginacion = ref(1);
// const cargando = ref(false);
// const abrirParte = ref(false);
// const parteSeleccionado = ref({});
// const etapas = ref([]);
// const estadoAvisos = ref(0);


// const abrirDetalle = (aviso) => {
//   $q.sessionStorage.setItem("aviso", JSON.stringify(aviso));
//   router.push(route.path+"/"+aviso.id);
// };

// const filtrarEstado = (est) => {
//   estadoAvisos.value = est;
//   paginacion.value = 1;
//   avisos.value = [];
//   cargarAvisos();
// };


// const cargarAvisos = async () => {
//   if (cargando.value) return;
//   $q.loading.show();
//   cargando.value = true;
//   try {
//       const response = await api.get("/avisos.php?pag="+paginacion.value+"&estado="+estadoAvisos.value, { withCredentials: true });
//       console.log("Avisos: ", response.data);
//       if (response.data.success) {
//           numAvisos.value = response.data.message.total;
//           avisos.value = [...avisos.value, ...response.data.message.avisos];
//           avisos.value = avisos.value.sort((a, b) => {
//               return new Date(b.creado_js) - new Date(a.creado_js);
//           });
//       }
//   } catch (error) {
//       console.log("Error:", error);
//   }
//   cargando.value = false;
//   $q.loading.hide();
// };

// const paginarTabla = (pag) => {
//   paginacion.value = pag;
//   avisos.value = [];
//   cargarAvisos();
// };

// const paginarScroll = () => {
//   const scrollPosition = window.scrollY + window.innerHeight;
//   const documentHeight = document.documentElement.scrollHeight;

//   if (!cargando.value && scrollPosition >= documentHeight - 10 && cargados.value <= numEquipos.value) {
//       paginacion.value += 1;
//       cargados.value += 20;
//       cargarAvisos();
//   }
// };


// onMounted(() => {
// if (window.innerWidth < 820) {
//   window.addEventListener('scroll', paginarScroll);
// }
// cargarAvisos();
// });

// onUnmounted(() => {
// if (window.innerWidth < 820) {
//   window.removeEventListener('scroll', paginarScroll);
// }
// });

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
.expansor {
background-color: #f5f5f5;
padding: 10px;
border-radius: 8px;
}
.elemento-informe {
margin-left: 20px;
}
.informe-titulo {
font-weight: bold;
color: #333;
}

.informe-texto {
color: #666;
}

.dialogo {
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  .barra-titulo {
      position: sticky;
      top: 0;
      z-index: 1;
      background: white;
  }
  .scroll {
      overflow-y: auto;
      flex: 1;
  }
}

#lista-avisos {
  display: none;
}

@media (max-width: 820px) {
  #lista-avisos {
      display: contents;
  }
  #tabla-avisos {
      display: none;
  }
}
</style>