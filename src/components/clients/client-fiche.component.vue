<template>
    <div class="card">
        <form @submit.prevent="save">
            <div class="card-header">
                <h4>{{this.getTitle()}}</h4>
            </div>

            <div class="card-body">
                <div class="form-group row mb-2">
                    <label class="col-md-2 col-form-label"
                            htmlFor="clientNomId">{{msg.fiche.client.nom}}</label>
                    <div class="col-md-8">
                        <input class="form-control"
                                id="clientNomId"
                                name="nom"
                                type="text"
                                v-model="client.nom"
                                onChange={this.changeNomHandler}
                                :placeholder="msg.fiche.client.nomPlaceHolder"
                                required/>
                    </div>
                </div>
        
                <div class="form-group row mb-2">
                    <label class="col-md-2 col-form-label"
                            htmlFor="clientPrenomId">{{ msg.fiche.client.prenom}}</label>
                    <div class="col-md-8">
                        <input class="form-control"
                                id="clientPrenomId"
                                name="prenom"
                                v-model="client.prenom"
                                onChange={this.changePrenomHandler}
                                type="text"
                                :placeholder="msg.fiche.client.prenomPlaceHolder" 
                                required/>
                    </div>
                </div>
            </div>

            <div class='card-footer'>
                <button class="btn btn-primary mr-3"
                        :title="msg.fiche.boutons.validerTitle"
                        type="submit"
                        >{{msg.fiche.boutons.valider}}

                </button> 

                <routerLink to="/clients"                   
                    :title="msg.fiche.boutons.annulerTitle"
                    class="btn btn-outline-secondary mr-3" >
                    {{msg.fiche.boutons.annuler}}
                </routerLink> 

<!--                 <button class="btn btn-outline-primary"
                   @click="cancel()" 
                   :title="msg.fiche.boutons.annulerTitle">{{msg.fiche.boutons.annuler}}
                </button>   -->


               <button class="btn btn-outline-warning"
                    type="button"
                    :title="msg.fiche.boutons.supprimerTitle"
                    @click="deleteClient(client.id)" 
                    :disabled="client.id == null"
                    >{{msg.fiche.boutons.supprimer}}
                </button>      
            </div> 
        </form>

    </div>
</template>

<script>
import messages from '../../assets/messages.json'
import ClientService from './client.service'
export default {
  name: 'client-fiche',
  data () {
    return {
      msg : messages,
      client : { id : null, nom: null, prenom: null}
    }
  },
  //navigation guard: run before page loads
  beforeRouteEnter (to, from, next) {
        if(typeof(to.params.id) === 'undefined'){
            console.log('New');
            next(vm => {
                vm.client = {id: null, nom: '', prenom: ''};
            })
        }else{
            ClientService.findById(to.params.id).then( res => {
                console.log('Edit');
                console.log(res.data);
                next(vm => {
                  vm.client = res.data;
                })
                
            })
        }
  },
  //after the page loads
  watch : {
    '$route': 'fetchData'
  },
  methods : {
    fetchData () {
        ClientService.findById(this.$route.params.id).then( res => {
            console.log(res.data);
            this.client = res.data; 
        })
    },
    getTitle(){
        if(typeof(this.$route.params.id) === 'undefined'){
            return messages.fiche.client.titres.creation;
        }else{
            return messages.fiche.client.titres.modification + this.client.prenom + ' ' + this.client.nom;
        }
    },
    save(){
        let client = {id: this.client.id, nom: this.client.nom, prenom: this.client.prenom};

        console.log('client => ' + JSON.stringify(client));
        //console.log(typeof(this.client.id))

        if(this.client.id == null){
            //console.log('Save New');
            ClientService.save(client, true).then(res =>{
                console.log('Save New');
                this.sendFlashMessage(messages.liste.actions.creerSucces, 'success')
                this.$router.push('/clients')
                
            });
            
        }else{
            console.log('Save Edit');
            ClientService.save(client, false).then( res => {
                console.log('Save Edit');
                this.sendFlashMessage(messages.liste.actions.modifierSucces, 'success')
                this.$router.push('/clients') 
            });
            
        }
    },
    //not used, used routerLink to
    cancel(){
        this.$router.push('/clients')
    },
    deleteClient(id) {
          if(confirm(messages.fiche.boutons.supprimerConfirm)) {
              console.log(id);
              ClientService.deleteById(id).then( res => {
                  this.$router.push('/clients')
              });
              this.sendFlashMessage(messages.liste.actions.supprimerSucces, 'warning')
          }
    },
    sendFlashMessage(message, type){
        //Communication between any components using Event Bus
         this.$root.$emit('flash message', message, type);
    } 
  }
}
</script>