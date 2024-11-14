import * as auth from '@/utils/msalAuth'

export async function systemLogout()
{
    try
    {
        const identityStore = useIdentityStore()
        identityStore.clear()
        await auth.logout()
    }
    catch (error)
    {
        console.error("systemLogout(): ERROR", error)
    }    
}
