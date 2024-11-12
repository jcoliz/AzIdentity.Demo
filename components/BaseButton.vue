<script setup lang="ts">
/**
 * Base Button: Standardized button styling
 */
defineProps<{
  /**
   * Visual styling to apply
   *
   * We can add more options to this list as long as bootstrap supports
   * them. We want to keep it limited, though, so we keep a consistent
   * look throughout.
   *
   * TODO: Is this list too many? Both `light` state and `outline-secondary`
   * are used as tertiary visuals. Should reconsider this.
   */
  visual: "primary" | "secondary" | "danger" | "outline-secondary" | "light"
}>()
</script>
<template>
  <button
    class="btn"
    :class="`btn-${visual}`"
  >
    <slot />
  </button>
</template>
