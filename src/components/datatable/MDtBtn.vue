<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
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
  color: undefined,
  icon: undefined,
  tooltip: undefined,
  listItem: !1,
  fabMini: !0,
  flat: !0,
  round: !0,
  dense: undefined
})
type Events = {
  (e: 'click', evt: Event): void;
}
defineEmits<Events>()

const hasTooltip = computed(() => Boolean(props.tooltip) || Boolean(props.show) || Boolean(props.update) || Boolean(props.destroy))

const { t, te } = useTranslate()

const getTooltip = computed(() => {
  if (props.tooltip) {
    return te(props.tooltip) ? t(props.tooltip) : props.tooltip
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
    return 'o_visibility'
  } else if (props.update) {
    return 'o_edit'
  } else if (props.destroy) {
    return 'o_delete'
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
    :dense="dense"
    :fab-mini="fabMini"
    :flat="flat"
    :icon="getIcon"
    :round="round"
    v-bind="$attrs"
    @click="$emit('click',$event)"
  >
    <slot />
    <q-tooltip
      v-if="hasTooltip"
    >
      {{ getTooltip }}
    </q-tooltip>
  </q-btn>
  <q-item
    v-else
    v-close-popup
    clickable
    v-bind="$attrs"
    @click="$emit('click',$event)"
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
