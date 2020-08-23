<template>
  <v-layout>
    <v-container class="d-flex flex-wrap-reverse flex-md-nowrap flex-sm-wrap-reverse">
      <div class="sideContainer">
        <nuxt-link to="/">
          back to search
        </nuxt-link>
        <h3 class="how-to-apply-header">
          How to Apply
        </h3>
        <content class="how-to-apply" v-html="howToApply" />
      </div>
      <div>
        <h1>
          <span class="title">
            {{ title }}
          </span>
          <span class="type">
            {{ type }}
          </span>
        </h1>
        <p class="created_at">
          <v-icon color="#B9BDCF" left>
            mdi-clock
          </v-icon>
          {{ createdAt }}
        </p>
        <v-img
          v-if="company_logo != null"
          :src="company_logo"
          :alt="company_name"
          max-height="42px"
          max-width="42px"
          class="company_logo"
        />
        <span class="company_name">{{ companyName }} </span>
        <p class="location">
          <v-icon color="#B9BDCF" left>
            mdi-earth
          </v-icon>
          {{ location }}
        </p>
        <main v-html="description" />
      </div>
    </v-container>
  </v-layout>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      data: {},
      slug: this.$route.params,
      proxyUrl: 'https://cors-anywhere.herokuapp.com/',
      searchUrl: 'https://jobs.github.com/positions/'
    }
  },
  computed: {
    ...mapState({
      searchResults: state => state.searchResults
    }),
    howToApply () {
      return this.data ? this.data.how_to_apply : ''
    },
    title () {
      return this.data ? this.data.title : ''
    },
    location () {
      return this.data ? this.data.location : ''
    },
    companyName () {
      return this.data ? this.data.company : ''
    },
    company_logo () {
      return this.data ? this.data.company_logo : null
    },
    description () {
      return this.data ? this.data.description : 'No description provided'
    },
    type () {
      return this.data ? this.data.type : ''
    },
    createdAt () {
      return this.data ? this.data.created_at : ''
    }
  },
  async created () {
    this.data = await this.getData()
    /* eslint-disable no-console */
    console.log('data: ' + this.data.id)
  },
  methods: {
    async getData () {
      if (String(this.searchResults) === '') {
        console.log('Peanuts')
        const result = await this.fetchSearchResult()
        return result
      } else {
        return this.searchResults.filter(result => result.id === this.$route.params.id)[0]
      }
    },
    async fetchSearchResult () {
      const results = await this.$axios.$get(this.proxyUrl + this.searchUrl + this.$route.params.id + '.json')
      return results
    }
  }
}
</script>
<style scoped>
.created_at {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #B7BCCE;
}
.company_logo {
  float:left;
  margin-right: 20px;
}
.company_name {
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: #334680;
}
.location {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #b9bdcf;
}
.title {
  display: inline-block;
  margin-bottom: 10px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: #334680;
}
.how-to-apply {
  margin-top:20px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #334680;
}
.how-to-apply-header {
  color:#B9BDCF;
  margin-top:20px;
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
}
.type {
  padding:5px;
  border: 1px solid #334680;
  box-sizing: border-box;
  border-radius: 4px;;
  color: #334680;
  font-size: 20px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
}
.sideContainer {
  display: inline-block;
  min-width: 200px;
  margin-top: 18px;
}
main {
  margin-top: 50px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  color: #334680;
}
div {
  display: inline-block;
  margin-right:80px;
  line-break: auto;
  word-break: break-word;
}
</style>
