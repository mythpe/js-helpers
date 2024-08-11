<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<template>
  <q-dialog
    :transition-hide="$q.screen.lt.md ? slideHide : (slideProp ? slideHide : 'jump-down')"
    :transition-show="$q.screen.lt.md ? slideShow : (slideProp ? slideShow : 'jump-up')"
    allow-focus-outside
    maximized
    no-backdrop-dismiss
    no-esc-dismiss
    no-shake
    persistent
    v-bind="{...($myth.options.dialog||{}),...($attrs||{})}"
  >
    <slot />
  </q-dialog>
</template>

<script
  lang="ts"
  setup
>

import { computed } from 'vue'
import { MDialogProps } from './models'

interface Props {
  slide?: MDialogProps['slide'] | undefined;
  from?: MDialogProps['from']
}

const props = withDefaults(defineProps<Props>(), {
  slide: () => !1,
  from: () => 'left'
})
const slideProp = computed(() => props.slide !== undefined && props.slide !== !1 && props.slide !== null)
const map = {
  left: 'right',
  right: 'left',
  up: 'down',
  down: 'up'
}

const slideHide = computed<string>(() => 'slide-' + props.from)
const slideShow = computed<string>(() => 'slide-' + map[props.from])
</script>

<script lang="ts">
export default {
  name: 'MDialog',
  inheritAttrs: !1
}
</script>
