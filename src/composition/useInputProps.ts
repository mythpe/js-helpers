/*
 * MyTh Ahmed Faiz Copyright © 2016-2022 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * https://www.4myth.com
 */

import { computed } from 'vue'
import { useMyTh } from '../vue3/MyThVue3'

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
export default function useInputProps (props: any) {
  const { parseAttribute } = useMyTh()

  const getRules = $computed<string | undefined>(() => {
    let rules = props.rules || []
    if (!rules) {
      rules = []
    }

    if (rules && typeof rules === 'string') {
      rules = rules.split('|')
    }

    if (props.required) {
      rules.push('required')
    }
    if (props.email) {
      rules.push('email')
    }

    return rules.join('|') || undefined
  })
  const hasRequired = $computed<boolean>(() => props.required === !0 ? !0 : getRules !== undefined && getRules?.indexOf('required') >= 0)
  const getLabel = $computed<string | undefined>(() => {
    const k = props.label === undefined && props.placeholder === undefined ? props.name : props.label
    if (k) {
      let label = parseAttribute(k) ?? k
      if (label && hasRequired && !props.hideRequired) {
        label = `${label} *`
      }
      return label
    }
    return undefined
  })
  const getPlaceholder = $computed<string | undefined>(() => {
    if (props.hidePlaceholder) {
      return props.placeholder !== undefined ? parseAttribute(props.placeholder) : undefined
    }
    const k = props.placeholder === undefined ? props.name : props.placeholder
    if (k) {
      return parseAttribute(k)
    }
    return undefined
  })
  const inputErrors = computed<string[]>(() => {
    if (!props.name) return []
    return props.errors[props.name] ?? []
  })

  return { getRules, hasRequired, getLabel, getPlaceholder, inputErrors }
}
