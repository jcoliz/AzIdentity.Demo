<script setup lang="ts">
import BaseDropDown from '~/components/BaseDropDown.vue';

const auth = useMsalAuth()

onMounted(()=>{
    auth.initialize()
})

function login()
{
    auth.login()
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
</template>