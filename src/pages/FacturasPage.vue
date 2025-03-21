<template>
    <q-page class="q-pa-md">
        <div class="cabecera">
            <span class="text-h6">Facturas</span>
            <span class="text-subtitle2">Consulte todas sus facturas</span>
        </div>
        <div id="tabla-facturas">
            <TablaFacturas :items="facturas" @abrir="abrirDetalle" @imprimir="imprimirPdf"/>
        </div>
        <div id="lista-facturas">
            <q-list bordered separator>
                <TarjetaFactura v-for="factura in facturas" :key="factura.numero" :factura="factura"/>
            </q-list>
        </div>
        <q-dialog v-model:model-value="abrirFactura" full-width>
            <q-card>
                <q-bar>
                    <div></div>
                    <q-space />
                    <q-btn dense flat icon="close" @click="detalleFactura = null">
                        <q-tooltip>Cerrar</q-tooltip>
                    </q-btn>
                </q-bar>
                <TablaDetalleFactura :items="detalleFactura"/>
            </q-card>
        </q-dialog>
        <q-dialog persistent v-model:model-value="abrirPdf" full-width>
            <q-card>
                <q-bar>
                    <div></div>
                    <q-space />
                    <q-btn dense flat icon="close" @click="id = 0">
                        <q-tooltip>Cerrar</q-tooltip>
                    </q-btn>
                </q-bar>
                <embed type="application/pdf" :src="'https://apiclientes.fernandomoll.es/facturas.php?id='+id+'&pdf=true'" width="100%" height="700">
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from "quasar";
import TarjetaFactura from 'src/components/TarjetaFactura.vue';
import { useRoute, useRouter } from 'vue-router';
import TablaFacturas from 'src/components/TablaFacturas.vue';
import TablaDetalleFactura from 'src/components/TablaDetalleFactura.vue';

const router = useRouter();
const route = useRoute();
const $q = useQuasar();
const facturas = ref([]);
const numFacturas = ref(0);
const cargados = ref(20);
const paginacion = ref(1);
const cargando = ref(false);
const detalleFactura = ref(null);
const abrirFactura = computed(()=> detalleFactura.value !== null);
const abrirPdf = computed(()=> id.value !== 0);
const id = ref(0);

const cargarFacturas = async () => {
    if (cargando.value) return;
    $q.loading.show();
    cargando.value = true;
    try{
        const response = await api.get("/facturas.php", {withCredentials:true});
        if(response.data.success){
            numFacturas.value = response.data.message.total;
            facturas.value = response.data.message.facturas.sort((a, b) => {
                const parseDate = (dateStr) => {
                    const [day, month, year] = dateStr.split('/');
                    return new Date(`${year}-${month}-${day}`);
                };
                const parseTime = (timeStr) => {
                    const [hours, minutes] = timeStr.split(':');
                    return new Date(1970, 0, 1, hours, minutes);
                };
                const dateDiff = parseDate(b.fecha) - parseDate(a.fecha);
                if (dateDiff !== 0) {
                    return dateDiff;
                }
                return parseTime(b.hora) - parseTime(a.hora);
            });
        }
        console.log("Facturas: ", facturas.value);
    }catch(error){
        console.log("Error:", error);
    }
    cargando.value = false;
    $q.loading.hide();
};

const abrirDetalle = (factura) => {
    const jsonFactura = JSON.stringify(factura);
    router.push(route.path+"/"+factura.id);
};

const imprimirPdf = (factura) => {
    console.log(factura);
   /* $q.loading.show();
    const id = factura.id;
    if(id){
        try{
            const response = await api.get("/facturas.php?id="+id+"&pdf=true", {withCredentials: true, responseType: 'blob'});
            if (response.data) {
                const pdfBlob = response.data;
                const pdfUrl = URL.createObjectURL(pdfBlob);
                window.open(pdfUrl);
            }
        }catch(error){
            console.log("Error:", error);
        }
    }  
    $q.loading.hide(); */
    id.value = factura.id;
};

const paginar = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (!cargando.value && scrollPosition >= documentHeight - 10 && cargados.value <= numFacturas.value) {
        paginacion.value += 1;
        cargados.value += 20;
        cargarAvisos();
    }
};

onMounted(() => {
  if (window.innerWidth < 820) {
    window.addEventListener('scroll', paginar);
  }
  cargarFacturas();
});

onUnmounted(() => {
  if (window.innerWidth < 820) {
    window.removeEventListener('scroll', paginar);
  }
});
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


#lista-facturas {
    display: none;
}

@media (max-width: 820px) {
    #lista-facturas {
        display: contents;
    }
    #tabla-facturas {
        display: none;
    }
}
</style>