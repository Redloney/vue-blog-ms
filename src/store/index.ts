import { createStore, StoreOptions } from 'vuex'

const store: StoreOptions<{}> = createStore({
    state: {
        collapse: false,
    },
    mutations: {
        changeCollspse: state => {
            state.collapse = !state.collapse
        },
    },
    getters: {},
    actions: {},
    modules: {},
})

export default store
