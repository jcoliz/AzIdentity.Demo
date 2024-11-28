<script setup lang="ts">

/**
 * Where to find details about errors to display
 */
 const errorDisplay = useErrorDisplay()

</script>
<template>
    <BaseToast v-model="errorDisplay.showError.value">
        <template #title>ERROR</template>
        <template #default>
            {{ errorDisplay.errorDetails }}
        </template>
    </BaseToast>
</template>