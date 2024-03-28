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

import Typed from 'typed.js'
import { computed, onBeforeUnmount, onMounted, watch } from 'vue'
import { MTypingStringProps } from 'app/src'

interface Props {
  name: MTypingStringProps['name'];
  string: MTypingStringProps['string'];
  loop?: MTypingStringProps['loop'];
  typeSpeed?: MTypingStringProps['typeSpeed'];
  options?: MTypingStringProps['options'];
}

const props = withDefaults(defineProps<Props>(), {
  name: undefined,
  string: undefined,
  loop: () => !0,
  typeSpeed: () => 45,
  options: () => ({})
})
const elmId = computed(() => `typed-content-${props.name}`)
let typed: Typed | undefined
const iniTyped = () => {
  try {
    typed = new Typed(`#${elmId.value}`, {
      loop: props.loop,
      typeSpeed: props.typeSpeed,
      strings: typeof props.string === 'string' ? [props.string] : props.string,
      ...props.options
    })
  } catch (e) {

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
watch(() => props.string, (v) => {
  destroy()
  iniTyped()
})
onMounted(() => {
  if (props.string) {
    setTimeout(() => {
      try {
        iniTyped()
      } catch (e) {
        const a = document.getElementById(`typed-content-${props.name}`)
        a && (a.textContent = typeof props.string === 'string' ? props.string : props.string[0])
      }
    }, 400 * parseInt(props.name.toString()))
  }
})
onBeforeUnmount(() => {
  // console.log(123)
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
