<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>

import { useField } from 'vee-validate'
import { MSelectProps as Props } from './models.d'
import { computed, reactive, ref, useAttrs } from 'vue'
import { useInputHelper } from '../../composables'
import { QField, QSelect, QSelectSlots } from 'quasar'

type P = {
  name: Props['name'];
  auto?: Props['auto'];
  col?: Props['col'];
  xs?: Props['xs'];
  sm?: Props['sm'];
  md?: Props['md'];
  lg?: Props['lg'];
  xl?: Props['xl'];
  // modelValue?: Props['modelValue'];
  label?: Props['label'];
  caption?: Props['caption'];
  hint?: Props['hint'];
  placeholder?: Props['placeholder'];
  help?: Props['help'];
  stackLabel?: Props['stackLabel'];
  required?: Props['required'];
  rules?: Props['rules'];
  // errors?: Props['errors'];
  viewMode?: Props['viewMode'];
  viewModeValue?: Props['viewModeValue'];
  autocomplete?: Props['autocomplete'];
  topLabel?: Props['topLabel'];
  behavior?: Props['behavior'];
  emitValue?: Props['emitValue'];
  useInput?: Props['useInput'];
  mapOptions?: Props['mapOptions'];
  loading?: Props['loading'];
  multiple?: Props['multiple'];
  options?: Props['options'];
  optionLabel?: Props['optionLabel'];
  optionValue?: Props['optionValue'];
  noFilter?: Props['noFilter'];
  hideEmptyList?: Props['hideEmptyList'];
  readonly?: Props['readonly'];
  useChips?: Props['useChips'];
  searchLength?: Props['searchLength'];
  axiosMode?: Props['axiosMode'];
  hideSelected?: Props['hideSelected'];
}

const props = withDefaults(defineProps<P>(), {
  name: () => '',
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  // modelValue: undefined,
  label: undefined,
  caption: undefined,
  hint: undefined,
  placeholder: undefined,
  help: undefined,
  stackLabel: undefined,
  required: undefined,
  rules: undefined,
  // errors: undefined,
  viewMode: () => !1,
  viewModeValue: undefined,
  autocomplete: undefined,
  topLabel: undefined,
  behavior: undefined,
  emitValue: () => !0,
  useInput: () => !0,
  mapOptions: () => !0,
  loading: undefined,
  multiple: undefined,
  options: () => ([]),
  optionLabel: () => 'label',
  optionValue: () => 'value',
  noFilter: undefined,
  hideEmptyList: undefined,
  readonly: undefined,
  useChips: undefined,
  searchLength: () => 1,
  axiosMode: undefined,
  hideSelected: undefined
})
defineModel<Props['modelValue']>({ required: !1, default: undefined })
const attrs = useAttrs()
const helper = useInputHelper<P & Props>(() => props, 'select', () => ({ choose: !0, attrs }))
const { hasTopLabel, getLabel, getPlaceholder, getAutocompleteAttribute, inputProps, getRules } = helper
const inputScope = useField<Props['modelValue']>(() => props.name, getRules, {
  syncVModel: !0,
  label: getLabel
})
const { value, errorMessage, handleChange, handleBlur } = inputScope
const minLength = computed(() => parseInt(props.searchLength?.toString()))
const search = defineModel<string>('search', { required: !1, default: '' })
const getOptions = computed(() => {
  if (props.noFilter && search.value?.length >= minLength.value && !props.axiosMode) {
    return props.options.filter((v: any) => {
      if (typeof v === 'string' || typeof v === 'number') {
        return v.toString().toLowerCase().indexOf(search.value) > -1
      }
      let labelKey = 'label'
      if (props.optionLabel) {
        labelKey = typeof props.optionLabel === 'function' ? props.optionLabel(v) : props.optionLabel
      }
      let valueKey = 'value'
      if (props.optionValue) {
        valueKey = typeof props.optionValue === 'function' ? props.optionValue(v) : props.optionValue
      }
      return v[labelKey]?.toString().toLowerCase().indexOf(search.value) > -1 || v[valueKey]?.toString().toLowerCase().indexOf(search.value) > -1
    })
  }
  return props.options
})
const filterFn = (val: any, update: any) => {
  if ((!val && search.value === val) || props.noFilter === !0) {
    update()
    return
  }
  update(() => {
    search.value = val.toString()
  })
}
const onDoneOptions = () => {
  const e = input.value as QSelect
  e?.updateInputValue('', !0)
  e?.hidePopup()
}
const listeners = {
  blur: (v: any) => handleBlur(v, !1),
  'update:modelValue': (v: Props['modelValue']) => handleChange(v, !!errorMessage.value),
  filterFn
}
const input = ref<InstanceType<typeof QSelect | typeof QField> | null>(null)
const scopes = reactive(inputScope)
defineExpose<typeof scopes & { input: typeof input, onDoneOptions: typeof onDoneOptions }>({ input, ...scopes, onDoneOptions })
</script>

