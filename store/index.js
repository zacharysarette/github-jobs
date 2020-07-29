export const state = () => ({
  counter: 0,
  city: 'London',
  searchResults: []
})

export const mutations = {
  increment (state) {
    state.counter++
  },
  setCity (state, payload) {
    state.city = payload
  },
  setSearchResults (state, payload) {
    state.searchResults = payload
  }
}
