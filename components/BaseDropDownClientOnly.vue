<script setup lang="ts">
//
// NOTE: This component can only be used client-side. Be sure to wrap it in
// <ClientOnly>
//

import { Dropdown } from 'bootstrap';
import { useSlots, ref, onMounted } from "vue"

const slots = useSlots()

const toggleEl = ref<HTMLElement>();
const dropdown = ref<Dropdown>();

onMounted(()=>{
    const tslot = slots.trigger;
    if (tslot)
    {
        const nodes = tslot();
        const node = nodes[0];
        const el = node.el as HTMLElement;
        toggleEl.value = el;
        console.log("el:", el)

        if (toggleEl.value && ! Dropdown.getInstance(toggleEl.value))
        {
            dropdown.value = new Dropdown(toggleEl.value);        
        }
    }
})

</script>
<template>
    <div data-test-id="test-comp-client">
        <slot name="trigger"/>
        <slot/>
    </div>    
</template>
