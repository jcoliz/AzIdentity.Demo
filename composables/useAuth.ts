// https://github.com/Shivanik97/msal-auth-vue/blob/main/src/config/useAuth.ts

import { msalConfig, graphScopes } from '@/config/msalConfig'
import { PublicClientApplication, type AccountInfo, type AuthenticationResult } from "@azure/msal-browser"

export function useMsalAuth() {
    const msalInstance = new PublicClientApplication(msalConfig)

    const account = ref<AccountInfo|undefined>(undefined)

    async function initialize(): Promise<void> {
        msalInstance.initialize()
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

        msalInstance.loginPopup({ scopes: graphScopes })
            .then((result:AuthenticationResult)=> {
                console.log("AuthenticationResult: OK", result)
                account.value = result.account        
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

        msalInstance.logoutPopup()
            .then(()=> {
                console.log("logoutPopup: OK")
                account.value = undefined
            })
            .catch((error:any) => {
                console.error("logoutPopup:", error)
            });
    }

    return { initialize, login, logout, account }
}
