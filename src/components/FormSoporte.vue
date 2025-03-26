<template>
    <div class="cuerpo">
      <q-form @submit.prevent="enviar" ref="form" :key="formKey">
        <label for="contactName" style="padding-left: 12px" class="texto-descripcion">{{ $t('formSoporte.nombre.label') }}</label>
        <q-input
          id="contactName"
          v-model="formData.contacto"
          outlined
          dense
          :rules="[
          (val) => !!val || $t('formSoporte.nombre.error_obligatorio'),
          (val) => val.toString().length <= 100 || $t('formSoporte.nombre.error_largo')
          ]"
        />
        <label for="contactPhone" style="padding-left: 12px" class="texto-descripcion" >{{ $t('formSoporte.telefono.label') }}</label>
        <q-input
          id="contactPhone"
          v-model="formData.telefono"
          outlined
          dense
          :rules="[
          (val) => !!val || $t('formSoporte.telefono.error_obligatorio'),
          (val) => val.toString().length <= 40 || $t('formSoporte.telefono.error_largo')
          ]"
        />
        <label for="contactHour" style="padding-left: 12px" class="texto-descripcion">{{ $t('formSoporte.horario.label') }}</label>
        <q-input
          id="contactHour"
          v-model="formData.horario"
          outlined
          dense
          :rules="[
          (val) => !!val || $t('formSoporte.horario.error_obligatorio'),
          (val) => val.toString().length <= 40 || $t('formSoporte.horario.error_largo')
          ]"
        />
        <div v-if="!consumibles">
            <label for="problem" style="padding-left: 12px" class="texto-descripcion">{{ $t('formSoporte.problema.label') }}</label>
            <q-input
            id="problem"
            v-model="formData.descripcion"
            outlined
            type="textarea"
            :rules="[
            (val) => !!val || $t('formSoporte.problema.error_obligatorio'),
            (val) => val.toString().length <= 1000 || $t('formSoporte.problema.error_largo')
            ]"
            autogrow
            />
        </div>
        <div v-else>
            <span style="margin: 0px;" class="texto-descripcion">{{ $t('formSoporte.articulos.label') }}</span>
            <div class="articulos">
            <q-checkbox size="md" v-model="seleccionados" v-for="articulo in articulos" dense class="articulo"
            :key="articulo.id" :val="articulo.id" :label="articulo.nombre.substring(articulo.nombre.indexOf(' ') + 1)"/>
            </div>
        </div>

        <div class="botones-submit">
          <q-btn :label="$t('formSoporte.boton_enviar')"  type="submit" color="primary" unelevated dense/>
          <q-btn
            unelevated
            :label="$t('formSoporte.boton_cancelar')"
            type="reset"
            color="negative"
            outline
            dense
            @click="cancelar"
            class="q-ml-sm"
          />
        </div>

      </q-form>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { useReCaptcha } from "vue-recaptcha-v3";

const props = defineProps({
    consumibles: Boolean,
    equipo: Object
});
const emit = defineEmits('volver');
const $q = useQuasar();
const router = useRouter();
const form = ref(null);
const formKey = ref(0);
const {executeRecaptcha} = useReCaptcha();
const articulos = ref(props.equipo.articulos);
const seleccionados = ref([]);
const formData = ref({
  contacto: "",
  telefono: "",
  horario: "",
  descripcion: "",
});
const resetForm = () => {
    console.log(form.value);
    form.value.resetValidation();
    seleccionados.value = [];
    formData.value.contacto = '';
    formData.value.telefono = '';
    formData.value.descripcion = '';
    formData.value.horario = '';
    formKey.value++;
};
const cancelar = () => {
  resetForm();
  emit('volver');
};
const enviar = async () => {
  $q.loading.show();
  try {
    const token = await executeRecaptcha('submit_form');
    var desc = props.consumibles ? "SOLICITUD DE CONSUMIBLES" : formData.value.descripcion;
    const response = await api.post('/soporte.php', {
      recaptchaToken: token,
      //auth: auth,
      tkn: props.equipo.TKN,
      contacto: formData.value.contacto,
      telefono: formData.value.telefono,
      horario: formData.value.horario,
      descripcion: desc,
      articulos: seleccionados.value
    });

    console.log('Verificación', response.data);
    if(response.data.success && response.data.message.status == 'OK'){
      $q.notify({
          color: 'green',
          position: 'top',
          message: 'Aviso creado correctamente',
          icon: 'check_circle'
      });
      resetForm();
      emit('volver');
    } else{
      $q.notify({
          color: 'red',
          position: 'top',
          message: 'No se pudo al crear el aviso',
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

</script>
<style scoped>
.cuerpo {
  gap: 5vh;
  margin-top: auto;
  margin-bottom: auto;
  padding-top: 20px;
}
.botones-submit {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}
.articulos {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  max-width: fit-content;
}

.articulo {
    font-size: x-small;
  }

@media (max-width: 600px) {
  .texto-descripcion {
    font-size: 0.4rem;
  }
}
</style>