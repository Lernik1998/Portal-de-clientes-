<template>
    <q-item clickable v-ripple>
        <q-item-section>
            <q-item-label>{{ factura.numero }}</q-item-label>
            <span class="text-caption">{{ factura.fecha}}</span>
            <span class="text-caption" v-if="factura.estado != ''">Estado pago: {{ factura.estado }}</span>
            <span class="text-caption">BASE: {{ factura.base }}</span>
            <span class="text-caption">IVA: {{ factura.iva }}</span>
            <span class="text-caption">Total: {{ factura.total }}</span>
        </q-item-section>
    </q-item>
</template>

<script setup>
const props = defineProps({
    factura: {
        type: Object,
        required: true
    }
});
</script>