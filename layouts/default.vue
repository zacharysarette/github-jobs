<template>
  <v-app light>
    <header right class="pa-2">
      <h1>
        GitHub
        <span class="lightWeight">
          Jobs
        </span>
      </h1>
    </header>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; Zachary Sarette {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ]
    }
  }
}
</script>
<style scoped>
header {
  margin-left: 20px;
}
.lightWeight {
  font-weight: 300
}
</style>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&family=Roboto:wght@500&display=swap');
  .v-application--wrap {
    background: #F6F7FB;
  }
</style>
