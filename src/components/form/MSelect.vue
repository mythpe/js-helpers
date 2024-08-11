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
import { computed, reactive, ref } from 'vue'
import { useInputHelper } from '../../composables'
import { QField, QSelect, QSelectSlots } from 'quasar'

type P = {
  auto?: Props['auto'];
  col?: Props['col'];
  xs?: Props['xs'];
  sm?: Props['sm'];
  md?: Props['md'];
  lg?: Props['lg'];
  xl?: Props['xl'];
  help?: Props['help'];
  helpIcon?: Props['helpIcon'];
  helpProps?: Props['helpProps'];
  name: Props['name'];
  label?: Props['label'];
  stackLabel?: Props['stackLabel'];
  placeholder?: Props['placeholder'];
  hidePlaceholder?: Props['hidePlaceholder'];
  required?: Props['required'];
  hideRequired?: Props['hideRequired'];
  rules?: Props['rules'];
  errors?: Props['errors'];
  viewMode?: Props['viewMode'];
  viewModeValue?: Props['viewModeValue'];
  autocomplete?: Props['autocomplete'];
  topLabel?: Props['topLabel'];
  caption?: Props['caption'];
  hint?: Props['hint'];
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
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  help: undefined,
  helpIcon: () => 'ion-ios-help-circle-outline',
  helpProps: undefined,
  name: () => '',
  label: undefined,
  stackLabel: undefined,
  placeholder: undefined,
  hidePlaceholder: undefined,
  required: undefined,
  hideRequired: undefined,
  rules: undefined,
  errors: undefined,
  viewMode: () => !1,
  viewModeValue: undefined,
  autocomplete: undefined,
  topLabel: undefined,
  caption: undefined,
  hint: undefined,
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

const helper = useInputHelper<P & Props>(() => props, 'select', () => ({ choose: !0 }))
const { hasTopLabel, getLabel, getPlaceholder, getAutocompleteAttribute, inputProps } = helper

const inputScope = useField<Props['modelValue']>(() => props.name, computed(() => props.rules), { syncVModel: !0 })
const { value, errors: fieldErrors, handleChange, handleBlur } = inputScope
const getErrors = computed(() => [...(props.errors || []), ...fieldErrors.value])
const errorMessage = computed(() => getErrors.value[0] || undefined)
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

const listeners = {
  blur: (v: any) => handleBlur(v, !1),
  'update:modelValue': (v: string) => handleChange(v, !!errorMessage.value),
  filterFn
}
type Input = InstanceType<typeof QSelect | typeof QField>
const input = ref<Input | null>(null)
const scopes = reactive(inputScope)
const onDoneOptions = () => {
  const e = input.value as QSelect
  e?.updateInputValue('', !0)
  e?.hidePopup()
}
defineExpose<typeof scopes & { input: typeof input, onDoneOptions: typeof onDoneOptions}>({ input, ...scopes, onDoneOptions })
</script>

<script lang="ts">
export default {
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
    :name="name"
  >
    <slot
      name="top-input"
      v-bind="inputScope"
    />
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
    <component
      :is="viewMode ? QField : QSelect"
      ref="input"
      v-model="value"
      :autocomplete="getAutocompleteAttribute"
      :behavior="$q.platform.is.ios === !0 ? 'dialog' : behavior"
      :emit-value="emitValue"
      :error="!!errorMessage"
      :error-message="errorMessage"
      :hint="__(hint)"
      :label="loading ? undefined : getPlaceholder"
      :loading="loading"
      :map-options="mapOptions"
      :multiple="multiple"
      :options="getOptions"
      :readonly="readonly"
      :hide-selected="hideSelected !== undefined ? hideSelected : search.length > 0"
      :use-input="useInput"
      v-bind="{
        ...$myth.options.select as any,
        ...( viewMode ? $myth.options.field : {} ),
        ...$attrs,
        ...(viewMode ? { stackLabel: !0 } : { stackLabel: hasTopLabel ? !1 : inputProps.stackLabel } ),
        useChips: inputProps.useChips === !0 && !multiple ? !1 : inputProps.useChips
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
        v-for="(_,slot) in ($slots as Readonly<QSelectSlots>)"
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
      <MRow
        v-if="!!help"
        class="items-center"
        v-bind="helpProps"
      >
        <q-icon
          :name="helpIcon"
          left
          size="20px"
        />
        <span class="text-caption">{{ __(help) }}</span>
      </MRow>
    </slot>
    <slot
      name="bottom-input"
      v-bind="inputScope"
    />
  </MCol>
</template>

<style lang="scss" scoped>

</style>
