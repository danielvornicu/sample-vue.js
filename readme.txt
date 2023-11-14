node --version => v21.1.0 (Node version)
npm --version  => 10.2.0 (Npm version)
vue --version  => 5.0.8 (Vue version)

In flash-messages-component I use this.$root.$on but in vue 3 the methods: $on, $off and $once are removed.
$emit is still a part of the existing API

Solution: using an external library implementing the event emitter interface, for example mitt or tiny-emitter.

>npm install --save mitt

In main.js:
import mitt from 'mitt';
const emitter = mitt();

const app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.mount('#app');



  


