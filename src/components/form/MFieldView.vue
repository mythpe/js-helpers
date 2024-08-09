<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>

import { MFieldViewProps } from './models'
import { defineProps } from 'vue'
import { QFieldSlots } from 'quasar'
import { useInputs } from '../../composables'

type Props = {
  name: MFieldViewProps['name'];
  value: MFieldViewProps['value'];
  label?: MFieldViewProps['label'];
  placeholder?: MFieldViewProps['placeholder'];
  hidePlaceholder?: MFieldViewProps['hidePlaceholder'];
  topLabel?: MFieldViewProps['topLabel'];
  caption?: MFieldViewProps['caption'];
  hint?: MFieldViewProps['hint'];
}
const props = withDefaults(defineProps<Props>(), {
  name: () => '',
  value: undefined,
  label: undefined,
  placeholder: undefined,
  hidePlaceholder: undefined,
  topLabel: undefined,
  caption: undefined,
  hint: undefined
})
const { hasTopLabel, getLabel, getPlaceholder } = useInputs(() => props)

</script>
<script lang="ts">
export default {
  inheritAttrs: !1
}
</script>
<template>
  <q-field
    :hint="hint"
    :label="hasTopLabel ? undefined : getLabel"
    :placeholder="getPlaceholder"
    v-bind="{...$myth.options.input as any,...$myth.options.field as any,...$attrs, stackLabel: !0}"
  >
    <template #control>
      <div
        class="self-center full-width no-outline"
        tabindex="0"
      >
        {{ value }}
      </div>
    </template>
    <template
      v-for="(_,slot) in ($slots as Readonly<QFieldSlots>)"
      :key="slot"
      #[slot]="inputSlot"
    >
      <slot
        v-if="['default'].includes(slot)"
        :name="slot"
        v-bind="inputSlot || {}"
      />
    </template>
  </q-field>
</template>
