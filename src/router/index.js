import { createWebHistory, createRouter, createMemoryHistory } from 'vue-router'
import ClientListeComponent from '../components/clients/client-liste.component.vue';
import ClientConsultComponent from '../components/clients/client-consult.component.vue';
import ClientFicheComponent from '../components/clients/client-fiche.component.vue';
import WelcomeComponent from '../components/home/welcome.component.vue'

const routes = [
   {
      path: '/',
      name: 'client-liste',
      component: ClientListeComponent
    },
    {
      path: '/clients',
      name: 'client-liste',
      component: ClientListeComponent
    },
    {
      path: '/clients/new',
      name: 'client-fiche-add',
      component: ClientFicheComponent
    },
    {
      path: '/clients/:id',
      name: 'client-consult',
      component: ClientConsultComponent
    },
    {
      path: '/clients/:id/edit',
      name: 'client-fiche-edit',
      component: ClientFicheComponent
    },
    {
      path: '/welcome',
      name: 'welcome-component',
      component: WelcomeComponent
    },
	{
		path: '/:pathMatch(.*)*',
		redirect: "/",
	}
  ]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;