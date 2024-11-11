<script setup lang="ts">
//
// Display logged in state, and present options for logging in/out
//

const auth = useMsalAuth()
const identityStore = useIdentityStore()

onMounted(()=>{
    auth.initialize()
})

async function login()
{
    await auth.login()
    identityStore.profile = await auth.getProfile()
}

</script>
<template>
    <button class="btn btn-primary" @click="login">Login</button>
</template>