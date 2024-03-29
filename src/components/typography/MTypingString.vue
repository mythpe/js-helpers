<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script
  lang="ts"
  setup
>

import Typed, { TypedOptions } from 'typed.js'
import { computed, onBeforeUnmount, onMounted, watch } from 'vue'
import { MTypingStringProps } from './models'
import { useMyth } from '../../vue3/InstallPlugin'

interface Props {
  name: MTypingStringProps['name'];
  string: MTypingStringProps['string'];
  loop?: MTypingStringProps['loop'];
  typeSpeed?: MTypingStringProps['typeSpeed'];
  backDelay?: MTypingStringProps['backDelay'];
  fadeOut?: MTypingStringProps['fadeOut'];
  options?: MTypingStringProps['options'];
}

const props = withDefaults(defineProps<Props>(), {
  name: undefined,
  string: undefined,
  loop: undefined,
  typeSpeed: () => 45,
  backDelay: () => 3000,
  fadeOut: () => !0,
  options: () => ({})
})
const myth = useMyth()
const elmId = computed(() => `typed-content-${props.name}`)
const computedOptions = computed<TypedOptions>(() => ({
  loop: props.loop,
  typeSpeed: props.typeSpeed,
  backDelay: props.backDelay,
  fadeOut: props.fadeOut,
  strings: typeof props.string === 'string' ? [props.string] : props.string,
  ...myth.options.typingString,
  ...props.options
}))
let typed: Typed | undefined
const iniTyped = () => {
  try {
    typed = new Typed(`#${elmId.value}`, computedOptions.value)
  } catch (e) {
    console.log(e)
  }
}
const destroy = () => {
  if (typed) {
    try {
      typed.destroy()
    } catch (e) {

    }
  }
}
watch(() => props.string, () => {
  destroy()
  iniTyped()
})
onMounted(() => {
  if (props.string) {
    try {
      iniTyped()
    } catch (e) {
      console.log(e)
      const a = document.getElementById(elmId.value)
      a && (a.innerHTML = typeof props.string === 'string' ? props.string : props.string.join('<br />'))
    }
  }
})
onBeforeUnmount(() => {
  destroy()
})
defineExpose({ typed })
</script>

<template>
  <span
    :id="elmId"
    v-bind="$attrs"
  />
</template>

<script lang="ts">
export default {
  name: 'MTypingString',
  inheritAttrs: !1
}
</script>
