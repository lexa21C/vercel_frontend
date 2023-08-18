<template>
    <div>
      
      <body>
        <DetalleEntrega></DetalleEntrega>

       </body>

    </div>
  </template>
<script>

  import  DetalleEntrega from '@/components/DetalleDeEntrega.vue'
  
  
    export default {
      data() {
          return {
              rol: this.$store.state.rol,
              
          }
      },
  
      components: {
         DetalleEntrega
   },
  
}
  
  </script>