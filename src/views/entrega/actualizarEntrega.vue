<template>
  <div class="container ">
    <b-card class="m-3">
      <h1>Actualizar entrega del proyecto {{ proyecto.nombre_proyecto }}</h1>
      <b-form>
        <b-form-group
          id="descripcion_entrega"
          label="Descripción de la entrega:"
          label-for="descripcion_entrega"
        >
          <b-form-textarea
            id="descripcion_entrega"
            v-model="entrega.descripcion_entrega"
            :rows="5"
            required
          ></b-form-textarea>
        </b-form-group>
        <b-form-group
          id="documento"
          label="Documento:"
          label-for="documento"
        >
          <b-form-file
            id="documento"
            v-model="documento"
 
            accept=".pdf,.doc,.docx"
          ></b-form-file>
        </b-form-group>
        <b-form-group id="tipo_revision" label="Tipo Revison">
          <div>
            <b-form-select v-model="entrega.tipo_revision">
              <b-form-select-option v-for="option in tipo_de_revicion" :key="option.id" :value="option.id" >
                {{ option.nombre }}
              </b-form-select-option>
            </b-form-select>
          </div>
        </b-form-group>
      </b-form>
      <div class=" position-absolute bottom-0 end-0">
        <b-button  @click="verProyecto(proyecto.id)" class="m-1" type="reset" variant="danger">Cancelar</b-button>
        <b-button  @click="actualizarEntrega(entrega.id)" class="m-1">Enviar</b-button>
      </div>
     
    </b-card>
  </div>
</template>



<script>
import axios from 'axios'
  export default {
    data() {
      return {
        
        id : this.$route.params.id,
        perfil: this.$store.state.perfil.id,
        grupos:null,
        documento:null,
        entrega:{
          id:null,
          calificacion: null,
          descripcion_entrega: null,
          documento:null,
          respuesta_instructor: null,
          instructor: null,
          proyecto: null,
          tipo_revision: null,
          autor: null

        },
        proyecto:null,
        tipo_de_revicion:[]
      }
    },
    methods: {
      archivo(url) {
      // Dividir la URL usando el caracter "/"
      const parts = url.split("/");
      // Obtener la última parte de la URL
      let documento = parts[parts.length - 1];
      return documento
    },
  
      async getProyecto(id){
            await this.axios('api/proyecto/'+id+'/').then(response=>{
                this.proyecto = response.data

            })
        },
      async getTipoDeRevision(){
            await this.axios('api/tipo_revision/').then(response=>{
                this.tipo_de_revicion = response.data

            })
        },

      async actualizarEntrega(id){
        
        this.entrega.documento = this.documento
        this.entrega.proyecto=this.proyecto.id
        this.entrega.autor= this.perfil
        try{

          await this.axios.put('api/entrega/'+id+'/', this.entrega, {
            headers: {
              'Content-Type': 'multipart/form-data', // Aseguramos que el encabezado esté configurado correctamente
            },
          })
          this.verProyecto(this.entrega.proyecto)
          
        }catch (error){
          console.error('Error:', error.response.data);
        }
        

      },


      async getEntrega(){
          let id = this.$route.params.id
          await axios.get('api/entrega/'+id+'/').then(response=>{
              this.entrega.id = response.data.id,
              this.entrega.calificacion= response.data.calificacion,
              this.entrega.descripcion_entrega= response.data.descripcion_entrega,
              this.entrega.documento = response.data.documento,
              this.entrega.respuesta_instructor= response.data.respuesta_instructor,
              this.entrega.instructor= response.data.instructor,
              this.entrega.proyecto= response.data.proyecto,
              this.entrega.tipo_revision= response.data.tipo_revision,
              this.entrega.autor= response.data.autor
          })
        
      },
      async guardaDocumento(url) {
          if (url) {
            try {
              console.log('Descargando documento desde:', url);
              const response = await axios.get(url, {
                responseType: 'blob',
              });
            
              // Determine the file type based on the content type
              let fileType = 'application/octet-stream';
              if (response.headers['content-type']) {
                fileType = response.headers['content-type'];
              }
            
              // Generate a filename with the correct extension based on the file type
              let filename = 'documento';
              if (fileType === 'application/pdf') {
                filename += '.pdf';
              } else if (
                fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
              ) {
                filename += '.docx';
              } else if (fileType === 'application/vnd.ms-excel') {
                filename += '.xls';
              } else {
                // If the file type is not recognized, you can handle it according to your needs.
                console.warn('Unsupported file type:', fileType);
                return;
              }
            
              // Create a new File with the response data and the generated filename
              this.documento = new File([response.data], filename, { type: fileType });
              // Now you can use the "documento" variable as needed (e.g., save it to a data property).
            
              console.log('Documento descargado exitosamente:', this.documento);
            } catch (error) {
              console.error('Error al descargar el documento:', error);
            }
          }
        },


      async verProyecto(id){
        this.$router.push('/detalle-proyecto/'+id)
      },
      
    },
    async mounted(){
      await this.getTipoDeRevision()
      await this.getEntrega()
      await this.getProyecto(this.entrega.proyecto)
      await this.guardaDocumento(this.entrega.documento)

        
    }
  }
</script>