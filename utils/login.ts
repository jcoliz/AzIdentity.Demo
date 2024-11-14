import * as auth from '@/utils/msalAuth'
import * as graph from '@/utils/graphClient'

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
        console.error("systemLogin(): ERROR", error)
        identityStore.clear()
    }
}
