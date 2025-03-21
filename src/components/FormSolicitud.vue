<template>
<q-dialog persistent v-model="estadoAbierto">
    <q-card>
    <!-- Cabecera -->
    <q-card-section class="text-center">
        <div class="cabecera">
        <span class="text-2xl font-semibold text-gray-800">Solicitud de Servicio</span>
        <q-space></q-space>
        <q-btn icon="close" flat round dense @click="cerrar"></q-btn>
        </div>
    </q-card-section>
    <!-- Tabs para seleccionar formulario -->
    <q-tabs v-model="selectedTab" dense align="justify" class="q-mb-md text-gray-800" indicator-color="primary">
        <q-tab name="impresion" label="Eq. impresión" />
        <q-tab name="soporte" label="Soporte informático" />
        <q-tab name="software" label="Software" />
    </q-tabs>
    <q-card-section>
        <q-tab-panels v-model="selectedTab" animated>
        <q-tab-panel name="impresion">
            <q-form @submit.prevent="submit">
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Tamaño de papel</label>
                    <div class="flex items-center space-x-4">
                    <q-radio v-model="formDataImpresion.tamano" label="DIN A3" val="A3" dense />
                    <q-radio v-model="formDataImpresion.tamano" label="DIN A4" val="A4" dense />
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Modo de impresión</label>
                    <div class="flex items-center space-x-4">
                    <q-radio v-model="formDataImpresion.modo" label="Color" val="color" dense/>
                    <q-radio v-model="formDataImpresion.modo" label="Blanco y Negro" val="bn" dense/>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Contacto</label>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <q-input v-model="formDataImpresion.contacto.nombre" label="Nombre" outlined dense maxlength="250"
                    :rules="[val => val && val.trim() !== '' || 'El nombre no puede estar vacío.']"/>
                    <q-input v-model="formDataImpresion.contacto.telefono" label="Teléfono" outlined dense maxlength="250"
                    :rules="[
                    val => val && val.trim() !== '' || 'El teléfono no puede estar vacío.',
                    val => val && /^[+]*[0-9]{1,4}[-\s\./0-9]*$/.test(val) || 'Número de teléfono no válido'
                    ]"/>
                    <q-input v-model="formDataImpresion.contacto.email" label="Email" outlined dense maxlength="250"  :rules="[
                    val => val && val.trim() !== '' || 'El correo electrónico no puede estar vacío.',
                    val => val && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val) || 'Correo electrónico no válido'
                    ]"/>
                    </div>
                </div>
                <div class="mb-4">
                    <q-input v-model="formDataImpresion.descripcion" label="Descripción" type="textarea" outlined dense maxlength="500"/>
                </div>
                <div class="text-right">
                    <q-btn label="Enviar" type="submit" color="primary" unelevated/>
                </div>
            </q-form>
        </q-tab-panel>
        <q-tab-panel name="soporte">
            <q-form>
            <div class="mb-4">
                <q-input v-model="formDataSoporte.nombreEquipo"  label="Nombre del equipo" outlined dense maxlength="250"/>
            </div>
            <div class="mb-4">
                <q-input v-model="formDataSoporte.direccion" label="Dirección" outlined dense maxlength="250"/>
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Contacto</label>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <q-input v-model="formDataSoporte.contacto.nombre" label="Nombre" outlined dense maxlength="250" />
                <q-input v-model="formDataSoporte.contacto.telefono" label="Teléfono" outlined dense maxlength="250"/>
                <q-input v-model="formDataSoporte.contacto.email" label="Email" outlined dense maxlength="250"/>
                </div>
            </div>
            <!-- Descripción -->
            <div class="mb-4">
                <q-input  v-model="formDataSoporte.descripcion" label="Descripción" type="textarea" dense outlined maxlength="500"/>
            </div>
            <div class="text-right">
                <q-btn label="Enviar" type="submit" color="primary" @click="submit" unelevated/>
            </div>
            </q-form>
        </q-tab-panel>
        <!-- Software -->
        <q-tab-panel name="software">
            <q-form>
            <div class="mb-4">
                <q-select
                v-model="formDataSoftware.tipo"
                label="Tipo de software"
                outlined
                dense
                :options="softwareOptions"
                emit-value
                map-options
                />
            </div>
            <div v-if="formDataSoftware.tipo === 'otros'" class="mb-4">
                <q-input v-model="formDataSoftware.otroTipo" label="Especifique" outlined dense maxlength="250"/>
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Contacto</label>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <q-input v-model="formDataSoftware.contacto.nombre" label="Nombre" outlined dense maxlength="250"/>
                <q-input v-model="formDataSoftware.contacto.telefono" label="Teléfono" outlined dense maxlength="250"/>
                <q-input v-model="formDataSoftware.contacto.email" label="Email" outlined dense maxlength="250"/>
                </div>
            </div>
            <div class="mb-4">
                <q-input v-model="formDataSoftware.descripcion" label="Descripción" type="textarea" outlined dense maxlength="500" />
            </div>
            <div class="text-right">
                <q-btn label="Enviar" type="submit" color="primary" @click="submit" unelevated/>
            </div>
            </q-form>
        </q-tab-panel>
        </q-tab-panels>
    </q-card-section>
    </q-card>
