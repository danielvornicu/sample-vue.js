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
import Header from './components/shared/header.component';
import Footer from './components/shared/footer.component';
import FlashMsg from './components/shared/flash.messages.component';
export default {
  name: 'App',
   components: {
    Header,
    Footer,
    FlashMsg
  }
}
</script>

<style>
.table {
    margin-top: 20px
}
</style>
