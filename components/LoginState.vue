<script setup lang="ts">
//
// Display logged in state, and present options for logging in/out
//

const isLoggedIn = ref(false)

function login()
{
    isLoggedIn.value = true
}

function logout() 
{
    isLoggedIn.value = false
}

</script>
<template>
    <ClientOnly fallback-tag="span">
        <BaseDropDown class="ms-2 my-1">
            <template v-slot:trigger="slotProps">
                <a v-bind="slotProps" class="d-flex align-items-center link-body-emphasis text-decoration-none p-0" data-bs-toggle="dropdown">
                    <template v-if="isLoggedIn">
                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2" style="background-color: aqua;">
                        <strong>mdo</strong>
                    </template>                
                    <FeatherIcon v-else icon="user" size="24" class="rounded-circle me-2"/>
                </a>
            </template>
            <ul class="dropdown-menu text-small shadow" style="position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate(0px, -34px);" data-popper-placement="top-start">
                <template v-if="isLoggedIn">
                    <li><RouterLink class="dropdown-item" to="/profile" >Profile</RouterLink></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" @click="logout()" >Sign out</a></li>
                </template>
                <template v-else>
                    <li><a class="dropdown-item" @click="login()" >Log in</a></li>
                </template>
            </ul>
        </BaseDropDown>
        <template #fallback>
            <FeatherIcon icon="user" size="24" class="ms-2 my-1 rounded-circle dropdown-toggle"/>
        </template>
    </ClientOnly>
</template>