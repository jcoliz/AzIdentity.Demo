<script setup lang="ts">
import * as base from '@coliz/vue-base-controls'

async function logout()
{
    await systemLogout()
    useRouter().push("/")
}
</script>

<template>
    <base.BaseButton visual="danger" @click="logout">Logout</base.BaseButton>
</template>
