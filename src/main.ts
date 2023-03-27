import { createApp } from 'vue'
import App from './App.vue'
import { pinia } from '@/store/pinia'
import router from './router'

import Tooltip from 'primevue/tooltip'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'

import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(PrimeVue)
app.use(pinia)
app.use(router)
app.directive('tooltip', Tooltip)
app.use(ConfirmationService)
app.use(ToastService)

app.mount('#app')
