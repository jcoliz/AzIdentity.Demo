<script setup lang="ts">

/**
 * Where to find details about errors to display
 */
 const errorDisplay = useErrorDisplay()

</script>
<template>
    <!-- TODO: Toasts are always client only. ClientOnly tag needs to be INSIDE the BaseToast. -->
    <ClientOnly>
        <BaseToast v-model="errorDisplay.showError.value">
            <template #title>ERROR</template>
            <template #default>
                {{ errorDisplay.errorDetails }}
            </template>
        </BaseToast>
    </ClientOnly>    
</template>