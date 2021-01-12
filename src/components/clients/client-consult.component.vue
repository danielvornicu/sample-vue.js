<template>
    <div class='card'>
        
        <div class='card-header'>
            <h4>{{ msg.fiche.client.titres.consultation  + client.prenom + ' ' + client.nom}}</h4>
        </div>

        <div class='card-body'>
            <div class='row'>
            <div class='col-md-2'>{{msg.fiche.client.nom}}</div>
            <div class='col-md-4'>{{client.nom}}</div>
            </div>
            <div class='row'>
            <div class='col-md-2'>{{msg.fiche.client.prenom}}</div>
            <div class='col-md-4'>{{client.prenom}}</div>
            </div>
        </div>
        
        <div class='card-footer'>
            <routerLink to="/clients"                   
                    :title="msg.fiche.boutons.annulerTitle"
                    class="btn btn-outline-secondary" >
                    <i class='fa fa-chevron-left'></i> {{msg.fiche.boutons.annuler}}
            </routerLink>
<!--             <button class="btn btn-outline-primary"
                @click="cancel()" 
                :title="msg.fiche.boutons.annulerTitle"><i class='fa fa-chevron-left'></i> {{msg.fiche.boutons.annuler}}
            </button>  -->

            <button class="btn btn-outline-primary"
                @click="edit(client.id)" 
                :title="msg.liste.actions.modifierTitle">{{msg.liste.actions.modifier}}
            </button> 
        </div>  
    </div>
</template>

<script>
import messages from '../../assets/messages.json'
import ClientService from './client.service'
export default {
  name: 'client-consult',
  data () {
    return {
      msg : messages,
      client : { id : null, nom: null, prenom: null}
    }
  },
  //navigation guard: run before page loads
  beforeRouteEnter (to, from, next) {
        ClientService.findById(to.params.id).then( res => {
            console.log('View');
            console.log(res.data);
            next(vm => {
              vm.client = res.data;
            })
             
        })
  },
  //after the page loads
  watch : {
    '$route': 'fetchData'
  },
  methods : {
    fetchData () {
        ClientService.findById(this.$route.params.id).then( res => {
            console.log('After:' + res.data);
            this.client = res.data; 
        })
    },
    //not used, used routerLink to
    cancel(){
        this.$router.push('/clients')
    },
    edit(id){
        this.$router.push(`/clients/${id}/edit`)
    }
  }
}
</script>