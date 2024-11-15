<script setup lang="ts">
import { type User } from '@microsoft/microsoft-graph-types'
import * as graph from '@/utils/graphClient'

const identityStore = useIdentityStore()

const users = ref<User[]|undefined>()

async function getAllGraphUsers()
{
    try
    {
        if (!identityStore.account) {
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
    }   
}

async function fetchDbUsers()
{
    if (!identityStore.account) {
        return
    }

    const dbUsers = await getDbusers(identityStore.account.tenantId)
    console.log("fetchDbUsers(): OK found", dbUsers.length)

    users.value = dbUsers
}

onMounted(()=>fetchDbUsers())

// https://stackoverflow.com/questions/74688514/watch-value-in-vue-js-3-equivalent-in-pinia
const accountCp = computed(()=>identityStore.account)
watch(accountCp, (val)=>{
    console.log("watch: Using tenant",val?.tenantId ?? 'none', identityStore.account)
    fetchDbUsers()
})

const showToast=ref(false)

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

    <ClientOnly>
        <BaseButton class="mt-2" visual="secondary" @click="showToast = true">Show Toast</BaseButton>
        <BaseToast v-model="showToast"/>
    </ClientOnly>
</template>