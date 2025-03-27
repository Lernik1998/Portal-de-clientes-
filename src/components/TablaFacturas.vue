<template>
    <q-table dense :rows="itemsFiltrados" :columns="columnas" row-key="name" :filter="filtro" v-model:pagination="pagination"
    no-data-label="No hay datos disponibles" hide-pagination flat class="tabla">

        <template v-slot:top-right>
            <q-space />
            <q-input dense debounce="300" color="primary" v-model="filtro">
            <template v-slot:append>
                <q-icon name="search" />
            </template>
            <template #before></template>
            </q-input>
        </template>

        <template v-slot:bottom>
            <div class="row justify-center q-mt-md" style="width: 100%;">
                <q-pagination
                    v-model="pagination.page"
                    direction-links
                    active-text-color="blue"
                    text-color="black"
                    active-color="transparent"
                    flat
                    :max="pagesNumber"
                />
            </div>
        </template>
        <template v-slot:body-cell-base="props">
            <q-td :props="props">
              {{ props.row.base.toFixed(2) }} €
            </q-td>
        </template>
        <template v-slot:body-cell-iva="props">
            <q-td :props="props">
              {{ props.row.iva.toFixed(2) }} €
            </q-td>
        </template>
        <template v-slot:body-cell-tot="props">
            <q-td :props="props">
              {{ props.row.total.toFixed(2) }} €
            </q-td>
        </template>

        <template v-slot:body-cell-ver="props">
            <q-td style="max-width: 50px;">
                <button class="boton-tabla azul" id="btn1" @click="abrirItem(props.row)">{{ t('tablaFacturas.columnas.detalles') }}</button>
            </q-td>
        </template>
        <template v-slot:body-cell-pdf="props">
            <q-td style="max-width: 50px;">
                <q-btn unelevated class="boton-tabla gris" icon="print" id="btn2" @click="abrirPdf(props.row)"></q-btn>
            </q-td>
        </template>
    </q-table>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from "vue-i18n";

// Variables
const { locale, t } = useI18n();
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
    // console.log(props.items);
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
const columnas = computed(() => [
    {
        name: "cod",
        label: t('tablaFacturas.columnas.cod'),
        field: "numero",
        align: "center"
    },
    {
        name: "fch",
        label: t('tablaFacturas.columnas.fch'),
        field: "fecha",
        align: "center"
    },
    {
        name: "hor",
        label: t('tablaFacturas.columnas.hor'),
        field: "hora",
        align: "center"
    },
    {
        name: "base",
        label: t('tablaFacturas.columnas.base'),
        field: "base",
        align: "center"
    },
    {
        name: "iva",
        label: t('tablaFacturas.columnas.iva'),
        field: "iva",
        align: "center"
    },
    {
        name: "tot",
        label: t('tablaFacturas.columnas.tot'),
        field: "total",
        align: "center"
    },
    {
        name: "ver",
        align: "center"
    },
    {
        name: "pdf",
        align: "center"
    }
]);

onMounted(() => {
  console.log("Facturas obt componente padre:",props);
   // Establecer el idioma al inicio
   locale.value = locale.value === "es-ES" ? "en-US" : "es-ES";
  console.log("Idioma actual pasado al LoginPage:", locale.value);
});
</script>

<style scoped lang="scss">
.boton-tabla {
    border-radius: 8px;
    border:none;
    margin: 5px;
    color: #000;
    transition: background-color 0.3s ease;
}

/* Responsivo para pantallas*/

@media (max-width: 1150px) {
  #btn1 {
    font-size: 11px; // Reducir el tamaño del texto
    padding: 2px 2px; // Ajustar el espaciado
    // margin: 2px; // Reducir el margen
    gap: 10px;
    margin-right: 30px;
  }

  #btn2 {
    font-size: 11px; // Reducir el tamaño del texto
    padding: 2px 2px; // Ajustar el espaciado
    // margin: 2px; // Reducir el margen
    gap: 10px;
    margin-left: 10px;
  }

  .q-td {
    padding: 2px; // Ajustar la separación de las celdas
  }
}

@media (max-width: 1000px) {
  #btn1 {
    font-size: 10px; // Reducir el tamaño del texto
    padding: 2px 2px; // Ajustar el espaciado
    margin: 2px; // Reducir el margen
    gap: 10px;

    margin-right: 60px;
  }

  #btn2 {
    font-size: 10px; // Reducir el tamaño del texto
    padding: 1px 1px; // Ajustar el espaciado
    // margin: 2px; // Reducir el margen
    gap: 10px;
    margin-left: 20px;
  }

  .q-td {
    padding: 2px; // Ajustar la separación de las celdas
  }
}


@media (max-width: 800px) {
  .boton-tabla {
    font-size: 3px; // Reducir el tamaño del texto
    // padding: 4px 1px; // Ajustar el espaciado
    // margin: 2px; // Reducir el margen
  }

  #btn1 {
    font-size: 8px; // Reducir el tamaño del texto
    padding: 2px 2px; // Ajustar el espaciado
    // margin: 2px; // Reducir el margen
    gap: 10px;
    // margin-left: 10px;
    margin-right: 60px;
  }

  #btn2 {
    font-size: 8px; // Reducir el tamaño del texto
    padding: 2px 2px; // Ajustar el espaciado
    // margin: 2px; // Reducir el margen
    gap: 10px;
    margin-left: 30px;
  }

  .q-td {
    padding: 4px; // Ajustar la separación de las celdas
  }
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