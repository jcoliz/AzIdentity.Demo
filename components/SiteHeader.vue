<script setup lang="ts">
const displayRoutes = useRouter()
  .getRoutes()
  .filter(x => x.meta.order)
  .toSorted((x, y) => (x.meta.order as number) - (y.meta.order as number))
</script>
<template>
  <div class="container">
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <RouterLink to="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <FeatherIcon icon="users" size="32"/>
        <span class="ms-3 fs-4 me-3">AzIdentity.Demo</span>
      </RouterLink>

      <ul class="nav nav-pills">
        <RouterLink v-for="route of displayRoutes" :key="route.meta.order as number" class="nav-link" :to="route.path">{{ route.meta.title }}</RouterLink>
      </ul>
      
      <LoginState/>
    </header>
  </div>
</template>