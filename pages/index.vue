<script setup lang="ts">
definePageMeta({
    title: 'Home',
    order: 1
})

const identityStore = useIdentityStore()
</script>

<template>
    <PageMain>
        <p>Welcome to the Azure Identity Demo application</p>

        <div v-if="!identityStore.account">
            <p>Log in to get started!</p>
            <LoginButton/>
        </div>
        <div v-else>
            <p>You are logged in as {{ identityStore.account.username }}. Please feel free to have a look around the demo!</p>

            <div class="row row-cols-1 row-cols-lg-3 mb-3 text-center">
                <PageCard to="/status" title="Status" link-text="Check the status" :details="['Application identity', 'Acccount details', 'Latest auth token']"/>
                <PageCard to="/profile" title="Profile" link-text="View user details" :details="['Profile details of current user', 'Obtained from Microsoft Graph', 'User-specific options']"/>
                <PageCard to="/about" title="About" link-text="Learn more" :details="['Information about this app', 'Complete feature set', 'Link to source code']"/>
            </div>
        </div>
    </PageMain>
</template>
