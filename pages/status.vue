<script setup lang="ts">

const identityStore = useIdentityStore()
const appConfig = useAppConfig()

</script>

<template>
    <BasePageHeader>Status</BasePageHeader>

    <BaseSectionHeader>Application Identity</BaseSectionHeader>
    <ul>
        <li><strong>AppId</strong>: {{ appConfig.msal.clientId }}</li>
        <li><strong>URL</strong>: {{ appConfig.msal.redirectUri }}</li>
    </ul>

    <BaseSectionHeader>Logged-in Account</BaseSectionHeader>

    <ul v-if="identityStore.account">
        <li v-for="[key, value] in Object.entries(identityStore.account)" :key="key">{{ key }}: {{ value }}</li>
    </ul>
    <p v-else>Not logged in</p>

    <BaseSectionHeader>Auth Token</BaseSectionHeader>

    <ul v-if="identityStore.claims">
        <li v-for="[key, value] in identityStore.claims" :key="key">{{ key }}: {{ value }}</li>
    </ul>
    <p v-else>No current token</p>

</template>