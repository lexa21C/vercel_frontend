<template>
  <div>
    <div class="cointainer">
      <div class="row">
        <div class="row justify-content-center">
        <h1 class="text-center">Mis Proyectos</h1>
        </div>
      </div>
      <div class="row">
        <table>
          <tbody>
            <tr v-for="proyecto in proyectos " :key="proyecto.id">
                <div class="container"> 
                  <b-card class="m-1 p-1">
                    <div class="row">
                      <div class="col-lg-1 col-md-1">
                        <b-img class="imagen" :src="proyecto.foto" :alt="proyecto.nombre_proyecto"></b-img>
                        </div>
                
                        <div class="col-lg-9">
                            <h3>{{ proyecto.nombre_proyecto }}</h3>
                            
                         
                        </div>
                        <div>
                          <p ><span class="fw-lighter" >Estado: </span>{{ proyecto.estado }}</p>

                        </div>
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
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  </div>
    
  </template>
  


<script>
import axios from 'axios'

export default{
    name:'Lista',
    data(){
        return{
          perfil: this.$store.state.perfil.id,
          
            searchValue: "",
            proyecto: [],
            proyectos: []
        }
    },
    methods:{
      async getProyecto(id){
          
          await this.axios.get("api/proyectos-aprendiz/"+id+'/').then(response=>{
            this.proyectos =response.data
            this.proyectos.reverse(); 
          })
          console.log
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
    async search() {
      try {
        const response = await axios.get("buscar_proyectos/", {
          params: {
            search: this.searchValue,
          },
        });
        this.proyecto = response.data;
        
      } catch (error) {
        console.log(error);
      }
      
    },
    async verProyecto(id){
      this.$router.push('/detalle-proyecto/'+id)
    },


    },
    mounted() {  
        this.getProyecto(this.perfil)
    },
        

}
</script>

<style>

.imagen{
  width: 100%;
}

</style>