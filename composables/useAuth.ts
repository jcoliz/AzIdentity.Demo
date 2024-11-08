// https://github.com/Shivanik97/msal-auth-vue/blob/main/src/config/useAuth.ts

import { msalConfig, graphScopes } from '@/config/msalConfig'
import { PublicClientApplication, InteractionRequiredAuthError, type AuthenticationResult } from "@azure/msal-browser"

export function useMsalAuth() {
    const msalInstance = new PublicClientApplication(msalConfig)

    const identityStore = useIdentityStore()

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

        await msalInstance.loginPopup({ scopes: graphScopes })
            .then((result:AuthenticationResult)=> {
                console.log("AuthenticationResult: OK", result)
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

        await msalInstance.logoutPopup()
            .then(()=> {
                console.log("logoutPopup: OK")
                identityStore.account = undefined
            })
            .catch((error:any) => {
                console.error("logoutPopup:", error)
            });
    }

    async function getTokenPopup(request:any): Promise<AuthenticationResult|void> {

        /**
         * See here for more info on account retrieval: 
         * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
         */ 

        return await msalInstance.acquireTokenSilent(request)
            .catch((error:any) => {
                console.log("silent token acquisition fails. acquiring token using popup");

                if (error instanceof InteractionRequiredAuthError) {

                    // fallback to interaction when silent call fails
                    return msalInstance.acquireTokenPopup(request)
                        .then((tokenResponse:AuthenticationResult) => {
                            console.log("acquireTokenPopup: OK", tokenResponse);
                            return tokenResponse;
                        }).catch((error:any) => {
                            console.error("acquireTokenPopup: ERROR", error);
                        });
                } else {
                    console.warn(error)
                }
        });
    }
     
    async function getProfile(): Promise<Map<string,any>|void> {

        const tokenRequest = {
            scopes: ["User.Read"],
            forceRefresh: false, // Set this to "true" to skip a cached token and go to the server to get a new token
            account: identityStore.account
        };
    
        return getTokenPopup(tokenRequest)
            .then(async (response:AuthenticationResult|void): Promise<any> => {
                if (response)
                {
                    const me = await callMSGraph("https://graph.microsoft.com/v1.0/me", response.accessToken);
                    console.log("getProfile: OK", me)
                    return Object.entries(me)    
                }
            }).catch((error:any) => {
                console.error("getProfile: ERROR", error);
            });                 
    }

    return { initialize, login, logout, getProfile }
}
