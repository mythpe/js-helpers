/*
 * MyTh Ahmed Faiz Copyright © 2016-2022 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * https://www.4myth.com
 */

import { AxiosInstance, AxiosRequestConfig } from 'axios'
import _ from 'lodash'
import qs from 'qs'
import { ConfigType, ParamsType, StubSchema, UrlType } from '../types'

export const Helpers = {
  appendArray (formData: FormData, values: File | Blob | Record<string, any> | any, name?: string | null | undefined) {
    let value: never | any
    if ((values instanceof File || values instanceof Blob) && name) {
      const _name = values instanceof File ? values.name : name
      formData.append(name, values, _name)
    } else {
      for (const key in values) {
        value = values[key]
        if (value !== null && value !== undefined && typeof value === 'object') {
          const k = name ? name + '[' + key + ']' : key
          if (_.isArray(value) && value.length < 1) {
            formData.append(`${key}`, '')
          } else {
            this.appendArray(formData, value, k)
          }
        } else {
          if (value === !0) {
            value = 1
          }
          if (value === false) {
            value = 0
          }
          if (value === null || value === undefined) {
            value = ''
            // console.log('null----', name,key, value)
          }
          // if (value !== undefined) {
          if (name) {
            formData.append(name + '[' + key + ']', value)
          } else {
            formData.append(key, value)
          }
          // }
        }
      }
    }
    return formData
  },
  Stub (baseUrl: UrlType, axios: () => AxiosInstance): StubSchema {
    const makeUrl = Helpers.StubUrl(baseUrl)
    const methods: StubSchema = {
      index (params?: ParamsType, config?: ConfigType) {
        const u = makeUrl()
        if (params === !0) {
          return u
        }
        params = params ?? {}
        config = config ?? {}

        return axios().get(u, {
          ...config,
          params: { ...(config.params ?? {}), ...params }
        })
      },
      export (data?: ParamsType, config?: AxiosRequestConfig) {
        const u = makeUrl('Export')
        if (data === !0) {
          return u
        }
        return axios().post(u, data, config)
      },
      store (data?: ParamsType, config?: AxiosRequestConfig) {
        const u = makeUrl()
        if (data === !0) {
          return u
        }
        const formData = new FormData()
        data && Helpers.appendArray(formData, data)
        return axios().post(u, formData, config)
      },
      show (id: UrlType, config?: AxiosRequestConfig) {
        const u = makeUrl(id)
        return id === !0 ? u : axios().get(u, config)
      },
      update (id: UrlType, data?: ParamsType, config?: AxiosRequestConfig) {
        const u = makeUrl(id)
        if (id === !0) {
          return u
        }
        const formData = new FormData()
        formData.append('_method', 'put')
        data && Helpers.appendArray(formData, data)
        return axios().post(u, formData, config)
      },
      destroy (id: UrlType, config?: AxiosRequestConfig) {
        const u = makeUrl(id)
        return id === !0 ? u : axios().delete(u, config)
      },
      destroyAll (ids?: UrlType[] | boolean, config?: AxiosRequestConfig) {
        const u = makeUrl('DestroyAll')
        return ids === !0 ? u : axios().post(u, { ids: (ids ?? {}) }, config)
      },
      utilities (params?: Record<string, any>, config?: AxiosRequestConfig) {
        params = params ?? {}
        params.itemsPerPage = -1
        return methods.index(params, config)
      },
      staticUtilities (params?: Record<string, any> | boolean, config?: AxiosRequestConfig) {
        const m = baseUrl ? baseUrl.toString().split('/').pop() : ''
        const url = 'Static' + (m ? `/${m}` : '')
        if (params === !0) {
          return url
        }
        config = config ?? {}
        params = params ?? {}
        params = {
          ...params,
          itemsPerPage: -1
        }
        config.params = { ...(config.params ?? {}), ...params }

        return axios().get(url, config)
      },
      uploadAttachments: (id: UrlType, data = {}, config = {}) => axios().post(makeUrl(`${id}/Attachment/Upload`), data, config),
      deleteAttachment: (id: UrlType, fileId: string | number) => axios().delete(makeUrl(`${id}/Attachment/${fileId}/Delete`))
    }
    return methods
  },
  StubUrl: (group?: UrlType): ((segments?: UrlType, parent?: UrlType) => string) => (segments?: UrlType, parent?: UrlType): string => ((parent ?? '') + (parent && group ? '/' : '')) + (group ?? '') + ((group && segments ? '/' : '') + (segments ?? '')),
  findBy (search: any, value: any, column: string | number = 'id') {
    return _.find(search, (e: any) => _.isPlainObject(e) ? e[column] === value : e === value)
  },
  queryStringify: (v: never) => new URLSearchParams(qs.stringify(v, {
    arrayFormat: 'indices'
    // encodeValuesOnly: true,
    // encode: false,
  }))
}