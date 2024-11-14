<script setup lang="ts">
import { useRouter } from 'vue-router';
import * as auth from '@/utils/msalAuth'

const router = useRouter()
const identityStore = useIdentityStore()

async function logout()
{
    try
    {
        identityStore.clear()
        await auth.logout()
        router.push("/")
    }
    catch (error)
    {
        console.error("logout(): ERROR", error)
    }    
}

</script>
<template>
    <button class="btn btn-danger" @click="logout">Logout</button>
</template>