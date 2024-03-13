<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<template>
  <q-item
    v-if="listItem"
    v-close-popup
    clickable
    v-bind="{...($myth.options.dt?.listItem?.item||{}),...$attrs}"
    @click="$emit('click',$event)"
  >
    <q-item-section
      avatar
      side
      v-bind="$myth.options.dt?.listItem?.avatarSection"
    >
      <q-icon
        :color="getColor"
        :name="getIcon"
        v-bind="$myth.options.dt?.listItem?.icon"
      />
    </q-item-section>
    <q-item-section
      v-bind="$myth.options.dt?.listItem?.labelSection"
    >
      <q-item-label
        v-bind="$myth.options.dt?.listItem?.labelItem"
      >
        <slot>
          {{ label ? __(label) : label }}
        </slot>
      </q-item-label>
    </q-item-section>
  </q-item>
  <q-btn
    v-else
    :color="getColor"
    :icon="getIcon"
    :label="label"
    :round="round !== undefined ? round : label"
    v-bind="{...($myth.options.dt?.btn||{}),...$attrs}"
    @click="$emit('click',$event)"
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
  round: undefined
})
type Events = {
  (e: 'click', evt: Event): void;
}
defineEmits<Events>()

const hasTooltip = computed(() => Boolean(props.tooltip) || Boolean(props.show) || Boolean(props.update) || Boolean(props.destroy))

const myth = useMyth()
const { __ } = useMyth()
// const { t, te } = useI18n({ useScope: 'global' })

const getTooltip = computed(() => {
  if (props.tooltip !== undefined) {
    return __(props.tooltip)
    // return te(props.tooltip) ? t(props.tooltip) : props.tooltip
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
  if (props.show) {
    return myth?.options?.dt?.contextmenu?.btnStyle?.showColor
  } else if (props.update) {
    return myth?.options?.dt?.contextmenu?.btnStyle?.updateColor
  } else if (props.destroy) {
    return myth?.options?.dt?.contextmenu?.btnStyle?.destroyColor
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
</script>
