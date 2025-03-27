<template>
  <q-page>
    <q-table
      :rows="props.items"
      :columns="columnas"
      row-key="name"
      :filter="equipoSeleccionado"
      hide-pagination
      :pagination="pagination"
      no-data-label="No hay datos para mostrar"
      flat
      class="tabla"
    >

      <template v-slot:top-right>
        <q-space />
        <q-select
          name="Equipo"
          v-model="equipoSeleccionado"
          :options="nombres"
          option-value="name"
          option-label="label"
          emit-value
          map-options
        >
          <template #default>{{ $t("tablaAvisos.select_equipo") }}</template>
        </q-select>

        <!-- Buscador INPUT cambiado por el Select -->
        <!-- <q-input dense debounce="300" color="primary" v-model="filtro" @update:model-value="filtrar">
          <template v-slot:append>
                <q-icon name="search" />
            </template>
            </q-input> -->
      </template>
      <template v-slot:top-left>
        <button class="boton-tabla azul" @click="actualizarFiltro(0)">
          {{ $t("tablaAvisos.estados.todos") }}
        </button>
        <button class="boton-tabla naranja" @click="actualizarFiltro(1)">
          {{ $t("tablaAvisos.estados.nuevos") }}
        </button>
        <button class="boton-tabla verde" @click="actualizarFiltro(2)">
          {{ $t("tablaAvisos.estados.proceso") }}
        </button>
        <button class="boton-tabla gris" @click="actualizarFiltro(3)">
          {{ $t("tablaAvisos.estados.cerrados") }}
        </button>
      </template>
      <template v-slot:bottom>
        <div class="row justify-center q-mt-md" style="width: 100%">
          <!-- flat -->
          <q-pagination
            v-model="pagination.page"
            direction-links
            :max="pagesNumber"
            active-color="transparent"
            text-color="black"
            active-text-color="blue"
            boundary-numbers="true"
            :max-pages="10"
            ellipses
            @update:model-value="paginar"
          />
        </div>
      </template>

      <!-- Tabla de avisos -->
      <template v-slot:body-cell-est="props">
        <q-td :props="props">
          <button class="text-caption aviso-status" :class="claseEstatus(props.row)">{{
                    props.row.estado == $t("tablaAvisos.estados_avisos.nueva") ?
                            props.row.asignado ? $t("tablaAvisos.estados_avisos.asignado") : $t("tablaAvisos.estados_avisos.pendiente") :
                                props.row.estado == 'Visitado / sin terminar' ? $t("tablaAvisos.estados_avisos.proceso") :
                                    props.row.estado == 'Supervisar' ? $t("tablaAvisos.estados_avisos.cerrado") : props.row.estado
                }}</button>
        </q-td>
      </template>
      <template v-slot:body-cell-act="props">
        <q-td :props="props">
          {{ obtenerActualizacion(props.row) }}
        </q-td>
      </template>
      <template v-slot:body-cell-ver="props">
        <q-td>
          <button class="boton-tabla azul" @click="abrirItem(props.row)">
            {{ $t("tablaAvisos.botones.detalles") }}
          </button>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { api } from "src/boot/axios";
import { useI18n } from "vue-i18n";
import { useLanguageStore } from 'src/stores/lenguajes';

// Variables
const { locale, t } = useI18n();
const lenguajeStore = useLanguageStore();

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  posicion: {
    type: Number,
    required: true,
  },
});

console.log("Items obtenidos de AvisosPage: ", props.items);

const emit = defineEmits(["abrir", "filtrarEstado", "paginar"]);
const obtenerActualizacion = (aviso) => {
  if (aviso.informes && aviso.informes.length > 0) {
    return aviso.informes[aviso.informes.length - 1].fin;
  } else {
    return aviso.creado;
  }
};
const pagination = ref({
  page: props.posicion,
  rowsPerPage: 20,
});
const pagesNumber = computed(() =>
  Math.ceil(props.totalItems / pagination.value.rowsPerPage)
);
const columnas = computed(() => [
  {
    name: "est",
    label: t("tablaAvisos.columnas.estado"),
    field: "estado",
    align: "center",
  },
  {
    name: "cod",
    label: t("tablaAvisos.columnas.codigo"),
    field: "codigo",
    align: "center",
  },
  {
    name: "eqp",
    label: t("tablaAvisos.columnas.servicio"),
    field: "equipo",
    align: "center",
  },
  {
    name: "cre",
    label: t("tablaAvisos.columnas.creado"),
    field: "creado",
    align: "center",
  },
  {
    name: "act",
    label: t("tablaAvisos.columnas.actualizado"),
    align: "center",
  },
  {
    name: "tec",
    label: t("tablaAvisos.columnas.tecnico"),
    field: "tecnico",
    align: "center",
  },
  {
    name: "ver",
  },
]);

const abrirItem = (item) => {
  emit("abrir", item);
};
const actualizarFiltro = (estado) => {
  switch (estado) {
    case 0:
      emit("filtrarEstado", 0);
      break;
    case 1:
      emit("filtrarEstado", 1);
      break;
    case 2:
      emit("filtrarEstado", 2);
      break;
    case 3:
      emit("filtrarEstado", 3);
      break;
  }
};
const paginar = (page) => {
  emit("paginar", page);
};
const claseEstatus = (aviso) => {
  switch (aviso.estado) {
    case "Nueva":
      return !aviso.asignado ? "status-nuevo" : "status-asignado";
    case "En Proceso":
      return "status-proceso";
    case "Visitado / sin terminar":
      return "status-proceso";
    case "Terminado":
      return "status-terminado";
    case "Supervisar":
      return "status-supervisar";
    default:
      return "status-proceso";
  }
};

watch(
  () => props.posicion,
  (newPosicion) => {
    pagination.value.page = newPosicion;
  }
);

onMounted(async () => {
  console.log("Items obtenidos en TablaAvisos: ", props.items);
  await obtenerNombres();

  // Establecer el idioma al inicio
  locale.value = lenguajeStore.locale;
  console.log("Idioma actual pasado al LoginPage:", locale.value);
});

const equipoSeleccionado = ref("");

// Obtengo nombres del endpoint /equipos.php (Sin parametros)
const nombres = ref([]);
const obtenerNombres = async () => {
  try {
    const response = await api.get("/equipos.php", { withCredentials: true });
    console.log("Nombres obtenidos: ", response.data);

    if (response.data.success && response.data.message.equipos) {
      nombres.value = response.data.message.equipos.map(
        (equipo) => equipo.nombre
      );
    }
  } catch (error) {
    console.log("Error al obtener nombres:", error);
  }
};
</script>

<style scoped lang="scss">
$estados: (
  nuevo: #f0be77,
  asignado: #fff3cd,
  proceso: #d4edda,
  terminado: #add8e6,
  supervisar: #d3d3d3,
);

@each $status, $color in $estados {
  .status-#{$status} {
    background-color: $color;
  }
}

.aviso-status {
  border-radius: 8px;
  border: none;
  width: 60%;
  min-width: 150px;
  padding: 0px 5px;
  color: #000;
}

.boton-tabla {
  border-radius: 8px;
  border: none;
  margin: 5px;
  color: #000;
  transition: background-color 0.3s ease;
}
.boton-tabla:hover {
  filter: brightness(0.8);
}

.azul {
  background-color: #add8e6;
}
.naranja {
  background-color: #f0be77;
}
.verde {
  background-color: #d4edda;
}
.gris {
  background-color: #d3d3d3;
}
</style>
