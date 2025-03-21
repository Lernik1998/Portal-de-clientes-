import { defineStore } from 'pinia';
import { ref } from 'vue';
import CryptoJS from 'crypto-js';

export const useAuthStore = defineStore('auth', () => {
  const user = ref({});

  const getUser = () => user.value;
  const setUser = (val) => user.value = val; 
  const codificar = (pwd) => {
    return CryptoJS.SHA256(pwd).toString(CryptoJS.enc.Hex);
};

  return {getUser, setUser, codificar};
});
