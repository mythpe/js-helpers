<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->
<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import { Field as VeeField } from 'vee-validate'
import { useInputProps } from '../../composables'
import { MInputProps } from './models'
import { QFieldSlots, QInputSlots } from 'quasar'
import lodash from 'lodash'
import InputLabel from './InputLabel.vue'

type Props = {
  name?: MInputProps['name'];
  auto?: MInputProps['auto'];
  col?: MInputProps['col'];
  xs?: MInputProps['xs'];
  sm?: MInputProps['sm'];
  md?: MInputProps['md'];
  lg?: MInputProps['lg'];
  xl?: MInputProps['xl'];
  label?: MInputProps['label'];
  stackLabel?: MInputProps['stackLabel'];
  placeholder?: MInputProps['placeholder'];
  hidePlaceholder?: MInputProps['hidePlaceholder'];
  required?: MInputProps['required'];
  hideRequired?: MInputProps['hideRequired'];
  email?: MInputProps['email'];
  mobile?: MInputProps['mobile'];
  rules?: MInputProps['rules'];
  errors?: MInputProps['errors'];
  modelValue: MInputProps['modelValue'];
  viewMode?: MInputProps['viewMode'];
  viewModeValue?: MInputProps['viewModeValue'];
  autocomplete?: MInputProps['autocomplete'];
  topLabel?: MInputProps['topLabel'];
  caption?: MInputProps['caption'];
  hint?: MInputProps['hint'];
}
const props = withDefaults(defineProps<Props>(), {
  name: () => '',
  label: undefined,
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  stackLabel: undefined,
  placeholder: undefined,
  hidePlaceholder: undefined,
  required: undefined,
  hideRequired: undefined,
  email: undefined,
  mobile: undefined,
  rules: undefined,
  errors: undefined,
  modelValue: undefined,
  viewMode: () => !1,
  viewModeValue: undefined,
  autocomplete: undefined,
  topLabel: undefined,
  caption: undefined,
  hint: undefined
})
type EmitsTypes = {
  (e: 'update:modelValue', value: any): void
}
defineEmits<EmitsTypes>()
const inputValue = defineModel({ required: !0 })
const { getRules, getLabel, getPlaceholder } = useInputProps(() => props)
const getAutocompleteAttribute = computed(() => {
  if (props.autocomplete !== undefined) {
    if (props.autocomplete === !0 || props.autocomplete === '') {
      return lodash.kebabCase(props.name)
    } else if (props.autocomplete === !1) {
      return undefined
    } else if (props.autocomplete.length > 0) {
      return props.autocomplete
    }
  }
  return props.autocomplete
})
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
      <InputLabel
        v-if="topLabel || $myth.options.input?.topLabel"
        :for="name"
      >
        {{ getLabel }}
      </InputLabel>
      <q-field
        :label="(topLabel || $myth.options.input?.topLabel) ? undefined : getLabel"
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
      ref="veeFieldRef"
      v-slot="fieldScope"
      v-model="inputValue"
      :label="label ? __(label) : name"
      :name="name"
      :rules="getRules"
      v-bind="$attrs"
    >
      <slot name="top-label">
        <InputLabel
          v-if="topLabel || $myth.options.input?.topLabel"
          :for="name"
        >
          {{ getLabel }}
        </InputLabel>
      </slot>
      <slot name="caption">
        <div
          v-if="!!caption"
          class="m--input__caption"
        >
          {{ __(caption) }}
        </div>
      </slot>
      <q-input
        :autocomplete="getAutocompleteAttribute"
        :error="fieldScope.errors.length > 0"
        :error-message="fieldScope.errorMessage"
        :hint="hint ? __(hint) : hint"
        :label="(topLabel || $myth.options.input?.topLabel) ? undefined : getLabel"
        :model-value="inputValue"
        :placeholder="getPlaceholder"
        v-bind="{...$myth.options.input as any,...$attrs,...fieldScope.field,stackLabel}"
        @update:model-value="fieldScope.handleChange"
      >
        <template
          v-for="(_,slot) in ($slots as Readonly<QInputSlots>)"
          :key="slot"
          #[slot]
        >
          <slot
            v-if="slot !== 'default'"
            :name="slot"
          />
        </template>
      </q-input>
      <slot v-bind="fieldScope" />
    </VeeField>
  </MCol>
</template>

<script lang="ts">
export default {
  name: 'MInput',
  inheritAttrs: !1
}
</script>
