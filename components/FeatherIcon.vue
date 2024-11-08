<script setup lang="ts">
/**
 * Standardized display of icons from `feather-icons`
 */
import { computed } from "vue"
import { icons, type FeatherIconNames } from "feather-icons"

const props = defineProps<{
  /**
   * The icon to display
   */
  icon: FeatherIconNames

  /**
   * Width and height of icon (optional)
   *
   * Else will use 16px
   */
  size?: string | number | undefined
}>()

const computedSize = computed(() => props.size ?? 16)

const iconSvg = computed(() => {
  const icon = icons[props.icon]
  icon.attrs.width = computedSize.value
  icon.attrs.height = computedSize.value
  return icon.toSvg()
})
</script>

<template>
  <span v-html="iconSvg" />
</template>
