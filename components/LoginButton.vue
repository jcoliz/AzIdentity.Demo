<script setup lang="ts">
//
// Display logged in state, and present options for logging in/out
//

const auth = useMsalAuth()
const identityStore = useIdentityStore()
const graphClient = useGraphClient()

onMounted(()=>{
    auth.initialize()
})

async function login()
{
    await auth.login()

    graphClient.initialize(auth.msalInstance, identityStore.account!, [ "User.Read" ])
    identityStore.profile = await graphClient.getUser();

    await auth.getUserPhoto()
}

</script>
<template>
    <button class="btn btn-primary" @click="login">Login</button>
</template>