<!--
  - MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - https://www.4myth.com
  -->

<script lang="ts" setup>

import { useMyTh } from '@mythpe/js-helpers'
import { MCardProps } from '@mythpe/js-helpers/src/components'
import { computed, onMounted, reactive, useSlots } from 'vue'
import { useRoute } from 'vue-router'

interface Props extends MCardProps {
  titleFromRoute?: boolean;
  title?: string | (() => string);
  subtitle?: string | (() => string);
  backRoute?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  titleFromRoute: undefined,
  title: undefined,
  subtitle: undefined,
  backRoute: undefined
})

const slots = useSlots()
const route = useRoute()
const {
  str: { nl2br },
  translate,
  getPageTitle
} = useMyTh()
const {
  t,
  te
} = translate()

const cardOptions = reactive<{
  title: string | null;
  subtitle: string | null;
}>({
  title: null,
  subtitle: null
})
const hasTopSection = computed(() => Boolean(props.title) || Boolean(props.subtitle) || Boolean(slots.title) || props.titleFromRoute)
const getTitle = () => {
  if (props.title) {
    if (typeof props.title === 'function') {
      return props.title()
    }
    if (te(props.title)) {
      return t(props.title)
    }
    return props.title
  }
  return null
}
const getSubtitle = () => {
  if (props.subtitle) {
    if (typeof props.subtitle === 'function') {
      return props.subtitle()
    }
    if (te(props.subtitle)) {
      return nl2br(t(props.subtitle))
    }
    return nl2br(props.subtitle)
  }
  return null
}

onMounted(() => {
  if (props.title) {
    cardOptions.title = getTitle()
  } else if (props.titleFromRoute) {
    cardOptions.title = getPageTitle(2, route) ?? ''
  }

  if (props.subtitle) {
    cardOptions.subtitle = getSubtitle()
  }
})
</script>

<script lang="ts">
export default {
  inheritAttrs: !1
}
</script>

<template>
  <q-card
    class="m--card"
    v-bind="$attrs"
  >
    <q-card-section v-if="hasTopSection || backRoute">
      <div class="row">
        <MBtn
          v-if="backRoute"
          :icon="`arrow_${appRtl ? 'forward' : 'back'}`"
          class="q-mr-sm print-hide"
          @click="$router.back()"
        >
          <span class="q-ml-sm">{{ $t('back') }}</span>
        </MBtn>
        <div
          v-if="Boolean(cardOptions.title)"
          class="text-h5"
        >
          {{ cardOptions.title }}
        </div>
      </div>
      <div
        v-if="Boolean(cardOptions.subtitle)"
        class="text-subtitle2"
        v-html="cardOptions.subtitle"
      />
      <template v-if="Boolean($slots.title)">
        <slot name="title" />
      </template>
    </q-card-section>
    <q-card-section>
      <slot />
    </q-card-section>
    <MContainer
      v-if="Boolean($slots.actions)"
      class="print-hide"
    >
      <q-separator />
      <div class="row">
        <slot name="actions" />
      </div>
    </MContainer>
  </q-card>
</template>

<style>
.m--card {

}
</style>
