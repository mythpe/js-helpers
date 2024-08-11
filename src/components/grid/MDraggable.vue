<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<template>
  <draggable
    v-model="model"
    :item-key="itemKey"
    class="draggable-group"
    v-bind="{...$myth.options.draggable,...dragOptions,...$attrs}"
    @end="onEnd"
    @start="onStart"
  >
    <template #item="iProps">
      <component
        :is="itemTag"
        class="draggable-group-item"
      >
        <slot
          name="item"
          v-bind="iProps"
        />
      </component>
    </template>
  </draggable>
</template>

<script lang="ts" setup>

import Draggable from 'vuedraggable'
import { computed, nextTick, ref, watch } from 'vue'
import { MDraggableProps } from './models'

export interface Props {
  modelValue: MDraggableProps;
  itemTag?: MDraggableProps['itemTag'];
  itemKey?: MDraggableProps['itemKey'];
  group?: MDraggableProps['group'];
  handle?: MDraggableProps['handle'];
  ghostClass?: MDraggableProps['ghostClass'];
}

interface Emits {
  (e: 'update:modelValue', value: any): void

  (e: 'start', value: boolean): void

  (e: 'end', value: boolean): void

  (e: 'dragging', value: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  itemTag: () => 'div',
  itemKey: () => 'id',
  group: () => 'group',
  handle: () => '.drag',
  ghostClass: () => 'draggable-ghost'
})

const emit = defineEmits<Emits>()
const model = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})
const dragOptions = computed(() => ({
  // animation: 250,
  group: computed(() => props.ghostClass).value,
  ghostClass: computed(() => props.ghostClass).value,
  handle: computed(() => props.handle).value
}))
const dragging = ref(!1)
const onStart = () => {
  dragging.value = !0
  nextTick(() => {
    emit('start', !0)
  })
}
const onEnd = () => {
  dragging.value = !1
  nextTick(() => {
    emit('start', !1)
  })
}
watch(dragging, v => emit('dragging', v))

</script>

<script lang="ts">
export default {
  name: 'MDraggable',
  inheritAttrs: !1
}
</script>
