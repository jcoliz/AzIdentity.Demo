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
    <PageMain :header="identityStore.account?.name">
        <div v-if="identityStore.account">
            <ul v-if="userProperties">
                <li v-for="[key, value] in userProperties" :key="key"><strong>{{ key }}</strong>: {{ value }}</li>
            </ul>
            <LogoutButton/>
        </div>
        <div v-else>
            <p>No user logged in</p>
        </div>
    </PageMain>
</template>