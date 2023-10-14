/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { computed } from 'vue'
import { useMyth } from '../vue3'

export default function useInputProps (Props: any) {
  const props = computed(() => Props)
  const { __ } = useMyth()
  const getRules = computed<string | undefined>(() => {
    let rules = props.value?.rules || []

    if (typeof rules === 'string') {
      rules = rules.split('|')
    }

    if (props.value.required) {
      rules.push('required')
    }
    if (props.value.email) {
      rules.push('email')
    }

    return rules.join('|') || undefined
  })
  const hasRequired = computed<boolean>(() => props.value.required === !0 ? !0 : getRules.value !== undefined && getRules.value?.indexOf('required') >= 0)
  const getLabel = computed<string | undefined>(() => {
    const k = props.value.label === undefined && props.value.placeholder === undefined ? props.value.name : props.value.label
    if (k) {
      let label = __(k) || k
      if (label && hasRequired.value && !props.value.hideRequired) {
        label = `${label} *`
      }
      return label
    }
    return undefined
  })
  const getPlaceholder = computed<string | undefined | null>(() => {
    if (props.value.hidePlaceholder) {
      return props.value.placeholder !== undefined ? __(props.value.placeholder) : undefined
    }
    const k = props.value.placeholder === undefined ? props.value.name : props.value.placeholder
    if (k) {
      return __(k)
    }
    return undefined
  })
  const inputErrors = computed<string[]>(() => {
    if (!props.value.errors || !props.value.name) return []
    return props.value.errors[props.value.name] || []
  })

  return { getRules, hasRequired, getLabel, getPlaceholder, inputErrors }
}
