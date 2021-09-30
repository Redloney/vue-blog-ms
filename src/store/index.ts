import { createStore } from 'vuex'

const store = createStore({
  state: {
    loading: false,
    collapse: false,
  },
  mutations: {
    changeCollspse: (state, payload) => (state.collapse = !state.collapse),
    changeLoading: (state, payload) => (state.loading = !state.loading),
  },
  actions: {},
  getters: {},
  modules: {},
})

export default store
