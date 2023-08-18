<template>
  <div>
    <body>
      <div v-if="rol !='aprendiz' ">

        <CalificarProyecto></CalificarProyecto>
        <ListaEntrega></ListaEntrega>
      </div>
      <div v-else>
        <Proyecto></Proyecto>
        <Entrega></Entrega> 
      </div>
      <div class="container">    
        <b-card class=" m-2">
          <Participantes></Participantes>
        </b-card>
        <!-- <div class="row justify-content-center">
        <div class="col-auto">
          <button class="btn btn-outline-primary" @click="verProyecto(proyecto.id)">Atrás</button>
        </div>
      </div> -->
      </div>
     </body>

  </div>
</template>
<script>
  import Entrega from '@/components/aprendiz/ListaDeEntregas.vue'
  import Proyecto from '@/components/aprendiz/DetalleProyecto.vue'
  import CalificarProyecto from '@/components/instructor/CalificarProyecto.vue'
  import ListaEntrega from '@/components/instructor/ListaDeEntregas.vue'
  import Participantes from '@/components/ProyectoParticipantes.vue'

 


  export default {
    data() {
        return {
            rol: this.$store.state.rol,
            
        }
    },

  components: {
    Proyecto,
    Entrega,
    CalificarProyecto,
    ListaEntrega,
    Participantes
  },
  methods:{
    async verProyecto(id){
        this.$router.push('/ficha-proyecto/'+id)
      },
  }

  }
</script>