<template>

        <div class="container">
           <b-card class="m-2 p-2">

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
                     <b-form>
                         <b-form-group
                         label="Calificacion"
                         >
                             <div class="form-check form-switch" v-for="option in options" :key="option">
                               <input
                                 class="form-check-input"
                                 type="checkbox"
                                 :id="option"
                                 :checked="selectedOption === option"
                                 @change="selectOption(option)"
                               >
                               <label :for="option">{{ option }}</label>
                             </div>
                         </b-form-group>
                     </b-form>
 
                 </div>
                  <div class="col-lg-4">
                     
                     <b-img class="imagen" :src="proyecto.foto" :alt="proyecto.nombre_proyecto"></b-img>
                 </div>
             </div>
           </b-card>

      </div>

  </template>
  
  <script>
  import axios from 'axios'

  export default {

    data() {
      return {
        proyecto_estado:null,
        selectedOption: null,
        options: ['en revision','en desarrollo','anulado' ,'terminado'],
        proyecto:null,
      }
    },
    methods: {
      selectOption(optionId) {
        if (this.selectedOption === optionId) {
          this.selectedOption = null; // Deseleccionar la opción actual si se hace clic nuevamente en ella
        } else {
          this.selectedOption = optionId; // Establecer la opción seleccionada
          this.editarProyecto()
          this.verProyecto()
        }
      },
      async editarProyecto(){
            let id = this.$route.params.id
            await axios.put("api/calificar-proyecto/"+id+"/"+this.selectedOption+"/",)
            this.$root.$emit("proyecto-actualizado", id); // Emitir el evento personalizado
           
        },
        async verProyecto (){
        let id = this.$route.params.id
        await axios.get("api/proyecto/"+id+"/").then(response=>{
            this.proyecto=response.data

            });
            
            this.selectedOption=this.proyecto.estado   
            // await this.verProyecto()
        },
        

    },
    async mounted(){
        await this.verProyecto()
        
    }
  };
  </script>
  
  
