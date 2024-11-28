import * as controls from '@coliz/vue-base-controls'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.component('BaseButton', controls.BaseButton)
})
