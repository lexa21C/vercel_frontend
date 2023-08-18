<template>
    <div>
        <div class="container">
            <b-card class="m-2">
                <div class="row">
                    <div class="col-lg-8">
                        <h1>{{ proyecto.nombre_proyecto }}</h1>
                        <p><span class="fw-lighter">Estado: </span>{{ proyecto.estado }}</p>
                        <p class="fw-lighter">Descripcion:</p>
                        <p>{{ proyecto.descripcion }}</p>
                        <p class="fw-lighter">Repositorio en GitHub:</p>
                        <b-link :href="proyecto.codigo_fuente">{{ proyecto.codigo_fuente }}</b-link>
                        <p class="fw-lighter">Categorías:</p>
                        <ul>
                          <li v-for="categoria in categoria" :key="categoria.id">{{ categoria}}</li>                          
                        </ul>
                    </div>
                     <div class="col-lg-4">

                        <b-img class="imagen" :src="proyecto.foto" :alt="proyecto.nombre_proyecto"></b-img>
                    </div>
                </div>
                <div class="row">
                    <div class="text-end mt-3 m-2">
                        <b-button class="m-1  mr-2" @click="editarProyecto(proyecto.id)" variant="warning">
                            <b-icon  icon="pencil"></b-icon> 
                        </b-button>
                        <b-button class="m-1 " @click="eliminarProyecto(proyecto.id)" variant="danger">
                            <b-icon icon="trash"></b-icon>
                        </b-button>
                    </div>
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
            categoria:[],
            proyecto: null,
            entrega:null
            
        }
    },
    
    methods:{
        idCategoria(categoria){
            for (let i = 0; i < categoria.length; i++) {
                this.getCategoria(categoria[i])
              console.log(`ID: ${categoria[i]}`);
            }
        },
        async eliminarProyecto(id) {
      if (this.proyecto.estado === 'en revision' ) {
        // Display the confirmation alert before deletion
        const confirmed = window.confirm('¿Estás seguro de eliminar este proyecto?');

        if (confirmed) {
          // Proceed with deletion
          await axios.delete('api/proyecto/' + id + '/');
          await this.misProyectos();
        }
      } else {
        // Show an alert indicating that the project cannot be deleted
        window.alert('El proyecto ha sido aprobado y no se puede eliminar.');
      }
    },

        getCategoria(categorias_id){
            axios.get('api/categoria/'+categorias_id+'/').then(response=>{
                let categoria=response.data.nombre
                this.categoria.push(categoria)
            })

         },
        async verProyecto (){
        let id = this.$route.params.id
        await axios.get("api/proyecto/"+id+"/").then(response=>{
            this.proyecto=response.data
            });
            this.idCategoria(this.proyecto.categorias)
        },
        getEntregas(){
            let id = this.$route.params.id
              axios.get("api/proyecto-entregas/"+id+'/').then(response=>{
              this.entrega= response.data
            })
        },
        editarProyecto(id){
            console.log(id)
            this.$router.push('/editar-proyecto/'+id)
        },
        misProyectos(){
            
            this.$router.push('/mis-proyectos')
        },
           
    },
    async mounted(){
        await this.verProyecto()
       
    }
}
</script>
