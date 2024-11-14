import * as auth from '@/utils/msalAuth'
import * as graph from '@/utils/graphClient'

export default async function login()
{
    const identityStore = useIdentityStore()

    try
    {

        const loginResult = await auth.login()
        identityStore.account = loginResult.account

        const instance = await auth.getInstance()
        graph.initialize(instance, identityStore.account!, [ "User.Read" ])
        identityStore.profile = await graph.getUser();
        identityStore.photo = await graph.getUserPhoto();
    }
    catch (error)
    {
        console.error("login(): ERROR", error)
        identityStore.clear()
    }
}
