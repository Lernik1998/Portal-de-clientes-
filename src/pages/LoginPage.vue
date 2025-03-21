<template>
  <q-page class="pagina-login" style="background-image: url('https://apiclientes.fernandomoll.es/fondo.php');">
    <section class="user">
      <!--<figure class="contenedor-logo"><img class="logo" src="{SC_LIB_CURRENT}login/img/SBS-hr-logo.png" alt="" width="250px"></figure>-->
      <div class="user_options-container" >
          <div class="user_options-text">
            <div class="user_options-unregistered">
              <h2 class="user_unregistered-title">No estás con nosotros?</h2>
              <p class="user_unregistered-text">La mejor solución disponible para gestionar los clientes de tu empresa.</p>
              <button class="user_unregistered-signup" id="signup-button" onclick="submitForm('enviar')" >Contáctanos</button>
            </div>
      
            <div class="user_options-registered">
              <h2 class="user_registered-title">¿ Ya tienes una cuenta ?</h2>
              <p class="user_registered-text">Disfruta de tus beneficios en nuestra App accediendo.</p>
              <button class="user_registered-login" id="login-button" onclick="submitForm('login')" >Login</button>
            </div>
          </div>
      
          <div class="user_options-forms" id="user_options-forms">
            <div style="padding: 5%; width: 100%;" id="login-form">
                <!-- AQUI EMPIEZA EL LOGIN PARA INICIAR SESION-------------------------------------------------------------->
              <h2 class="forms_title">Iniciar sesión</h2>
              <q-form @submit="login" class="forms_form">
                <fieldset class="forms_fieldset control">
                    <q-input
                        v-model="usuario"
                        label="Correo Electrónico"
                        type="email"
                        :rules="[
                            (val) => !!val || 'Este campo es obligatorio',
                            (val) => val.toString().length <= 100 || 'El texto es demasiado largo'
                        ]"
                      />
                      <q-input
                        v-model="contraseña"
                        label="Contraseña"
                        type="password"
                        :rules="[
                            (val) => !!val || 'Este campo es obligatorio',
                            (val) => val.toString().length <= 100 || 'El texto es demasiado largo'
                        ]"
                      />
                 
                </fieldset>
                <div style="display: flex; justify-content: center;">
                  <q-btn
                    dense
                    label="Iniciar Sesión"
                    type="submit"
                    color="#083CC2"
                    class="forms_buttons-action"
                  />
                </div>
              </q-form>
            </div>
          </div>
        </div>
    </section>
   
    <!-- Dialogo de confirmación -->
    <q-dialog v-model="abrirDialogo" persistent>
      <q-card style="padding: 10px;">
        <q-card-section>
          <p>Correo enviado correctamente. Revise su bandeja de correo no deseado si no lo encuentra.</p>
        </q-card-section>
        <q-form @submit="validar" ref="formValidation" :key="formValidationKey">
          <q-card-section>
              <q-input
                id="codigo"
                v-model="validacion"
                label="codigo de verificación"
                type="number"
                :rules="[
                  (val) => !!val || 'Este campo es obligatorio',
                  (val) => val >= 0 || 'No se permiten números negativos',
                  (val) => val.toString().length <= 6 || 'El número no es valido'
                ]"
              />
            
            
          </q-card-section>
          <q-card-actions>
            <q-btn label="Validar" type="submit" color="primary" class="forms_buttons-action"/>
            <q-btn label="Cancelar" type="reset" color="negative" outline @click="cancelar" class="forms_buttons-action"/>
            <q-space/>
            <div style="display:flex; justify-content: end; align-items: center;">¿No has recibido el correo? <p @click="login" class="reenviar"> Reenviar </p></div>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useReCaptcha } from "vue-recaptcha-v3";
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';
import { useAuthStore } from 'src/stores/auth';

const $q = useQuasar();
const router = useRouter();
const {executeRecaptcha} = useReCaptcha();
const authStore = useAuthStore();
const abrirDialogo = ref(false);
const formValidation = ref(null);
const formValidationKey = ref(0);
const usuario = ref("");
const contraseña = ref("");
const validacion = ref();

const resetForm = () => {
    formValidation.value.resetValidation();
    validacion.value = '';
    formValidationKey.value++;
};
const cancelar = () => {
  resetForm();
  abrirDialogo.value = false;
};

const validar = async () => {
  $q.loading.show();
  try{
    const token = await executeRecaptcha('submit_form');
    const response = await api.post('/validate_login.php', {
        recaptchaToken: token,
        codigo: validacion.value
    }, {withCredentials:true});
    if(response.data.success){
      router.push("/dashboard");
    }else{
      $q.notify({
          color: 'red',
          position: 'top',
          message: response.data.message,
          icon: 'report_problem'
      });
    }
  } catch(error){
    console.error('Error:', error);
    $q.notify({
          color: 'red',
          position: 'top',
          message: 'Error :' +error,
          icon: 'report_problem'
      });
  }
  $q.loading.hide();
};

const login = async () => {
 $q.loading.show();
 console.log({
        usuario: usuario.value,
        contraseña: authStore.codificar(contraseña.value)
    });
 try{
    const token = await executeRecaptcha('submit_form');
    const response = await api.post('/login.php', {
        recaptchaToken: token,
        usuario: usuario.value,
        contraseña: authStore.codificar(contraseña.value)
    }, {withCredentials:true});
    console.log('Verificación', response.data);
    if(response.data.success){
      let validado = response.data.message.validado;
      if(validado){
        router.push("/dashboard");
      }else{
        if(!abrirDialogo.value) {
          abrirDialogo.value = true;
        }
        else {
          $q.notify({
            color: 'green',
            position: 'top',
            message: "Se ha reenviado el correo a "+usuario.value,
            icon: 'mobile_screen_share'
          });
        }
      }
    } else{
      $q.notify({
        color: 'red',
        position: 'top',
        message: response.data.message,
        icon: 'report_problem'
      });
    }
 }catch(error){
    console.error('Error:', error);
    $q.notify({
          color: 'red',
          position: 'top',
          message: 'Error :' +error,
          icon: 'report_problem'
      });
 }
 $q.loading.hide();
};

