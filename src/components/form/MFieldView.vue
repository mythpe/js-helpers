<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>

import { defineProps } from 'vue'
import { QFieldSlots } from 'quasar'
import { MInputProps } from './models'

type Props = {
  name: MInputProps['name'];
  value: MInputProps['modelValue'];
  label: MInputProps['label'];
  placeholder: MInputProps['placeholder'];
  hint: MInputProps['hint'];
}
withDefaults(defineProps<Props>(), {
  name: () => '',
  value: undefined,
  label: undefined,
  placeholder: undefined,
  hint: undefined
})

</script>
<script lang="ts">
export default {
  inheritAttrs: !1
}
</script>
<template>
  <q-field
    :hint="__(hint)"
    :label="__(label)"
    :placeholder="__(placeholder)"
    v-bind="{...$myth.options.input as any,...$myth.options.field as any,...$attrs, stackLabel: !0}"
  >
    <template #control>
      <slot name="control">
        <div
          class="self-center full-width no-outline"
          tabindex="0"
        >
          {{ value }}
        </div>
      </slot>
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
