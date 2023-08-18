<template>
  <div>
  <div class="imglogin">
    <img src="../assets/imagenes/WhatsApp Image 2023-08-12 at 9.37.28 PM.jpeg" width="200" height="200">
  </div>
    <div class="containerlogin">
      <div class="row m-1 d-flex justify-content-center">
        <b-card class="col-6">
          <h1>Iniciar sesión</h1>
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="username" class="form-label">Correo electronico</label>
              <input type="text" class="form-control" id="username" name="username" v-model="username">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Contraseña</label>
              <input type="password" class="form-control" id="password" name="password" v-model="password">
            </div>
            <div class="d-flex justify-content-center">
              <button type="submit" class="btn btn-primary">Iniciar sesion</button>
            </div>
          </form>
        </b-card>
      </div>
    </div>

    </div>
  </template>
  

<script>
import axios from 'axios'
export default {
    data() {
        return {
            username: '',
            password: '',
            errors: []
        }
    },
    mounted() {
        
    },
    methods: {
        submitForm() {
            console.log('submitForm')
            axios.defaults.headers.common['Authorization'] = ""
            localStorage.removeItem('token')
            this.errors = []
            if (this.username === '') {
                this.errors.push('The username is missing!')
            }
            if (this.password === '') {
                this.errors.push('The password is missing!')
            }
            if (!this.errors.length) {
                const formData = {
                    username: this.username,
                    password: this.password
                }
                axios
                    .post('api/login/', formData)
                    .then(response => {
                        const token = response.data.access_token
                        const username = response.data.user
                        const rol = response.data.otro

                        this.$store.commit('setToken', token)
                        this.$store.commit('setUsername', username)
                        this.$store.commit('setRol', rol)
                        axios.defaults.headers.common['Authorization'] = "Token " + token
                        localStorage.setItem('token', token)
                        
                        this.$router.push('/lista-proyecto')
                    })
                    .catch(error => {
                        if (error.response) {
                            for (const property in error.response.data) {
                                this.errors.push(`${property}: ${error.response.data[property]}`)
                            }
                            console.log(JSON.stringify(error.response.data))
                        } else if (error.message) {
                            this.errors.push('Something went wrong. Please try again')
                            
                            console.log(JSON.stringify(error))
                        }
                    })
            }
        }
    }
}
</script> 

<style>
.containerlogin{
  margin-top: 0px;
  height: 800px;
  width: 800px;
margin-left: 280px;
}

.imglogin{
  text-align: center;
}



</style>