<script setup lang="ts">
import { type User } from '@microsoft/microsoft-graph-types'
import * as graph from '@/utils/graphClient'

definePageMeta({
    title: 'Features',
    order: 3
})

/**
 * Details about logged-in user
 */
const identityStore = useIdentityStore()

/**
 * Where to display errors
 */
const errorDisplay = useErrorDisplay()

/**
 * The list of users we are displaying
 */
const users = ref<User[]>([])

async function getAllGraphUsers()
{
    try
    {
        if (!identityStore.account) {
            // This is an error condition becasue this should only be called by
            // UI which is displayed when user is logged in
            throw Error("Not logged in")
        }

        const newusers = await graph.getAllUsers()
        console.log("getAllUsers(): OK received", newusers.length)

        await updateDbUsers(identityStore.account.tenantId,newusers)
        await fetchDbUsers()            
    }
    catch (error)
    {
        errorDisplay.setError(`getAllUsers(): ${error}`)
    }
}

async function fetchDbUsers()
{
    try
    {
        if (!identityStore.account) {
            // Note that this is not an error condition
            users.value = []
            return
        }

        const dbUsers = await getDbusers(identityStore.account.tenantId)
        console.log("fetchDbUsers(): OK found", dbUsers.length)

        users.value = dbUsers
    }
    catch (error)
    {
        errorDisplay.setError(`fetchDbUsers(): ${error}`)
    }
}

onMounted(fetchDbUsers)

// https://stackoverflow.com/questions/74688514/watch-value-in-vue-js-3-equivalent-in-pinia
const accountCp = computed(()=>identityStore.account)
watch(accountCp, (val)=>{
    console.log("watch: Using tenant",val?.tenantId ?? 'none', identityStore.account)

    // When the tenant changes, we'll need to get an updated list of users
    fetchDbUsers()
})

</script>

<template>
    <RoutePageHeader/>

    <div v-if="!identityStore.account">
        <p>This page presents a number of additional things you can do once you are logged in.</p>
        <p>Log in to get started!</p>
        <LoginButton/>
    </div>
    <div v-else>
        <p>This page presents a number of additional things you can do now that you are logged in.</p>
        <BaseSectionHeader>All Tenant Users</BaseSectionHeader>
        <div v-if="users.length">
            <table class="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Title</th>
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
            <BaseButton visual="secondary" @click="getAllGraphUsers">Refresh</BaseButton>
        </div>
        <div v-else>
            <p>If you have sufficient privelages, you can list out all the users in your tenant.</p>
            <BaseButton visual="primary" @click="getAllGraphUsers">Retrieve</BaseButton>
        </div>
    </div>
</template>

<style scoped>
tr:hover td {
    color: var(--bs-light);
    background-color: var(--bs-primary);
}
</style>