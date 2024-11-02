<script setup lang="ts">

// For some reason, I cannot get bootstrap dropdowns to work nicely
// with Nuxt, so I am entirely recreating it here :(
//
// TODO: Need to make more general purpose

const isLoggedIn = ref(false)

function login()
{
    isLoggedIn.value = true
}

function logout() 
{
    isLoggedIn.value = false
}

const showing = ref(false)
const dropdownMenuEl = ref<HTMLElement>()

function toggle()
{
    console.log("toggle")
    showing.value = !showing.value
}

function clickCheck(e)
{
    if (dropdownMenuEl.value != undefined && !dropdownMenuEl.value.contains(e.target))
    {
        showing.value = false;        
    }
}

onMounted(() => {
    document.addEventListener('click',clickCheck);
})

onUnmounted(() => {
    document.removeEventListener('click',clickCheck);
})

</script>
<template>
    <div class="dropdown text-end">
          <button ref="dropdownMenuEl" class="btn btn-none d-block link-body-emphasis text-decoration-none dropdown-toggle" @click="toggle" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
          </button>
          <ul v-if="showing && isLoggedIn" class="dropdown-menu text-small show" style="">
            <li><a class="dropdown-item" >Profile</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" @click="logout()" >Sign out</a></li>
          </ul>
          <ul v-if="showing && ! isLoggedIn" class="dropdown-menu text-small show" style="">
            <li><a class="dropdown-item" @click="login()" >Log in</a></li>
          </ul>
        </div>
</template>