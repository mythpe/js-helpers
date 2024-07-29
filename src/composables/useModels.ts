/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { computed, MaybeRefOrGetter, nextTick, onMounted, onUnmounted, reactive, Ref, ref, toRefs, toValue, watch } from 'vue'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useMyth } from '../vue3'
import { ApiMetaInterface, ApiModel, UseModelsOptions as Options } from '../types'

const itemsPerPage = 50
type Item = ApiModel & object

export function useModels<T extends Partial<Item> = Item> (n: MaybeRefOrGetter<string>, options?: Options<T>, search?: string | Ref<string>, filter?: Record<string, any>, config?: AxiosRequestConfig | undefined) {
  const { name, options: opts, params, axiosConfig } = toRefs(reactive({
    name: toValue(n),
    options: toValue(options),
    params: computed(() => ({ search: toValue(search), filter: toValue(filter) })),
    axiosConfig: computed(() => toValue(config))
  }))
  // const opts = reactive<UseModelsOptionsArg | Record<string, any>>(options || {})
  // const params = reactive({ search, filter })
  // const axiosConfig = reactive<AxiosRequestConfig>(config || {})
  const models = ref<T[]>([])
  const defMeta = {
    per_page: 0,
    total: 0,
    current_page: 0,
    last_page: 0
  }
  const meta = ref<ApiMetaInterface>({ ...defMeta })
  const fetching = ref(!1)
  const fetched = ref(!1)
  const perPage = ref(axiosConfig.value?.params?.itemsPerPage || itemsPerPage)
  const page = ref(axiosConfig.value?.params?.page || 0)
  const canLoadMore = computed(() => {
    if (!fetched.value) {
      return !0
    }

    return (meta.value.current_page || 0) < (meta.value.last_page || 0)
  })
  const myth = useMyth()

  const fetch = (extraConfig: AxiosRequestConfig = {}) => new Promise<Record<string, any>>((resolve, reject) => {
    if (fetching.value || !canLoadMore.value) {
      resolve({})
      return
    }
    fetching.value = !0
    const config = {
      ...(axiosConfig),
      ...(extraConfig),
      params: {
        ...(axiosConfig.value?.params || {}),
        ...(extraConfig?.params || {}),
        itemsPerPage: perPage.value,
        page: page.value,
        search: params.value.search,
        filter: params.value.filter
      }
    }
    const f: any = opts.value?.method ? myth.services[name.value][toValue(opts.value.method)] : (opts.value?.isPanel ? myth.services[name.value].index : myth.services[name.value].staticIndex)
    return f(config)
      .then((res: any) => {
        const { _data, _meta } = res
        models.value.push(...(_data || []) as any)
        meta.value = _meta || { ...defMeta }
        page.value = _meta?.current_page ?? 0
        resolve(res)
        if (opts.value?.onSuccess) {
          opts.value?.onSuccess(res)
        }
      })
      .catch((e: any) => reject(e))
      .finally(() => {
        fetching.value = !1
        if (!fetched.value) {
          fetched.value = !0
        }
      })
  })
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
    if (opts.value?.qInfiniteScroll) {
      return new Promise(resolve => {
        opts.value?.qInfiniteScroll?.reset()
        nextTick(() => {
          opts.value?.qInfiniteScroll?.trigger()
        })
        resolve({})
      })
    }
    return nextPage(config)
  }
  try {
    onMounted(() => {
      !opts.value?.lazy && nextPage()
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
  const un = watch(() => params.value.search, () => onSearch())
  onUnmounted(() => {
    if (un) {
      un()
    }
  })
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

type ItemModel = ApiModel | object

export function useModel<T extends Partial<ItemModel> = ItemModel> (name: string, id: any, opts: Options<T> = {}) {
  const api = useMyth()
  const model = ref<T>({} as T)
  const fetching = ref(!0)
  const fetched = ref(!1)
  const args = reactive({ id, model, name, opts })
  const fetch = () => new Promise<AxiosResponse<T>>((resolve, reject) => {
    if ((fetching.value && fetched.value) || !args.id) {
      resolve({} as any)
      return
    }
    if (!fetching.value) {
      fetching.value = !0
    }
    const m = args.opts?.method ? api.services[args.name][toValue(args.opts.method)] : api.services[args.name][!args.opts?.isPanel ? 'staticShow' : 'show']
    return m(args.id, toValue(args.opts?.config))
      .then((r) => {
        const { _data } = r
        model.value = (_data as any)
        resolve(r)
        if (args.opts?.onSuccess) {
          args.opts?.onSuccess(r)
        }
        return r
      })
      .catch(e => {
        args.opts?.onError?.(e)
        reject(e)
      })
      .finally(() => {
        if (!fetched.value) {
          fetched.value = !0
        }
        setTimeout(() => {
          if (fetching.value) {
            fetching.value = !1
          }
        }, args.opts?.timeout !== undefined ? args.opts?.timeout : 100)
      })
  })
  !args.opts?.lazy && onMounted(() => {
    fetch()
  })
  // !args.opts?.lazy && watchEffect(() => args.id && fetch())
  const un = watch([() => args.name, () => args.id, () => args.opts.config], () => {
    fetch()
  }, { deep: !0 })
  onUnmounted(() => {
    un?.()
  })
  return { model, fetching, fetch, fetched }
}
