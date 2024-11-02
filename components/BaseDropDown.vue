<script setup lang="ts">
//
// NOTE: This component can only be used client-side. Be sure to wrap it in
// <ClientOnly>
//

import { Dropdown } from 'bootstrap';

const toggleEl = ref<HTMLElement>();
const dropdown = ref<Dropdown>();

onMounted(()=>{
    if (toggleEl.value && ! Dropdown.getInstance(toggleEl.value))
    {
        dropdown.value = new Dropdown(toggleEl.value);        
    }
})

</script>
<template>
    <div class="dropdown">
    <button ref="toggleEl" class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Dropdown button
    </button>
    <slot/>
    </div>    
</template>