import Vue from 'vue'
import Router from 'vue-router'
import ClientListeComponent from '@/components/clients/client-liste.component';
import ClientConsultComponent from '@/components/clients/client-consult.component';
import ClientFicheComponent from '@/components/clients/client-fiche.component';
import WelcomeComponent from '@/components/home/welcome.component'

Vue.use(Router)

export default new Router({
  routes: [
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
    }
  ]
})
