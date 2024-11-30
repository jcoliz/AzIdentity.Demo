<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()
useHead({
    title: `${route.meta.title} | ${appConfig.name}`
})
</script>
<template>
    <main class="container">
        <slot/>
    </main>
</template>