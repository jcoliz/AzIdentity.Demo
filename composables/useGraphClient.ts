import { Client, GraphError } from '@microsoft/microsoft-graph-client'
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser'
import { type User } from '@microsoft/microsoft-graph-types'
import { InteractionType, PublicClientApplication, type AccountInfo } from '@azure/msal-browser';

// https://github.com/microsoftgraph/msgraph-sample-reactspa/blob/main/graph-tutorial/src/GraphService.ts

export function useGraphClient() {

    const authProvider = ref<AuthCodeMSALBrowserAuthenticationProvider|undefined>()
    const graphClient = ref<Client|undefined>()

    function ensureClient() {
        // TODO: Handle case where user never initialized, so we don't HAVE an auth provider
        if (!graphClient.value) {
                graphClient.value = Client.initWithMiddleware({
                authProvider: authProvider.value
            });
        }
    }

    function initialize(auth: PublicClientApplication, account: AccountInfo, scopes: string[])
    {
        authProvider.value = new AuthCodeMSALBrowserAuthenticationProvider(
            auth,
            {
                account,
                scopes,
                interactionType: InteractionType.Popup
            }
        )
    }

    async function getUser(): Promise<User|undefined> {
        ensureClient();
        
        // Return the /me API endpoint result as a User object
        return await graphClient.value!.api('/me')
            // Consider: Only retrieve the specific fields needed
            //.select('displayName,mail,mailboxSettings,userPrincipalName')
            .get()
            .then(result=> { 
                console.log("getUser: OK", result)
                return result 
            })
            .catch((error:any) => {
                console.error("getUser: ERROR", error)
                return undefined
            });
    }

    // Note you'll need "User.Read.All" before calling this. Either get it at sign in
    // or initialize it before calling. 
    async function getAllUsers(): Promise<User[]|undefined> {
        ensureClient();
        
        // Return the /me API endpoint result as a User object
        return await graphClient.value!.api('/users')
            .select('displayName,mail,id,userPrincipalName,jobTitle')
            .get()
            .then(result=> { 
                console.log("getAllUsers: OK", result.value)
                return result.value 
            })
            .catch(error => {
                console.log("getAllUsers: ERROR", error)
                return undefined
            })
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
    
    async function getUserPhoto(): Promise<string|undefined> {        
        ensureClient();

        // TODO: Allow other sizes as a parameter
        return await graphClient.value!.api('/me/photos/48x48/$value')
            .get()
            .then((result:Blob) => { 
                console.log("getUserPhoto: OK", result)
                return blobToBase64(result)
            })
            .catch(error => {
                if (error instanceof GraphError && error.statusCode == 404)
                {
                    console.log("getUserPhoto: No photo found")
                }
                else
                {
                    console.error("getUserPhoto: ERROR", error)
                }
                return undefined
            });    
    }
    
    return { initialize, getUser, getAllUsers, getUserPhoto }
}
