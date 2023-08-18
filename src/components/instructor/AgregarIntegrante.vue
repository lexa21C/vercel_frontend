<template>
    <div>
      <b-button v-b-modal.modal-prevent-closing>Agregar</b-button>
  
      <div class="mt-3">
        Agregar un inscrito a la ficha
        <div v-if="submittedNames.length === 0">--</div>
        <ul v-else class="mb-0 pl-3">
          <li v-for="(name, index) in submittedNames" :key="index">{{ name }}</li>
        </ul>
      </div>
  
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Agregar un Inscrito a la Ficha"
        @show="resetModal"
        @hidden="resetModal"
        @Guardar="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label="Name"
            label-for="name-input"
            invalid-feedback="Name is required"
            :state="nameState"
          >
            <b-form-input
              id="name-input"
              v-model="name"
              :state="nameState"
              required
            ></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        nameState: null,
        submittedNames: []
      }
    },
    methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      resetModal() {
        this.name = ''
        this.nameState = null
      },
      handleOk(bvModalEvent) {
        // Prevent modal from closing
        bvModalEvent.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        this.submittedNames.push(this.name)
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      }
    }
  }
  </script>
  

<!-- <template>

    <div>
      <b-modal v-model="modalShow" @ok="submitForm" title="Formulario de Inscrito">
        <b-form-group id="nombre-grupo" label="Nombre del Grupo" label-for="nombre-grupo-select" description="Seleccione el nombre del grupo">
          <b-form-select id="nombre-grupo-select" v-model="formData.nombre_grupo" :options="grupoOptions" required></b-form-select>
        </b-form-group>
  
        <b-form-group id="perfil" label="Perfil" label-for="perfil-select" description="Seleccione el perfil">
          <b-form-select id="perfil-select" v-model="formData.perfil" :options="perfilOptions" required></b-form-select>
        </b-form-group>
  
        <b-form-group id="ficha" label="Ficha" label-for="ficha-select" description="Seleccione la ficha">
          <b-form-select id="ficha-select" v-model="formData.ficha" :options="fichaOptions" required></b-form-select>
        </b-form-group>
  
        <b-button type="submit" variant="primary">Guardar</b-button>
      </b-modal>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      fichaId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        modalShow: false,
        formData: {
          estado: '',
          nombre_grupo: null,
          perfil: null,
          ficha: null,
        },
        grupoOptions: [
          { value: 1, text: 'Grupo 1' },
          { value: 2, text: 'Grupo 2' },
          { value: 3, text: 'Grupo 3' },
          // Agregar más grupos según sea necesario
        ],
        perfilOptions: [
          { value: 1, text: 'Perfil 1' },
          { value: 2, text: 'Perfil 2' },
          { value: 3, text: 'Perfil 3' },
          // Agregar más perfiles según sea necesario
        ],
        fichaOptions: [
          { value: 1, text: 'Ficha 1' },
          { value: 2, text: 'Ficha 2' },
          { value: 3, text: 'Ficha 3' },
          // Agregar más fichas según sea necesario
        ],
      };
    },
    methods: {
      submitForm() {
        // Aquí puedes enviar los datos del formulario al servidor o realizar otras operaciones necesarias
        console.log(this.formData);
        this.modalShow = false; // Cerrar el modal después de enviar el formulario
      },
    },
  };
  </script> -->
