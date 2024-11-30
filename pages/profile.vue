<script setup lang="ts">
definePageMeta({
    title: 'Profile'
})

const identityStore = useIdentityStore()

const userProperties = computed(()=>
    identityStore.profile ? Object.entries(identityStore.profile) : undefined    
)
</script>

<template>
    <main class="container">
        <div v-if="identityStore.account">
            <BasePageHeader>{{ identityStore.account.name }}</BasePageHeader>
            <ul v-if="userProperties">
                <li v-for="[key, value] in userProperties" :key="key"><strong>{{ key }}</strong>: {{ value }}</li>
            </ul>
            <LogoutButton/>
        </div>
        <div v-else>
            <RoutePageHeader/>
            <p>No user logged in</p>
        </div>
    </main>
</template>