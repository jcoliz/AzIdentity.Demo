import { Client, GraphError } from '@microsoft/microsoft-graph-client'
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser'
import { type User } from '@microsoft/microsoft-graph-types'
import { InteractionType } from '@azure/msal-browser';
import * as auth from '@/utils/msalAuth'

let authProvider: AuthCodeMSALBrowserAuthenticationProvider|undefined = undefined
let graphClient: Client|undefined = undefined

function ensureClient() {
    if (!authProvider) {
        throw Error("Client not initialized")        
    }
    if (!graphClient) {
            graphClient = Client.initWithMiddleware({
            authProvider: authProvider
        });
    }
}

async function initialize(scopes: string[])
{
    const instance = await auth.getInstance()
    const account = instance.getActiveAccount()

    if (!account) {
        throw Error("No active account set")        
    }

    authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
        instance,
        {
            account,
            scopes,
            interactionType: InteractionType.Popup
        }
    )
}

export async function getUser(): Promise<User> {
    await initialize([ "User.Read" ])
    ensureClient();
    
    // Return the /me API endpoint result as a User object
    return await graphClient!.api('/me')
        // Consider: Only retrieve the specific fields needed
        //.select('displayName,mail,mailboxSettings,userPrincipalName')
        .get()
}

// Note you'll need "User.Read.All" before calling this. Either get it at sign in
// or initialize it before calling. 
export async function getAllUsers(): Promise<User[]> {
    await initialize([ "User.Read.All" ])
    ensureClient();
    
    // Return the /me API endpoint result as a User object
    return await graphClient!.api('/users')
        .select('displayName,mail,id,userPrincipalName,jobTitle')
        .get()
        .then(result=>result.value)
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
    
export async function getUserPhoto(): Promise<string|undefined> {
    await initialize([ "User.Read" ])
    ensureClient();

    // TODO: Allow other sizes as a parameter
    return await graphClient!.api('/me/photos/48x48/$value')
        .get()
        .then(blobToBase64)
        .catch(error => {
            if (error instanceof GraphError && error.statusCode == 404)
            {
                console.log("getUserPhoto: No photo found")
                return undefined
            }
            else
            {
                throw error
            }
        });    
}
