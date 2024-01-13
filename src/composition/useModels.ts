/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { computed, onMounted, reactive, Ref, ref, watch } from 'vue'
import { AxiosRequestConfig } from 'axios'
import { useMyth } from '../vue3'
import { AppApiResponse, AxiosDataRow, AxiosMetaResponse, UseModelsOptions as Options } from '../types'

const itemsPerPage = 50
type Item = AxiosDataRow & object

export function useModels<T extends Partial<Item> = Item> (name: string, options?: Options, search?: string | Ref<string>, filter?: Record<string, any>, config?: AxiosRequestConfig | undefined) {
  const opts = reactive<Options | Record<string, any>>(options || {})
  const params = reactive({ search, filter })
  const axiosConfig = reactive<AxiosRequestConfig>(config || {})
  const models = ref<(Item | T)[]>([])
  const defMeta = {
    per_page: 0,
    total: 0,
    current_page: 0,
    last_page: 0
  }
  const meta = ref<AxiosMetaResponse>({ ...defMeta })
  const fetching = ref(!1)
  const fetched = ref(!1)
  const perPage = ref(axiosConfig?.params?.itemsPerPage || itemsPerPage)
  const page = ref(axiosConfig?.params?.page || 0)
  const canLoadMore = computed(() => {
    if (!fetched.value) {
      return !0
    }

    return (meta.value.current_page || 0) < (meta.value.last_page || 0)
  })
  const myth = useMyth()
  const fetch = (extraConfig: AxiosRequestConfig = {}) => {
    return new Promise<Record<string, any>>((resolve, reject) => {
      if (fetching.value || !canLoadMore.value) {
        resolve({})
        return
      }
      fetching.value = !0
      const config = {
        ...(axiosConfig),
        ...(extraConfig),
        params: {
          ...(axiosConfig?.params || {}),
          ...(extraConfig?.params || {}),
          itemsPerPage: perPage.value,
          page: page.value,
          search: params.search,
          filter: params.filter
        }
      }
      const f = opts?.method ? myth.services[name][opts.method] : (opts?.isPanel ? myth.services[name].index : myth.services[name].staticIndex)
      return f(config)
        .then((res) => {
          const { _data, _meta } = res
          models.value.push(...(_data || []))
          meta.value = _meta || { ...defMeta }
          page.value = _meta?.current_page ?? 0
          resolve(res)
        })
        .catch((e: any) => reject(e))
        .finally(() => {
          fetching.value = !1
          if (!fetched.value) {
            fetched.value = !0
          }
        })
    })
  }
  const reset = () => {
    models.value = []
    fetched.value = !1
    meta.value = { ...defMeta }
    page.value = 0
  }
  const nextPage = (config: AxiosRequestConfig = {}) => {
    if (!canLoadMore.value) {
      return new Promise(resolve => resolve({}))
    }
    ++page.value
    return fetch(config)
  }
  const prevPage = (config: AxiosRequestConfig = {}) => {
    if ((meta.value.current_page || 0) < 1) {
      return new Promise(resolve => resolve({}))
    }
    --page.value
    return fetch(config)
  }
  const beginningFetch = (config: AxiosRequestConfig = {}) => {
    reset()
    return nextPage(config)
  }
  try {
    onMounted(() => {
      !opts?.lazy && nextPage()
    })
  } catch (e) {
    console.log(e)
  }
  const onRefresh = (done: (() => void)) => beginningFetch().finally(() => done())
  const onLoad = (index: any, done: any) => {
    return new Promise<{ index: number }>(resolve => {
      if (!canLoadMore.value) {
        done()
        resolve({ index })
        return
      }
      nextPage().finally(() => {
        done()
        resolve({ index })
      })
    })
  }
  const onSearch = () => beginningFetch()
  const removeItem = (item: Item) => {
    models.value = models.value.filter(e => e.value !== item.value)
  }
  watch(() => params.search, () => onSearch())

  return {
    models,
    meta,
    fetch,
    beginningFetch,
    fetching,
    fetched,
    canLoadMore,
    reset,
    nextPage,
    prevPage,
    onRefresh,
    onSearch,
    onLoad,
    removeItem
  }
}

export function useModel<T extends Partial<Item> = Item> (name: string, id: any, opts?: Options, config?: AxiosRequestConfig | undefined) {
  const api = useMyth()
  const model = ref<T & any>({})
  const fetching = ref(!1)
  const fetched = ref(!1)
  const args = reactive({ id, model, name, opts, config })
  const fetch = () => {
    return new Promise<AppApiResponse | any>((resolve, reject) => {
      if (fetching.value) {
        resolve({})
        return
      }
      fetching.value = !0
      const m = opts?.method ? api.services[args.name][opts.method] : api.services[args.name][!args.opts?.isPanel ? 'staticShow' : 'show']
      return m(args.id, args.config)
        .then((r) => {
          const { _data } = r
          model.value = _data
          resolve(r)
          return r
        })
        .catch(e => {
          reject(e)
        })
        .finally(() => {
          if (!fetched.value) {
            fetched.value = !0
          }
          setTimeout(() => {
            fetching.value = !1
          }, args.opts?.timeout !== undefined ? args.opts?.timeout : 100)
        })
    })
  }
  !args.opts?.lazy && onMounted(() => {
    args.id && fetch()
  })
  return { model, fetching, fetch, fetched }
}
