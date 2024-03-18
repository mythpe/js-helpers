/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { computed, ComputedRef, Ref } from 'vue'
import { useMyth } from '../vue3'

type Generic = Record<string, any>
type Args = Ref<Generic> | ComputedRef<Generic> | any
export default function useInputProps (Props: Args) {
  const props = computed<Generic>(() => Props)
  const { __ } = useMyth()

  const getRules = computed<string | undefined>(() => {
    let rules = props.value.rules || []

    if (typeof rules === 'string') {
      rules = rules.split('|')
    }

    if (props.value.required) {
      rules.push('required')
    }
    if (props.value.email) {
      rules.push('email')
    }
    if (props.value.mobile !== undefined && props.value.mobile !== null) {
      const defLen = 10
      const len = (props.value.mobile === !0 || props.value.mobile?.length === 0) ? defLen : (props.value.mobile.split(':')[1] || defLen)
      rules.push(`digits:${len}`)
      // rules.push('mobile')
    }

    return rules.join('|') || undefined
  })
  const hasRequired = computed<boolean>(() => props.value.required === !0 ? !0 : getRules.value !== undefined && getRules.value?.indexOf('required') >= 0)
  const getLabel = computed<string | undefined>(() => {
    const k = props.value.label === undefined ? props.value.name : props.value.label
    if (k) {
      let label = __(k) || k
      if (label && hasRequired.value && !props.value.hideRequired) {
        label = `${label} *`
      }
      return label
    }
    return undefined
  })
  const getPlaceholder = computed<string | undefined>(() => {
    if (props.value.hidePlaceholder) {
      return props.value.placeholder !== undefined ? (__(props.value.placeholder) || undefined) : undefined
    }
    // if (props.value.placeholder === undefined && props.value.stackLabel) {
    //   return undefined
    // }
    const k = props.value.placeholder === undefined ? props.value.name : props.value.placeholder
    if (k && props.value.placeholder === undefined) {
      return __('replace.enter', { name: __(k) }) || undefined
    }
    if (k) {
      return __(k) || undefined
    }
    return undefined
  })
  const inputErrors = computed<string[]>(() => {
    if (!props.value.errors || !props.value.name) return []
    return props.value.errors[props.value.name] || []
  })
  return { getRules, hasRequired, getLabel, getPlaceholder, inputErrors }
}
