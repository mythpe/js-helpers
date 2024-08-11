/*
 * MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { useMyth } from '../vue3'
import lodash from 'lodash'
import { computed, MaybeRefOrGetter, ref, toValue } from 'vue'
import { MythOptionsConfig as MOC } from '../types'
import { extend } from 'quasar'

type G = { name: string; } & Record<string, any>;
type OptsContext = { choose?: boolean; };
export const useInputHelper = <P extends G = G> (Props: MaybeRefOrGetter<P>, key: keyof MOC, Opts: MaybeRefOrGetter<OptsContext> = {}) => {
  const { __ } = useMyth()
  const props = toValue<P>(Props)
  const opts = toValue<OptsContext>(Opts)
  const { options } = useMyth()
  const inputOptions = computed(() => (k: keyof MOC) => options[k] || {})
  const inputProps = computed<MOC[typeof key] & P>(() => extend(!0, {}, inputOptions.value(key), props))
  const hasTopLabel = computed(() => inputProps.value.topLabel === !0)

  const getLabel = computed<string | undefined>(() => {
    const k = props.label === undefined ? props.name : props.label
    return k ? (__(k) || undefined) : undefined
  })
  const getPlaceholder = computed<string | undefined>(() => {
    if (props.placeholder === undefined) {
      const k = props.label !== undefined ? props.label : props.name
      return __(`replace.${opts?.choose ? 'choose' : 'enter'}`, { name: __(k) })
    }
    return __(props.placeholder) || undefined
    // if (inputProps.value.hidePlaceholder === !0) {
    //   return props.placeholder !== undefined ? (__(props.placeholder) || undefined) : undefined
    // }
  })
  const getAutocompleteAttribute = computed<string | null | undefined>(() => {
    if (props.autocomplete === undefined) return props.autocomplete
    if (props.autocomplete === !0 || props.autocomplete === '') {
      return lodash.kebabCase(props.name)
    } else if (props.autocomplete === !1) {
      return 'off'
    } else if (props.autocomplete.length > 0) {
      return props.autocomplete
    }
  })
  const accepts = computed(() => {
    const l = []
    if (props.accept) {
      l.push(props.accept)
    }
    if (props.images) {
      l.push('image/png,image/jpg,image/jpeg')
    }
    if (props.video) {
      l.push('video/mp4,video/x-m4v,video/*')
    }
    if (props.pdf) {
      l.push('application/pdf')
    }
    if (props.excel) {
      l.push('.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    }
    return l
  })
  const skipInputSlots = ref(['top-input', 'top-label', 'caption', 'bottom-input'])

  return {
    accepts,
    skipInputSlots,
    hasTopLabel,
    getLabel,
    getPlaceholder,
    getAutocompleteAttribute,
    inputOptions,
    inputProps
  }
}
