<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<template>
  <q-btn v-bind="$myth.options.button">
    <template #loading>
      <slot name="loading">
        <template v-if="!!$myth.options.loadingButtons?.elm">
          <q-spinner-audio
            v-if="$myth.options.loadingButtons?.elm === 'audio'"
            :color="$myth.options.loadingButtons?.color"
            :size="$myth.options.loadingButtons?.size"
          />
          <q-spinner-ball
            v-if="$myth.options.loadingButtons?.elm === 'ball'"
            :color="$myth.options.loadingButtons?.color"
            :size="$myth.options.loadingButtons?.size"
          />
          <q-spinner-bars
            v-if="$myth.options.loadingButtons?.elm === 'bars'"
            :color="$myth.options.loadingButtons?.color"
            :size="$myth.options.loadingButtons?.size"
          />
          <q-spinner-box
            v-if="$myth.options.loadingButtons?.elm === 'box'"
            :color="$myth.options.loadingButtons?.color"
            :size="$myth.options.loadingButtons?.size"
          />
          <q-spinner-clock
            v-if="$myth.options.loadingButtons?.elm === 'clock'"
            :color="$myth.options.loadingButtons?.color"
            :size="$myth.options.loadingButtons?.size"
          />
          <q-spinner-comment
            v-if="$myth.options.loadingButtons?.elm === 'comment'"
            :color="$myth.options.loadingButtons?.color"
            :size="$myth.options.loadingButtons?.size"
          />
          <q-spinner-cube
            v-if="$myth.options.loadingButtons?.elm === 'cube'"
            :color="$myth.options.loadingButtons?.color"
            :size="$myth.options.loadingButtons?.size"
          />
          <q-spinner-dots
            v-if="$myth.options.loadingButtons?.elm === 'dots'"
            :color="$myth.options.loadingButtons?.color"
            :size="$myth.options.loadingButtons?.size"
          />
          <q-spinner-facebook
            v-if="$myth.options.loadingButtons?.elm === 'facebook'"
            :color="$myth.options.loadingButtons?.color"
            :size="$myth.options.loadingButtons?.size"
          />
          <q-spinner-gears
            v-if="$myth.options.loadingButtons?.elm === 'gears'"
            :color="$myth.options.loadingButtons?.color"
            :size="$myth.options.loadingButtons?.size"
          />
          <q-spinner-grid
            v-if="$myth.options.loadingButtons?.elm === 'grid'"
            :color="$myth.options.loadingButtons?.color"
            :size="$myth.options.loadingButtons?.size"
          />
          <q-spinner-hearts
            v-if="$myth.options.loadingButtons?.elm === 'hearts'"
            :color="$myth.options.loadingButtons?.color"
            :size="$myth.options.loadingButtons?.size"
          />
          <q-spinner-hearts
            v-if="$myth.options.loadingButtons?.elm === 'hearts'"
            :color="$myth.options.loadingButtons?.color"
            :size="$myth.options.loadingButtons?.size"
          />
          <q-spinner-hourglass
            v-if="$myth.options.loadingButtons?.elm === 'hourglass'"
            :color="$myth.options.loadingButtons?.color"
            :size="$myth.options.loadingButtons?.size"
          />
          <q-spinner-infinity
            v-if="$myth.options.loadingButtons?.elm === 'infinity'"
            :color="$myth.options.loadingButtons?.color"
            :size="$myth.options.loadingButtons?.size"
          />
          <q-spinner-ios
            v-if="$myth.options.loadingButtons?.elm === 'ios'"
            :color="$myth.options.loadingButtons?.color"
            :size="$myth.options.loadingButtons?.size"
          />
          <q-spinner-orbit
            v-if="$myth.options.loadingButtons?.elm === 'orbit'"
            :color="$myth.options.loadingButtons?.color"
            :size="$myth.options.loadingButtons?.size"
          />
          <q-spinner-oval
            v-if="$myth.options.loadingButtons?.elm === 'oval'"
            :color="$myth.options.loadingButtons?.color"
            :size="$myth.options.loadingButtons?.size"
          />
          <q-spinner-pie
            v-if="$myth.options.loadingButtons?.elm === 'pie'"
            :color="$myth.options.loadingButtons?.color"
            :size="$myth.options.loadingButtons?.size"
          />
          <q-spinner-puff
            v-if="$myth.options.loadingButtons?.elm === 'puff'"
            :color="$myth.options.loadingButtons?.color"
            :size="$myth.options.loadingButtons?.size"
          />
          <q-spinner-radio
            v-if="$myth.options.loadingButtons?.elm === 'radio'"
            :color="$myth.options.loadingButtons?.color"
            :size="$myth.options.loadingButtons?.size"
          />
          <q-spinner-rings
            v-if="$myth.options.loadingButtons?.elm === 'rings'"
            :color="$myth.options.loadingButtons?.color"
            :size="$myth.options.loadingButtons?.size"
          />
          <q-spinner-tail
            v-if="$myth.options.loadingButtons?.elm === 'tail'"
            :color="$myth.options.loadingButtons?.color"
            :size="$myth.options.loadingButtons?.size"
          />
        </template>
      </slot>
    </template>
    <slot />
  </q-btn>
</template>

<script lang="ts" setup>
//
</script>

<script lang="ts">
export default {
  name: 'MBtn'
}
</script>
