<template>
    <div class="column botones">
      <q-btn
        v-for="(option, index) in options"
        :key="index"
        :color="option.color || 'primary'"
        :label="option.label"
        glossy
        @click="seleccionar(option.option)"
      />
    </div>
</template>

<script setup>

const emit = defineEmits(["seleccion"]);
const props = defineProps({
options: {
    type: Array,
    required: true,
},
});


function seleccionar(valor) {
    emit('seleccion', valor);
}
</script>

<style scoped>
.botones {
  gap: 3vh;
  margin-top: auto;
  margin-bottom: auto;
}
</style>