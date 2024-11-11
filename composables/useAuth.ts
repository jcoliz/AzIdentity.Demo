// https://github.com/Shivanik97/msal-auth-vue/blob/main/src/config/useAuth.ts

import { msalConfig, graphScopes } from '@/config/msalConfig'
import { PublicClientApplication, InteractionRequiredAuthError, type AuthenticationResult } from "@azure/msal-browser"

export function useMsalAuth() {

    // Fetch deployment-specific MSAL configuration details from Nuxt app config

    const appConfig = useAppConfig()
    msalConfig.auth = appConfig.msal

    // Create the MSAL instance to use for all requests

    const msalInstance = new PublicClientApplication(msalConfig)

    // Grab a reference to identity store which we will update using these functions

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
     
    // TODO: These graph calls need to be moved out to own file
    async function getProfile(): Promise<void> {

        const tokenRequest = {
            scopes: ["User.Read"],
            forceRefresh: false, // Set this to "true" to skip a cached token and go to the server to get a new token
            account: identityStore.account
        };
    
        return getTokenPopup(tokenRequest)
            .then(async (response:AuthenticationResult|void): Promise<any> => {
                if (response)
                {
                    identityStore.claims = Object.entries(response.idTokenClaims)

                    const me = await callMSGraph("https://graph.microsoft.com/v1.0/me", response.accessToken);
                    console.log("getProfile: OK", me)
                    identityStore.profile = Object.entries(me)
                }
            }).catch((error:any) => {
                identityStore.claims = undefined
                identityStore.profile = undefined
                console.error("getProfile: ERROR", error)
            });
    }

    // Get the users' photo and store in identitystore
    async function getUserPhoto(): Promise<void> {

        const tokenRequest = {
            scopes: ["User.Read"],
            forceRefresh: false, // Set this to "true" to skip a cached token and go to the server to get a new token
            account: identityStore.account
        };
    
        getTokenPopup(tokenRequest)
            .then(async (response:AuthenticationResult|void): Promise<string|void> => {
                if (response)
                {
                    const imageData = await callMSGraphImage("https://graph.microsoft.com/v1.0/me/photos/48x48/$value", response.accessToken);
                    identityStore.photo = imageData
                }
            }).catch((error:any) => {
                identityStore.photo = undefined
                console.error("getUserPhoto: ERROR", error);
            });                 
    }

    return { initialize, login, logout, getProfile, getUserPhoto }
}
