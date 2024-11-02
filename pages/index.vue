<script setup lang="ts">
import BaseDropDown from '~/components/BaseDropDown.vue';
</script>

<template>
    <h1>Home</h1>

    <ClientOnly fallback-tag="span">
        <BaseDropDown/>
        <template #fallback>
            <button class="btn btn-secondary dropdown-toggle" type="button">
                Dropdown button
            </button>
        </template>
    </ClientOnly>
</template>