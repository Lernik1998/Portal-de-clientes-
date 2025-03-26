<template>
  <div class="cuerpo">
    <q-form @submit="enviar" ref="form" :key="formKey">
            <div v-for="contador in contadores" v-bind:key="contador.id">
                <label :for="'input'+contador.id" style="padding-left: 12px; padding-right:12px;" class="texto-descripcion row"><p>{{ contador.nombre }}</p> <q-space/><p>{{ $t('formContadores.ultimo_lectura') }}: {{ contador.lectura }}</p></label>
                <q-input
                    :id="'input'+contador.id"
                    v-model="seleccion[contador.id]"
                    outlined
                    dense
                    type="number"
                    :rules="[
                      (val) => !!val || $t('formContadores.error_obligatorio'),
                      (val) => val >= 0 || $t('formContadores.error_negativo'),
                      (val) => val.toString().length <= 15 || $t('formContadores.error_grande')
                    ]"
                />
            </div>
            <div class="botones-submit">
                <q-btn :label="$t('formContadores.boton_enviar')" type="submit" color="primary" unelevated dense/>
                <q-btn
                :label="$t('formContadores.boton_cancelar')"
                type="reset"
                color="negative"
                outline
                unelevated
                dense
                @click="cancelar"
                class="q-ml-sm"
                />
          </div>
    </q-form>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import { useReCaptcha } from "vue-recaptcha-v3";
import { api } from "src/boot/axios";

const emit = defineEmits('volver');
const props = defineProps({
  equipo: {
    type: Object,
    required: true
  }
})
const router = useRouter();
const route = useRoute();
const {executeRecaptcha} = useReCaptcha();
const form = ref(null);
const formKey = ref(0);
const contadores = ref(props.equipo.contadores);
const $q = useQuasar();
const seleccion = ref({});

const resetForm = () => {
    console.log("Reset form");
    form.value.resetValidation();
    seleccion.value = {};
    formKey.value++;
};
const cancelar = () => {
  resetForm();
  emit('volver');
};

const enviar = async () => {
  let con = Object.entries(seleccion.value).map(([id,actual])=> {
    return {
      id: id,
      actual, actual
    }
  });
   $q.loading.show();
  try {
    const token = await executeRecaptcha('submit_form');
    const response = await api.post('/contadores.php', {
      recaptchaToken: token,
      tkn: props.equipo.TKN,
      con: con
    });
    console.log('Verificación', response.data);
    if(response.data.success){
      con.forEach(({ id, actual }) => {
        const contador = props.equipo.contadores.find(c => c.id == id);
        if (contador) {
          contador.lectura = actual;
        }
      });
      $q.notify({
          color: 'green',
          position: 'top',
          message: 'Contadores modificados correctamente',
          icon: 'check_circle'
      });
      resetForm();
      emit('volver');
    } else{
      $q.notify({
          color: 'red',
          position: 'top',
          message: 'Error al modificar contadores',
          icon: 'report_problem'
      });
    }
  } catch (error) {
    console.error('Error:', error);
    $q.notify({
          color: 'red',
          position: 'top',
          message: 'Error al modificar contadores',
          icon: 'report_problem'
      });
  }
  $q.loading.hide();
};
watch(()=>props.equipo, (newValue)=>{
  console.log("props", props.equipo);
  contadores.value = newValue.contadores;
});
</script>

<style scoped>
.botones-submit {
display: flex;
justify-content: center;
gap: 16px;
margin-top: 20px;
}
.cuerpo {
gap: 5vh;
margin-top: auto;
margin-bottom: auto;
padding-top: 20px;
}

@media (max-width: 600px) {
  .texto-descripcion {
    font-size: 0.4rem;
  }
}
</style>