import * as auth from '@/utils/msalAuth'
import * as graph from '@/utils/graphClient'

const errorDisplay = useErrorDisplay()

export async function systemLogin()
{
    const identityStore = useIdentityStore()

    try
    {
        const loginResult = await auth.login()
        identityStore.account = loginResult.account
        identityStore.profile = await graph.getUser();
        identityStore.photo = await graph.getUserPhoto();
    }
    catch (error)
    {
        errorDisplay.setError(`systemLogin(): ${error}`)
        identityStore.clear()
    }
}
