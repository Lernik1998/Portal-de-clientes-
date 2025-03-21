<template>
    <q-layout view="lHh Lpr lff">
      <q-header>
      <q-toolbar>
        <q-toolbar-title>
          <div class="cabecera">
            <img src="../assets/fenando_moll.png" class="logo1">
            <img src="../assets/powered.png" class="logo2">
          </div>
        </q-toolbar-title>
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
