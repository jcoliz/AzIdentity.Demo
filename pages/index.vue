<script setup lang="ts">
import BaseDropDown from '~/components/BaseDropDown.vue';
</script>

<template>
    <h1>Home</h1>

    <ClientOnly fallback-tag="span">
        <BaseDropDown class="mb-3">
            <template v-slot:trigger="slotProps">
                <button v-bind="slotProps" class="btn btn-secondary" data-bs-toggle="dropdown" type="button" >
                    Dropdown button
                </button>                
            </template>
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