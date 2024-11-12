<script setup lang="ts">
import { type User } from '@microsoft/microsoft-graph-types'

const identityStore = useIdentityStore()
const auth = useMsalAuth()

const users = ref<User[]|undefined>()

async function getAllUsers()
{
    await auth.initialize()
    users.value = await auth.getAllUsers()
}
</script>

<template>
    <BasePageHeader>Features</BasePageHeader>

    <div v-if="!identityStore.account">
        <p>This page presents a number of additional things you can do once you are logged in.</p>
        <p>Log in to get started!</p>
        <LoginButton/>
    </div>
    <div v-else>
        <p>This page presents a number of additional things you can do now that you are logged in.</p>
        <BaseSectionHeader>All Tenant Users</BaseSectionHeader>
        <div v-if="users">
            <table class="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Tame</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.displayName }}</td>
                        <td>{{ user.jobTitle }}</td>
                    </tr>
                </tbody>
            </table>
            <BaseButton visual="secondary" @click="getAllUsers">Refresh</BaseButton>
        </div>
        <div v-else>
            <p>If you have sufficient privelages, you can list out all the users in your tenant.</p>
            <BaseButton visual="primary" @click="getAllUsers">Retrieve</BaseButton>
        </div>
    </div>

</template>