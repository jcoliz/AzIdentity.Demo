// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  css: [
    '~/assets/scss/styles.scss'
  ],

  router: {
    options: {
      linkActiveClass: 'active'
    }
  },

  typescript: {
    typeCheck: true
  },

  modules: ['@pinia/nuxt'],

  appConfig:
  {
    msal: {
      clientId: process.env.ENTRA_APP_ID ?? '', // This is the ONLY mandatory field that you need to supply.
      authority: 'https://login.microsoftonline.com/organizations', // Replace the placeholder with your tenant subdomain        
      redirectUri: process.env.ENTRA_APP_URL ?? '',  // You must register this URI on Microsoft Entra admin center/App Registration. Defaults to window.location.href e.g. http://localhost:3000/
    }
  }  
})
