import Vue from 'vue'
import VueRouter from 'vue-router'
import RegistrarView from '@/views/Registrar.vue'
import LoginView from '@/views/Login.vue'
import Desarrolladores from '../views/Desarrolladores.vue' 
import PoliticasyPrivacidad from '@/views/PoliticasyPrivacidad.vue'
import terminosycondicionesVue from '@/views/terminosycondiciones.vue'
import InicioView from '@/views/Inicio.vue'

import ListaProyectoView from '@/views/ListaProyecto.vue'
import VerProyectoView from '@/views/VerProyecto.vue'
import verEntregaView from '@/views/VerEntrega.vue'
//proyecto usuario Views
import CrearProyectoView from '@/views/proyecto/CrearProyecto.vue'
import MisProyectoView from '@/views/proyecto/MisProyectos.vue'
import MisProyectoDetalleView from '@/views/proyecto/MisProyectosDetalle.vue'
import EditarProyectoView from '@/views/proyecto/EditarProyecto.vue'
import FichaProyectosView from '@/views/proyecto/FichaProyectos.vue'
//entrega usuario
import CrearEntregaView from '@/views/entrega/CrearEntrega.vue'
import DetalleEntrega from '@/views/entrega/DetalleEntrega.vue'
import ActualizarEntregaView from '@/views/entrega/actualizarEntrega.vue'
//grupo usuario
import CrearGrupo from '@/views/grupo/CrearGrupo.vue'
import ListaGrupos from '@/components/aprendiz/ListaGrupos.vue'
import GrupoAgregarIntegrantes from '@/views/grupo/AgregarIntegrantes.vue'
//ficha usuario
import CrearFicha from '@/components/instructor/CrearFicha.vue'
import ListaFicha  from '@/views/ficha/FichaLista.vue'
import FichaIntegrantes from '@/components/instructor/FichaIntegrantes'
import CambiarFicha from '@/views/ficha/CambiarFicha.vue'






Vue.use(VueRouter)

const routes = [
  {
    path: '/registrar',
    name: 'registrar',
    component: RegistrarView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path:'/Desarrolladores',
    name: 'Desarrolladores',
    component: Desarrolladores
  },
  {
    path:'/PoliticasyPrivacidad',
    name: 'PoliticasyPrivacidad',
    component:PoliticasyPrivacidad
  },
  {
    path:'/terminosycondiciones',
    name: 'terminosycndiciones',
    component:terminosycondicionesVue
  },  
  {
    path: '/',
    name: 'inicio',
    component: InicioView
  },
  {

    path: '/lista-proyecto',
    name: 'lista-proyecto',
    component: ListaProyectoView
  },
  {
    path:'/ver-proyecto/:id',
    name: 'ver-proyecto',
    component: VerProyectoView
  },
  
  {
    path:'/ver-entrega/:id',
    name: 'ver-entrega',
    component: verEntregaView
  },
  
  //proyectos
  {
    path: '/mis-proyectos',
    name: 'mis-proyectos',
    component: MisProyectoView
  },
  {
    path:'/editar-proyecto/:id',
    name: 'editar-proyecto',
    component: EditarProyectoView
  },
  {
    path:'/detalle-proyecto/:id',
    name: 'detalle-proyecto',
    component:MisProyectoDetalleView
  },
  {
    path:'/ficha-proyectos/:id',
    name: 'ficha-proyectos',
    component:FichaProyectosView
  },
  {
    path:'/crear-proyecto',
    name: 'crear-proyecto',
    component: CrearProyectoView
  },
  //entregas
  {
    path:'/detalle-entrega/:id',
    name: 'detalle-entrega',
    component:DetalleEntrega
  },
  {
    path:'/crear-entrega/:id',
    name: 'crearentrega',
    component: CrearEntregaView
  },
  {
    path:'/actualizar-entrega/:id',
    name: 'actualizar-entrega',
    component: ActualizarEntregaView
  },
   
  //grupo
  {
    path:'/crear-grupo',
    name: 'crear-grupo',
    component: CrearGrupo
  },
  {
    path:'/grupo-agregar-integrantes/:id',
    name: 'grupo-agregar-integrantes',
    component: GrupoAgregarIntegrantes
  },

  {
    path:'/lista-grupos',
    name: 'lista-grupos',
    component: ListaGrupos
  },
  //ficha
  {
    path:'/crear-ficha',
    name: 'crear-ficha',
    component: CrearFicha
  },
  {
    path:'/ficha-integrantes/:id',
    name: 'ficha-integrantes',
    component: FichaIntegrantes
  },
  {
    path:'/agregar-integrantes/:id',
    name: 'agregar-integrantes',
    component: CambiarFicha
  },
  {
    path:'/lista-ficha',
    name: 'lista-ficha',
    component: ListaFicha
  },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
