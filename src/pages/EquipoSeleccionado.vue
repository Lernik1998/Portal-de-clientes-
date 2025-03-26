<template>
  <!-- class="q-pa-md q-mt-md q-pa-lg q-mt-sm"-->
  <q-page class="pagina">
      <div class="q-pa-md zona-volver">
        <q-btn
          class="btn-volver"
          no-caps
          icon="arrow_back"
          @click="router.back()"
          :label="$t('pes.boton_volver')"
          flat
          v-if="esPortal"
        />
      </div>

<!-- General q-mt-md q-pa-md -->
      <div class="flex q-responsive">
          <!-- Información del equipo -->
        <div class="mt-40 ml-30 mr-30 flex-initial w-64">

        <div class="mb-2 flex flex-col">
          <span class="texto-titulo cabecera text-weight-bold mb-2">{{
            fechaFormateada
          }}</span>
          <span class="text-4xl cabecera text-weight-bold mb-6">{{
            equipo.NOM
          }}</span>
        </div>

        <div>
          <img
            :src="imageSource"
            style="object-fit: cover"
            ref="imagen"
            id="imagen"
          />
          <span
            class="texto-titulo cabecera text-weight-bold"
            v-if="equipo.descripcion != ''"
            >{{ $t('pes.descripcion') }}</span
          >
          <br />
          <div class="contenedor-texto">
            <p
              class="texto-descripcion"
              v-html="descripcion"
              v-if="mostrarDescripcion"
            ></p>
            <p class="texto-descripcion" v-html="descripcionCorta" v-else></p>
            <span
              v-if="descripcion.length > limiteCaracteres"
              @click="toggleDescripcion"
              class="leer-mas"
            >
              {{ mostrarDescripcion ? $t('pes.leer_menos') : $t('pes.leer_mas') }}
            </span>
            <q-separator
              style="width: 100px; margin-top: 1rem; margin-bottom: 1rem"
            />
          </div>
        </div>
      </div>

       <!-- Sección de botones mt-26 mr-20 ml-30-->
       <div class="mt-40 flex-initial w-64" id="botonesGrupo">
        <q-separator
          style="width: 100px; margin-top: 1rem; margin-bottom: 1rem"
        />
        <span class="texto-titulo text-weight-bold">{{ $t('pes.selecciona_opcion') }}</span>

        <div class="botones grid grid-cols-2" v-if="opcion === 0">
          <div color="primary" @click="seleccionarOpcion(1)">
            <img src="../assets/btn-soporte.png" width="150" />
          </div>
          <div
            color="primary"
            @click="seleccionarOpcion(2)"
            v-if="tieneConsumibles"
          >
            <img src="../assets/btn-consumibles.png" width="150" />
          </div>
          <div
            color="primary"
            @click="seleccionarOpcion(3)"
            v-if="tieneContadores"
          >
            <img src="../assets/btn-contadores.png" width="150" />
          </div>
          <!-- Se podría verificar si hay Incidencias con v-if="tieneServicio" -->
          <div color="primary" @click="avisosEquipo()">
            <img src="../assets/btn-servicio.png" width="150" v-if="esPortal" />
          </div>
        </div>
        <FormSoporte
          v-else-if="opcion === 1"
          :consumibles="false"
          @volver="opcion = 0"
          :equipo="equipo"
        />
        <FormSoporte
          v-else-if="opcion === 2"
          :consumibles="true"
          @volver="opcion = 0"
          :equipo="equipo"
        />
        <FormContadores
          v-else-if="opcion === 3"
          @volver="opcion = 0"
          :equipo="equipo"
        />
      </div>
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
import logo from "src/assets/SBS-logo-azul.png";
import { useI18n } from 'vue-i18n'

const { locale } = useI18n(); // Gestiona el idioma
const route = useRoute();
const router = useRouter();
const $q = useQuasar();
const equipo = ref({});
const opcion = ref(0);
const imagen = ref(null);
const limiteCaracteres = 100;
const mostrarDescripcion = ref(false);
const esPortal = computed(() => route.path.includes("dashboard"));
const fechaFormateada = computed(() => {
  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const fecha = new Date();
  const diaSemana = dias[fecha.getDay()];
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const anio = fecha.getFullYear();

  return `${diaSemana}, ${dia} de ${mes} de ${anio}`;
});
const descripcion = computed(() => {
  return equipo.value.descripcion
    ? equipo.value.descripcion.replace(/\n/g, "<br>")
    : "";
});
const descripcionCorta = computed(() => {
  return descripcion.value.length > limiteCaracteres
    ? descripcion.value.substring(0, limiteCaracteres) + "..."
    : descripcion.value;
});
const imageSource = computed(() => {
  if (equipo.value.imagen) {
    return "data:image/png;base64," + equipo.value.imagen;
  } else {
    return logo;
  }
});
const tieneConsumibles = computed(() => {
  if (equipo.value.articulos) {
    return equipo.value.articulos.length > 0 ? true : false;
  } else {
    return false;
  }
});
const tieneContadores = computed(() => {
  if (equipo.value.contadores) {
    return equipo.value.contadores.length > 0 ? true : false;
  } else {
    return false;
  }
});

const toggleDescripcion = () => {
  mostrarDescripcion.value = !mostrarDescripcion.value;
};

const seleccionarOpcion = (val) => {
  opcion.value = val;
};

const cargarEquipo = async () => {
  const token = route.params.token; //jqA4uQPcfacrC5gaVNaiOVug055213IfjRhNlleu
  let cargado = equipo.value !== null && equipo.value.TKN === token;
  if (cargado) return;
  $q.loading.show();
  try {
    const response = await api.get("/equipos.php?tkn=" + token);
    console.log(response.data);
    if (response.data.success) {
      equipo.value = response.data.message;
      if (equipo.value.NOM) equipo.value.NOM = equipo.value.NOM.toLowerCase();
    }
  } catch (error) {
    console.error("Error: ", error);
  }
  $q.loading.hide();
};

const avisosEquipo = () => {
  console.log("ID del equipo:", equipo.value.id);
  if (equipo.value.id) {
    router.push({
      name: "avisosEquipo",
      params: { id: equipo.value.id },
    });
  } else {
    console.error("ID del equipo no está definido");
  }
};

onMounted(() => {
  cargarEquipo();
    // Establecer el idioma al inicio
  locale.value = locale.value === 'es-ES' ? 'en-US' : 'es-ES';
  console.log('Idioma actual pasado al LoginPage:', locale.value);
  // Recibo el idioma del padre
});
</script>

<style scoped lang="scss">
.cabecera {
  color: #000;
  text-transform: capitalize;
}

.titulo {
  margin-top: 100px;
}

#imagen {
  border-radius: 30px;
  max-width: 300px;
}

// Zona volver
.zona-volver {
  // justify-content: flex-start;
  // align-items: center;
  gap: 10px;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1000;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.btn-volver {
  font-size: medium;
  border-radius: 8px;
  border: none;
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
  content: "";
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
  #botonesGrupo {
    margin-top: 10px;
    margin-left: 45px;
  }
}


@media (max-width: 900px) {
  .pagina {
    display: flex;
    flex-direction: column;
    justify-content: start;
    padding: 0% 5%;
    margin-left: 60px;
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
  #botonesGrupo {
    margin-top: 10px;
    margin-left: 65px;
  }
}
</style>
