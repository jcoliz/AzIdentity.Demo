<script setup lang="ts">
const identityStore = useIdentityStore()
</script>

<template>
    <DropDownPortable class="ms-2 my-1 d-flex align-items-middle">
        <template #trigger>
            <a class="d-flex align-items-center link-body-emphasis text-decoration-none p-0 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <template v-if="identityStore.account">
                    <img v-if="identityStore.photo" :src="identityStore.photo" alt="" width="32" height="32" class="rounded-circle me-2">
                    <strong>{{ identityStore.account.name }}</strong>
                </template>                
                <FeatherIcon v-else icon="user" size="24" class="rounded-circle me-2"/>
            </a>
        </template>
        <template #default>
            <!-- Note that popper is handling absolute positioning of the drop-down -->
            <ul class="dropdown-menu dropdown-menu-end text-small shadow">
                <template v-if="identityStore.account">
                    <li><NuxtLink class="dropdown-item" to="/profile" >Profile</NuxtLink></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" @click="systemLogout" >Sign out</a></li>
                </template>
                <template v-else>
                    <li><a class="dropdown-item" @click="systemLogin" >Log in</a></li>
                </template>
            </ul>
        </template>
    </DropDownPortable>
</template>