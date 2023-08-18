<template>
  <b-navbar class="navbar" toggleable="lg">
    <b-navbar-brand href="#">
      <img src="../../assets/logo1.png" alt="Logo" class="m-2" style="max-width: 100px; min-width: 50px; width: auto; height: auto;">

    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" class=" navbar-collapse " is-nav>
      <b-navbar-nav>
       
        <b-nav-item to="/">Inicio</b-nav-item>
   
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        
        <b-nav-item to="/lista-proyecto">Proyectos</b-nav-item>
        <b-nav-item to="/registrar">Registrar Usuarios</b-nav-item>
        <b-nav-item-dropdown text="Fichas" right>
          <b-dropdown-item to="/crear-ficha">Agregar Fichas</b-dropdown-item>
          <b-dropdown-item to="/lista-ficha">Ver Fichas</b-dropdown-item>
        </b-nav-item-dropdown>
        
        <b-nav-item to="/mis-proyectos">{{ nombre }}<span>({{ rol }})</span></b-nav-item>
        
        <b-nav-item  @click="logout()">Cerrar Sesión</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

  <script>
  import axios from 'axios'
  import { BNavbar, BNavbarBrand, BNavbarToggle, BCollapse, BNavbarNav, BNavItem, BNavItemDropdown, BDropdownItem } from 'bootstrap-vue';
  
  
  export default {
    data() {
          return {
            nombre:this.$store.state.perfil.first_name,
              rol: this.$store.state.rol,
              
          }
      },
    components: {
      BNavbar,
      BNavbarBrand,
      BNavbarToggle,
      BCollapse,
      BNavbarNav,
      BNavItem,
      BNavItemDropdown,
      BDropdownItem,
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
              this.$store.commit('clearState')
  
  
              this.$router.push('/inicio')
          }
      }
  }
  </script>

</style>
/* Barra de navegacion */

.navbar {
  padding: 2rem;
  background-color: #f5f6f7;
}

.navbar-collapse {
  align-items: center;
  justify-content: space-between;  
}
<style>
  