<script lang="ts">
export default {
  inheritAttrs: !1
}
</script>

<template>
  <MCol
    :auto="auto"
    :class="[$attrs.class, {'m--input__required': !!getRules?.required && !value }]"
    :col="col"
    :lg="lg"
    :md="md"
    :name="name"
    :sm="sm"
    :xs="xs"
  >
    <slot
      name="top-input"
      v-bind="inputScope"
    />
    <slot name="top-label">
      <MInputLabel
        v-if="hasTopLabel"
        :field="inputScope"
      />
    </slot>
    <slot name="caption">
      <div
        v-if="!!caption"
        class="m--input__caption"
      >
        {{ __(caption) }}
      </div>
    </slot>
    <component
      :is="viewMode ? QField : QSelect"
      ref="input"
      :behavior="$q.platform.is.ios === !0 ? 'dialog' : behavior"
      :emit-value="emitValue"
      :error="!!errorMessage"
      :error-message="errorMessage"
      :hide-selected="hideSelected !== undefined ? hideSelected : search.length > 0"
      :hint="__(hint)"
      :label="loading ? undefined : getPlaceholder"
      :model-value="value"
      :options="getOptions"
      :readonly="readonly"
      v-bind="{
        ...$myth.options.select as any,
        ...( viewMode ? $myth.options.field : {} ),
        ...$attrs,
        ...(viewMode ? { stackLabel: !0 } : { stackLabel: hasTopLabel ? !1 : inputProps.stackLabel } ),
        useChips: inputProps.useChips === !0 && !multiple ? !1 : inputProps.useChips,
        multiple,
        mapOptions,
        loading,
        useInput,
        autocomplete:getAutocompleteAttribute
      }"
      @filter="filterFn"
      v-on="listeners"
    >
      <template
        v-if="!hideEmptyList"
        #no-option
      >
        <slot name="no-option">
          <q-item :dense="inputProps.optionsDense">
            <q-item-section side>
              <template v-if="loading">
                <q-spinner color="primary" />
              </template>
              <template v-else-if="search?.length > 0">
                <q-icon
                  color="warning"
                  name="ion-ios-warning"
                />
              </template>
              <template v-else-if="!search?.length">
                <q-icon name="ion-ios-search" />
              </template>
              <template v-else>
                <q-icon name="ion-ios-information-circle-outline" />
              </template>
            </q-item-section>
            <q-item-section>
              <template v-if="loading">
                <q-skeleton
                  type="text"
                  width="70%"
                />
                <q-skeleton
                  type="text"
                  width="50%"
                />
              </template>
              <template v-else-if="!search?.length">
                {{ __('myth.select.typeToSearch') }}
              </template>
              <template v-else-if="search?.length > 0">
                {{ __('myth.select.noResult') }}
              </template>
              <template v-else>
                {{ __('myth.select.noData') }}
              </template>
            </q-item-section>
          </q-item>
        </slot>
      </template>
      <template
        v-if="loading"
        #selected
      >
        <q-skeleton width="60%" />
      </template>
      <template
        v-if="multiple"
        #before-options
      >
        <MContainer>
          <MRow class="items-center">
            <MBtn
              :label="__('done')"
              flat
              @click="onDoneOptions()"
            />
          </MRow>
        </MContainer>
      </template>

      <template
        v-for="(_,slot) in $slots as Readonly<QSelectSlots>"
        :key="slot"
        #[slot]="inputSlot"
      >
        <slot
          :name="slot"
          v-bind="inputSlot || {}"
        />
      </template>

      <template
        v-if="viewMode"
        #control
      >
        <slot name="control">
          <div
            class="self-center full-width no-outline"
            tabindex="0"
          >
            {{ viewModeValue ?? value }}
          </div>
        </slot>
      </template>
    </component>
    <slot
      name="help"
      v-bind="inputScope"
    >
      <MHelpRow :text="help" />
    </slot>
    <slot
      name="bottom-input"
      v-bind="inputScope"
    />
  </MCol>
</template>

<style lang="scss" scoped>

</style>
