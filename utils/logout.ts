import * as auth from '@/utils/msalAuth'

export async function systemLogout()
{
    try
    {
        await auth.logout()
    }
    catch (error)
    {
        console.error("systemLogout(): ERROR", error)
    }    
    const identityStore = useIdentityStore()
    identityStore.clear()
}
