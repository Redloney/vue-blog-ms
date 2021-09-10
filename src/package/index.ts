import { App } from 'vue'

import QueryForm from './QueryForm/QueryForm.vue'

export default (app: App) => {
    app.component('QueryForm', QueryForm)
}
