<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { getMythOptions } from '../../vue3'
import { computed, defineEmits } from 'vue'
import { ColStyleType } from '../grid/models'

interface Props {
  auto?: boolean | undefined;
  col?: ColStyleType;
  xs?: ColStyleType;
  sm?: ColStyleType;
  md?: ColStyleType;
  lg?: ColStyleType;
  xl?: ColStyleType;
  modelValue: any;
  type: 'date' | 'time'
}

const props = withDefaults(defineProps<Props>(), {
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  modelValue: undefined,
  type: () => 'date'
})

interface Emits {
  (e: 'update:modelValue', value: any): void
}

const emit = defineEmits<Emits>()

const inputValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
const isDate = computed(() => props.type === 'date')

const mask = isDate.value ? '####-##-##' : '##:##'
const format = isDate.value ? 'YYYY-MM-DD' : 'HH:mm'
const icon = isDate.value ? 'event' : 'access_time'
</script>

<script lang="ts">
export default {
  inheritAttrs: !0
}
</script>

<template>
  <MCol
    :auto="auto"
    :class="$attrs.class"
    :col="col"
    :lg="lg"
    :md="md"
    :sm="sm"
    :xs="xs"
  >
    <MInput
      v-model="inputValue"
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
              v-model="inputValue"
              :mask="format"
              today-btn
              v-bind="{...($myth.vueConfig.date||{}),...$attrs}"
            >
              <div class="row items-center justify-end">
                <MBtn
                  v-close-popup
                  :label="$t('done')"
                  flat
                />
              </div>
            </q-date>
            <q-time
              v-else
              v-model="inputValue"
              :mask="format"
              now-btn
              v-bind="{...($myth.vueConfig.time||{}),...$attrs}"
            >
              <div class="row items-center justify-end">
                <MBtn
                  v-close-popup
                  :label="$t('done')"
                  flat
                />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </MInput>
  </MCol>
</template>
