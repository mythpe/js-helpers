<!--
  - MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - https://www.4myth.com
  -->

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'MPicker',
  inheritAttrs: !1,
  props: {
    modelValue: {
      type: String,
      default: () => null
    },
    type: {
      type: String,
      default: () => 'date'
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const value = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    })
    const isDate = computed(() => props.type === 'date')

    const mask = isDate.value ? '####-##-##' : '##:##'
    const format = isDate.value ? 'YYYY-MM-DD' : 'HH:mm'
    const icon = isDate.value ? 'event' : 'access_time'

    return {
      value,
      format,
      icon,
      mask,
      isDate
    }
  }
})
</script>

<template>
  <MInput
    v-model="value"
    :mask="mask"
    v-bind="$attrs"
  >
    <template #append>
      <q-icon
        :name="icon"
        class="cursor-pointer"
      >
        <q-popup-proxy
          cover
          transition-hide="scale"
          transition-show="scale"
        >
          <q-date
            v-if="isDate"
            v-model="value"
            :mask="format"
          >
            <div class="row items-center justify-end">
              <MBtn
                v-close-popup
                :label="$myth.parseAttribute('done')"
                flat
              />
            </div>
          </q-date>
          <q-time
            v-else
            v-model="value"
            :mask="format"
          >
            <div class="row items-center justify-end">
              <MBtn
                v-close-popup
                :label="$myth.parseAttribute('done')"
                flat
              />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </MInput>
</template>
