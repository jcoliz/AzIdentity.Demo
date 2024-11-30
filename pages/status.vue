<script setup lang="ts">
definePageMeta({
    title: 'Status',
    order: 2
})

const identityStore = useIdentityStore()
const appConfig = useAppConfig()

</script>

<template>
    <PageMain>
        <section>
            <BaseSectionHeader>Application Identity</BaseSectionHeader>
            <ul>
                <li><strong>AppId</strong>: {{ appConfig.msal.clientId }}</li>
                <li><strong>URL</strong>: {{ appConfig.msal.redirectUri }}</li>
            </ul>
        </section>

        <section>
            <BaseSectionHeader>Logged-in Account</BaseSectionHeader>
            <ul v-if="identityStore.account">
                <li v-for="[key, value] in Object.entries(identityStore.account)" :key="key"><strong>{{ key }}</strong>: {{ value }}</li>
            </ul>
            <p v-else>Not logged in</p>
        </section>

        <section>
            <BaseSectionHeader>Auth token claims</BaseSectionHeader>
            <ul v-if="identityStore.claims">
                <li v-for="[key, value] in identityStore.claims" :key="key"><strong>{{ key }}</strong>: {{ value }}</li>
            </ul>
            <p v-else>No known claims</p>
        </section>
    </PageMain>
</template>