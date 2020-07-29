<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <nav class="searchCard">
      <v-text-field
        v-model="searchText"
        placeholder="Search..."
        background-color="white"
        rounded
        clearable
        class="rounded searchText"
      >
        <v-btn
          slot="append"
          class="searchBtn"
          color="primary"
          height="45px"
          @click="fetchSearchResults"
        >
          Search
          <v-icon color="#fff" right>
            mdi-magnify
          </v-icon>
        </v-btn>
      </v-text-field>
    </nav>
    <v-container class="d-flex flex-wrap flex-md-nowrap flex-sm-wrap">
      <div md="4">
        <v-select
          :items="cities"
          label="Select a City"
          @change="updateCity"
        />
      </div>
      <div>
        <v-flex>
          <template v-if="emptyResults">
            <p>No Search Results Found</p>
          </template>
          <v-card
            v-for="result in searchResults"
            :key="result.id"
            class="d-flex flex-row pa-2 align-start resultCard"
            flat
          >
            <v-card-text>
              <h1>{{ result.title }}</h1>
              <v-spacer />
              <p>{{ result.company }}</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
              >
                More
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </div>
    </v-container>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {
  },
  data () {
    return {
      searchText: '',
      cities: ['Tokyo', 'Seattle', 'London', 'Nashville', 'Paris', 'Milan', 'Busan', 'Bali'],
      emptyResults: false,
      proxyUrl: 'https://cors-anywhere.herokuapp.com/',
      searchUrl: 'https://jobs.github.com/positions.json?search='
    }
  },
  computed: mapState({
    searchResults: state => state.count,
    city: state => state.city
  }),
  methods: {
    async fetchSearchResults () {
      const results = await this.$axios.$get(this.proxyUrl + this.searchUrl + this.searchText)
      this.$store.commit('setSearchResults', results)
      this.emptyResults = String(results) === ''
    },
    updateCity (val) {
      if (val != null) {
        this.$store.commit('setCity', val)
      }
    }
  }
}
</script>
<style scoped>
.resultCard {
  border-bottom: 1px solid #ccc;
}
.searchCard {
  display: grid;
  place-items: center;
  width:100%;
  height: 138px;
  border-radius: 2px;
  border: 0px solid #000;
  background-image: url("../assets/background.png");
  background-size:cover;
}
.searchText {
  display: inline-block;
  width: 60%;
  margin: 0, auto;
  vertical-align: middle;
}
.searchBtn {
  position: relative;
  right:-22px;
  top:-2px;
  margin:0px;
  padding:0px;
}
</style>
