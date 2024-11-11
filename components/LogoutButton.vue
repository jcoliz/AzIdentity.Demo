<script setup lang="ts">
import { useRouter } from 'vue-router';

const auth = useMsalAuth()
const router = useRouter()

onMounted(()=>{
    auth.initialize()
})

async function logout()
{
    await auth.logout()
    router.push("/")
}

</script>
<template>
    <button class="btn btn-danger" @click="logout">Logout</button>
</template>