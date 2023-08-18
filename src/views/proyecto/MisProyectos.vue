<template>
  <div>
    <ListaDeProyectos></ListaDeProyectos>
  </div>
</template>



<script>

import ListaDeProyectos from '@/components/aprendiz/ListaDeProyectos.vue';
  export default {
    data() {
      return {
        rol: this.$store.state.rol,
      }
    },
    components: {

      ListaDeProyectos
    }
  }

</script>

