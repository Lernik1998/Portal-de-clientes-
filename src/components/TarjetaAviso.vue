<template>
    <q-item clickable v-ripple class="aviso">
        <q-item-section>
            <q-item-label>{{ aviso.codigo+" - "+aviso.equipo }}</q-item-label>
            <span class="text-caption">{{ aviso.creado }}</span>
            <span class="text-caption" v-if="aviso.tecnico != ''">{{ $t('tarjetaAviso.estatus.asignado') }} {{ aviso.tecnico }}</span>
            <span class="text-caption">{{ aviso.descripcion }}</span>
            <span class="text-caption aviso-status" :class="claseEstatus(aviso)">{{
                aviso.estado == $t('tarjetaAviso.estatus.nuevo') ?
                    aviso.asignado ? $t('tarjetaAviso.estatus.asignadoTecnico') : $t('tarjetaAviso.estatus.pendiente') :
                            aviso.estado == 'Visitado / sin terminar' ? 'En proceso' :
                                aviso.estado == 'Supervisar' ? $t('tarjetaAviso.estatus.cerrado') : aviso.estado
            }}</span>
        </q-item-section>
    </q-item>
</template>

<script setup>
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

// Variables
const { locale } = useI18n();
const props = defineProps({
  aviso: {
    type: Object,
    required: true
  }
});
const claseEstatus = (aviso) => {
    switch(aviso.estado){
        case 'Nueva':
            return !aviso.asignado ? 'status-nuevo' : 'status-asignado';
        case 'En Proceso':
            return 'status-proceso';
        case 'Visitado / sin terminar':
            return 'status-proceso';
        case 'Terminado':
            return 'status-terminado';
        case 'Supervisar':
            return 'status-supervisar';
        default:
            return 'status-proceso';
    }
};

onMounted(() => {
    // Establecer el idioma al inicio
    locale.value = locale.value === 'es-ES' ? 'en-US' : 'es-ES';
  console.log('Idioma actual pasado al LoginPage:', locale.value);
});
</script>

<style scoped lang="scss">
// Estado Aviso:
$estados: (
    nuevo: #f0be77,
    asignado: #fff3cd,
    proceso : #d4edda,
    terminado: #ADD8E6,
    supervisar: #D3D3D3,
);

@each $status, $color in $estados {
    .status-#{$status} {
        background-color: $color;
    }
}

.aviso-status {
    border-radius: 8px;
    padding: 0px 5px;
    color: #000;
}

</style>