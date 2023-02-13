<!--
  - MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - https://www.4myth.com
  -->

<script
  lang="ts"
  setup
>

import { computed } from 'vue'
import { useTranslate } from '../../vue3'
import { MDtBtnProps } from './models'

interface Props extends MDtBtnProps {
  show?: boolean;
  update?: boolean;
  destroy?: boolean;
  tooltip?: string;
  color?: string | undefined;
  icon?: string | undefined;
  listItem?: boolean | undefined;
  fabMini?: boolean | undefined;
  flat?: boolean | undefined;
  round?: boolean | undefined;
  dense?: boolean | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  show: !1,
  update: !1,
  destroy: !1,
  color: 'blue-grey',
  icon: undefined,
  tooltip: undefined,
  listItem: !1,
  fabMini: !0,
  flat: !0,
  round: !0,
  dense: undefined
})
const hasTooltip = computed(() => props.tooltip || props.show || props.update || props.destroy)

const { t } = useTranslate()

const getTooltip = computed(() => {
  if (props.tooltip) {
    return t(props.tooltip) !== props.tooltip ? t(props.tooltip) : props.tooltip
  } else if (props.show) {
    return t('show')
  } else if (props.update) {
    return t('update')
  } else if (props.destroy) {
    return t('destroy')
  }
  return props.tooltip
})
const getIcon = computed(() => {
  if (props.show) {
    return 'visibility'
  } else if (props.update) {
    return 'edit'
  } else if (props.destroy) {
    return 'delete_outline'
  }
  return props.icon
})
const getColor = computed<string | undefined>(() => {
  if (props.show) {
    return undefined
  } else if (props.update) {
    return undefined
  } else if (props.destroy) {
    return 'negative'
  }
  return props.color
})

</script>

<template>
  <q-btn
    v-if="!listItem"
    :color="getColor"
    :icon="getIcon"
    :fab-mini="fabMini"
    :flat="flat"
    :round="round"
    v-bind="$attrs"
    :dense="dense"
  >
    <slot />
    <q-tooltip v-if="hasTooltip">
      {{ getTooltip }}
    </q-tooltip>
  </q-btn>
  <q-item
    v-else
    v-close-popup
    clickable
    v-bind="$attrs"
  >
    <q-item-section>
      <q-item-label>
        <q-icon
          :color="getColor"
          :name="getIcon"
          left
        />
        <slot />
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
