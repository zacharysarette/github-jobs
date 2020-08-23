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
            <p>No Search Results Found for {{ searchText }}</p>
          </template>
          <v-card
            v-for="result in searchResults"
            :key="result.id"
            :to="getJobLink(result.id)"
            class="d-flex flex-row pa-2 align-start resultCard"
            flat
          >
            <v-card-text>
              <v-img
                v-if="result.company_logo != null"
                :src="result.company_logo"
                :alt="result.company_name"
                max-height="90px"
                max-width="90px"
                class="company_logo"
              />
              <p class="company">
                {{ result.company }}
              </p>
              <v-spacer />
              <h1 class="title">
                {{ result.title }}
              </h1>
              <span class="type">
                {{ result.type }}
              </span>
              <span class="float-right">
                <span class="location">
                  <v-icon color="#B9BDCF" left>
                    mdi-earth
                  </v-icon>
                  {{ result.location }}
                </span>
                <span class="created_at">
                  <v-icon color="#B9BDCF" left>
                    mdi-clock
                  </v-icon>
                  {{ result.created_at }}
                </span>
              </span>
            </v-card-text>
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
      cities: ['Berlin', 'Tokyo', 'Seattle', 'London', 'Nashville', 'Paris', 'Milan', 'Busan', 'Bali'],
      emptyResults: false,
      proxyUrl: 'https://cors-anywhere.herokuapp.com/'
    }
  },
  computed: {
    localComputed () {
      return {
        searchUrl: `https://jobs.github.com/positions.json?description=${this.searchText}&location=${this.city}`
      }
    },
    ...mapState({
      searchResults: state => state.searchResults,
      city: state => state.city
    })
  },
  methods: {
    async fetchSearchResults () {
      const results = await this.$axios.$get(this.proxyUrl + this.searchUrl)
      this.$store.commit('setSearchResults', results)
      this.emptyResults = String(results) === ''
    },
    updateCity (val) {
      if (val != null) {
        this.$store.commit('setCity', val)
      }
    },
    getJobLink (val) {
      return '/jobs/' + val
    }
  }
}
</script>
<style scoped>
.float-right {
  display: inline-block;
  position: relative;
  margin-left: 105px;
  top:20px;
  float: right;
}
.location {
  display: inline-block;
  margin-right: 10px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #B9BDCF;
}
.created_at {
  display: inline-block;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #B7BCCE;
}
.company_logo {
  float: left;
  margin-right: 20px;
}
.title {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: #334680;
}
.company {
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  color: #334680;
}
.type {
  display: inline-block;
  margin-top: 20px;
  padding: 5px;
  border: 1px solid #334680;
  box-sizing: border-box;
  border-radius: 4px;
  color: #334680;
  font-size: 20px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
}
.resultCard {
  background: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin-bottom: 24px;
  margin-left: 24px;
  margin-right: -10px;
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
