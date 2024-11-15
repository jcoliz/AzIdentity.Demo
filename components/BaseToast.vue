<script setup lang="ts">
import { Toast } from 'bootstrap';

const el = ref<HTMLElement>();

const toast = ref<Toast|undefined>()

const showing = defineModel<boolean>()

onMounted(()=>{
    if (el.value)
    {
        toast.value = Toast.getOrCreateInstance(el.value)        
        el.value.addEventListener("hidden.bs.toast", () => {
            showing.value = false
    })        
    }
})

watch(showing,(visible)=>{
    if (visible) {
        toast.value?.show()
    } else {
        toast.value?.hide()
    }
})

function close() {
    showing.value = false
}

</script>
<template>
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div ref="el" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <FeatherIcon class="me-2 mb-1" icon="alert-triangle"/>
                <strong class="me-auto"><slot name="title">Warning</slot></strong>
                <small><slot name="subtitle"/></small>
                <button type="button" class="btn-close" @click="close" aria-label="Close"/>
            </div>
            <div class="toast-body">
                <slot/>
            </div>
        </div>    
    </div>
</template>