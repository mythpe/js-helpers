/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { computed, MaybeRef, toValue } from 'vue'
import { useMyth } from '../vue3'
import { MCheckboxProps, MEditorProps, MFileProps, MInputProps, MRadioProps, MSelectProps, MToggleProps } from 'app/src'

type PropsList =
  | MInputProps
  | MCheckboxProps
  | MEditorProps
  | MFileProps
  | MRadioProps
  | MSelectProps
  | MToggleProps

type Args = MaybeRef<PropsList> | Record<string, any>;

export const useInputProps = (Props: Args, Opts: MaybeRef<{ choose?: boolean }> = {}) => {
  const props = toValue(Props)
  const opts = toValue(Opts)
  const { __ } = useMyth()
  const getRules = computed<string | undefined>(() => {
    let rules = props.rules || []

    if (typeof rules === 'string') {
      rules = rules.split('|')
    }

    if (props.required) {
      rules.push('required')
    }
    if ('email' in props && props.email) {
      rules.push('email')
    }
    if ('mobile' in props && props.mobile !== undefined && props.mobile !== null) {
      const defLen = 10
      if (typeof props.mobile === 'boolean') {
        props.mobile && rules.push(`digits:${defLen}`)
      } else {
        const len = props.mobile || defLen
        rules.push(`digits:${len}`)
      }
    }

    return rules.join('|') || undefined
  })
  const hasRequired = computed<boolean>(() => props.required === !0 ? !0 : getRules.value !== undefined && getRules.value?.indexOf('required') >= 0)
  const getLabel = computed<string | undefined>(() => {
    const k = props.label === undefined ? props.name : props.label
    if (k) {
      let label = __(k) || k
      if (label && hasRequired.value && !props.hideRequired && !props.viewMode) {
        label = `${label} *`
      }
      return label
    }
    return props.label
  })
  const getPlaceholder = computed<string | undefined>(() => {
    if ('hidePlaceholder' in props && props.hidePlaceholder) {
      return props.placeholder !== undefined ? (__(props.placeholder) || undefined) : undefined
    }
    const k = props.placeholder === undefined ? (props.label !== undefined ? props.label : props.name) : props.placeholder
    if (k && props.placeholder === undefined) {
      return __(`replace.${opts?.choose ? 'choose' : 'enter'}`, { name: __(k) }) || props.placeholder
    }
    if (k) {
      return __(k) || props.placeholder
    }
    return props.placeholder
  })
  const inputErrors = computed<string[]>(() => {
    if (!props.errors || !props.name) return []
    return props.errors[props.name] || []
  })
  return { getRules, hasRequired, getLabel, getPlaceholder, inputErrors }
}
