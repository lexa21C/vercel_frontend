<template>
  <div class="container">
    <div v-if="grupo==null">
      <div class="row m-3">
        
        <b-alert v-if="showAlert" show variant="danger"> ¡Error! No se encuentra asociado a un grupo. Por favor, cree un grupo antes de continuar. </b-alert>
          </b-alert>
      </div>
    </div>
    <div v-else>

      <div class="row">
        <div class="row justify-content-center">
          <h1 class="text-center">Crear un proyecto del grupo: {{ grupo[0].nombre_grupo.nombre_grupo }}  </h1>
        </div>
  
      </div>
      <div class="row">
        <div class="row justify-content-center">
          <h3 class="text-center">Ficha:{{grupo[0].ficha.codigo  }} </h3>
        </div>
  
      </div>
      <div class="row">
  
        <div class="d-flex justify-content-center">
      
          <b-card class="m-1 p-1"  style="width: 75%;">
            <!-- Contenido de la tarjeta -->
            <b-form encode="multipart/form-data">
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
                label="Repositorio en GitHub: "
                label-for="codigo_fuente"
              >
                <b-form-input
                  id="codigo_fuente"
                  v-model="proyecto.codigo_fuente"
                  type="url"
                ></b-form-input>
              </b-form-group>
              <b-form-group 
                label="Categorias:"
              >
              <b-dropdown text="Seleccionar categoria">
                <b-form-checkbox-group v-model="proyecto.categorias" v-for="item in l_categorias" :key="item.id" >
                  <b-form-checkbox  :value="item.id">
                    {{ item.nombre }}
                  </b-form-checkbox>
                </b-form-checkbox-group>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item >Seleccionar</b-dropdown-item>
              </b-dropdown>
              </b-form-group>
              
            </b-form>
            <div class="row m-1">
              <div>
                <b-button  @click="listaProyecto()" type="reset" variant="danger">Cancelar</b-button>
                <b-button  @click="postProyecto()" variant="success" class="enviar">Enviar</b-button>
              </div>
       
            </div>
            <div class="row m-1">
              <div >
                
                <b-alert v-if="showAlert" show variant="danger">{{ alertMessage }}</b-alert>
            </b-alert>
              </div>
       
            </div>
            
          </b-card>
  
        </div>
      </div>
    </div>
  </div>
</template>



<script>
  export default {
    data() {
      return {
        perfil: this.$store.state.perfil.id,
        selectedFile: null, // Variable para guardar el objeto File seleccionad
        foto:null,
        proyecto: { 
          nombre_proyecto:null,
          descripcion:null,
          foto: null,
          aprendiz:null,
          codigo_fuente:null,
          categorias: [],
          autor: null,
        },
        l_categorias: [],
        grupo:null,
        showAlert: false,
      alertMessage: "",
   

      }
    },
    methods: {
      async getCategoria(){
            await this.axios('api/categoria/').then(response=>{
                this.l_categorias = response.data
                
            })
        },
        async getGrupo(id) {
  try {
    const response = await this.axios.get('api/grupo-proyecto/' + id + '/');
    this.grupo = response.data;
    console.log(this.grupo);
    this.showAlert = false; // Ocultar la alerta en caso de éxito
  } catch (error) {
    console.error('Error al obtener el grupo:', error);
    this.showAlert = true; // Mostrar la alerta de error
            this.alertMessage = '¡Error! No se encuentra asociado a un grupo. Por favor, cree un grupo antes de continuar.'
  }
},
        async postProyecto() {
          if (!this.proyecto.nombre_proyecto || !this.proyecto.descripcion) {
            this.showAlert = true; // Mostrar la alerta de error
            this.alertMessage = 'El campo Nombre del Proyecto y/o Descripción no pueden estar en blanco.';
            return; // Detener el proceso si hay campos vacíos
      }
      // Set the 'autor' and 'aprendiz' properties before sending the data
      this.proyecto.autor = this.perfil;
      this.proyecto.aprendiz = this.grupo[0].id;

      const formData = new FormData();
      formData.append('nombre_proyecto', this.proyecto.nombre_proyecto);
      formData.append('descripcion', this.proyecto.descripcion);

      if (this.foto) {
    formData.append('foto', this.foto);
  }
      formData.append('aprendiz', this.grupo[0].id);


      // Agregar campo de código fuente, incluso si es null o undefined
  formData.append('codigo_fuente', this.proyecto.codigo_fuente || '');
      formData.append('aprendiz', this.grupo[0].id);
      this.proyecto.categorias.forEach(categoriaId => {
      formData.append('categorias', parseInt(categoriaId));
      });
  
      
      try {
        // Send the project data to your API endpoint using Axios
        const archivo = { headers: { 'Content-Type': 'multipart/form-data'} } ;// Set the correct content type for file upload
        const response = await this.axios.post('api/proyecto/', formData,archivo);

        // Handle the response here (e.g., show success message or redirect to project details)
        let id_proyecto = response.data.id;
        this.verProyecto(id_proyecto);
      } catch (error) {
        // Handle errors here (e.g., show error message)
        console.error('Error:', error.response.data);
        this.alertMessage = '¡Error! al crear el proyecto. Por favor, inténtalo nuevamente.';
        this.showAlert = true;
      }
    },
       
      // Enví
      async verProyecto(id){
        this.$router.push('/detalle-proyecto/'+id)
      },
      listaProyecto(){
        this.$router.push('/lista-proyecto')
      }
    },
    watch: {
    // Observar cambios en la propiedad "proyecto.foto"
    'proyecto.foto': function(newFile) {
      this.selectedFile = newFile; // Actualizar la variable "selectedFile" cuando se seleccione un archivo
    },
  },
    async mounted(){
        await this.getCategoria()
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