<template>
    <q-page style="background-color: #F9FAFB;">
        <div class="cabecera">
            <div class="titulo">
                <span class="text-subtitle1 text-white">{{ fechaFormateada }}</span>
                <span class="text-h4 text-weight-bold text-capitalize text-white">¡Hola, {{ authStore.getUser().usuario}}!</span>
                <span class="text-subtitle2 text-white">{{ authStore.getUser().nombre }}</span>
            </div>
        </div>
        <div class="cuerpo">
            <div class="tarjetas">
                <q-card class="tarjeta clickable" @click="router.push('dashboard/equipos')">
                <q-card-section>
                    <div class="contenido-tarjeta">
                        <span class="text-h4">{{ numEquipos }}</span>
                        <span>Servicios contratados</span>
                    </div>
                </q-card-section>
                </q-card>
                <q-card class="tarjeta clickable" @click="router.push('dashboard/avisos')">
                    <q-card-section>
                        <div class="contenido-tarjeta">
                            <span class="text-h4">{{ numAvisos }}</span>
                            <span>Avisos</span>
                        </div>
                    </q-card-section>
                </q-card>
                <q-card class="tarjeta" v-if="false">
                    <q-card-section>
                        <div class="contenido-tarjeta">
                            <span class="text-h4">{{ totalFacturado.toFixed(2) }}€</span>
                            <span>Total facturado</span>
                        </div>
                    </q-card-section>
                </q-card>
                <q-card class="tarjeta clickable">
                    <q-card-section>
                        <div class="contenido-tarjeta" @click="abrirSolicitud = true">
                            <img src="../assets/servicio_nuevo.png">
                        </div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="tarjetas" v-if="false">
                <q-card class="tarjeta grafico">
                    <q-card-section>
                        <div style="font-size: 20px; text-align: center; width: 100%">
                            <div class="row" style="justify-content: center;">
                                <q-select :options="opcionesAñosAvisos" v-model="añoSeleccionadoAvisos" label="Año" @update:model-value="actualizarGraficoPartes" dense class="select-año"/>
                                <span id="titulo-historico-avisos">Histórico avisos</span>
                                <span style="width: 62px;"></span>
                            </div>
                        </div>
                        <div style="width: 100%; height: 200px">
                            <canvas id="historico-avisos"></canvas>
                        </div>
                    </q-card-section>
                </q-card>
                <q-card class="tarjeta grafico">
                    <q-card-section>
                        <div style="font-size: 20px; text-align: center; width: 100%">
                            <div class="row" style="justify-content: center;">
                                <q-select :options="opcionesAñosFacturas" v-model="añoSeleccionadoFacturas" label="Año" @update:model-value="actualizarGraficoFacturas" dense class="select-año"/>
                                <span id="titulo-historico-avisos">Facturación</span>
                                <span style="width: 62px;"></span>
                            </div>
                        </div>
                        <div style="width: 100%; height: 200px">
                            <canvas id="historico-facturacion"></canvas>
                        </div>
                    </q-card-section>
                </q-card>
            </div>
            <div>
              <EquiposSlider :equipos="equipos" :cargados="cargados" @paginar="paginar"/>
            </div>
        </div>
        <FormSolicitud :abierto="abrirSolicitud" v-if="abrirSolicitud" @update:abrir="abrirSolicitud = $event"/>
    </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';
import { api } from 'src/boot/axios';
import { Chart, BarController, BarElement, LinearScale, LineController, CategoryScale, LineElement, PointElement, ArcElement, Tooltip, Legend, Title} from 'chart.js';
import { useQuasar } from "quasar";
import FormSolicitud from 'src/components/FormSolicitud.vue';
import EquiposSlider from 'src/components/EquiposSlider.vue';

const $q = useQuasar();
const router = useRouter();
Chart.register(BarController, BarElement, LinearScale, LineController, CategoryScale, LineElement, PointElement, ArcElement, Tooltip, Legend, Title);
const authStore = useAuthStore();
const fecha = new Date();

const opciones = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};
const fechaFormateada = new Intl.DateTimeFormat('es-ES', opciones).format(fecha);

const numEquipos = ref(0);
const equipos = ref([]);
const cargados = ref(20); // Carga 20 equipos por defecto
const paginacion = ref(1); // Paginación desde la primera página
const cargando = ref(false);

const avisosDatos = ref([]);
const numAvisos = computed(()=>{
    return avisosDatos.value.length;
});
const opcionesAñosAvisos = ref([]);
const añoSeleccionadoAvisos = ref(null);
const graficoHistoricoAvisos = ref(null);

const facturasDatos = ref([]);
const totalFacturado = computed(()=>{
    let total = 0;
    facturasDatos.value.forEach(item => {
        total += item.total;
    });
    return total;
});

const opcionesAñosFacturas = ref([]);
const añoSeleccionadoFacturas = ref(null);
const graficoHistoricoFacturas = ref(null);

const abrirSolicitud = ref(false);


