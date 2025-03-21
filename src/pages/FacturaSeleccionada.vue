<template>
    <q-page>
        <div class="q-pa-lg">
            <q-btn class="btn-volver" no-caps icon="arrow_back" @click="router.back()" label="Volver" flat/>
        </div>
        <div class="cabecera">
            <span class="text-h6">{{ datosFactura.numero }}</span>
            <span class="text-subtitle2">{{ datosFactura.cliente }}</span>
        </div>
        <TablaDetalleFactura :items="detalleFactura"/>
    </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from "quasar";
import { useRouter, useRoute } from 'vue-router';
import TablaDetalleFactura from 'src/components/TablaDetalleFactura.vue';

const $q = useQuasar();
const router = useRouter();
const route = useRoute();
const detalleFactura = ref([]);
const datosFactura = ref({});

const cargarDetalles = async () => {
    $q.loading.show();
    const id = route.params.id;
    if(id){
        try{
            const response = await api.get("/facturas.php?id="+id, {withCredentials: true});
            console.log(response.data);
            if(response.data.success){
                if(!response.data.message.error){
                    detalleFactura.value = response.data.message.lineas_factura;
                    datosFactura.value = response.data.message.datos;
                }
            }
        }catch(error){
            console.log("Error:", error);
        }
    }
    $q.loading.hide();
};

onMounted(()=>{
    cargarDetalles();
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

</style>