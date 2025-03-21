import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAvisoStore = defineStore('avisos', () => {
  const avisos = ref([]);

  const cargarAvisos = (nuevosAvisos) => {
    avisos.value = nuevosAvisos;
  };
  
  const buscarPorId = (id) => {
    return avisos.value.find((aviso) => aviso.id == id);
  }

  return {avisos, cargarAvisos, buscarPorId};
});
