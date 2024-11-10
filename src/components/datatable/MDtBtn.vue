<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script
  lang="ts"
  setup
>

import { computed } from 'vue'
import { useMyth } from '../../vue3'

interface Props {
  show?: boolean | undefined;
  update?: boolean | undefined;
  destroy?: boolean | undefined;
  tooltip?: string | null | undefined;
  color?: string | undefined;
  icon?: string | undefined;
  listItem?: boolean | undefined;
  label?: string | undefined;
  round?: boolean | undefined;
  dense?: boolean | undefined;
  fabMini?: boolean | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  show: undefined,
  update: undefined,
  destroy: undefined,
  color: undefined,
  icon: undefined,
  tooltip: undefined,
  listItem: undefined,
  label: undefined,
  round: undefined,
  dense: undefined,
  fabMini: undefined
})
type Events = {
  (e: 'click', evt: Event): void;
}
const emit = defineEmits<Events>()

const hasTooltip = computed(() => !!props.tooltip || !!props.show || !!props.update || !!props.destroy)

const { __, options } = useMyth()
// const { t, te } = useI18n({ useScope: 'global' })

const getTooltip = computed(() => {
  if (props.tooltip !== undefined) {
    return props.tooltip ? __(props.tooltip) : props.tooltip
  } else if (props.show) {
    return __('labels.show')
  } else if (props.update) {
    return __('labels.update')
  } else if (props.destroy) {
    return __('labels.destroy')
  }
  return props.tooltip
})
const getIcon = computed(() => {
  if (props.show) {
    return 'ion-ios-eye'
  } else if (props.update) {
    return 'ion-ios-create'
  } else if (props.destroy) {
    return 'ion-ios-trash'
  }
  return props.icon
})
const getColor = computed<string | undefined>(() => {
  if (props.color !== undefined) {
    return props.color
  }
  if (props.show) {
    return options?.dt?.contextmenu?.btnStyle?.showColor
  } else if (props.update) {
    return options?.dt?.contextmenu?.btnStyle?.updateColor
  } else if (props.destroy) {
    return options?.dt?.contextmenu?.btnStyle?.destroyColor
  }
  return props.color
})
// const getLabel = computed(() => {
//   if (props.label) {
//     return __(props.label)
//   } else if (props.show) {
//     return __('labels.show')
//   } else if (props.update) {
//     return __('labels.update')
//   } else if (props.destroy) {
//     return __('labels.destroy')
//   }
//   return props.label
// })

defineOptions({ name: 'MDtBtn', inheritAttrs: !1 })
</script>

<template>
  <q-item
    v-if="listItem"
    v-close-popup
    clickable
    v-bind="{...options.dt?.MDtBtn?.item?.props,...$attrs}"
    @click="emit('click',$event)"
  >
    <q-item-section
      side
      v-bind="options.dt?.MDtBtn?.item?.avatarProps"
    >
      <q-icon
        :color="getColor"
        :name="getIcon"
        v-bind="options.dt?.MDtBtn?.item?.iconProps"
      />
    </q-item-section>
    <q-item-section v-bind="options.dt?.MDtBtn?.item?.labelSectionProps">
      <q-item-label v-bind="options.dt?.MDtBtn?.item?.itemLabelProps">
        <slot>
          {{ label ? __(label) : label }}
        </slot>
      </q-item-label>
    </q-item-section>
  </q-item>
  <q-btn
    v-else
    v-bind="{
      ...options.dt?.MDtBtn?.btn?.props,
      ...$attrs,
      fabMini: fabMini !== undefined ? fabMini : ( options.dt?.btn?.fabMini !== undefined ? options.dt.btn.fabMini : label === undefined),
      round: round !== undefined ? round : ( options.dt?.btn?.round !== undefined ? options.dt.btn.round : label === undefined),
      dense: dense !== undefined ? dense : ( options.dt?.btn?.dense !== undefined ? options.dt.btn.dense : label === undefined),
      label: label !== undefined ? __(label) : label,
      icon: getIcon,
      color: getColor
    }"
    @click="emit('click',$event)"
  >
    <q-tooltip
      v-if="hasTooltip"
      class="m--dt-btn-tooltip"
    >
      {{ getTooltip }}
    </q-tooltip>
    <slot />
  </q-btn>
</template>
