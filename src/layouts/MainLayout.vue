<template>
  <!-- <q-layout view="lHh Lpr lFf"> -->
    <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer"/>
        <q-toolbar-title>
          <div style="display: flex; justify-content: start; align-items:center">
            <img src="../assets/fenando_moll.png" class="logo1">
            <div id="sbs-logo">
              <img src="../assets/powered.png" class="logo2">
            </div>
          </div>
        </q-toolbar-title>
        <q-btn-dropdown color="primary" :label="buttonLabel" unelevated>
          <q-list>
            <q-item v-for="(item, index) in dropdownItems" :key="index" clickable v-close-popup @click="item.action">
              <q-item-section avatar>
                <q-icon :name="item.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ item.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
      </q-btn-dropdown>
      </q-toolbar>
    </q-header>
    <!-- drawer con las pestañas para pantalla móvil-->
    <q-drawer v-model="drawerOpen" behavior="mobile" show-if-above bordered @click="toggleLeftDrawer" >
      <q-list>
        <q-item-label header> Secciones </q-item-label>
        <q-item clickable v-ripple v-for="tab in tabs" :key="tab.name" :to="tab.to">
          <q-item-section avatar>
            <q-icon :name="tab.icon" />
          </q-item-section>
          <q-item-section>{{ tab.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- cuadros de dialogo -->
    <q-dialog v-model="dialogoAbierto" persistent>
      <q-card style="min-width: 300px;">
        <q-card-section>
          <div class="text-h6">Cambiar contraseña</div>
        </q-card-section>
        <q-form @submit.prevent="guardarContraseña" ref="form" :key="formKey">
          <q-card-section>
            <label for="viejaContraseña" style="padding-left: 12px" >Contraseña actual</label>
            <q-input
            id="viejaContraseña"  outlined
            v-model="contraseñaActual"  type="password" filled
            :rules="[
            (val) => !!val || 'Este campo es obligatorio',
            (val) => val.toString().length <= 40 || 'El texto es demasiado largo'
            ]"/>
            <label for="nuevaContraseña" style="padding-left: 12px" >Contraseña nueva</label>
            <q-input id="nuevaContraseña" outlined
            v-model="nuevaContraseña" type="password" filled
            :rules="[
            (val) => !!val || 'Este campo es obligatorio',
            (val) => val.toString().length <= 40 || 'El texto es demasiado largo'
            ]"/>
            <label for="confirmarContraseña" style="padding-left: 12px" >Confirmar contraseña</label>
            <q-input id="confirmarContraseña" outlined
            v-model="confirmarContraseña" type="password" filled
            :rules="[
            (val) => !!val || 'Este campo es obligatorio',
            (val) => val.toString().length <= 40 || 'El texto es demasiado largo'
            ]"/>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn label="Enviar" type="submit" color="primary" />
            <q-btn label="Cancelar" type="reset" color="negative" outline @click="dialogoAbierto = false" class="q-ml-sm"/>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>


    <q-page-container class="global">
      <router-view />
    </q-page-container>

    <!-- Footer -->
    <q-footer reveal class="q-pa-lg pie" >
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
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "src/stores/auth";
import { api } from "src/boot/axios";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import { useReCaptcha } from "vue-recaptcha-v3";

// Componentes

const $q = useQuasar();
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const {executeRecaptcha} = useReCaptcha();
const drawerOpen = ref(false);
const smallScreen = computed(()=>$q.screen.lt.sm);
const buttonLabel = computed(() => {
    return smallScreen.value && authStore.getUser() ? '' : authStore.getUser().nombre;
});
const formKey = ref(0);
const dialogoAbierto = ref(false);
const contraseñaActual = ref("");
const nuevaContraseña = ref("");
const confirmarContraseña = ref("");

const dropdownItems = [
  { label: "Cambiar contraseña", icon: "vpn_key", action: () => abrirDialogo()},
  { label: "Cerrar sesión", icon: "logout", action: () => cerrarSesion()},
];

const tabs = [
  { name: "dashboard", label: "Dashboard", icon: "dashboard", to: "/dashboard"},
  { name: "servicios", label: "Servicios", icon: "computer", to: "/dashboard/equipos" },
  { name: "avisos", label: "Avisos", icon: "warning", to: "/dashboard/avisos" },
  { name: "facturas", label: "Facturas", icon: "receipt", to: "/dashboard/facturas" },
];

const cerrarSesion = async () => {
  try{
    const response = await api.get('/logout.php', { withCredentials: true });
    console.log(response.data);
    const autenticado = response.data.message.autenticado;
    const usuario = response.data.message.usuario;
    if(!autenticado){
      authStore.setUser(usuario);
      router.push("/");
    }
  }catch(error){
    console.error('Error al cerrar sesión:', error);
  }

};

const guardarContraseña = async () => {
  if (nuevaContraseña.value !== confirmarContraseña.value) {
    $q.notify({
      type: "negative",
      message: "Las contraseñas no coinciden.",
    });
    return;
  }
  try {
    const token = await executeRecaptcha('submit_form');
    const response = await api.post("/usuario/cambiar_pwd.php", {
      recaptchaToken: token,
      old_pwd: authStore.codificar(contraseñaActual.value),
      new_pwd: authStore.codificar(nuevaContraseña.value),
    }, {withCredentials: true});
    console.log('Verificación', response.data);
    if (response.data.success && response.data.message.status == "OK") {
      $q.notify({
        type: "positive",
        message: "Contraseña cambiada exitosamente.",
      });
      dialogoAbierto.value = false;
    } else {
      $q.notify({
        type: "negative",
        message: "Error al cambiar contraseña.",
      });
    }
  } catch (error) {
    console.error("Error al cambiar contraseña:", error);
    $q.notify({
      type: "negative",
      message: "Error al cambiar contraseña.",
    });
  }
};

function toggleLeftDrawer() {
  drawerOpen.value = !drawerOpen.value;
}
const abrirDialogo = () => {
  dialogoAbierto.value = true;
};

onMounted(()=> {
  drawerOpen.value = false;
});
</script>

<style scoped>
.global {
  background-color: #F9FAFB;
}

#sbs-logo {
  width: 100%;
  display: flex;
  justify-content: center;
  align-self: end;
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
  align-self: flex-end;
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

/* Footer */

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
  margin-left: 15px;
  margin-top: 10px;
}

.caja-texto, .caja-imagen {
  max-width: 50%;
  overflow: hidden;
  align-content: center;
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
    margin-top: auto;
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
</style>