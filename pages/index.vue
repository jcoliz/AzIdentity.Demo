<script setup lang="ts">
import BaseDropDown from '~/components/BaseDropDown.vue';
</script>

<template>
    <h1>Home</h1>

    <ClientOnly fallback-tag="span">
        <BaseDropDown>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item">Action</a></li>
                <li><a class="dropdown-item">Another action</a></li>
                <li><a class="dropdown-item">Something else here</a></li>
            </ul>
        </BaseDropDown>
        <template #fallback>
            <button class="btn btn-secondary dropdown-toggle" type="button">
                Dropdown button
            </button>
        </template>
    </ClientOnly>
</template>