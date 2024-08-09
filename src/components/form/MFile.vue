<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>

import { QFieldSlots, QFile } from 'quasar'
import { useAcceptProp, useInputProps } from '../../composables'
import { Field as VeeField } from 'vee-validate'
import { computed, defineProps, ref } from 'vue'
import { MFileProps } from './models'
import MInputLabel from './MInputLabel.vue'
import { useMyth } from '../../vue3'

interface Props {
  auto?: MFileProps['auto'];
  col?: MFileProps['col'];
  xs?: MFileProps['xs'];
  sm?: MFileProps['sm'];
  md?: MFileProps['md'];
  lg?: MFileProps['lg'];
  xl?: MFileProps['xl'];
  accept?: MFileProps['accept'];
  images?: MFileProps['images'];
  video?: MFileProps['video'];
  pdf?: MFileProps['pdf'];
  excel?: MFileProps['excel'];
  outlined?: MFileProps['outlined'];
  standout?: MFileProps['standout'];
  borderless?: MFileProps['borderless'];
  stackLabel?: MFileProps['stackLabel'];
  filled?: MFileProps['filled'];
  dense?: MFileProps['dense'];
  hideBottomSpace?: MFileProps['hideBottomSpace'];
  name: MFileProps['name'];
  label?: MFileProps['label'];
  placeholder?: MFileProps['placeholder'];
  hidePlaceholder?: MFileProps['hidePlaceholder'];
  required?: MFileProps['required'];
  hideRequired?: MFileProps['hideRequired'];
  email?: MFileProps['email'];
  clearable?: MFileProps['clearable'];
  loading?: MFileProps['loading'];
  rules?: MFileProps['rules'];
  errors?: MFileProps['errors'];
  modelValue: MFileProps['modelValue'];
  viewMode?: MFileProps['viewMode'];
  viewModeValue?: MFileProps['viewModeValue'];
  topLabel?: MFileProps['topLabel'];
  caption?: MFileProps['caption'];
}

const props = withDefaults(defineProps<Props>(), {
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  accept: undefined,
  images: undefined,
  video: undefined,
  pdf: undefined,
  excel: undefined,
  outlined: undefined,
  standout: undefined,
  borderless: undefined,
  stackLabel: undefined,
  filled: undefined,
  dense: undefined,
  hideBottomSpace: undefined,
  name: () => '',
  label: undefined,
  placeholder: undefined,
  hidePlaceholder: undefined,
  required: undefined,
  hideRequired: undefined,
  email: undefined,
  clearable: undefined,
  loading: undefined,
  rules: () => ([]),
  errors: () => ({}),
  modelValue: undefined,
  viewMode: undefined,
  viewModeValue: undefined,
  topLabel: undefined,
  caption: undefined
})

type Events = {
  (e: 'update:modelValue', value: any | undefined): void;
}
defineEmits<Events>()
const { getRules, getLabel, getPlaceholder } = useInputProps(() => props)
const { accepts } = useAcceptProp(props)
const fileInput = ref<InstanceType<typeof QFile>>()
// const inputValue = computed({
//   get: () => props.modelValue,
//   set: (v) => {
//     emit('update:modelValue', v)
//     nextTick(() => {
//       fileInput.value?.blur()
//     })
//   }
// })
const inputValue = defineModel<MFileProps['modelValue']>({ required: !0 })
const pickFiles = (...args: any) => fileInput.value?.pickFiles(...args)
const removeAtIndex = (index: number) => fileInput.value?.removeAtIndex(index)

const { options: { file: mythOptions } } = useMyth()
const hasTopLabel = computed(() => {
  if (props.topLabel !== undefined) {
    return props.topLabel
  } else if (mythOptions?.topLabel !== undefined) {
    return mythOptions?.topLabel
  }
  return props.topLabel
})

defineExpose({
  fileInput,
  pickFiles,
  removeAtIndex
})

</script>

<script lang="ts">
export default {
  name: 'MFile',
  inheritAttrs: !1
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
    <template v-if="viewMode">
      <MInputLabel
        v-if="hasTopLabel"
        :for="name"
      >
        {{ getLabel }}
      </MInputLabel>
      <q-field
        :label="(topLabel || $myth.options.file?.topLabel) ? undefined : getLabel"
        :placeholder="getPlaceholder"
        v-bind="{...$myth.options.input as any,...$myth.options.field as any,...$attrs, stackLabel: !0}"
      >
        <template #control>
          <div
            class="self-center full-width no-outline"
            tabindex="0"
          >
            {{ viewModeValue || inputValue }}
          </div>
        </template>
        <template
          v-for="(_,slot) in ($slots as Readonly<QFieldSlots>)"
          :key="slot"
          #[slot]="inputSlot"
        >
          <slot
            :name="slot"
            v-bind="inputSlot || {}"
          />
        </template>
      </q-field>
    </template>
    <VeeField
      v-else
      v-slot="fieldScope"
      v-model="inputValue"
      :label="label ? __(label) : name"
      :name="name"
      :rules="getRules"
      v-bind="$attrs"
    >
      <slot name="top-label">
        <MInputLabel
          v-if="hasTopLabel"
          :for="name"
        >
          {{ getLabel }}
        </MInputLabel>
      </slot>
      <slot name="caption">
        <div
          v-if="!!caption"
          class="m--input__caption"
        >
          {{ __(caption) }}
        </div>
      </slot>
      <q-file
        ref="fileInput"
        :accept="accepts.join(',')"
        :borderless="borderless"
        :clearable="clearable"
        :dense="dense"
        :error="fieldScope.errors.length > 0"
        :error-message="fieldScope.errorMessage"
        :filled="filled"
        :hide-bottom-space="hideBottomSpace"
        :label="getLabel"
        :loading="loading"
        :model-value="fieldScope.value"
        :name="name"
        :outlined="outlined"
        :placeholder="getPlaceholder"
        :standout="standout"
        v-bind="{...($myth.options.file as any),...$attrs,stackLabel}"
        @blur="fieldScope.handleBlur"
        @change="fieldScope.handleChange"
        @clear="fieldScope.handleBlur"
        @update:model-value="fieldScope.handleChange"
      >
        <template #prepend>
          <slot name="prepend">
            <q-icon
              class="cursor-pointer"
              name="ion-ios-attach"
              @click="($refs.fileInput as QFile)?.pickFiles()"
            />
          </slot>
        </template>
        <template
          v-for="(_,slot) in $slots"
          :key="slot"
          #[slot]="inputSlot"
        >
          <slot
            v-if="inputSlot"
            :name="slot"
            v-bind="inputSlot"
          />
          <slot
            v-else
            :name="slot"
          />
        </template>
      </q-file>
      <slot name="bottom" />
    </VeeField>
  </MCol>
</template>
