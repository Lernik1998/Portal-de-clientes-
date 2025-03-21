<template>
  <q-page class="column pagina">
    <div class="titulo">
      <h3>Solicitar consumibles</h3>
      <h6>{{ equipo.NOM }}</h6>
    </div>
    <div class="cuerpo">
      <q-form @submit="enviar" ref="form" :key="formKey">
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
          (val) => val.toString().length <= 100 || 'El texto es demasiado largo'
          ]"
        />
        <h6 style="margin: 0px;">Artículos</h6>
        <div class="articulos">
          <q-checkbox size="md" v-model="seleccionados" v-for="articulo in articulos"
           :key="articulo.id" :val="articulo.id" :label="articulo.nombre.substring(articulo.nombre.indexOf(' ') + 1)"/>
        </div>
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
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useReCaptcha } from "vue-recaptcha-v3";
import { api } from "src/boot/axios";

const $q = useQuasar();
const router = useRouter();
const {executeRecaptcha} = useReCaptcha();
const form = ref(null);
const formKey = ref(0);
const articulos = ref([]);
const equipo = ref({});
const seleccionados = ref([]);
const formData = ref({
  contacto: "",
  telefono: "",
  horario: "",
  descripcion: "SOLICITUD DE CONSUMIBLES",
});

const resetForm = () => {
    form.value.resetValidation();
    seleccionados.value = [];
    formData.value.contacto = '';
    formData.value.telefono = '';
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
    const token = await executeRecaptcha('submit_form');
    const response = await api.post('/soporte.php', {
      recaptchaToken: token,
      //auth: auth,
      tkn: equipo.value.TKN,
      contacto: formData.value.contacto,
      telefono: formData.value.telefono,
      horario: formData.value.horario,
      descripcion: formData.value.descripcion,
      articulos: seleccionados.value
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
    articulos.value = data.articulos;
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
.botones {
  gap: 5vh;
  margin-top: auto;
  margin-bottom: auto;
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
.articulos {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  max-width: fit-content;
}
.botones-submit {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
}
</style>
