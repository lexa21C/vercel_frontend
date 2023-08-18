<template>
  <div v-if="$store.state.user.isAuthenticated">
    <h1>Agregar Grupo</h1>
    <div class="container">
      <form @submit.prevent="crearGrupo">
        <div>
          <label for="nombre_grupo">Nombre:</label>
          <input type="text" class="form-control" id="nombre_grupo" v-model="grupo.nombre_grupo"><br>
          <b-alert v-if="showAlert" show variant="danger">{{ alertMessage }}</b-alert>
        </div>
        <div class="d-flex justify-content-center">
          <button type="submit" class="btn btn-outline-primary mx-2">Agregar Grupo</button>
          <button class="btn btn-outline-success mx-2" @click="verGrupos">Ver Grupos</button>
          <button class="btn btn-outline-danger mx-2" @click="cancelar">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
export default {
  data() {
    return {
      id_perfil: this.$store.state.perfil.id,
      grupo: {
        nombre_grupo: '',
      },
      showAlert: false,
      alertMessage: "",
      showSpinner: false
    };
  },
  created(){
    //console.log("id_user:",this.perfilLogueado)
  },
  methods: {
    crearGrupo() {  
      if (!this.grupo.nombre_grupo) {
        this.showAlert = true;
        this.alertMessage = "Ingrese un nombre válido";
        return;
      }

      this.showSpinner = true;
      
      axios.post('api/grupo/', this.grupo)
        .then(response => {
          let id_grupo = response.data.id;
          console.log(id_grupo);
          this.actualizarInscrito(id_grupo)
            .then(() => {
              console.log("Usuario agregado al grupo correctamente");
              this.$router.push('/lista-grupos');
            })
            .catch(error => {
              console.log("Error al agregar usuario al grupo:", error.response.data);
              this.alertMessage = error.response.data.error || "Error al crear el grupo o agregar usuario al grupo.";
              this.showAlert = true;
            });
        })
        .catch(error => {
          console.log("Error al crear el grupo:", error.response.data);
          this.alertMessage = error.response.data.error || "Error al crear el grupo.";
          this.showAlert = true;
        })
        .finally(() => {
          this.showSpinner = false;
        });
    },
    actualizarInscrito(id_grupo) {
      return axios.put(`api/agregar-grupo/${this.id_perfil}/${id_grupo}/`);
    },
    verGrupos() {
      this.$router.push('/lista-grupos');
    },
    cancelar() {
      this.$router.push('/inicio');
    }
  },
};
</script>
