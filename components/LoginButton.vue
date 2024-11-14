<script setup lang="ts">
import * as auth from '@/utils/msalAuth'

//
// Display logged in state, and present options for logging in/out
//

const identityStore = useIdentityStore()
const graphClient = useGraphClient()

async function login()
{
    try
    {
        const loginResult = await auth.login()
        identityStore.account = loginResult.account

        const instance = await auth.getInstance()
        graphClient.initialize(instance, identityStore.account!, [ "User.Read" ])
        identityStore.profile = await graphClient.getUser();
        identityStore.photo = await graphClient.getUserPhoto();
    }
    catch (error)
    {
        console.error("login(): ERROR", error)
        identityStore.clear()
    }
}

</script>
<template>
    <button class="btn btn-primary" @click="login">Login</button>
</template>