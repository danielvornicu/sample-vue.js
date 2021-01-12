<template>
    <div>
        <header>
            <nav class="navbar navbar-expand-sm bg-primary navbar-dark">
            <div>
                <router-link to="/clients" class="navbar-brand">{{ pageTitle }}</router-link>
            </div>
            </nav>
        </header>
    </div>
</template>

<script>
import messages from '../../assets/messages.json';
export default {
  name: 'header-component',
  data () {
    return {
      pageTitle: messages.liste.clients.vuejs.titre
    }
  }
}
</script>
