<template>
    <div>
      <body>
        <div v-if="rol =='aprendiz' ">
            <DetalleEntrega></DetalleEntrega>
           
        </div>
        <div v-else>

          <CalificarEntrega></CalificarEntrega>
        </div>
       </body>

    </div>
  </template>
  <script>

    import CalificarEntrega from '@/components/instructor/CalificarEntrega.vue'

   import DetalleEntrega from '@/components/aprendiz/DetalleDeEntrega.vue'
  
  
    export default {
      data() {
          return {
              rol: this.$store.state.rol,
              
          }
      },
  
      components: {

    CalificarEntrega,
    DetalleEntrega
}
  
    }
  </script>