
<template>
  <b-navbar class="navbar" toggleable="lg">
    <b-navbar-brand href="#">
      <img src="../assets/logo1.png" alt="Logo" class="m-2" style="max-width: 100px; min-width: 50px; width: auto; height: auto;">

    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" class=" navbar-collapse " is-nav>
      <b-navbar-nav>
       
        <b-nav-item to="/">Inicio</b-nav-item>
       
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        
        <b-nav-item to="/lista-proyecto">Proyectos</b-nav-item>
        <b-nav-item to="/login">Iniciar Sesión </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>


<script>
import axios from 'axios'

export default {
    data() {
      return {
        courses: []
      }
    },
    methods: {
        async logout() {
            console.log('logout')

            await axios
              .post('api/token/logout/')
              .then(response => {
                console.log(response)
                console.log('Logged out')
              })
              .catch(error => {
                console.log(error)
              })

            axios.defaults.headers.common['Authorization'] = ""

            localStorage.removeItem('token')

            this.$store.commit('removeToken')

            this.$router.push('/')
        }
    }
}
</script>
<style >
.navbar {
  padding: 2rem;
  background-color: #B2EBF2;
}

.navbar-collapse {
  align-items: center;
  justify-content: space-between;  
}
</style>