// https://github.com/Shivanik97/msal-auth-vue/blob/main/src/config/useAuth.ts

import { msalConfig, graphScopes } from '@/config/msalConfig'
import { PublicClientApplication, type AuthenticationResult } from "@azure/msal-browser"

export function useMsalAuth() {
    const msalInstance = new PublicClientApplication(msalConfig)

    async function initialize(): Promise<void> {
        msalInstance.initialize()
            .catch((error:any) => {
                console.error("loginPopup", error)
            });
    }

    function handleResponse(result:AuthenticationResult)
    {
        console.log("AuthenticationResult", result)
    }

    async function login(): Promise<void> {

        /**
         * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
         * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
         */

        msalInstance.loginPopup({ scopes: graphScopes })
            .then(handleResponse)
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
            .catch((error:any) => {
                console.error("logoutPopup", error)
            });
    }

    return { initialize, login, logout }
}