onMounted(()=> {});
</script>

<style scoped>
.reenviar {
  padding-left: 10px;
  text-decoration: underline;
  margin-bottom: 0px;
}
.reenviar:hover {
  text-decoration: none;
  margin-bottom: 0px;
}

.pagina-login {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 1em;
  min-width: 1024px;
  min-height: 576px;
  background-size: cover;
  background-position: center; 
  background-repeat: no-repeat;
  background-attachment: fixed;
}


/******************* */
fieldset {
    display: block; 
    margin: 0; 
    padding: 0; 
    border: none;
    min-width: 0;
    -webkit-appearance: none; 
    -moz-appearance: none; 
    appearance: none; 
  }

/* Si también deseas personalizar el legend dentro del fieldset */

button {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
  cursor: pointer;
}

input {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
}
input[type=submit] {
  cursor: pointer;
}
input::-moz-placeholder {
  font-size: 0.85rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}
input:-ms-input-placeholder {
  font-size: 0.85rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}
input::placeholder {
  font-size: 0.85rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}

.user {
	display: grid;
	height: 100vh; 
	width: 100%;
}
.contenedor-logo{
  display: flex;
  align-items: flex-end;
  justify-content: center;

}
.user_options-container {
  position: relative;
  width: 70%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: center;	
 
}
.user_options-text {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #083CC2;
  border-radius: 3px;
}

/**
 * * Registered and Unregistered user box and text
 * */
.user_options-registered,
.user_options-unregistered {
  width: 50%;
  padding: 75px 45px;
  color: #fff;
  font-weight: 300;
  height: max-content;
  min-height: 295px;
}

.user_registered-title,
.user_unregistered-title {
  margin-bottom: 15px;
  font-size: 1.66rem;
  line-height: 1em;
}

.user_unregistered-text,
.user_registered-text {
  font-size: 0.83rem;
  line-height: 1.4em;
}

.user_registered-login,
.user_unregistered-signup {
  margin-top: 30px;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px 30px;
  color: #fff;
  text-transform: uppercase;
  line-height: 1em;
  letter-spacing: 0.2rem;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}
.user_registered-login:hover,
.user_unregistered-signup:hover {
  color: #083CC2;
  background-color: #ccc;
}

/**
 * * Login and signup forms
 * */
 .user_options-forms {
    margin-left: -50%;
    width: calc(50% - 30px);
    min-height: 320px;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 2px 0 15px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    
  }
.user_options-forms .user_forms-login {
  -webkit-transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
}
.user_options-forms .forms_title {
  margin-bottom: 45px;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1em;
  text-transform: uppercase;
  color: #083CC2;
  letter-spacing: 0.1rem;
}
.user_options-forms .forms_field:not(:last-of-type) {
  margin-bottom: 20px;
}
.user_options-forms .forms_field-input {
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 6px 20px 6px 6px;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: gray;
  letter-spacing: 0.1rem;
  -webkit-transition: border-color 0.2s ease-in-out;
  transition: border-color 0.2s ease-in-out;
}
.user_options-forms .forms_field-input:focus {
  border-color: gray;
}
.user_options-forms .forms_buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 35px;
  gap: 10px;
  flex-wrap: wrap;
}
.user_options-forms .forms_buttons-forgot {
  font-family: "Montserrat", sans-serif;
  letter-spacing: 0.1rem;
  color: #ccc;
  text-decoration: underline;
  -webkit-transition: color 0.2s ease-in-out;
  transition: color 0.2s ease-in-out;
}
.user_options-forms .forms_buttons-forgot:hover {
  color: #b3b3b3;
}
.user_options-forms .forms_buttons-action {
  background-color: #083CC2;
  border-radius: 3px;
  padding: 10px 35px;
  font-size: 1rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  -webkit-transition: background-color 0.2s ease-in-out;
  transition: background-color 0.2s ease-in-out;
}
.user_options-forms .forms_buttons-action:hover {
  background-color: #062d91;
}

/* Estilos responsivos para pantallas menores a 800px */
@media (max-width: 800px) {
  .pagina-login {
    display: flex;
    flex-direction: column;
    min-width: 100%;
    min-height: 100vh;
    justify-content: center;
  }

  .user {
    align-items: center;
    flex-direction: column;
    height: auto !important;
    width: auto;
    padding-bottom: 20px;
  }

  .contenedor-logo {
    padding-bottom: 10%;
	padding-top: 30px;
  }
  .user_options-registered {
    width: auto;
    order: 1;
  }
  .user_options-unregistered {
    width: auto;
    order: 2;
  }

  .user_options-container {
    width: 80%;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
  }

  .user_options-text {
      flex-direction: column;
      align-items: center;
      text-align: center;
  }

  .user_unregistered-signup, .user_registered-login  {
    width: 100%;
    margin-bottom: 10px;
  }


  .user_options-forms {
      margin: 0;
      margin-left: 20px;
      margin-right: 20px;
      width: 90%;
      position: relative;
      z-index: 10;
      margin-bottom: -340px;
  }
  .forms_title {
    text-align: center;
  }
  .forms_buttons {
    display: flex;
    justify-content: center !important;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 10px;
    position: relative;
    z-index: 1;
  }

}

</style>