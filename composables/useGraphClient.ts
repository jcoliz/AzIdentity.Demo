import { Client } from '@microsoft/microsoft-graph-client'
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

    async function getUser(): Promise<User> {
        ensureClient();
        
        // Return the /me API endpoint result as a User object
        const result:User = await graphClient.value!.api('/me')
            // Consider: Only retrieve the specific fields needed
            //.select('displayName,mail,mailboxSettings,userPrincipalName')
            .get();

        console.log("getUser: OK", result)

        return result;
    }

    async function getUserPhoto(): Promise<Blob> {        
        ensureClient();

        // TODO: Allow other sizes as a parameter
        const result:Blob = await graphClient.value!.api('/me/photos/48x48/$value')
            // Consider: Only retrieve the specific fields needed
            //.select('displayName,mail,mailboxSettings,userPrincipalName')
            .get();

        console.log("getUserPhoto: OK", result)

        return result
    }
    
    return { initialize, getUser, getUserPhoto }
}
