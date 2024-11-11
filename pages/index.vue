<script setup lang="ts">
import BaseDropDown from '~/components/BaseDropDown.vue';

const auth = useMsalAuth()
const identityStore = useIdentityStore()

const appConfig = useAppConfig()

onMounted(()=>{
    auth.initialize()
})

async function login()
{
    await auth.login()
    identityStore.profile = await auth.getProfile()
}

function logout()
{
    auth.logout()
}

</script>

<template>
    <h1>Home</h1>

    <BaseDropDown class="mb-3">
        <template #trigger>
            <button class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" type="button" aria-expanded="false">
                Account
            </button>            
        </template>
        <template #default>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" @click="login">Log in</a></li>
                <li><a class="dropdown-item" @click="logout">Log out</a></li>
            </ul>
        </template>
    </BaseDropDown>

    <div v-if="identityStore.account">
        <p>Name: {{ identityStore.account.username }}</p>
        <ul v-if="identityStore.profile">
            <li v-for="[key, value] in identityStore.profile" :key="key">{{ key }}: {{ value }}</li>
        </ul>
    </div>
    <div v-else>
        <p>No user logged in</p>
    </div>
</template>