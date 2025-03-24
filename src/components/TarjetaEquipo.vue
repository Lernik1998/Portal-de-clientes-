<template>
     <q-card class="q-mb-md tarjeta-equipo" style="max-width: 300px; min-height: 250px;" @click="navegar">
      <!--      <q-card class="q-mb-md tarjeta-equipo clickable" style="max-width: 300px; min-height: 250px;" @click="navegar"> -->
            <q-card-section>
                <div class="column no-wrap items-center">
                <div class="contenedor-imagen">
                    <img :src="imagen" style="width: 100px; object-fit: cover;"/>
                </div>
                <span class="text-caption">{{ equipo.familia }}</span>
                <div>
                    <div class="text-h6" style="text-align: center;">{{ equipo.nombre }}</div>
                </div>
                <span class="text-overline">ID {{ equipo.id }}</span>
                <span class="text-caption contrato-status"   :class="{'activo': contrato, 'caducado': !contrato}" v-if="mostrarContrato">{{ equipo.contrato.estado }}</span>
                <span class="text-caption" style="text-align: center;" v-show="equipo.contrato.fin" v-if="mostrarContrato">fin contrato: {{ equipo.contrato.fin }}</span>
                </div>
            </q-card-section>
        </q-card>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const props = defineProps({
  equipo: {
    type: Object,
    required: true
  },
  mostrarContrato: {
    type: Boolean,
    default: true
  }
});

const imagen = computed(()=> props.equipo.imagen ? 'data:image/png;base64,'+props.equipo.imagen : 'src/assets/sbs-logo-azul.png');

const contrato = computed(()=>{
    return props.equipo.contrato.estado.toLowerCase() === "contrato activo" ? true : false;
});

const navegar = () => {
    console.log(props.equipo)
    console.log("Ruta actual" + route.path)

    if(route.path === '/dashboard/equipos'){
        router.push(route.path+'/'+props.equipo.tkn)
    }else if(route.path === '/dashboard'){
        router.push(route.path+'/equipos/'+props.equipo.tkn)
    }
};
</script>

<style scoped lang="scss">
.contrato-status {
    border-radius: 8px;
    padding: 0px 5px;
}

.text-h6 {
    font-size: 1rem !important;
}
.contrato-status.activo {
    background-color: #d4edda;
}


.contrato-status.caducado {
    background-color: #fff3cd;
}

.contenedor-imagen{
    min-height: 100px;
    display:flex;
    align-items:center
}

.tarjeta-equipo {
    transition: all 0.3s ease-in-out;
    border-radius: 12px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.2); /* Efecto Glass */

    &:hover {
        transform: scale(1.1);
        box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
        background: rgba(255, 255, 255, 2);
    }
}

</style>