<template>
  <div class="container">
    <h1>Listado de fichas</h1>
    <h2>Centro Teleinformática y Producción Industrial</h2>
    <b-row>
      <b-col>
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Identificador Ficha de Caracterización</th>
                <th scope="col">Programa de Formación</th>
                <th scope="col">Proyecto</th>
                <th scope="col">Integrantes</th>
                <!-- <th scope="col">Ficha</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.id">
                <td>{{ item.codigo }}</td>
                <td>{{ item.programa.nombre }}</td>
                <td>
                  <b-button @click="fichaProyectos(item.id)" variant="primary" class="m-1">
                    <b-icon icon="eye"></b-icon>
                  </b-button>
                </td>
                <td>
                  <b-button @click="fichaIntegrantes(item.id)" variant="primary" class="m-1">
                    <b-icon icon="eye"></b-icon>
                  </b-button>
                </td>
                <!-- <td>
                  <b-button @click="editarEntrega(entrega)" variant="warning" class="mr-2">
                    <b-icon icon="pencil"></b-icon>
                  </b-button>
                  <b-button @click="eliminarEntrega(entrega.id)" variant="danger">
                    <b-icon icon="trash"></b-icon>
                  </b-button>
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

  
  <script>


  export default {
    data() {
      return {
        perfil: this.$store.state.perfil.id,
        fields: [
          { key: 'codigo', label: 'ficha' },
          { key: 'action', label: 'action' } // Agregamos una nueva columna para el botón "Ver"
        ],
        items: null
      };
    },
    methods: {
      async getFichaIntegrantes(id) {
        await this.axios.get("api/fichas-usuario/" + id + '/').then(response => {
          this.items = response.data
        })
      },
      fichaIntegrantes(id){
          console.log(id)
            this.$router.push('ficha-integrantes/'+id)
        },
      fichaProyectos(id){
          console.log(id)
            this.$router.push('ficha-proyectos/'+id)
        },
      
    },
    mounted() {
        this.getFichaIntegrantes(this.perfil)
    },
  };
  </script>

<style>
.custom-button {
  background-color: #00324D !important;
  color: #FFFFFF;
  border-color: #00324D !important;

}
</style>