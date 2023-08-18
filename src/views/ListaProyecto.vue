<template>

  <div class="container">
    <div class="row m-1">
      <b-input-group size="sm" class="mb-2">
        <b-form-input type="search" v-model="searchValue" placeholder="Search terms" @search-clear="clearSearch"></b-form-input>
        <b-input-group-prepend is-text>
          <b-icon icon="search" @click="search"></b-icon>
        </b-input-group-prepend>
      </b-input-group>
      <div v-if="proyectos === null || proyectos.length === 0">
          <b-alert show variant="info">No se encontraron resultados.</b-alert>
        </div>
    </div>
    <div class="ro
    w m-2"   v-for="proyecto in proyectos" :key="proyecto.id">

      <b-card class="m-1 p-1">
        <div class="row">
          <div class="col-lg-1 col-md-1">
            <b-img class="imagen" :src="proyecto.foto" :alt="proyecto.nombre_proyecto"></b-img>
          </div>
          <div class="col-lg-9">
            <h3>{{ proyecto.nombre_proyecto }}</h3>
            
          </div>
          <div><p><span class="fw-lighter">Estado: </span>{{ proyecto.estado }}</p> </div>
        </div>
        <div class="row">
          <p class="fw-lighter">Descripcion:</p>
          <p>{{ descripcion(proyecto.descripcion) }}</p>
        </div>
        <div class="text-end ">
            <span class="link-text" @click="verProyecto(proyecto.id)" disabled>ver mas</span>
        </div>
     
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
            searchValue: null,
            proyecto: [],
            proyectos: null
        }
    },
    methods:{
      getProyecto() {
      axios.get("api/proyecto/").then(response => {
        this.proyectos = response.data
        this.proyectos.reverse();
      })
    },
        descripcion(descripcion){
          // descripcion corta
          if (descripcion.length > 100) {
            const index = descripcion.slice(100).search(/[.]/);
              if (index !== -1) {
                return descripcion.slice(0, 100 + index + 1) + '...';
              }
          }
          return descripcion;
        },
        
    async verProyecto(id){
      this.$router.push('/ver-proyecto/'+id)
    },
    clearSearch() {
      this.getProyecto()
      console.log('entro')
      this.searchValue = null;
  },

    async search() {
    try {
      const response = await axios.get("buscar_proyectos/", {
        params: {
          search: this.searchValue,
        },
      });
      this.proyectos = response.data;
    } catch (error) {
      console.log(error);
    }
    
  },


    },
    mounted() {  
      this.getProyecto()

    },
    watch: {
      searchValue(newValue) {
        if (newValue === null || newValue === "") {
          this.getProyecto();
        } else {
          this.search();
        }
      }
      
    }


}
</script>

<style>

.imagen{
  width: 100%;
}

</style> 