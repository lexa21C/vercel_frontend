  
  <template>
    <div class="container" >  
        <b-card class="m-2">
            <h4>Entregas Realizadas:</h4> 
            <b-list-group v-for="entrega in entregas" :key="entrega.id">
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                <div class="m-1 p-3">

                  {{ entrega.tipo_revision.nombre }}
                                      
                  </div>
                  <div class="d-flex position-absolute bottom-0 end-0 m-1"  >
                      <div class="ml-auto">
                          <b-button @click="detalleEntrega(entrega.id)" variant="primary" class="m-1">
                              <b-icon icon="eye"></b-icon>
                          </b-button>
                          <b-button @click="actualizarEntrega(entrega.id)" variant="warning" class="mr-2">
                              <b-icon icon="pencil"></b-icon>
                          </b-button>
                          <b-button @click="eliminarEntrega(entrega.id)" variant="danger">
                              <b-icon icon="trash"></b-icon>
                          </b-button>
                      </div>
                  </div> 
              </b-list-group-item>
          </b-list-group>
            <div class="text-end mt-3">
              <b-button variant="success" @click="crearEntrega(id)">Crear Entrega</b-button>
          </div>

        </b-card>
        <!-- <h3 >Entregas de {{ proyecto.nombre }}</h3>
        <b-card>
        </b-card> -->
    </div>
</template>

<script>
import axios from 'axios'

export default{
    name:'Lista',

    data(){
        return{
          id : this.$route.params.id,
            tipo:null,
            entregas:null
        }
    },
    methods:{
        async eliminarEntrega(id){
            await axios.delete("api/entrega/"+id+'/')
            await this.getEntregas()
        },
        getEntregas(){
            let id = this.$route.params.id
              axios.get("api/proyecto-entregas/"+id+'/').then(response=>{
              this.entregas= response.data
            })
        },
        crearEntrega(id){
          console.log(id)
            this.$router.push('/crear-entrega/'+id)
        },
        actualizarEntrega(id){
            console.log(id)
            this.$router.push('/actualizar-entrega/'+id)
        },
        detalleEntrega(id){
          console.log(id)
            this.$router.push('/detalle-entrega/'+id)
        },
     
    },
    async mounted(){

        await this.getEntregas()
    }
}
</script>
<style>
.imagen{
    width: 100%;
}

</style>