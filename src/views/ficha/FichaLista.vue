<template>
    <div>
        <ListaFichas></ListaFichas>
      </div>
  </template>
  
  
  <script>
  import ListaFichas from '@/components/instructor/ListaFichas.vue'
    export default {
      data() {
        return {
          rol: this.$store.state.rol,
        }
      },
      components: {
        ListaFichas,

      }
    }
  
  </script>