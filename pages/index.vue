<script setup lang="ts">
const identityStore = useIdentityStore()
</script>

<template>
    <h1>Home</h1>

    <p>Welcome to the Azure Identity Demo application</p>

    <div v-if="!identityStore.account">
        <p>Log in to get started!</p>
        <LoginButton/>
    </div>

</template>