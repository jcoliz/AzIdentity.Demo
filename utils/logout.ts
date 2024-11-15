import * as auth from '@/utils/msalAuth'

const errorDisplay = useErrorDisplay()

export async function systemLogout()
{
    try
    {
        await auth.logout()
    }
    catch (error)
    {
        errorDisplay.setError(`systemLogout(): ${error}`)
    }    
    const identityStore = useIdentityStore()
    identityStore.clear()
}
