<script setup lang="ts">

const identityStore = useIdentityStore()
const appConfig = useAppConfig()

</script>

<template>
    <h1>Status</h1>

    <h3>Application Identity</h3>
    <ul>
        <li><strong>AppId</strong>: {{ appConfig.msal.clientId }}</li>
        <li><strong>URL</strong>: {{ appConfig.msal.redirectUri }}</li>
    </ul>

    <h3>Auth Token</h3>

    <ul v-if="identityStore.claims">
        <li v-for="[key, value] in identityStore.claims" :key="key">{{ key }}: {{ value }}</li>
    </ul>
    <p v-else>No current token</p>

</template>