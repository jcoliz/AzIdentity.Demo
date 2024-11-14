import { msalConfig, graphScopes } from '@/config/msalConfig'
import { PublicClientApplication, type AuthenticationResult } from "@azure/msal-browser"

let msalInstance: PublicClientApplication | undefined = undefined
let ready: boolean = false

async function initialize(): Promise<void> {

    // Fetch auth config details from app config
    const appConfig = useAppConfig()
    msalConfig.auth = appConfig.msal

    // Create the instance for us to use
    msalInstance = new PublicClientApplication(msalConfig)

    // And initialize it
    await msalInstance.initialize()

    ready = true
}

export async function login(): Promise<AuthenticationResult> {

    if (!msalInstance || !ready)
        await initialize()

    if (!msalInstance || !ready)
        throw Error("Auth system is not ready")

    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */
    
    return await msalInstance.loginPopup({ scopes: graphScopes })
}

export async function logout(): Promise<void> {

    if (!msalInstance || !ready)
        await initialize()

    if (!msalInstance || !ready)
        throw Error("Auth system is not ready")

    await msalInstance.logoutPopup()
}

export async function getInstance(): Promise<PublicClientApplication>
{
    if (!msalInstance || !ready)
        await initialize()

    if (!msalInstance || !ready)
        throw Error("Auth system is not ready")

    return msalInstance
}