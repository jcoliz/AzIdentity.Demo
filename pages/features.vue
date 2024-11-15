<script setup lang="ts">
import { type User } from '@microsoft/microsoft-graph-types'
import * as graph from '@/utils/graphClient'

const identityStore = useIdentityStore()

const users = ref<User[]|undefined>()

// TODO: We need to surface errors from the login button as well
// This will require moving this logic to a composable
// Then could also make an ErrorToast component which surfaced
// these errors in a consistent way
const showError = ref(false)
const errorDetails = ref<string|undefined>()

async function getAllGraphUsers()
{
    try
    {
        if (!identityStore.account) {
            errorDetails.value = "Not logged in"
            showError.value = true
            return
        }

        const newusers = await graph.getAllUsers()
        console.log("getAllUsers(): OK received", newusers.length)

        await updateDbUsers(identityStore.account.tenantId,newusers)
        await fetchDbUsers()            
    }
    catch (error)
    {
        console.error("getAllUsers(): ERROR", error)

        errorDetails.value = `getAllUsers(): ${error}`
        showError.value = true
    }
}

async function fetchDbUsers()
{
    try
    {
        if (!identityStore.account) {
            errorDetails.value = "Not logged in"
                showError.value = true
                return
        }

        const dbUsers = await getDbusers(identityStore.account.tenantId)
        console.log("fetchDbUsers(): OK found", dbUsers.length)

        users.value = dbUsers
    }
    catch (error)
    {
        console.error("fetchDbUsers(): ERROR", error)

        errorDetails.value = `fetchDbUsers(): ${error}`
        showError.value = true
    }
}

onMounted(()=>fetchDbUsers())

// https://stackoverflow.com/questions/74688514/watch-value-in-vue-js-3-equivalent-in-pinia
const accountCp = computed(()=>identityStore.account)
watch(accountCp, (val)=>{
    console.log("watch: Using tenant",val?.tenantId ?? 'none', identityStore.account)

    // When the tenant changes, we'll need to get an updated list of users
    fetchDbUsers()
})

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

    <!-- TODO: Toasts are always client only. ClientOnly tag needs to be INSIDE the BaseToast. -->
    <ClientOnly>
        <BaseToast v-model="showError">
            <template #title>ERROR</template>
            <template #default>
                {{ errorDetails }}
            </template>
        </BaseToast>
    </ClientOnly>
</template>