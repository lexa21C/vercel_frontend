<template>
    <div>
      <h1>Inscritos</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Ficha</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(inscrito, index) in inscritos" :key="index">
            <td>
              <input type="checkbox" v-model="inscrito.selected">
            </td>
            <td>{{ inscrito.perfil.usuario.username }}</td>
            <td>{{ inscrito.ficha.codigo }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="agregarSeleccionados">Agregar seleccionados</button>
      <button @click="cancelar">Cancelar</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        inscritos: []
      };
    },
    created() {
      axios.get('http://127.0.0.1:8000/api/inscrito/')
        .then(response => {
          this.inscritos = response.data.map(inscrito => {
            return {
              ...inscrito,
              selected: false
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    methods: {
      agregarSeleccionados() {
        const seleccionados = this.inscritos.filter(inscrito => inscrito.selected);
        if (seleccionados.length > 0) {
          const grupoId = 1; // Cambiar por el ID del grupo
          const requests = seleccionados.map(inscrito => {
            return axios.post(`http://127.0.0.1:8000/api/grupo/${grupoId}/miembros/`, {
              inscrito: inscrito.id
            });
          });
          axios.all(requests)
            .then(response => {
              console.log(response);
              this.$router.push('/ListaMiembrosGrupo');
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      cancelar() {
        this.$router.push('/CrearGrupo');
      }
    }
  }
  </script>
  