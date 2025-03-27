<template>
    <q-layout view="lHh Lpr lff">
      <q-header>
      <q-toolbar>
        <q-toolbar-title>
          <div class="cabecera">
            <img src="../assets/fenando_moll.png" class="logo1">
            <img src="../assets/powered.png" class="logo2">
            <!-- Switcher para idiomas -->
            <!-- <q-btn
              flat
              round
              dense
              color="black"
              icon="language"
              @click="toggleLanguage"
            /> -->

            <!-- Select para idiomas -->
            <!-- <q-select
              v-model="locale"
              :options="lenguajeStore.availableLocales"
              emit-value
              map-options
              options-label="name"
              options-value="value"
              @update:modelValue="toggleLanguage"
            /> -->
          </div>
        </q-toolbar-title>
        <!-- Idiomas -->
        <q-btn-dropdown unelevated class="bg-white text-blue-10 text-weight-bold" icon="language">
          <q-list>
            <q-item v-for="(item, index) in translatedIdiomas" :key="index" clickable v-close-popup @click="item.action">
              <q-item-section avatar>
                <q-icon :name="'img:' + item.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ item.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
      </q-btn-dropdown>
      </q-toolbar>
    </q-header>
      <q-page-container class="global">
        <router-view />
      </q-page-container>
      <!-- Footer -->
      <q-footer class="q-pa-lg pie">
          <div class="capa1">
            <div class="caja-texto">
            <div id="soporte" class="subtitulo centrado"><b>soporte</b>@fernandomoll.com</div>
          </div>
          <div class="caja-imagen">
            <img src="../assets/telefono.png" class="logo3">
          </div>
          </div>
          <div class="capa2">
            <img src="../assets/grupo_fm.png" class="logo4">
          </div>
      </q-footer>
    </q-layout>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { useLanguageStore } from 'src/stores/lenguajes'

const lenguajeStore = useLanguageStore()
const { locale } = useI18n()

import esFlag from '../assets/idiomas/es.png';
import valFlag from '../assets/idiomas/val.png';
import enFlag from '../assets/idiomas/en.png';


const translatedIdiomas = computed(() => [
  { label: "Español", icon: esFlag, value: "es-ES", action: () => toggleLanguage("es-ES")},
  { label: "Valenciano", icon: valFlag, value: "va-ES", action: () => toggleLanguage("va-ES")},
  { label: "Inglés", icon: enFlag, value: "en-US", action: () => toggleLanguage("en-US")}
]);

const toggleLanguage = (value) => {
  console.log('Idioma actual:', locale.value)
  locale.value = value;
  lenguajeStore.setLocale(value);
  console.log('Idioma actualizado:', locale.value);
}

</script>

<style scoped lang="scss">
.global {
  background-color: #F9FAFB;
}
.cabecera {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
}

.logo1 {
  max-width: 200px;
  height: auto;
  padding: 10px;
  object-fit: contain;
}
.logo2 {
  max-width: 170px;
  height: auto;
  padding: 10px;
  object-fit: contain;
}
.logo3 {
  max-width: 170px;
  height: auto;
  padding: 10px;
}
.logo4 {
  max-width: 170px;
  height: auto;
  padding: 10px;
}

.pie{
  display: flex;
  flex-direction: column;
  background-color: transparent;
  color: #000;
}
.capa1 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.capa2 {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.centrado {
  align-content: center;
}

.caja-texto, .caja-imagen {
  max-width: 50%;
  overflow: hidden;
  align-content: center;
}

@media (max-width: 600px) {
  .cabecera {
    justify-content: center;
    text-align: center;
  }
  .subtitulo {
    font-size: 0.6rem;
    margin: 0 auto;
  }
  .logo1 {
    max-width: 35%;
    height: auto;
    margin: 0 auto;
    align-self: baseline;
  }
  .logo2 {
    max-width: 35%;
    height: auto;
    margin: 0 auto;
    align-self: baseline;
    object-fit: contain;
  }
  .logo3 {
    max-width: 80%;
    width: 150px;
  }
  .logo4 {
    max-width: 35%;
    height: auto;
    margin: 0 auto;
    align-self: baseline;
    object-fit: contain;
  }
}

@media (max-width: 450px){
  .capa1{
    margin: 0 auto;
    img {
      margin: auto 0;
    }
    #soporte{
      text-align: center;
    }
  }
}
</style>
