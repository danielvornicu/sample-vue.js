<template>
    <div class='card'>
        <div class='card-header'>
            <div class="row">
                <div class="col-md-8">
                    <h1>{{ msg.liste.clients.vuejs.titre }}</h1>
                </div>
            </div>
        </div>

        <div class='card-body'>
            <div class='table-responsive'>
                <table class = 'table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>{{msg.fiche.client.nom}}</th>
                            <th>{{msg.fiche.client.prenom}}</th>
                            <th>{{msg.liste.actions.titre}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="client in clients" v-bind:key="client.id">
                                <td>{{ client.nom }}</td>
                                <td>{{ client.prenom }}</td>
                                <td>
                                    <routerLink v-bind:to="{name : 'client-consult', params : {id : client.id}}"
                                       :title="msg.liste.actions.consulterTitle"
                                       class="btn btn-outline-primary btn-sm">{{msg.liste.actions.consulter}}
                                    </routerLink> |
<!--                                     <button 
                                        @click="show(client.id)" 
                                        :title="msg.liste.actions.consulterTitle"
                                        class="btn btn-outline-primary btn-sm" 
                                        id="boutonSupprimer">{{msg.liste.actions.consulter}}
                                    </button> | -->
                                    <routerLink v-bind:to="{name : 'client-fiche-edit', params : {id : client.id}}"
                                       :title="msg.liste.actions.modifierTitle"
                                       class="btn btn-outline-primary btn-sm">{{msg.liste.actions.modifier}}
                                    </routerLink> |
<!--                                     <button 
                                        @click="edit(client.id)" 
                                        :title="msg.liste.actions.modifierTitle"
                                        class="btn btn-outline-primary btn-sm" 
                                        id="boutonSupprimer">{{msg.liste.actions.modifier}}
                                    </button> |  -->
                                    <button 
                                        @click="deleteClient(client.id)" 
                                        :title="msg.liste.actions.supprimerTitle"
                                        class="btn btn-outline-danger btn-sm" 
                                        id="boutonSupprimer">{{msg.liste.actions.supprimer}}
                                    </button>
                                </td>
                        </tr>
                    </tbody> 
                </table>
            </div>

            <div class="panel">
                <routerLink to="/clients/new"                   
                    :title="msg.fiche.boutons.creerTitle"
                    class="btn btn btn-outline-primary btn-sm" >{{msg.fiche.boutons.creer}}
                </routerLink>
<!--                 <button 
                    @click="create()" 
                    :title="msg.fiche.boutons.creerTitle"
                    class="btn btn-outline-primary btn-sm" 
                    id="boutonSupprimer">{{msg.fiche.boutons.creer}}
                </button>  -->  
            </div> 
        </div>
        <p>Storage mode: {{storage_mode}} </p>
    </div>
</template>

<script>
import messages from '../../assets/messages.json'
import ClientService from './client.service'
import axios from 'axios';
export default {
  name: 'client-liste',
  data () {
    return {
      msg : messages,
      clients : [],
      storage_mode : ''
    }
  },
  async created(){
	await this.getAllClients();
    this.storage_mode = ClientService.getStorageMode();   
  },
  methods : {
      //not used, used routerLink to
      create(){
        this.$router.push('/clients/new')
      },
      //not used, used v-bind:to
      show(id){
        this.$router.push(`/clients/${id}`)
      },
      //not used, used v-bind:to
      edit(id){
         this.$router.push(`/clients/${id}/edit`)
      },
	  
	  async getAllClients(){

		//const { data } = await axios.get('http://localhost:3001/clients');
		//this.clients = data;
		
		let { data } = await ClientService.findAll();
		this.clients = data;	
		
		//with promises
		//ClientService.findAll()
		//.then((res) => {
		//	console.log(res.data);
		//	this.clients = res.data;
		//})
		//.catch(e => {
		//   console.log(e);
		//});
	  },
	  
      async deleteClient(id) {
          if(confirm(messages.fiche.boutons.supprimerConfirm)) {
              console.log(id);		
			  //with async/await
			  let { res } = await ClientService.deleteById(id);
			  this.sendFlashMessage(messages.liste.actions.supprimerSucces, 'warning');
			  let { data } = await ClientService.findAll();	
			  this.clients = data;				
			  
			  //with promises
              //ClientService.deleteById(id).then( res => {                 
              //      this.sendFlashMessage(messages.liste.actions.supprimerSucces, 'warning')                  
              //      ClientService.findAll().then((res) => {
              //          console.log(res.data);
              //          this.clients = res.data;
              //      }); 
              //});            
          }
      },
      sendFlashMessage(message, type){
        //Communication between any components using Event Bus
         //this.$root.$emit('flash message', message, type);
		 
		 this.emitter.emit('flash message', { message: message, type : type });
      }
  }
}
</script>