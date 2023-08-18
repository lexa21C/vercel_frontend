<template>
    <div class="container">
        <b-card class="m-1">
            <h2>Entregas de {{ proyecto.nombre_proyecto }} </h2>
            <div class="row">
                <p class="fw-lighter">Descripcion:</p>
                <p>{{ entrega.descripcion_entrega }}</p>
                <p><span class="fw-lighter">Estado de la entrega: </span>{{ entrega.calificacion }}</p>
            </div>
            <div class="row">
                <p><span class="fw-lighter">Tipo de revision: </span>{{ tipo_revision }}</p>
            </div>
            <div class="row">
                <p><span class="fw-lighter">Nota del instructor: </span>{{ entrega.respuesta_instructor }}</p>
            </div>
            <div class="row">
                <div>
                    <p>Haz clic en el botón de abajo para descargar el archivo.</p>
                    <b-button @click="descargarDocumento" variant="primary">Descargar Archivo</b-button>
                </div>

                <!-- descargar el documento aqui de la entrega -->
            </div>           
        </b-card>
        <div class="row justify-content-center">
        <div class="col-auto">
          <button class="btn btn-outline-primary" @click="verProyecto(proyecto.id)">Atrás</button>
        </div>
      </div>
    </div>
</template>
<script>
import axios from 'axios'
export default{
    data(){
        return{
            proyecto:null,
            usuario:null,
            entrega:{
                id:null,
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
                this.entrega.documento = response.data.documento,
                this.entrega.descripcion_entrega= response.data.descripcion_entrega,
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
        this.$router.push('/ver-proyecto/'+id)
      },
    },
    async mounted(){
        await this.getEntrega()
        await this.getTipoDeRevision(this.entrega.tipo_revision)
        await this.getProyecto(this.entrega.proyecto)

    }

}
</script>