<script lang="ts" setup>
//
</script>

<template>
  <div
    class="m--input__top-label"
    :for="$attrs.name || undefined"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
