<template>
    <div>
      <ListaDeProyectos></ListaDeProyectos>
    </div>
  </template>
  
  
  <script>
  
  import ListaDeProyectos from '@/components/instructor/FichaProyectos.vue';
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
  
  