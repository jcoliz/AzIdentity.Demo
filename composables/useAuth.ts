// https://github.com/Shivanik97/msal-auth-vue/blob/main/src/config/useAuth.ts

import { msalConfig, graphScopes } from '@/config/msalConfig'
import { PublicClientApplication, type AuthenticationResult } from "@azure/msal-browser"
import { useGraphClient } from './useGraphClient'
import { type User } from '@microsoft/microsoft-graph-types'

export function useMsalAuth() {

    // Fetch deployment-specific MSAL configuration details from Nuxt app config

    const appConfig = useAppConfig()
    msalConfig.auth = appConfig.msal

    // Create the MSAL instance to use for all requests

    const msalInstance = new PublicClientApplication(msalConfig)

    // Grab a reference to identity store which we will update using these functions

    const identityStore = useIdentityStore()

    // Use the Graph Client

    const graphClient = useGraphClient();

    async function initialize(): Promise<void> {
        await msalInstance.initialize()
            .then(()=> {
                console.log("initialize: OK")
            })
            .catch((error:any) => {
                console.error("initialize:", error)
            });
    }

    async function login(): Promise<void> {

        /**
         * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
         * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
         */

        await msalInstance.loginPopup({ scopes: graphScopes })
            .then((result:AuthenticationResult)=> {
                console.log("AuthenticationResult: OK")
                identityStore.account = result.account 
            })
            .catch((error:any) => {
                console.error("loginPopup", error)
            });
    }

    async function logout(): Promise<void> {

        /**
         * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
         * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
         */

        // TODO: identityStore.clear() would be better
        identityStore.account = undefined
        identityStore.profile = undefined
        identityStore.photo = undefined

        await msalInstance.logoutPopup()
            .then(()=> {
                console.log("logoutPopup: OK")
            })
            .catch((error:any) => {
                console.error("logoutPopup:", error)
            });
    }

    return { initialize, login, logout, msalInstance }
}
