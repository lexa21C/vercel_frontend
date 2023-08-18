<template>
  <div>
    <div class="container">
      <h2 class="p-3 text-center">Integrantes de tu grupo :).. </h2>
      <div class="row">
        <div class="col-12">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(inscrito, index) in integrantes" :key="index">
                <td>{{ inscrito.perfil.usuario.username }}</td>
                <td>
                  <button @click="eliminarIntegrante(inscrito, index)" class="btn btn-outline-danger">x</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'GrupoAgregarIntegrantes',
  props: {
    integrantes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      id: null

    };
  },
  created() {
    this.obtenerIdDelGrupo();
  },
  methods: {
    remover: function (integrantes, inscrito){
      // integrantes.pop(inscrito)
      integrantes.splice(inscrito, 1)
    },  
    obtenerIdDelGrupo() {
      const rutaActual = this.$route.path;
      this.id = rutaActual.substring(rutaActual.lastIndexOf('/') + 1);
    },
    eliminarIntegrante(inscrito, index) {
      axios.patch(`api/inscrito/${inscrito.id}/`, { nombre_grupo: null })
        .then(() => {
          this.remover(this.integrantes,  index, inscrito)
          this.$emit('integranteEliminado'); // Emitir el evento "integranteEliminado" al componente padre
        })
        .catch(error => {
          console.log(error);
        });

    },
  }
};
</script>
