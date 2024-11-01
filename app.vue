<script setup lang="ts">
import { Dropdown } from "bootstrap"
//window.Dropdown = Dropdown

useHead({
  htmlAttrs: {
    lang: "en",
    "data-bs-theme": "dark"
  },
});
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
