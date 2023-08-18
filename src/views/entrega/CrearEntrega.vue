<template>
  <div class="container ">
    <div class="row">
      <b-card class="m-3">
        <h1>Realizar entrega del proyecto {{ proyecto.nombre_proyecto }}</h1>
        <b-form  enctype="multipart/form-data">
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
          <b-button class="m-1" type="reset" variant="danger">Cancelar</b-button>
          <b-button  @click="crearEntrega()" class="m-1">Enviar</b-button>
        </div>
        
      </b-card>
    </div>
  </div>
</template>



<script>
  export default {
    data() {
      return {
        er:null,
        documento:null,
        proyecto_id : this.$route.params.id,
        perfil: this.$store.state.perfil.id,
        entrega:{
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
        
        async crearEntrega(){
        this.entrega.proyecto=this.proyecto.id
        this.entrega.autor= this.perfil
        this.entrega.documento = this.documento; // Asigna el valor del campo 'documento' al objeto 'entrega'
        console.log(this.entrega);

      try {
      // Envía los datos a tu servicio en Django utilizando Axios
      // Aquí debes reemplazar 'URL_DEL_SERVICIO' con la URL de tu servicio en Django
          const response =  await this.axios.post('api/entrega/', this.entrega, {
          headers: {
            'Content-Type': 'multipart/form-data', // Aseguramos que el encabezado esté configurado correctamente
          },
        });
          // Aquí puedes manejar la respuesta del servicio, mostrar un mensaje de éxito, etc.
          console.log(response.data);
          await this.verProyecto(this.proyecto.id)
        } catch (error) {
      // Manejo de errores en caso de que falle la solicitud
          console.error('Error:', error.response.data);
        }


      },
    async verProyecto(id){
        this.$router.push('/detalle-proyecto/'+id)
      },
    },
    async mounted(){
      await this.getTipoDeRevision()
      await this.getProyecto(this.proyecto_id)

        
    }
  }
</script> 

