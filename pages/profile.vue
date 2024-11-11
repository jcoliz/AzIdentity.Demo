<script setup lang="ts">
const identityStore = useIdentityStore()
</script>

<template>
    <div v-if="identityStore.account">
        <BasePageHeader>{{ identityStore.account.name }}</BasePageHeader>
        <ul v-if="identityStore.profile">
            <li v-for="[key, value] in identityStore.profile" :key="key">{{ key }}: {{ value }}</li>
        </ul>
        <LogoutButton/>
    </div>
    <div v-else>
        <BasePageHeader>Profile</BasePageHeader>
        <p>No user logged in</p>
    </div>
</template>