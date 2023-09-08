<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<template>
  <MPicker
    v-model="inputValue"
    type="date"
    v-bind="$attrs"
  >
    <template
      v-for="(k,v) in _slots"
      #[v]="scope"
    >
      <template v-if="Boolean(scope)">
        <slot
          :name="v"
          v-bind="scope"
        />
      </template>
      <template v-else>
        <slot :name="v" />
      </template>
    </template>
  </MPicker>
</template>

<script lang="ts" setup>
import { computed, defineEmits, useSlots } from 'vue'

interface Props {
  modelValue: any
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined
})

interface Emits {
  (e: 'update:modelValue', value: any): void
}

const emit = defineEmits<Emits>()
const inputValue = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})

const _slots = useSlots()
</script>

<script lang="ts">
export default {
  name: 'MDate',
  inheritAttrs: !1
}
</script>
