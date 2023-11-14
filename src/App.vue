<template>
  <div id="app">
    <Header />
    <div class="container">
	  <FlashMsg />
      <router-view/>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from './components/shared/header.component.vue';
import Footer from './components/shared/footer.component.vue';
import FlashMsg from './components/shared/flash.messages.component.vue';
export default {
  name: 'App',
   components: {
    Header,
    Footer,
	FlashMsg
  },
  mounted() {
    console.log('App mounted');
    //this.emitter.on('flash message', (data) => {
    //  console.log(data)
    //})
  }
}
</script>

<style>
.table {
    margin-top: 20px
}
</style>