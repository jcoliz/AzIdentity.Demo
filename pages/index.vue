<script setup lang="ts">
import BaseDropDown from '~/components/BaseDropDown.vue';

const auth = useMsalAuth()

const profile = ref<Map<string,any>|undefined>(undefined);

onMounted(()=>{
    auth.initialize()
})

async function login()
{
    await auth.login()
    profile.value = await auth.getProfile()
}

function logout()
{
    auth.logout()
}

</script>

<template>
    <h1>Home</h1>

    <ClientOnly fallback-tag="span">
        <BaseDropDown class="mb-3">
            <template v-slot:trigger="slotProps">
                <button v-bind="slotProps" class="btn btn-secondary" data-bs-toggle="dropdown" type="button" >
                    Login tester
                </button>                
            </template>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" @click="login">Log in</a></li>
                <li><a class="dropdown-item" @click="logout">Log out</a></li>
            </ul>
        </BaseDropDown>
        <template #fallback>
            <button class="btn btn-secondary dropdown-toggle" type="button">
                Login tester
            </button>
        </template>
    </ClientOnly>

    <div v-if="auth.account.value">
        <p>Name: {{ auth.account.value.username }}</p>
        <ul v-if="profile">
            <li v-for="[key, value] in profile" :key="key">{{ key }}: {{ value }}</li>
        </ul>
    </div>
    <div v-else>
        <p>No user logged in</p>
    </div>
</template>