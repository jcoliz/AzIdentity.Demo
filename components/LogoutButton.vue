<script setup lang="ts">
import * as controls from '@coliz/vue-base-controls'

async function logout()
{
    await systemLogout()
    useRouter().push("/")
}
</script>

<template>
    <controls.BaseButton visual="danger" @click="logout">Logout</controls.BaseButton>
</template>
