<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { MTransitionProps } from './models'

interface Props {
  enterIn?: MTransitionProps['enterIn'];
  enterOut?: MTransitionProps['enterOut'];
  slow?: MTransitionProps['slow'];
}

withDefaults(defineProps<Props>(), {
  enterIn: () => 'fadeIn',
  enterOut: () => 'fadeOut',
  slow: () => !0
})
// const def = ref({})
//
// function onBeforeEnter (el: any) {
//   def.value = el.style
//   el.style.opacity = 0
//   el.style.height = 0
// }
//
// function onEnter (el: any, done: any) {
//   gsap.to(el, {
//     opacity: 1,
//     height: '100%',
//     delay: el.dataset.index * 0.2,
//     onComplete: done
//   })
// }
//
// function onLeave (el: any, done: any) {
//   gsap.to(el, {
//     opacity: 0,
//     height: 0,
//     delay: el.dataset.index * 0.15,
//     onComplete: done
//   })
// }
</script>

<template>
  <TransitionGroup
    :enter-active-class="`animated ${enterIn} ${slow ? 'slow' : ''}`"
    :leave-active-class="`animated ${enterOut} ${slow ? 'slow' : ''}`"
    appear
    name="m__transition__fade"
    v-bind="$attrs"
  >
    <slot />
  </TransitionGroup>
</template>

<script lang="ts">
export default {
  name: 'MTransition',
  inheritAttrs: !1
}
</script>
