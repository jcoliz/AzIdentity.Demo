import { ref } from "vue"
import { type AccountInfo } from "@azure/msal-browser"

/**
 * Create the store for global identity details on logged in user
 */

export const useIdentityStore = defineStore('identity', () => {
    const account = ref<AccountInfo|undefined>()
    const profile = ref<Map<string,any>|undefined>()
  
    return { account, profile }
  })