</q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useQuasar } from "quasar";
import { api } from 'src/boot/axios';
import { useReCaptcha } from "vue-recaptcha-v3";

const props = defineProps({
abierto: {
    type: Boolean,
    required: true
}
});
const emit = defineEmits(['update:abrir']);

const $q = useQuasar();
const {executeRecaptcha} = useReCaptcha();
const estadoAbierto = ref(props.abierto);
const selectedTab = ref('impresion');

// Datos para Equipo de Impresión
const formDataImpresion = ref({
tamano: 'A4',
modo: 'color',
contacto: {
    nombre: '',
    telefono: '',
    email: ''
},
descripcion: ''
});

// Datos para Soporte Informático
const formDataSoporte = ref({
nombreEquipo: '',
direccion: '',
contacto: {
    nombre: '',
    telefono: '',
    email: ''
},
descripcion: ''
});

// Datos para Software
const formDataSoftware = ref({
tipo: '',
otroTipo: '',
contacto: {
    nombre: '',
    telefono: '',
    email: ''
},
descripcion: ''
});

const softwareOptions = [
{ label: 'SBS Presencia hr', value: 'SBS' },
{ label: 'ERP', value: 'ERP' },
{ label: 'CRM', value: 'CRM' },
{ label: 'TPV', value: 'TPV' },
{ label: 'Otros', value: 'otros' }
];

const generarCuerpo = () => {
    let html = ``;
    switch(selectedTab.value){
        case 'impresion':
            html = `
            <h5>Tamaño del papel: </h5><p>${formDataImpresion.value.tamano}</p><br>
            <h5>Modo de impresión: </h5><p>${formDataImpresion.value.modo}</p><br>
            <h5>Contacto:</h5><br>
            <p><b>Nombre</b>: ${formDataImpresion.value.contacto.nombre}</p><br>
            <p><b>Teléfono</b>: ${formDataImpresion.value.contacto.telefono}</p><br>
            <p><b>Email</b>: ${formDataImpresion.value.contacto.email}</p><br>
            <h5>Descripción :</h5><p>${formDataImpresion.value.descripcion}</p><br>
            `;
            return html;
        case 'soporte':
            html = `
            <h5>Nombre del equipo: </h5><p>${formDataSoporte.value.nombreEquipo}</p><br>
            <h5>Dirección: </h5><p>${formDataSoporte.value.direccion}</p><br>
            <h5>Contacto:</h5><br>
            <p><b>Nombre</b>: ${formDataSoporte.value.contacto.nombre}</p><br>
            <p><b>Teléfono</b>: ${formDataSoporte.value.contacto.telefono}</p><br>
            <p><b>Email</b>: ${formDataSoporte.value.contacto.email}</p><br>
            <h5>Descripción:</h5><p>${formDataSoporte.value.descripcion}</p><br>
            `;
            return html;
        case 'software':
        html = `
            <h5>Tipo: </h5><p>${formDataSoftware.value.tipo}</p><br>`;
            if(formDataSoftware.value.tipo === 'otros'){
                html += `
                 <h5>Modo de impresión: </h5><p>${formDataSoftware.value.otroTipo}</p><br>
                `;
            }
           html += `
            <h5>Contacto:</h5><br>
            <p><b>Nombre</b>: ${formDataSoftware.value.contacto.nombre}</p><br>
            <p><b>Teléfono</b>: ${formDataSoftware.value.contacto.telefono}</p><br>
            <p><b>Email</b>: ${formDataSoftware.value.contacto.email}</p><br>
            <h5>Descripción: </h5><p>${formDataSoftware.value.descripcion}</p><br>
            `;
            return html;
    }

};

const submit = async () => {
    let html = generarCuerpo();
    try{
        const token = await executeRecaptcha('submit_form');
        const response = await api.post("/solicitarEquipo.php", {
            recaptchaToken: token,
            tipo: selectedTab.value,
            cuerpo: html
        }, {withCredentials: true});
        console.log('Verificación', response.data);
        if (response.data.success && response.data.message.status == "OK") {
        $q.notify({
            type: "positive",
            message: "Solicitud enviada correctamente.",
        });
        } else {
        $q.notify({
            type: "negative",
            message: "Error al enviar la solicitud.",
        });
    }
    } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        $q.notify({
        type: "negative",
        message: "Error al enviar la solicitud.",
        });
    }
  
};


const cerrar = () => {
emit('update:abrir', false);
};

watch(() => props.abierto, (newVal) => {
estadoAbierto.value = newVal;
});
</script>

<style scoped>
.cabecera {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
}
</style>
  