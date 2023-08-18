<template>
  <div>
    <div class="container">
        <b-card class="m-1 p-3">
          <div class="row">
            <Proyecto></Proyecto>
          </div>
        <div class="row">
         
          <Entrega></Entrega>
        </div>
        <div class="row">
          <Particpantes :id="proyecto.id"></Particpantes>

        </div>
      </b-card>
      <div class="row justify-content-center">
        <div class="col-auto">
          <button class="btn btn-outline-primary" @click="verProyecto()">Atrás</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Proyecto from '@/components/DetalleProyecto.vue'
import Entrega from '@/components/ListaDeEntregas.vue'
import Particpantes from '@/components/ProyectoParticipantes'
export default{
  name:'Lista',

  data(){
      return{
          categoria:[],
          proyecto: {
              id:null,
              nombre:null,
              codigo_fuente:null,
              categorias:null,
              descripcion:null,
              estado: null,
          }
      }
  },
  components: {
    Entrega,
    Particpantes,
    Proyecto
  },
  methods:{
      
      async getProyecto (){
      let id = this.$route.params.id
      await axios.get("api/proyecto/"+id+"/").then(response=>{
          this.proyecto.id=response.data.id
          this.proyecto.nombre=response.data.nombre_proyecto
          this.proyecto.descripcion=response.data.descripcion
          this.proyecto.estado=response.data.estado
          this.proyecto.codigo_fuente=response.data.codigo_fuente
          this.proyecto.categorias = response.data.categorias
          });
          
      },
      verProyecto(){
        this.$router.push('/lista-proyecto')
      },
         
  },
  async mounted(){
      await this.getProyecto()
  }
}
</script>
