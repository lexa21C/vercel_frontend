<template>
    <div>
      <b-modal id="modal-descargar" title="Descargar archivo">
        <p>Haz clic en el botón de abajo para descargar el archivo.</p>
        <b-button @click="descargarArchivo" variant="primary">Descargar</b-button>
      </b-modal>
    </div>
</template>
<script>
import { BButton } from 'bootstrap-vue';
import Vue from 'vue';

export default {
  components: {
    BButton,
  },
  methods: {
    descargarArchivo() {
      // Crea un enlace temporal
      const enlaceTemporal = document.createElement('a');
      enlaceTemporal.href = '/archivo_descargable.pdf'; // Ruta del archivo dentro de la carpeta "public"
      enlaceTemporal.target = '_blank';
      enlaceTemporal.download = 'nombre_personalizado.pdf'; // Nombre del archivo para la descarga

      // Simula un clic en el enlace temporal para iniciar la descarga
      document.body.appendChild(enlaceTemporal);
      enlaceTemporal.click();
      document.body.removeChild(enlaceTemporal);
    },
  },
}
</script>

  