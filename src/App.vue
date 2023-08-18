<template>
  <div>
    <nav>
      <template v-if="$store.state.user.isAuthenticated">
        <template v-if="rol =='aprendiz'">
          <NabvarAprendiz></NabvarAprendiz>
        </template>
        <template v-else>
          <NabvarInstructor></NabvarInstructor>
        </template>
      </template>
      <template v-else>
        <Nabvar></Nabvar>
      </template>
    </nav>
  
    <router-view />
  </div>
</template>

<script>
import axios from 'axios';
import Nabvar from '@/components/Nabvar.vue';
import NabvarAprendiz from '@/components/aprendiz/NabvarAprendiz.vue';
import NabvarInstructor from '@/components/instructor/NabvarInstructor.vue';

export default {
  data() {
    return {
      rol: this.$store.state.rol,
    };
  },
  components: {
    Nabvar,
    NabvarAprendiz,
    NabvarInstructor,
   
  },
  beforeCreate() {
    this.$store.commit('initializeStore');

    const token = this.$store.state.user.token;

    if (token) {
      axios.defaults.headers.common['Authorization'] = "Token " + token;
    } else {
      axios.defaults.headers.common['Authorization'] = "";
    }
  },
};
</script>

