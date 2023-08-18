<template>
  <div class="container">
    <div class="row ">
      <h4>Realizado por el grupo: {{ integrantes[0].nombre_grupo.nombre_grupo }}</h4>
      <p>
        <strong>Integrantes:</strong>
      </p>
    </div>
    <div class="row">
        <b-list-group class="m-1" v-for="integrante in integrantes" :key="integrante.id">
          <b-list-group-item class="col-8 d-flex align-items-center" >
            <b-avatar class="mr-3"></b-avatar>
            <span class="mr-auto"> {{ integrante.perfil.usuario.first_name }} {{ integrante.perfil.usuario.last_name }}</span>
            <b-badge>5</b-badge>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
    
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      integrantes: null,
    };
  },
  methods: {
    getIntegrantes() {
      let id = this.$route.params.id
      this.axios.get('api/proyecto-participantes/' + id + '/').then((response) => {
        this.integrantes = response.data;
      });
    },
  },
  async mounted() {
    await this.getIntegrantes();
  },
};
</script>

  