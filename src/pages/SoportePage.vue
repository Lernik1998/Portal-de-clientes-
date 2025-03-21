<template>
  <q-page class="column pagina">
    <div class="titulo">
      <h3>Seleccione una opción</h3>
      <h6>{{ equipo.NOM }}</h6>
    </div>
    <div class="cuerpo">
      <q-form @submit.prevent="enviar" ref="form" :key="formKey">
        <label for="contactName" style="padding-left: 12px" >Nombre del Contacto</label>
        <q-input
          id="contactName"
          v-model="formData.contacto"
          outlined
          :rules="[
          (val) => !!val || 'Este campo es obligatorio',
          (val) => val.toString().length <= 100 || 'El texto es demasiado largo'
          ]"
        />
        <label for="contactPhone" style="padding-left: 12px" >Teléfono del Contacto</label>
        <q-input
          id="contactPhone"
          v-model="formData.telefono"
          outlined
          :rules="[
          (val) => !!val || 'Este campo es obligatorio',
          (val) => val.toString().length <= 40 || 'El texto es demasiado largo'
          ]"
        />
        <label for="contactHour" style="padding-left: 12px" >Horario</label>
        <q-input
          id="contactHour"
          v-model="formData.horario"
          outlined
          :rules="[
          (val) => !!val || 'Este campo es obligatorio',
          (val) => val.toString().length <= 40 || 'El texto es demasiado largo'
          ]"
        />
        <label for="problem" style="padding-left: 12px" >Descripción del Problema</label>
        <q-input
          id="problem"
          v-model="formData.descripcion"
          outlined
          type="textarea"
          :rules="[
          (val) => !!val || 'Este campo es obligatorio',
          (val) => val.toString().length <= 1000 || 'El texto es demasiado largo'
          ]"
          autogrow
        />

        <div class="botones-submit">
          <q-btn label="Enviar" type="submit" color="primary" />
          <q-btn
            label="Cancelar"
            type="reset"
            color="negative"
            outline
            @click="cancelar"
            class="q-ml-sm"
          />
        </div>

      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { useReCaptcha } from "vue-recaptcha-v3";

const $q = useQuasar();
const router = useRouter();
const form = ref(null);
const formKey = ref(0);
const {executeRecaptcha} = useReCaptcha();
const equipo = ref({});
const formData = ref({
  contacto: "",
  telefono: "",
  horario: "",
  descripcion: "",
});
const resetForm = () => {
    console.log(form.value);
    form.value.resetValidation();
    formData.value.contacto = '';
    formData.value.telefono = '';
    formData.value.descripcion = '';
    formData.value.horario = '';
    formKey.value++;
};
const cancelar = () => {
  resetForm();
  router.back();
};
const enviar = async () => {
  $q.loading.show();
  try {
    //const auth = $q.sessionStorage.getItem('auth');
    const token = await executeRecaptcha('submit_form');
    const response = await api.post('/soporte.php', {
      recaptchaToken: token,
      //auth: auth,
      tkn: equipo.value.TKN,
      contacto: formData.value.contacto,
      telefono: formData.value.telefono,
      horario: formData.value.horario,
      descripcion: formData.value.descripcion,
    });

    console.log('Verificación', response.data);
    if(response.data.result === "success"){
      $q.notify({
          color: 'green',
          position: 'top',
          message: 'Aviso creado correctamente',
          icon: 'check_circle'
      });
      resetForm();
      router.back();
    } else{
      $q.notify({
          color: 'red',
          position: 'top',
          message: 'Error al crear el aviso',
          icon: 'report_problem'
      });
    }
  } catch (error) {
    console.error('Error:', error);
    $q.notify({
          color: 'red',
          position: 'top',
          message: 'Error al crear el aviso',
          icon: 'report_problem'
      });
  }
  $q.loading.hide();
};

onMounted(() => {
  const data = $q.sessionStorage.getItem("equipo");
  if(data){
    equipo.value = data;
  }else{
    router.back();
  }
});
</script>

<style scooped lang="scss">
//@import "../css/app.scss";
.pagina {
  padding: 0% 5%;
}
.titulo {
  padding: 5vh;
  left: 5%;
  right: 5%;
  text-align: center;
}
.cuerpo {
  gap: 5vh;
  margin-top: auto;
  margin-bottom: auto;
}
.botones_submit {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
}
</style>
