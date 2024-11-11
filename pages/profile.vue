<script setup lang="ts">
const identityStore = useIdentityStore()
</script>

<template>
    <div v-if="identityStore.account">
        <h1>{{ identityStore.account.name }}</h1>
        <ul v-if="identityStore.profile">
            <li v-for="[key, value] in identityStore.profile" :key="key">{{ key }}: {{ value }}</li>
        </ul>
        <LogoutButton/>
    </div>
    <div v-else>
        <h1>Profile</h1>
        <p>No user logged in</p>
    </div>
</template>