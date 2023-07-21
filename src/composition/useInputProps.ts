/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { computed, ref } from 'vue'
import { useMyth } from '../vue3'

export const useDefaultInputProps = {
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  name: undefined,
  label: undefined,
  placeholder: undefined,
  hidePlaceholder: undefined,
  outlined: undefined,
  filled: undefined,
  standout: undefined,
  borderless: undefined,
  rules: () => ([]),
  required: undefined,
  hideRequired: undefined,
  email: undefined,
  stackLabel: undefined,
  clearable: undefined,
  dense: undefined,
  loading: undefined,
  hideBottomSpace: undefined,
  errors: () => ({})
}
export default function useInputProps (Props: any) {
  const props = ref(Props)
  const { parseAttribute } = useMyth()

  const getRules = computed<string | undefined>(() => {
    let rules = props.value.rules || []
    if (!rules) {
      rules = []
    }

    if (rules && typeof rules === 'string') {
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
      let label = parseAttribute(k) ?? k
      if (label && hasRequired.value && !props.value.hideRequired) {
        label = `${label} *`
      }
      return label
    }
    return undefined
  })
  const getPlaceholder = computed<string | undefined>(() => {
    if (props.value.hidePlaceholder) {
      return props.value.placeholder !== undefined ? parseAttribute(props.value.placeholder) : undefined
    }
    const k = props.value.placeholder === undefined ? props.value.name : props.value.placeholder
    if (k) {
      return parseAttribute(k)
    }
    return undefined
  })
  const inputErrors = computed<string[]>(() => {
    if (!props.value.errors || !props.value.name) return []
    return props.value.errors[props.value.name] ?? []
  })

  return { getRules, hasRequired, getLabel, getPlaceholder, inputErrors }
}
