<template>
  <div class="container">
    <div class="row m-1 d-flex justify-content-center">
      <b-card class="m-1 col-4 ">
          <h2>Registrar usuario en una ficha </h2>
          <p class="fw-lighter">Usuario:</p>
          <p>{{ grupo[0].perfil.usuario.first_name+' '+grupo[0].perfil.usuario.last_name}}</p>
          <p class="fw-lighter">Rol:</p>
          <p>{{ grupo[0].perfil.rol.nombre}}</p>
          <b-form>
            <b-form-group id="ficha" label="Ficha">
              <div>
                <b-form-select v-model="idFicha">
                  <template #first>
                          <b-form-select-option :value="null" disabled>-- Por favor seleccione una opción --</b-form-select-option>
                        </template>
                  <b-form-select-option v-for="option in ficha" :key="option.id" :value="option.id" >
                    {{ option.codigo }}
                  </b-form-select-option>
                </b-form-select>
              </div>
            </b-form-group>
          </b-form>
          <b-button @click="fichaIntegrantes(grupo[0].ficha.id)" variant="secondary" class="m-1">
              cancelar
          </b-button>
          <b-button @click="crearInscrito()" variant="success" class="mr-2">
              Registrar
          </b-button>
      {{ this.grupo[0].nombre_grupo.nombre_grupo }}
      </b-card>
    </div>
    
  </div>
</template>

  
<script>

import axios from 'axios'
  export default {
    props: {
      fichaId: {
        type: Number,
        required: true
      }
    },
   
    data() {
      return {
        idFicha:null,
        grupo: null,
        ficha:null,
        
        
      };
    },
    methods:{
      async editarIncrito(){
        const formData = new FormData();
        formData.append('estado', 'inactivo');        
        formData.append('nombre_grupo', this.grupo[0].nombre_grupo.id);        
        formData.append('perfil', this.grupo[0].perfil.id);        
        formData.append('ficha', this.grupo[0].ficha.id);        
        await  axios.put('/api/inscrito/'+this.grupo[0].id+'/',formData)
      },
      async crearInscrito(){
        await this.editarIncrito()
        const formData = new FormData();
        formData.append('estado', 'activo');        
        formData.append('perfil', this.grupo[0].perfil.id);        
        formData.append('ficha', this.idFicha);        
        await  axios.post('/api/inscrito/',formData)
        this.fichaIntegrantes(this.grupo[0].ficha.id)
      },
      async getFicha(){
        axios.get('/api/ficha/').then(response => {
          this.ficha = response.data
        })
      },
      async getGrupo(){
        let id = this.$route.params.id
        try{

          await this.axios('api/grupo-proyecto/'+id+'/').then(response=>{
              this.grupo = response.data
              
          })
          console.log(this.grupo)
        }catch(error){
          console.error('Error:', error.response.data);
        }
        },
        fichaIntegrantes(id){
          console.log(id)
            this.$router.push('/ficha-integrantes/'+id)
        },
    },
    async mounted(){
      await this.getGrupo()
      this.getFicha()
    
    }
   
  }
  </script>
   