<template>
    <q-page class="pagina-detalle">
        <div class="q-pa-lg">
            <q-btn class="btn-volver" no-caps icon="arrow_back" @click="router.back()" label="Volver" flat/>
            <div class="row">
                <div class="col-12 col-md-4 q-pa-md">
                    <div class="text-h6">{{ parteSeleccionado.codigo }}</div>
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
                </div>
                <div class="col-12 col-md-8 q-pa-md">
                    <div class="text-h6">Detalles del Aviso</div>
                    <div class="text-subtitle1">{{ parteSeleccionado.descripcion }}</div>
                    <div class="text-overline text-center">Piezas solicitadas</div>
                    <q-table
                        :rows="parteSeleccionado.lineas"
                        :columns="columns"
                        no-data-label="No hay datos para mostrar."
                        row-key="articulo"
                        :rows-per-page-options="[5]"
                        flat
                        bordered
                        class="q-mt-md tabla"
                    >
                        <template v-slot:pagination="props">
                            <div class="q-pa-sm flex items-center justify-end">
                                <q-btn flat round icon="chevron_left" :disable="props.isFirstPage" @click="props.prevPage"/>
                                <span class="q-mx-md">Página {{ props.pagination.page }} de {{ props.pagesNumber }}</span>
                                <q-btn flat round icon="chevron_right" :disable="props.isLastPage" @click="props.nextPage"/>
                            </div>
                        </template>
                        <template v-slot:body-cell-articulo="{ row }">
                        <q-td>{{ row.articulo }}</q-td>
                        </template>
                        <template v-slot:body-cell-cantidad="{ row }">
                        <q-td>{{ row.cantidad }}</q-td>
                        </template>
                        <template v-slot:body-cell-estado="{ row }">
                        <q-td>{{ row.estado }}</q-td>
                        </template>
                    </q-table>
                  
                </div>
            </div>
        </div>
    </q-page>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useAvisoStore } from 'src/stores/avisos';

const route = useRoute();
const router = useRouter();
const avisosStore = useAvisoStore();
const $q = useQuasar();
const etapas = ref([]);
const parteSeleccionado = ref({
    codigo: '',
    lineas: []
});

const columns = ref([
    { name: "articulo", label: "Artículo", align: "left", field: "articulo" },
    { name: "cantidad", label: "Cantidad", align: "left", field: "cantidad" },
    { name: "estado", label: "Estado", align: "left", field: "estado" }
]);

const cargarDetalle = () => {
    //const id = route.params.id;
    //const aviso = avisosStore.buscarPorId(id);
    let aviso = $q.sessionStorage.getItem("aviso");
    aviso = JSON.parse(aviso);
    parteSeleccionado.value = aviso;
    console.log("AVISO SEL.",parteSeleccionado.value)
    etapas.value = [];
    etapas.value.push({
        id: "C",
        titulo: "Aviso Creado",
        fecha: `${aviso.creado}`,
        descripcion: "El aviso fue registrado correctamente.",
        completado: true
    });

    if (aviso.asignado) {
        etapas.value.push({
            id: "A",
            titulo: "Asignado a Técnico",
            fecha: `${aviso.asignado_el}`,
            descripcion: "Se ha asignado a un técnico.",
            completado: true
        });
    } else {
        etapas.value.push({
            id: "A",
            titulo: "Asignado a Técnico",
            fecha: "-",
            descripcion: "Pendiente de asignar a un técnico.",
            completado: false
        });
    }

    if (aviso.estado !== 'Nueva') {
        etapas.value.push({
            id: "P",
            titulo: "En Proceso",
            fecha: `${aviso.inicio_informes}`,
            descripcion: "El técnico está trabajando en el aviso.",
            informes: aviso.informes,
            completado: true
        });
    } else {
        etapas.value.push({
            id: "P",
            titulo: "En Proceso",
            fecha: "-",
            descripcion: "Pendiente de iniciar el trabajo.",
            completado: false
        });
    }

    if (aviso.estado === 'Terminado' || aviso.estado === 'Supervisar') {
        etapas.value.push({
            id: "T",
            titulo: "Finalizado",
            fecha: `${aviso.fin_informes}`,
            descripcion: "El aviso ha sido resuelto y cerrado.",
            completado: true
        });
    } else {
        etapas.value.push({
            id: "T",
            titulo: "Finalizado",
            fecha: "-",
            descripcion: "Pendiente de resolución.",
            completado: false
        });
    }
};

onMounted(()=> cargarDetalle());
onBeforeUnmount(()=>$q.sessionStorage.removeItem("aviso"));
</script>

<style scoped lang="scss">
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

.btn-volver {
    border-radius: 8px; 
    border:none;
    transition: background-color 0.3s ease;
    :hover {
        filter: brightness(0.8);
    }
}
</style>