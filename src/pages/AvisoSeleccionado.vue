<template>
    <q-page class="pagina-detalle">
        <div class="q-pa-lg">
            <q-btn class="btn-volver" no-caps icon="arrow_back" @click="router.back()" :label="$t('detalleAviso.boton_volver')" flat/>
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
                    <div class="text-h6">{{ $t('detalleAviso.titulo_detalles') }}</div>
                    <div class="text-subtitle1">{{ parteSeleccionado.descripcion }}</div>
                    <div class="text-overline text-center">{{ $t('detalleAviso.titulo_piezas') }}</div>
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
import { ref, onMounted, onBeforeUnmount,computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useAvisoStore } from 'src/stores/avisos';

// Gestión de idioma
import { useI18n } from 'vue-i18n';
import { useLanguageStore } from 'src/stores/lenguajes';
const { locale,t } = useI18n();
const languageStore = useLanguageStore();

const route = useRoute();
const router = useRouter();
const avisosStore = useAvisoStore();
const $q = useQuasar();
const etapas = ref([]);
const parteSeleccionado = ref({
    codigo: '',
    lineas: []
});

const columns = computed(() => [
    { name: "articulo", label: t('detalleAviso.columnas.articulo'), align: "left", field: "articulo" },
    { name: "cantidad", label: t('detalleAviso.columnas.cantidad'), align: "left", field: "cantidad" },
    { name: "estado", label: t('detalleAviso.columnas.estado'), align: "left", field: "estado" }
]);


// const columns = computed(() => [
//     { name: "articulo", label: 'A', align: "left", field: "articulo" },
//     { name: "cantidad", label: 'B', align: "left", field: "cantidad" },
//     { name: "estado", label: 'C', align: "left", field: "estado" }
// ]);

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
        titulo: t('detalleAviso.etapas.creado.titulo'),
        fecha: `${aviso.creado}`,
        descripcion: t('detalleAviso.etapas.creado.descripcion'),
        completado: true
    });

    if (aviso.asignado) {
        etapas.value.push({
            id: "A",
            titulo: t('detalleAviso.etapas.asignado.titulo'),
            fecha: `${aviso.asignado_el}`,
            descripcion: t('detalleAviso.etapas.asignado.descripcion.asignado'),
            completado: true
        });
    } else {
        etapas.value.push({
            id: "A",
            titulo: t('detalleAviso.etapas.asignado.titulo'),
            fecha: "-",
            descripcion: t('detalleAviso.etapas.asignado.descripcion.pendiente'),
            completado: false
        });
    }

    if (aviso.estado !== 'Nueva') {
        etapas.value.push({
            id: "P",
            titulo: t('detalleAviso.etapas.proceso.titulo'),
            fecha: `${aviso.inicio_informes}`,
            descripcion: t('detalleAviso.etapas.proceso.descripcion.iniciado'),
            informes: aviso.informes,
            completado: true
        });
    } else {
        etapas.value.push({
            id: "P",
            titulo: t('detalleAviso.etapas.proceso.titulo'),
            fecha: "-",
            descripcion: t('detalleAviso.etapas.proceso.descripcion.pendiente'),
            completado: false
        });
    }

    if (aviso.estado === 'Terminado' || aviso.estado === 'Supervisar') {
        etapas.value.push({
            id: "T",
            titulo: t('detalleAviso.etapas.finalizado.titulo'),
            fecha: `${aviso.fin_informes}`,
            descripcion: t('detalleAviso.etapas.finalizado.descripcion.resuelto'),
            completado: true
        });
    } else {
        etapas.value.push({
            id: "T",
            titulo: t('detalleAviso.etapas.finalizado.titulo'),
            fecha: "-",
            descripcion: t('detalleAviso.etapas.finalizado.descripcion.pendiente'),
            completado: false
        });
    }
};

onMounted(()=> {
    cargarDetalle();
    // Montado del idioma seleccionado
    locale.value = languageStore.locale;
});
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