const cargarEquipos = async () => {
  if (cargando.value) return;
  $q.loading.show();
  cargando.value = true;
  try{
    //Equipos
    let response = await api.get("/equipos.php?pag="+paginacion.value, {withCredentials: true});
    if(response.data.success){
      numEquipos.value = response.data.message.total;
      equipos.value = [...equipos.value, ...response.data.message.equipos];
    }
  } catch (error) {
      console.error('Error: ', error);
  }
  cargando.value = false;
  $q.loading.hide();
};

const paginar = () => {
    if (!cargando.value && cargados.value <= numEquipos.value) {
      paginacion.value += 1;
      cargados.value += 20;
      cargarEquipos();
    }
};

const cargar = async() => {
  $q.loading.show();
  try{
    //Avisos
    let response = await api.get("/avisos.php", {withCredentials: true});
    if(response.data.success){
        avisosDatos.value = response.data.message.avisos;
        const años = [
            ...new Set(avisosDatos.value.map(item => {
                return new Date(item.creado_js).getFullYear();
                })
            )
        ];
        opcionesAñosAvisos.value = años.map(a => ({ label: a.toString(), value: a }));
        const añoActual = new Date().getFullYear();
        const añoSeleccionadoObjeto = opcionesAñosAvisos.value.find(opcionAño => opcionAño.value === añoActual);
        añoSeleccionadoAvisos.value = añoSeleccionadoObjeto || opcionesAñosAvisos.value[0];
        //actualizarGraficoPartes();
    }
    //Facturas
    response = await api.get("/facturas.php", {withCredentials: true});
    if(response.data.success){
        facturasDatos.value = response.data.message.facturas;
        const años = [
            ...new Set(facturasDatos.value.map(item => {
                return new Date(item.creado_js).getFullYear();
                })
            )
        ];
        opcionesAñosFacturas.value = años.map(a => ({ label: a.toString(), value: a }));
        const añoActual = new Date().getFullYear();
        const añoSeleccionadoObjeto = opcionesAñosFacturas.value.find(opcionAño => opcionAño.value === añoActual);
        añoSeleccionadoFacturas.value = añoSeleccionadoObjeto || opcionesAñosFacturas.value[0];
        console.log(facturasDatos.value);
        //actualizarGraficoFacturas();
    }
  } catch (error) {
      console.error('Error: ', error);
  }
  $q.loading.hide();
};
/*
const actualizarGraficoPartes = () => {
  const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  console.log(añoSeleccionadoAvisos.value);
  const datosAño = avisosDatos.value.filter(item => {
    const año = new Date(item.creado_js).getFullYear();
    return año == añoSeleccionadoAvisos.value.value
  });   //Filtramos por año seleccionado.
  let avisos = Array(12).fill(0);
  let contratados = Array(12).fill(0);

  datosAño.forEach(item => {
    const mes = new Date(item.creado_js).getMonth();
    avisos[mes] += 1;
  });


  const ctx = document.getElementById('historico-avisos');

  if(graficoHistoricoAvisos.value){
    graficoHistoricoAvisos.value.destroy();
    graficoHistoricoAvisos.value = null;
  }

  graficoHistoricoAvisos.value = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Avisos',
          data: avisos,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }
    ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
              boxWidth: 15
          }
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });

};

const actualizarGraficoFacturas = () => {
  const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  var barColors = ["blue", "green","orange","red","brown",  "blue", "green","orange","red","brown",  "blue", "green"];
  const datosAño = facturasDatos.value.filter(item => {
    const año = new Date(item.creado_js).getFullYear();
    return año == añoSeleccionadoFacturas.value.value
  });
  let totales = Array(12).fill(0);

  datosAño.forEach(item => {
    const mes = new Date(item.creado_js).getMonth();
    totales[mes] += item.total;
  });

  const ctx = document.getElementById('historico-facturacion');

  if(graficoHistoricoFacturas.value){
    graficoHistoricoFacturas.value.destroy();
    graficoHistoricoFacturas.value = null;
  }

  graficoHistoricoFacturas.value = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [
      {
        label: 'Facturación',
        data: totales,
        backgroundColor: barColors,
      },
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'top',
        labels: {
          boxWidth: 15
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
      }
    }
  }
});
};*/

onMounted(()=>{
    cargarEquipos();
    cargar();
})
</script>
<style scoped>
.text-white {
    color: white;
}
.titulo {
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: start;
    flex-direction: column;
    padding-top: 3%;
    padding-left: 4%;
}
.cabecera {
    width: 100%;
    height: 30vh;
    background-image: url("../assets/fondo-azul.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
}
.cuerpo {
    z-index: 20px;
    margin-top: -40px;
}
.tarjetas {
    background: transparent;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
}
.tarjeta {
    width: 100%;
    max-width: 250px;
    min-width: 160px;
    margin-left: 1%;
    margin-right: 1%;
    margin-bottom: 3%;
}
.grafico {
    max-width: 40vw;
}
.contenido-tarjeta {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 10px;
}

#titulo-historico-avisos{
  align-items: center;
  align-self: center;
  margin-left: 30px;
  margin-right: 30px;
}
@media (max-width: 800px){
    .grafico {
        max-width: 90vh;
    }
}
</style>
