<template>
  <div>
    <b-container class="informaciona">
  <b-row>
    <b-col class="info1">
<h2>Nuestra Función  </h2>
<P>El Banco de Proyectos del SENA regional Cauca estará a cargo de las labores relacionadas con la formulación, el seguimiento, la actualización y el acompañamiento (orientar y apoyar) de los proyectos realizados y desarrollados por los aprendices SENA.
<p>
  Estableciendo las normas comunes, que permitan fijar los estudios de viabilidad de cada proyecto.
</P>

</p>




    </b-col>
    <b-col class="video">
      
      <br>
      <videoyoutube></videoyoutube>


      
    </b-col>
    
  </b-row>

</b-container>
  </div>
</template>
<script>
import videoyoutube from '../components/videoyoutube.vue'
export default {
  
components:{
videoyoutube
}
}
</script>
<style>

.video{
  text-align: center;
  border-width: thin;
  border-style: solid;
  border-color:#B5B2B2;
  margin:5px 5px 5px 5px ;
}
.info1 {
  
  border-width: thin;
  border-style: solid;
  border-color:#B5B2B2;
  margin:5px 5px 5px 5px ;

}
.info2 {
  
  border-width: thin;
  border-style: solid;
  border-color:#B5B2B2;
  margin:5px 5px 5px 5px ;
}
</style>