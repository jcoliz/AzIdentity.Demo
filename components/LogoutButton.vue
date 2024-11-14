<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

async function logout()
{
    await systemLogout()
    router.push("/")
}
</script>

<template>
    <BaseButton visual="danger" @click="logout">Logout</BaseButton>
</template>