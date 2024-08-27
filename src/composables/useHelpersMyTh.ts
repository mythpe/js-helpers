/*
 * MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import lodash from 'lodash'
import { computed, MaybeRefOrGetter, toValue } from 'vue'
import { extend, useSplitAttrs } from 'quasar'
import { useI18n } from 'vue-i18n'
import { MythOptionsConfig as MOC } from '../types'
import { useMyth } from '../vue3'

type G = { name: string; } & Record<string, any>;
type OptsContext = { choose?: boolean; };
export const useInputHelper = <P extends G = G> (Props: MaybeRefOrGetter<P>, key: keyof MOC, Opts: MaybeRefOrGetter<OptsContext> = {}) => {
  const { messages, locale } = useI18n({ useScope: 'global' })
  const { __, options } = useMyth()
  const { attributes: attrs } = useSplitAttrs()
  const props = toValue<P>(Props)
  const opts = toValue<OptsContext>(Opts)
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
    const opt = inputOptions.value(key)
    const autocomplete = 'autocomplete' in opt && opt?.autocomplete !== undefined ? opt?.autocomplete : props.autocomplete
    if (autocomplete !== undefined) {
      if (autocomplete === !0 || autocomplete === '') {
        return lodash.kebabCase(props.name)
      } else if (autocomplete === !1) {
        return 'off'
      } else if (autocomplete?.length > 0) {
        return autocomplete
      }
    }
    return undefined
  })
  const accepts = computed(() => {
    const l = []
    if (props.accept) {
      l.push(props.accept)
    }
    if (props.images) {
      l.push('image/png,image/jpg,image/jpeg')
    }
    if (props.svg) {
      l.push('image/svg+xml')
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

  const isNumeric = (str: any) => !isNaN(str) && !isNaN(parseFloat(str))
  const convertRules = (rules: any) => {
    if (!rules) {
      return {}
    }
    let values: Record<string, any> = {}
    const list: any[] = typeof rules === 'string' ? rules.split('|') : (Array.isArray(rules) ? rules : [rules])

    for (const rule of list) {
      // console.log(rule)
      if (!rule) {
        continue
      }
      if (typeof rule === 'object' && !Array.isArray(rule)) {
        values = { ...values, ...rule }
        continue
      }
      if (Array.isArray(rule)) {
        values = { ...values, ...rule }
      }
      const [name, value] = rule.split(':')
      if (!name) {
        continue
      }
      values[name] = !value ? !0
        : /,/g.test(value) ? value.split(',').map((e: any) => isNumeric(e) ? parseInt(e) : e) : (isNumeric(value) ? parseInt(value) : value)
    }
    if (values.color && props.required) {
      values.requiredColor = values.color
      delete values.color
    }
    return values
  }
  const publicRules = ['required', 'email', 'numeric', 'integer', 'float', 'color']
  const validations = (messages.value as any)?.[locale.value]?.validation?.messages || {}
  const getRules = computed<Record<string, any>>(() => {
    if (props.viewMode) {
      return {}
    }
    const rules: any = { ...convertRules(toValue(props.rules)) }
    // const attrs = toValue(opts.attrs) || {}
    const keys = lodash.uniq<string>([...publicRules, ...(options.inputRules ?? []), ...Object.keys(validations)])
    for (const k of keys) {
      if (['mobile', '_default', 'default'].includes(k)) {
        continue
      }
      const cases = [k, lodash.snakeCase(k), lodash.camelCase(k), lodash.kebabCase(k)]

      mainFor: for (const c of cases) {
        for (const b of [attrs.value, props]) {
          if (c in b && (b[c] === !0 || b[c] === '')) {
            rules[lodash.snakeCase(k)] = b[c] === !0 || b[c] === '' ? !0 : b[c]
            break mainFor
          }
        }
      }
    }

    const mobile = attrs.value?.mobile !== undefined ? attrs.value.mobile : props.mobile
    if (mobile !== undefined) {
      const defLen = 10
      rules.digits = typeof mobile === 'boolean' ? defLen : (mobile || defLen)
    }
    return Object.values(rules).filter(e => !!e).length > 0 ? rules : undefined
  })

  return {
    getRules,
    accepts,
    hasTopLabel,
    getLabel,
    getPlaceholder,
    getAutocompleteAttribute,
    inputOptions,
    inputProps
  }
}
