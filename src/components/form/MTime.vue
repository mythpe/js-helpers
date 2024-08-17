<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { MInputSlots, MTimeProps as Props } from './models'
import { ref, useAttrs } from 'vue'
import MPicker from './MPicker.vue'
import { useInputHelper } from '../../composables'
import { useField } from 'vee-validate'

type P = {
  name: Props['name'];
  rules?: Props['rules'];
}

const props = withDefaults(defineProps<P>(), {
  name: () => '',
  rules: undefined
})

defineModel<Props['modelValue']>({ required: !1, default: undefined })
const attrs = useAttrs()
const helper = useInputHelper<P>(() => props, 'input', () => ({ attrs }))
const { getLabel, getRules } = helper
const inputScope = useField<Props['modelValue']>(() => props.name, getRules, {
  syncVModel: !0,
  label: getLabel
})
const { value } = inputScope

const input = ref<InstanceType<typeof MPicker> | null>(null)
defineExpose<{ input: typeof input }>({ input })
</script>

<script lang="ts">
export default {
  name: 'MTime'
}
</script>

<template>
  <MPicker
    ref="input"
    v-model="value"
    :name="name"
    type="time"
  >
    <template
      v-for="(_,slot) in $slots as Readonly<MInputSlots>"
      :key="slot"
      #[slot]
    >
      <slot :name="slot" />
    </template>
  </MPicker>
</template>
