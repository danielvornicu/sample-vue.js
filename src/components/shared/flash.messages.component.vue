<template>
    <div id="flashMessages">
      <!--flashed messages-->
      <div v-for="(message, index) in flashMessages"  :key='(message.id)' :id="'message'+(message.id)">

          <div v-if="message.type === 'success'" class="alert alert-success alert-dismissible">
              <button class="close" :data-target="'message' + (message.id)" data-dismiss="alert" aria-label="delete">
                  <span aria-hidden="true">&times;</span>
              </button>
              <div>{{message.value}}</div>
          </div >
          <div v-else-if="message.type === 'warning'" class="alert alert-warning alert-dismissible">
              <button class="close" :data-target="'message' + (message.id)" data-dismiss="alert" aria-label="delete">
                  <span aria-hidden="true">&times;</span>
              </button>
            <div>{{message.value}}</div>
          </div >
          <div v-else-if="message.type === 'error'" class="alert alert-danger alert-dismissible">
            <button class="close" :data-target="'message' + (message.id)" data-dismiss="alert" aria-label="delete">
                  <span aria-hidden="true">&times;</span>
              </button>
            <div>{{message.value}}</div>
          </div>
          <div v-else>
              <button class="close" :data-target="'message' + (message.id)" data-dismiss="alert" aria-label="delete">
                  <span aria-hidden="true">&times;</span>
              </button>
            <div>{{message.value}}</div>
          </div >

      </div>
      <!--flashed messages-->
    </div>
</template>

<script>
export default {
  name: 'flash-messages-component',
  mounted(){
    //Communication between any components using Event Bus
    this.$root.$on('flash message', (message, type) => {
              //cleart old messages
        this.flashMessages = [];

        let lastId;
        if (this.flashMessages.length > 0 ){
          lastId =this.flashMessages[this.flashMessages.length-1].id;
        } else {
          lastId = 0;
        }

        let messageObj = {'id': lastId + 1, 'value': message, 'type': type}

        console.log('Message received: ' + message + ', type: ' + type);
        this.flashMessages.push(messageObj);
        //this.logFlashMessages();

        //this.$forceUpdate();  // Notice we have to use a $ here

        //timeout for the DOM refresh
        setTimeout(()=>{
            //ES6 style
            let $closeIcons = Array.prototype.slice.call(document.querySelectorAll('.close'), 0);
            if ($closeIcons.length > 0) {
                $closeIcons.forEach( ($el) => {

                    console.log("adding event listener", $el);
                    $el.addEventListener('click', () => {
                        let target = $el.dataset.target,
                            $target = document.getElementById(target);

                        if ($target !== null){
                          //messageX, extract X
                          let id = target.substring(7);
                          if (id > 0) {
                            //remove the message
                            //this.logFlashMessages();
                            this.removeFlashMessage(id);
                            //this.logFlashMessages();
                          }

                          $target.remove();
                        }
                    });

                });
            }
        },1000);
        //timeout for the DOM refresh
    });
  },
  data () {
    return {
      /*flashMessages : [{'value':'test1', 'type':'warning'},
                       {'value':'test2', 'type':'success'},
                       {'value':'test3', 'type':'error'}
                       ]*/

        flashMessages : []
    }
  },
  methods : {
    //not used, used routerLink to
    logFlashMessages(){
      console.log('Flash messages: ' + JSON.stringify(this.flashMessages));
    },
    removeFlashMessage(msgId){
      for (const message of this.flashMessages) {
          if (message.id == msgId) {
              let index = this.flashMessages.indexOf(message);
              this.flashMessages.splice(index, 1);
          }
      }
      //this.$forceUpdate(); // Notice we have to use a $ here
    }
  }

}
/*
document.addEventListener('DOMContentLoaded', function () {
    let $closeIcons = Array.prototype.slice.call(document.querySelectorAll('.close'), 0);

    if ($closeIcons.length > 0) {
        $closeIcons.forEach(function($el) {
            console.log("Init: adding event listener", $el);

            $el.addEventListener('click', function() {
                let target = $el.dataset.target,
                    $target = document.getElementById(target);
                $target.remove();
            });
        });
    }
});*/
</script>
