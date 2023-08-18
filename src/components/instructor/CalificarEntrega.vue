<template>
    <div class="container">
        <b-card class="m-1">
            <h2>Entregas de {{ proyecto.nombre_proyecto }} </h2>
            <div class="row">
                <div class="container">
                    <div class="row p-3">
                        <p class="fw-lighter">Descripción:</p>
                        <p>{{ entrega.descripcion_entrega }}</p>
                    </div>
                    <div class="row">
                        <p><span class="fw-lighter">Tipo de revisión: </span>{{ tipo_revision }}</p>
                    </div>
                    <div class="row">
                    <div>
                      <p>Haz clic en el botón de abajo para descargar el archivo.</p>
                        <b-button @click="descargarDocumento" variant="primary">Descargar Archivo</b-button>
                    </div>

                <!-- descargar el documento aqui de la entrega -->
            </div>
                    <div class="row m-1">
                        <b-form>
                            <b-form-group label="Calificacion">
                                <div class="form-check" v-for="option in options" :key="option">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    :id="option"
                                    :value="option"
                                    v-model="entrega.calificacion"
                                  >
                                  <label class="form-check-label" :for="option">{{ option }}</label>
                                </div>
                            </b-form-group>
                            <b-form-group
                              id="comentar_entrega"
                              label="Comentar la Entrega:"
                              label-for="comentar_entrega"
                            >
                              <b-form-textarea
                                id="comentar_entrega"
                                v-model="entrega.respuesta_instructor"
                                :rows="5"
                                required
                              ></b-form-textarea>
                            </b-form-group>
                        </b-form>
                    </div>
                </div>
            </div>
            <div class="row m-1 "  >
                      <div class="ml-auto">
                          <b-button @click="verProyecto(entrega.proyecto)" variant="secondary" class="m-1">
                              cancelar
                          </b-button>
                          <b-button @click="calificarEntrega(entrega.id)" variant="success" class="mr-2">
                              Calificar
                          </b-button>
                          
                      </div>
                  </div>
        </b-card>
    </div>
</template>
<script>
import axios from 'axios'
export default{
    data(){
        return{
            proyecto:null,
            documento:null,
            options: ['aprobado','No aprobado'],
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
        tipo_revision:null
        }
    },
    methods:{
        async getProyecto(id){
            await this.axios('api/proyecto/'+id+'/').then(response=>{
                this.proyecto = response.data

            })
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
        async getTipoDeRevision(id){
            await axios.get('api/tipo_revision/'+id+'/').then(response=>{
                this.tipo_revision=response.data.nombre
            })
        },
        async calificarEntrega(id){
        
        this.entrega.documento = this.documento
        
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

        descargarDocumento() {
         // Crea un enlace temporal
            const enlaceTemporal = document.createElement('a');
            enlaceTemporal.href = this.entrega.documento; // Ruta del documento dentro de la carpeta "public"
            enlaceTemporal.target = '_blank';
            enlaceTemporal.download = 'nombre_documento.pdf'; // Nombre del archivo para la descarga
            
            // Simula un clic en el enlace temporal para iniciar la descarga
            document.body.appendChild(enlaceTemporal);
            enlaceTemporal.click();
            document.body.removeChild(enlaceTemporal);
       },
        async verProyecto(id){
            this.$router.push('/detalle-proyecto/'+id)
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

    },
    async mounted(){
        await this.getEntrega()
        await this.getTipoDeRevision(this.entrega.tipo_revision)
        await this.getProyecto(this.entrega.proyecto)
    }

}
</script>