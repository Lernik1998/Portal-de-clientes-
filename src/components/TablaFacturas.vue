<template>
    <q-table :rows="itemsFiltrados" :columns="columnas" row-key="name" :filter="filtro" v-model:pagination="pagination" 
    no-data-label="No hay datos para mostrar." hide-pagination flat class="tabla">
        <template v-slot:top-right>
            <q-space />
            <q-input dense debounce="300" color="primary" v-model="filtro">
            <template v-slot:append>
                <q-icon name="search" />
            </template>
            </q-input>
        </template>
        <template v-slot:bottom>
            <div class="row justify-center q-mt-md" style="width: 100%;">
                <q-pagination
                    v-model="pagination.page"
                    direction-links
                    color="grey-8"
                    active-color="primary"
                    flat
                    :max="pagesNumber"
                />
            </div>
        </template>
        <template v-slot:body-cell-base="props">
            <q-td :props="props">
              {{ props.row.base.toFixed(2) }}
            </q-td>
        </template>
        <template v-slot:body-cell-iva="props">
            <q-td :props="props">
              {{ props.row.iva.toFixed(2) }}
            </q-td>
        </template>
        <template v-slot:body-cell-total="props">
            <q-td :props="props">
              {{ props.row.total.toFixed(2) }}
            </q-td>
        </template>
        <template v-slot:body-cell-ver="props">
            <q-td style="max-width: 50px;">
                <button class="boton-tabla azul" @click="abrirItem(props.row)">Detalles</button>
            </q-td>
        </template>
        <template v-slot:body-cell-pdf="props">
            <q-td style="max-width: 50px;">
                <q-btn unelevated class="boton-tabla gris" icon="print" @click="abrirPdf(props.row)"></q-btn>
            </q-td>
        </template>
    </q-table>
</template>

<script setup>
import { ref, computed } from 'vue';
const filtro = ref("");
const props = defineProps({
    items: {
        type: Array,
        required: true
    }
});
const emit = defineEmits(["abrir", "imprimir"]);

const estadoFiltro = ref(0);
const itemsFiltrados = computed(()=>{
    console.log(props.items);
    switch(estadoFiltro.value){
        //Cambiar lógica de filtrado
    }
    return props.items;
});
const pagination = ref({
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 15
});
const pagesNumber = computed(() => Math.ceil(itemsFiltrados.value.length / pagination.value.rowsPerPage));
const abrirItem = (item) => {
    emit('abrir', item);
};
const abrirPdf = (item) => {
    emit('imprimir', item);
};
const actualizarFiltro = (estado) => {
    estadoFiltro.value = estado;
};
const columnas = [
    {
        name: "cod",
        label: "Código",
        field: "numero",
        align: "center"
    },
    {
        name: "fch",
        label: "Fecha",
        field: "fecha",
        align: "center"
    },
    {
        name: "hor",
        label: "Hora",
        field: "hora",
        align: "center"
    },
    {
        name: "base",
        label: "Base",
        field: "base",
        align: "center"
    },
    {
        name: "iva",
        label: "IVA",
        field: "iva",
        align: "center"
    },
    {
        name: "tot",
        label: "Total",
        field: "total",
        align: "center"
    },
    {
        name: "ver"
    },
    {
        name: "pdf"
    }
];
</script>

<style scoped lang="scss">
.boton-tabla {
    border-radius: 8px; 
    border:none;
    margin: 5px;
    color: #000;
    transition: background-color 0.3s ease;
}
.boton-tabla:hover {
    filter: brightness(0.8);
}

.azul {
    background-color: #ADD8E6;
}
.naranja {
    background-color: #f0be77;
}
.verde {
    background-color: #d4edda;
}
.gris {
    background-color: #D3D3D3;
}

</style>