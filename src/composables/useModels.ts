/*
 * MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { computed, ComputedRef, MaybeRefOrGetter, nextTick, onMounted, onUnmounted, ref, toValue, watch } from 'vue'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useMyth } from '../vue3'
import { ApiFulfilledResponse, ApiInterface, ApiMetaInterface, ApiModel, ConfigType, UseModelsOptionsArg } from '../types'
import { extend } from 'quasar'

const itemsPerPage = 1
const defMeta = {
  per_page: 0,
  total: 0,
  current_page: 0,
  last_page: 0
}
type Item = ApiModel & object

export function useModels<T extends Partial<Item> = Item> (Name: MaybeRefOrGetter<string>, opts: MaybeRefOrGetter<UseModelsOptionsArg> = {}, axiosRequestConfig: MaybeRefOrGetter<AxiosRequestConfig> = {}) {
  const name = toValue(Name)
  const options = toValue<UseModelsOptionsArg>(opts)
  const { search, filter } = options
  const meta = ref<ApiMetaInterface>({ ...defMeta })
  const requestConfig = computed<AxiosRequestConfig>(() => extend(!0, { itemsPerPage, page: meta.value.current_page }, toValue(axiosRequestConfig), {
    params: {
      search: search?.value || undefined,
      filter: filter?.value || undefined
    }
  }))
  const models = ref<T[]>([])
  const fetching = ref(!1)
  const fetched = ref(!1)
  const page = computed({
    get: () => meta.value.current_page,
    set: (v) => {
      meta.value.current_page = v
    }
  })
  const canLoadMore = computed(() => {
    if (!fetched.value) {
      return !0
    }

    return (meta.value.current_page || 0) < (meta.value.last_page || 0)
  })
  const myth = useMyth()

  const fetch = (config: AxiosRequestConfig = {}) => new Promise<Record<string, any>>((resolve, reject) => {
    if (fetching.value || !canLoadMore.value) {
      resolve({})
      return
    }
    fetching.value = !0
    const def = {}
    extend(!0, def, requestConfig.value, config)
    let action: ((config?: ConfigType | undefined) => Promise<ApiInterface>)
    if (options?.method) {
      if (typeof options.method === 'function') {
        action = options.method
      } else {
        action = myth.services[name][options.method]
      }
    } else {
      action = myth.services[name][options?.isPanel ? 'index' : 'staticIndex']
    }

    return action(def)
      .then((res: ApiInterface) => {
        const { _data, _meta } = res
        models.value = [
          ...models.value,
          ...(_data || []) as any
        ]
        meta.value = _meta || { ...defMeta }
        resolve(res)
        options?.onSuccess?.(res)
        return res
      })
      .catch((e: any) => {
        reject(e)
        options?.onError?.(e)
        return e
      })
      .finally(() => {
        if (fetching.value) {
          fetching.value = !1
        }
        if (!fetched.value) {
          fetched.value = !0
        }
      })
  })
  const reset = () => {
    models.value = []
    meta.value = { ...defMeta }
    if (fetched.value) {
      fetched.value = !1
    }
  }
  const nextPage = (config: AxiosRequestConfig = {}) => {
    if (!canLoadMore.value) {
      return new Promise(resolve => resolve({}))
    }
    if (!page.value) {
      page.value = 1
    } else {
      ++page.value
    }
    return fetch(config)
  }
  const prevPage = (config: AxiosRequestConfig = {}) => {
    if ((meta.value.current_page || 0) < 1) {
      return new Promise(resolve => resolve({}))
    }
    if (!page.value) {
      page.value = 1
    } else {
      --page.value
    }
    return fetch(config)
  }
  const beginningFetch = (config: AxiosRequestConfig = {}) => {
    reset()
    if (options.qInfiniteScroll?.value) {
      return new Promise(resolve => {
        options.qInfiniteScroll?.value?.reset()
        nextTick(() => {
          options.qInfiniteScroll?.value?.trigger()
        })
        resolve({})
      })
    }
    return nextPage(config)
  }
  const onRefresh = (done?: (() => void)) => beginningFetch().finally(() => done?.())
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
  const watchers = []
  if (filter) {
    watchers.push(filter)
  }
  if (search) {
    watchers.push(search)
  }
  const stopWatch = watch(watchers, () => onSearch(), { deep: !0 })
  onUnmounted(() => stopWatch?.())
  onMounted(() => !options.lazy && nextPage())
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

type ItemModel<T extends object = any> = ApiModel<T>;

export function useModel<T extends Partial<ItemModel<T>> = ItemModel> (Name: string, Id: MaybeRefOrGetter<string | number> | ComputedRef<string | number>, Options: MaybeRefOrGetter<UseModelsOptionsArg> = {}, axiosRequestConfig: MaybeRefOrGetter<AxiosRequestConfig> = {}) {
  const api = useMyth()
  const model = ref<T>({} as T)
  const fetching = ref(!0)
  const fetched = ref(!1)
  const name = toValue(Name)
  const id = toValue(Id)
  const options = toValue<UseModelsOptionsArg>(Options)
  const fetch = (config: AxiosRequestConfig = {}) => new Promise<AxiosResponse<T> | ApiFulfilledResponse>((resolve, reject) => {
    if ((fetching.value && fetched.value) || !id) {
      resolve({} as any)
      return
    }
    if (!fetching.value) {
      fetching.value = !0
    }
    const _config = extend<AxiosRequestConfig>(!0, {}, config, toValue(axiosRequestConfig))
    let action: ((id: any, config?: ConfigType | undefined) => Promise<ApiInterface>)
    if (options?.method) {
      if (typeof options.method === 'function') {
        action = options.method
      } else {
        action = api.services[name][options.method]
      }
    } else {
      action = api.services[name][options?.isPanel ? 'show' : 'staticShow']
    }
    return action(id, _config)
      .then((r: any) => {
        const { _data } = r
        model.value = (_data as any)
        resolve(r)
        options?.onSuccess?.(r as any)
        return r
      })
      .catch(e => {
        options?.onError?.(e)
        reject(e)
        return e
      })
      .finally(() => {
        if (!fetched.value) {
          fetched.value = !0
        }
        setTimeout(() => {
          if (fetching.value) {
            fetching.value = !1
          }
        }, options?.timeout !== undefined ? options?.timeout : 100)
      })
  })
  !options?.lazy && onMounted(() => fetch())
  const { search, filter } = options
  const watchers: any[] = [() => toValue(Name), () => toValue(Id), () => toValue(axiosRequestConfig)]
  if (filter) {
    watchers.push(filter)
  }
  if (search) {
    watchers.push(search)
  }
  const stopWatch = watch(watchers, () => fetch(), { deep: !0 })
  onUnmounted(() => stopWatch())
  return { model, fetching, fetch, fetched }
}
