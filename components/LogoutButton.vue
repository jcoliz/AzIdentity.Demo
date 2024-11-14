<script setup lang="ts">
async function logout()
{
    await systemLogout()
    useRouter().push("/")
}
</script>

<template>
    <BaseButton visual="danger" @click="logout">Logout</BaseButton>
</template>
