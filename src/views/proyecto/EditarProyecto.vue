<template>
  <div class="container">
    <div class="row">
      <div class="row justify-content-center">
        <h1 class="text-center">Actualizar el proyecto del grupo: {{ grupo[0].nombre_grupo.nombre_grupo }}  </h1>
      </div>

    </div>
    <div class="row">
      <div class="row justify-content-center">
        <h3 class="text-center">Ficha:{{grupo[0].ficha.codigo  }} </h3>
      </div>

    </div>
    <div class="row">

      <div >
  
        <b-card class="m-2 p-3"  >
          
          <!-- Contenido de la tarjeta -->
          <b-form>
            <b-form-group 
              id="input-group-1"
              label="Nombre del proyecto:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="proyecto.nombre_proyecto"
                type="text"
                required
              >    
              </b-form-input>
            </b-form-group>
            <b-form-group
              id="descripcion"
              label="Descripción del proyecto:"
              label-for="descripcion"
            >
              <b-form-textarea
                id="descripcion"
                v-model="proyecto.descripcion"
                :rows="5"
                required
              ></b-form-textarea>
            </b-form-group>
            
            <b-form-group
              id="foto"
              label="Logo de la App:"
              label-for="foto"
            >
              <b-form-file
                id="foto"
                v-model="foto"
                accept="image/*"
              ></b-form-file>
            </b-form-group>
            <b-form-group
              id="codigo_fuente"
              label="Código fuente del proyecto:"
              label-for="codigo_fuente"
            >
              <b-form-input
                id="codigo_fuente"
                v-model="proyecto.codigo_fuente"
                type="url"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Categorias:">
            <b-dropdown text="Seleccionar categorías">
              <b-form-checkbox-group
                v-model="proyecto.categorias"
                v-for="item in categorias"
                :key="item.id"
              >
                <b-form-checkbox :value="item.id">{{ item.nombre }}</b-form-checkbox>
              </b-form-checkbox-group>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item>Seleccionar</b-dropdown-item>
            </b-dropdown>
          </b-form-group>
          
            <b-button class="m-1" type="reset" variant="danger" @click="detalleProyecto(proyecto.id)">Cancelar</b-button>
            <b-button class="m-1 enviar" @click="editarProyecto(proyecto.id)" >Enviar</b-button>
          </b-form>
        </b-card>
      </div>
    </div>
    <div class="row m-1">
            <div >
              
              <b-alert v-if="showAlert" show variant="danger">{{ alertMessage }}</b-alert>
          </b-alert>
            </div>
     
          </div>
  </div>
  </template>
  
  
  
  <script>
  import axios from 'axios'
    export default {
      data() {
        return {
          perfil: this.$store.state.perfil.id,
          grupoSelecionado:null,
          foto:null,
          grupo:null,
          proyecto: {
            id:null,
            nombre_proyecto: null,
            descripcion: null,
            aprendiz:null,
            foto: null,
            codigo_fuente: null,
            categorias: [],
          },

          categorias: [],
          show: true,
          showAlert: false,
      alertMessage: "",
  
        }
      },
      methods: {
        async verProyecto (){
        let id = this.$route.params.id
        await axios.get("api/proyecto/"+id+"/").then(response=>{
            this.proyecto.id=response.data.id
            this.proyecto.nombre_proyecto=response.data.nombre_proyecto
            this.proyecto.descripcion=response.data.descripcion
            this.proyecto.foto=response.data.foto
            this.proyecto.codigo_fuente=response.data.codigo_fuente
            this.proyecto.categorias=response.data.categorias

            });
        } ,
        async getCategoria(){
              await this.axios('api/categoria/').then(response=>{
                  this.categorias = response.data
                  
              })
        },
        async detalleProyecto(id){
          this.$router.push('/detalle-proyecto/'+id)
        },
        async editarProyecto(id){
          if (!this.proyecto.nombre_proyecto || !this.proyecto.descripcion) {
            this.showAlert = true; // Mostrar la alerta de error
            this.alertMessage = 'El campo Nombre del Proyecto y/o Descripción no pueden estar en blanco.';
            return; // Detener el proceso si hay campos vacíos
      }
          this.proyecto.autor=this.perfil
          
          this.proyecto.aprendiz=this.grupo[0].id
          console.log(this.proyecto.categorias)
          const formData = new FormData();
      formData.append('nombre_proyecto', this.proyecto.nombre_proyecto);
      formData.append('descripcion', this.proyecto.descripcion);

        
      if (this.foto) {
    formData.append('foto', this.foto);
  }


      // Agregar campo de código fuente, incluso si es null o undefined
  formData.append('codigo_fuente', this.proyecto.codigo_fuente || '');
      formData.append('aprendiz', this.grupo[0].id);

      this.proyecto.categorias.forEach(categoriaId => {
      formData.append('categorias', parseInt(categoriaId));
      });
          try {

            await this.axios.put('api/proyecto/'+id+'/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Aseguramos que el encabezado esté configurado correctamente
            },
            
          });
          this.detalleProyecto(this.proyecto.id)

          } catch (error) {
       
            console.error('Error:', error.response.data);
            this.alertMessage = 'Error al crear el proyecto. Por favor, inténtalo nuevamente.';
        this.showAlert = true;
          }
       
        
      },

        async getGrupo(id){
          
            await this.axios('api/grupo-proyecto/'+id+'/').then(response=>{
                this.grupo = response.data
                
            })
            console.log(this.grupo)
        },
  

      },
      async mounted(){
          await this.getCategoria()
          await this.verProyecto()
          await this.getGrupo(this.perfil)
 
          
      }
    }
  </script>
  
   <style>
   .enviar{
    background-color: #d81e84;
   }
        /* Estilos CSS para el contenedor */
    .contenedor {
          background-color: rgba(255, 218, 185, 0.2);
        }
    </style>