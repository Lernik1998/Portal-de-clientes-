<template>
  <q-page class="pagina">
    <div class="titulo">
      <div class="q-pa-md">
        <q-btn class="btn-volver" no-caps icon="arrow_back" @click="router.back()" label="Volver" flat v-if="esPortal"/>
      </div>
      <span class="texto-titulo cabecera">{{ fechaFormateada }}</span>
      <br>
      <span class="text-subtitle1 cabecera text-weight-bold">{{ equipo.NOM }}</span>
      <br>
      <img :src="imageSource" style="object-fit: cover;" ref="imagen" id="imagen"/>
      <span class="texto-titulo cabecera" v-if="equipo.descripcion != ''">Descripción del equipo</span>
      <br>
      <div class="contenedor-texto">
        <p class="texto-descripcion" v-html="descripcion" v-if="mostrarDescripcion"></p>
        <p class="texto-descripcion" v-html="descripcionCorta" v-else></p>
        <span v-if="descripcion.length > limiteCaracteres" @click="toggleDescripcion" class="leer-mas">
          {{ mostrarDescripcion ? 'Leer menos' : 'Leer más' }}
        </span>
      </div>
    </div>
    <div class="cuerpo">

      <p> {{route.path}}</p>
      <p>{{equipo.id}}</p>

      <q-separator style="width: 100px; margin-top: 1rem; margin-bottom: 1rem;" />
      <span class="texto-titulo cabecera">Seleccione una opción</span>
      <div class="botones" v-if="opcion === 0">
        <div color="primary" @click="seleccionarOpcion(1)">
          <img src="../assets/btn-soporte.png" width="150">
        </div>
        <div color="primary" @click="seleccionarOpcion(2)" v-if="tieneConsumibles">
          <img src="../assets/btn-consumibles.png" width="150">
        </div>
        <div color="primary" @click="seleccionarOpcion(3)" v-if="tieneContadores">
          <img src="../assets/btn-contadores.png" width="150">
        </div>
        <!-- Se podría verificar si hay Incidencias con v-if="tieneServicio" -->
        <div color="primary" @click="avisosEquipo()">
          <img src="../assets/btn-servicio.png" width="150">
        </div>
      </div>
      <FormSoporte v-else-if="opcion === 1" :consumibles="false" @volver="opcion = 0" :equipo="equipo"/>
      <FormSoporte v-else-if="opcion === 2" :consumibles="true" @volver="opcion = 0" :equipo="equipo"/>
      <FormContadores v-else-if="opcion === 3" @volver="opcion = 0" :equipo="equipo"/>
      <q-separator style="width: 100px; margin-top: 1rem; margin-bottom: 1rem;" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import FormContadores from "src/components/FormContadores.vue";
import FormSoporte from "src/components/FormSoporte.vue";
import logo from 'src/assets/SBS-logo-azul.png';

const route = useRoute();
const router = useRouter();
const $q = useQuasar();
const equipo = ref({});
const opcion = ref(0);
const imagen = ref(null);
const limiteCaracteres = 100;
const mostrarDescripcion = ref(false);
const esPortal = computed(()=>route.path.includes("dashboard"));
const fechaFormateada = computed(()=>{
  const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const fecha = new Date();
  const diaSemana = dias[fecha.getDay()];
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const anio = fecha.getFullYear();

  return `${diaSemana}, ${dia} de ${mes} de ${anio}`;
});
const descripcion = computed(() => {
  return equipo.value.descripcion ? equipo.value.descripcion.replace(/\n/g, '<br>') : '';
});
const descripcionCorta = computed(() => {
  return descripcion.value.length > limiteCaracteres
    ? descripcion.value.substring(0, limiteCaracteres) + "..."
    : descripcion.value;
});
const imageSource = computed(() => {
  if (equipo.value.imagen) {
    return 'data:image/png;base64,' + equipo.value.imagen;
  } else {
    return logo;
  }
});
const tieneConsumibles = computed(()=>{
  if(equipo.value.articulos){
    return equipo.value.articulos.length > 0 ? true : false;
  }else {
    return false;
  }
});
const tieneContadores = computed(()=>{
  if(equipo.value.contadores){
    return equipo.value.contadores.length > 0 ? true : false;
  }else{
    return false;
  }

});

const toggleDescripcion = () => {
  mostrarDescripcion.value = !mostrarDescripcion.value;
};

const seleccionarOpcion = (val) => {
  opcion.value = val;
}

const cargarEquipo = async() => {
  const token = route.params.token; //jqA4uQPcfacrC5gaVNaiOVug055213IfjRhNlleu
  let cargado = equipo.value !== null && equipo.value.TKN === token;
  if(cargado) return;
  $q.loading.show();
  try{
    const response = await api.get("/equipos.php?tkn="+token);
    console.log(response.data);
    if(response.data.success){
      equipo.value = response.data.message;
      if(equipo.value.NOM) equipo.value.NOM = equipo.value.NOM.toLowerCase();
    }
  } catch (error) {
      console.error('Error: ', error);
  }
  $q.loading.hide();
};

const avisosEquipo = () => {
  console.log('ID del equipo:', equipo.value.id);
  if (equipo.value.id) {
    router.push({
      name: 'avisosEquipo',
      params: { id: equipo.value.id }
    });
  } else {
    console.error('ID del equipo no está definido');
  }
}


onMounted(()=>{
  cargarEquipo();
});
</script>

<style scooped lang="scss">
.cabecera {
    color: #000;
    text-transform: capitalize;
}
.pagina {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 1% 5%;
}
.titulo {
  left: 5%;
  right: 5%;
  text-align: start;
  align-content: center;
}
.cuerpo {
  align-content: center;
}
.botones {
  gap: 0.05vh;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  img{
    padding-left: 0px;
  }
  img:hover {
    opacity: 0.8;
  }
}

#imagen {
  border-radius: 30px;
  max-width: 300px;
}

.btn-volver {
    border-radius: 8px;
    border:none;
    transition: background-color 0.3s ease;
    :hover {
        filter: brightness(0.8);
    }
}


.contenedor-texto {
  position: relative;
  max-width: 100%;
  height: auto;
  overflow: hidden;
}

.text-body2 {
  font-family: Helvetica, sans-serif;
  line-height: 1.5;
}

.leer-mas {
  color: #007bff;
  cursor: pointer;
  display: block;
  margin-top: 2px;
}

.contenedor-texto p {
  position: relative;
}

.contenedor-texto p::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px;
  pointer-events: none;
  transition: opacity 0.3s;
}


@media (max-width: 600px) {
  .pagina {
    display: flex;
    flex-direction: column;
    justify-content: start;
    padding: 0% 5%;
  }
  .botones {
    flex-direction: row;
  }
  .contenedor-texto p {
    font-size: 0.5rem;
  }
  #imagen {
    max-width: 70%;
  }
  .texto-titulo {
    font-size: 0.5rem;
  }
  .texto-descripcion {
    font-size: 0.4rem;
  }
  .leer-mas {
    font-size: 0.5rem;
  }
}
</style>
