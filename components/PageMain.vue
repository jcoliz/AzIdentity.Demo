<script setup lang="ts">

const props = defineProps<{
  /**
   * Optional page header, else will use route title 
   */
   header?: string
}>()

const route = useRoute()
const appConfig = useAppConfig()
useHead({
    title: `${route.meta.title} | ${appConfig.name}`
})

const headerText = props.header ?? route.meta.title

</script>
<template>
    <main class="container">
        <BasePageHeader>{{ headerText }}</BasePageHeader>
        <slot/>
    </main>
</template>