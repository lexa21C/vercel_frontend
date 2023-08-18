<template>
  <b-container>
    <b-row class="m-2">
      <b-col
        md="6"
        sm="12"
        >
        <h2>Registrar Usuarios</h2>
        <b-card md="5">

          <b-form-group
          label="Haz clic en el botón de abajo para descargar el formulario."
          >
          <b-button @click="descargarDocumento()" variant="success">Descargar  </b-button>
      
          
        </b-form-group>
          <b-form class="m-1">
            <b-form-group
              id="documento"
              label="Documento :"
              label-for="documento"
            >
              <b-form-file
                id="documento"
                v-model="documento"   
                accept=".xls,.xlsx"
                name="file"
              ></b-form-file>
            </b-form-group>
            <b-form-group
              label="Rol:"
            >
              <b-form-select 
                v-model="rol_id"  
                name="rol_id"
              >
                <b-form-select-option
                  v-for="rol in rol"
                  :key="rol.id"
                  :value="rol.id"
                >
                  {{ rol.nombre }}
                </b-form-select-option>
              </b-form-select>   
            </b-form-group>
            <b-form-group
              label="Ficha"
            >    
              <b-form-select 
                v-model="ficha_id" 
                name="ficha_id" 
              >
                <b-form-select-option
                  v-for="ficha in ficha"
                  :key="ficha.id"
                  :value="ficha.id"
                >
                  {{ ficha.codigo }}
                </b-form-select-option>
              </b-form-select>
            </b-form-group>
          </b-form>
          <div class="m-1">
  
            <b-button @click="uploadFile">Registrar</b-button>
          </div>
        </b-card>
      </b-col>
      <b-col
        md="6"
        sm="12"
      >
        <h2>Usuarios Registrados</h2>
        <b-table striped hover :items="items" :fields="fields"></b-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import axios from 'axios';

export default {
  
  data() {
    return {
      fields: [
        {
          key: 'last_name',
          label: 'nombre',
        },
        {
          key: 'first_name',
          label: 'apellido',
        },
        {
          key: 'email',
          label: 'correo electronico',
          
          
        }
      ],
      items: null,
      rol: null,
      documento: null,
      ficha: null, // Replace with the actual ID of the ficha
      ficha_id: null, // Replace with the actual ID of the ficha
      rol_id: null   // We'll set this dynamically based on the selected role
    };
  },
  methods: {
    getFicha() {
      axios.get("api/ficha/").then(response => {
        this.ficha = response.data;
      });
    },
    getRol() {
      axios.get("api/rol/").then(response => {
        this.rol = response.data;
      });
    },
    uploadFile() {
      let formData = new FormData();
      formData.append('file', this.documento);
      formData.append('ficha_id', this.ficha_id);
      formData.append('rol_id', this.rol_id); // Assuming the URL is the value you need
        
      axios
        .post('api/upload/', formData)
        .then(response => {
          this.items = response.data;
          // Reset the form values after successful upload
          this.documento = null;
          this.ficha_id = null;
          this.rol_id = null;
        })
        .catch(error => {
          console.error(error);
        });
    },
    
    descargarDocumento() {
  // Crea un enlace temporal
  const enlaceTemporal = document.createElement('a');
  
  // Reemplaza la URL con la URL real para el archivo de Excel
  enlaceTemporal.href = 'https://lexa2803.pythonanywhere.com/descargar-excel/';
  
  // Actualiza el nombre del archivo y la extensión para que coincida con el archivo de Excel
  enlaceTemporal.download = 'nombre_documento.xlsx'; // Cambia a '.xlsx' para archivos de Excel

  // Simula un clic en el enlace temporal para iniciar la descarga
  document.body.appendChild(enlaceTemporal);
  enlaceTemporal.click();
  document.body.removeChild(enlaceTemporal);
},

  },
  mounted() {
    this.getRol();
    this.getFicha()
  }
};
</script>

