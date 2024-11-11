import { ref } from "vue"
import { type AccountInfo } from "@azure/msal-browser"

/**
 * Create the store for global identity details on logged in user
 */

export const useIdentityStore = defineStore('identity', () => {
    const account = ref<AccountInfo|undefined>()
    const profile = ref<[string,any][]|void>()
    const claims = ref<[string,any][]|undefined>()
    const photo = ref<string|undefined>()
  
    return { account, profile, claims, photo }
  })
