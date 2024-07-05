<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { MContainerProps } from './models.d'
import { computed } from 'vue'

interface Props {
  dense?: MContainerProps['dense'];
  fluid?: MContainerProps['fluid'];
}

const props = withDefaults(defineProps<Props>(), {
  dense: undefined,
  fluid: undefined
})
const getOption = computed(() => (opts?: Partial<MContainerProps>, name: keyof Props) => {
  if (props[name] !== undefined) {
    return !!props[name]
  }
  if (opts?.[name] !== undefined) {
    return !!opts[name]
  }
  return props[name]
})
</script>

<template>
  <div
    :class="{
      'm--container' : !0,
      'm--container__dense' : getOption($myth.options.container,'dense') === !0,
      'm--container__fluid' : getOption($myth.options.container,'fluid') === !0,
    }"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'MContainer',
  inheritAttrs: !1
}
</script>
