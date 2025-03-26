<template>
    <!-- <q-item clickable v-ripple>
        <q-item-section>
            <q-item-label>{{ factura.numero }}</q-item-label>
            <span class="text-caption">{{ factura.fecha}}</span>
            <span class="text-caption" v-if="factura.estado != ''">Estado pago: {{ factura.estado }}</span>
            <span class="text-caption">BASE: {{ factura.base }} €</span>
            <span class="text-caption">IVA: {{ factura.iva }} €</span>
            <span class="text-caption">Total: {{ factura.total }} €</span>
        </q-item-section>
    </q-item> -->


     <!-- Cambiar q-item-section por q-card-section -->

    <q-card class="tarjeta-factura mb-3">
      <q-card-section @click="abrirItem(factura)" class="text-center">
        <div class="text-h6 ">
          <q-item-label>{{ factura.numero }}</q-item-label>
            <span class=" text-caption text-bold">{{ factura.fecha}}</span>
        </div>
        <div class="text-caption">
          <span v-if="factura.estado != ''">Estado pago: {{ factura.estado }}</span> <br>
          <span>BASE: <b>{{ factura.base.toFixed(2) }}</b> €</span> <br>
          <span>IVA: <b>{{ factura.iva.toFixed(2) }}</b> €</span> <br>
          <span>Total: <b>{{ factura.total.toFixed(2) }}</b> €</span>
        </div>
      </q-card-section>
      <q-card-section class="text-center">
        <q-btn class="boton-tabla gris" icon="print" id="btn2" @click="abrirPdf(factura)" color="primary"></q-btn>
      </q-card-section>
    </q-card>
</template>

<script setup>
const emit = defineEmits(["abrir", "imprimir"]);

const props = defineProps({
    factura: {
        type: Object,
        required: true
    }
});

const abrirItem = (item) => {
    emit('abrir', item);
};
const abrirPdf = (item) => {
    emit('imprimir', item);
};
</script>

<style scoped lang="scss">

.tarjeta-factura:hover {
    transform: scale(1.03);
    margin-top: 8px;
    margin-bottom: 8px;
}
</style>
