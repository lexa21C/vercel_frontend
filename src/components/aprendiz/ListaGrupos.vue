<template>
  <div>
    <h1>Grupos</h1>
    <div class="container">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nombre Grupo</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="grupo in grupos" :key="grupo.id">
            <td>{{ grupo.nombre_grupo.nombre_grupo }}</td>
            <td>
              <button @click="actualizar(grupo.nombre_grupo.id)" class="btn btn-outline-success">Ir</button>
              <button @click="confirmarEliminar(grupo.id)" class="btn btn-outline-danger">Eliminar</button>
            </td>
          </tr>
          <b-alert v-if="showAlert" show variant="danger">{{ alertMessage }}</b-alert>
          <b-alert v-if="showSuccessAlert" show variant="success">{{ successMessage }}</b-alert>
        </tbody>
      </table>
    </div>
    <div class="row justify-content-center">
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="atras">Atrás</button>
      </div>
    </div> 
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      id_perfil:this.$store.state.perfil.id,
      grupos: [],
      showAlert: false,
      alertMessage:"",
      showSuccessAlert: false,
      successMessage: ""
    };
  },

  created() {
    this.getGrupos();
    
    },

  methods: {
    getGrupos() {
      axios.get('api/usuario-grupos/'+this.id_perfil+'/')
        .then(response => {
          this.grupos = response.data;
          console.log("grupos:",this.grupos)
          // const idgrupo = response.data.
          // console.log("::::", idgrupo)
        })
        .catch(error => {
          console.log(error);
        });
    },

    actualizar(id) {
      this.$router.push('grupo-agregar-integrantes/' + id);
    },

    confirmarEliminar(id) {
      if (confirm("¿Estás seguro de eliminar este grupo? Al eliminar el grupo, los integrantes seran eliminados de igual forma.")) {
        this.eliminar(id);
      }
    },

    eliminar(id) {
      axios.delete("api/grupo/" + id + "/")
        .then(() => {
          // Eliminar el grupo de la lista
          this.grupos = this.grupos.filter(grupo => grupo.id !== id);
          this.showSuccessAlert = true;
          this.successMessage = "El grupo se eliminó correctamente.";
        })
        .catch(error => {
          if (error.response && error.response.status === 500) {
            this.showAlert = true;
            this.alertMessage = "El grupo tiene integrantes. Elimine los integrantes para poder eliminar el grupo.";
          } else {
            this.showAlert = true;
            this.alertMessage = "No se pudo eliminar el grupo debido a un error desconocido.";
          }
        });
    },

    atras() {
      this.$router.push('/crear-grupo');
    }
  }
};
</script>

    