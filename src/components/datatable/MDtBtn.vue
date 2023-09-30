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
    dense
    v-bind="$attrs"
    @click="$emit('click',$event)"
  >
    <q-item-section
      side
      avatar
    >
      <q-icon
        :color="getColor"
        :name="getIcon"
      />
    </q-item-section>
    <q-item-section>
      <q-item-label>
        <slot>
          {{ label || $attrs.label }}
        </slot>
      </q-item-label>
    </q-item-section>
  </q-item>
  <q-btn
    v-else
    :color="getColor"
    :dense="dense"
    :fab-min="fabMini"
    :flat="flat"
    :icon="getIcon"
    :label="label"
    :round="round"
    v-bind="$attrs"
    @click="$emit('click',$event)"
  >
    <q-tooltip
      v-if="hasTooltip"
      class="gt-sm"
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
import { useI18n } from 'vue-i18n'

interface Props {
  show?: boolean | undefined;
  update?: boolean | undefined;
  destroy?: boolean | undefined;
  tooltip?: string | null | undefined;
  color?: string | undefined;
  icon?: string | undefined;
  listItem?: boolean;
  fabMini?: boolean | undefined;
  flat?: boolean | undefined;
  round?: boolean | undefined;
  dense?: boolean | undefined;
  label?: string | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  show: !1,
  update: !1,
  destroy: !1,
  color: undefined,
  icon: undefined,
  tooltip: undefined,
  listItem: !1,
  fabMini: () => !0,
  flat: () => !0,
  round: () => !0,
  dense: () => !0,
  label: undefined
})
type Events = {
  (e: 'click', evt: Event): void;
}
defineEmits<Events>()

const hasTooltip = computed(() => Boolean(props.tooltip) || Boolean(props.show) || Boolean(props.update) || Boolean(props.destroy))

const { t, te } = useI18n({ useScope: 'global' })

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
    return undefined
  } else if (props.update) {
    return undefined
  } else if (props.destroy) {
    return undefined
  }
  return props.color
})
</script>
