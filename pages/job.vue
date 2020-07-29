<template>
  <v-layout>
    <v-container class="d-flex">
      <div md="4">
        <v-link>
          back to search
        </v-link>
        <h3>How to Apply</h3>
        <p>{{ data.how_to_apply }}</p>
      </div>
      <div>
        <h1>{{ data.title }}</h1>
        <p>{{ data.location }}</p>
      </div>
    </v-container>
  </v-layout>
</template>
<script>
export default {
  data () {
    return {
      data: {}
    }
  }
}
</script>
<style scoped>
</style>
