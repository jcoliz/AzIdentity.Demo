// https://github.com/Shivanik97/msal-auth-vue/blob/main/src/config/useAuth.ts

import { msalConfig, graphScopes } from '@/config/msalConfig'
import { PublicClientApplication, InteractionRequiredAuthError, type AuthenticationResult } from "@azure/msal-browser"
import { useGraphClient } from './useGraphClient'

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

    // TODO: Think more about the tight coupling between auth, graph, and identitystore

    // Get users' info and store in identitystore
    async function getProfile(): Promise<void> {

        graphClient.initialize(msalInstance, identityStore.account!, [ "User.Read" ])

        identityStore.profile = await graphClient.getUser()
            .catch((error:any) => {
                identityStore.claims = undefined
                console.error("getProfile: ERROR", error)
                return undefined
            });
    }

    // https://stackoverflow.com/questions/18650168/convert-blob-to-base64
    const blobToBase64 = (blob:Blob):Promise<string> => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise(resolve => {
            reader.onloadend = () => {
            resolve(reader.result as string);
            };
        });
    };


    // Get the users' photo and store in identitystore
    async function getUserPhoto(): Promise<void> {

        graphClient.initialize(msalInstance, identityStore.account!, [ "User.Read" ])

        identityStore.photo = await graphClient.getUserPhoto()
            .then(blobToBase64)
            .catch((error:any) => {
                console.error("getUserPhoto: ERROR", error)
                return undefined
            });
    }

    return { initialize, login, logout, getProfile, getUserPhoto }
}
