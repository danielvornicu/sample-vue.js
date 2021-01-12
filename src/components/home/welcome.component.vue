<template>
    <div id = "welcome">
        <div className="card">
            <div className="card-header">
                <div className="row">
                    <div className="col-md-8">
                        <h1>{{pageTitle}}</h1>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="container-fluid">

                <div className="text-center">
                    <img src="../../assets/images/logo.jpg"
                        alt='Logo'
                        className="img-responsive center-block"
                        
                        />
                </div>
            
                <div className="text-center">Développé par:</div>
                <div className="text-center">
                    <h3>Daniel Vornicu</h3>
                </div>
            
                <div className="text-center">vdany2003@yahoo.com</div>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
  name: 'welcome-component',
  data () {
    return {
      pageTitle: 'Bienvenue sur cette page'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>