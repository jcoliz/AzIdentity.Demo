import { ref } from "vue"
import type { AccountInfo } from "@azure/msal-browser"
import type { User } from '@microsoft/microsoft-graph-types'

/**
 * Create the store for global identity details on logged in user
 */

export const useIdentityStore = defineStore('identity', () => {
    const account = ref<AccountInfo|undefined>()
    const profile = ref<User|undefined>()
    const claims = ref<[string,any][]|undefined>()
    const photo = ref<string|undefined>()

    function clear() {
      account.value = undefined
      profile.value = undefined
      claims.value = undefined
      photo.value = undefined
    }
  
    return { account, profile, claims, photo, clear }
  })
