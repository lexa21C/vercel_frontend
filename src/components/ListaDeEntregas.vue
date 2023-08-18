<template>
  <div class="container" >
    <h4>Entregas realizadas</h4>
    <div class="accordion" role="tablist" v-for="entrega in entregas" :key="entrega.id">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button class="container" block v-b-toggle="'accordion-' + entrega.id"   variant="info">{{ entrega.tipo_revision.nombre }}</b-button>
        </b-card-header>
        <b-collapse :id="'accordion-' + entrega.id" visible accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text  class="fw-lighter">Descripcion:</b-card-text>
            <b-card-text>{{ entrega.descripcion_entrega }}</b-card-text>
          </b-card-body>
          <div class="text-end mt-3 m-2">
            <span class="link-text" @click="detalleEntrega(entrega.id)" disabled>ver mas</span>
          </div>

        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default{
  name:'Lista',

  data(){
      return{
        id : this.$route.params.id,
          tipo:null,
          entregas:null
      }
  },
  methods:{
      getEntregas(){
          let id = this.$route.params.id
            axios.get("api/proyecto-entregas/"+id+'/').then(response=>{
            this.entregas= response.data
          })
      },
     
      detalleEntrega(id){
        this.$router.push('/ver-entrega/'+id)
      },
         
  },
  async mounted(){

      await this.getEntregas()
  }
}
</script>
<style>
.link-text {
color: blue;
text-decoration: underline;
cursor: pointer;
}

</style>