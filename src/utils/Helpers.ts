/*
 * MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * https://www.4myth.com
 */

import { AxiosInstance, AxiosRequestConfig } from 'axios'
import _ from 'lodash'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
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
      index (config?: ConfigType | boolean) {
        const u = makeUrl()
        return typeof config === 'boolean' ? u : axios().get(u, config)
      },
      export (data?: ParamsType, config?: AxiosRequestConfig) {
        const u = makeUrl('Export')
        return typeof data === 'boolean' ? u : axios().post(u, data, config)
      },
      store (data?: ParamsType, config?: AxiosRequestConfig) {
        const u = makeUrl()
        if (typeof data === 'boolean') {
          return u
        }
        const formData = new FormData()
        data && Helpers.appendArray(formData, data)
        return axios().post(u, formData, config)
      },
      show (id: UrlType, config?: AxiosRequestConfig) {
        const u = makeUrl(id)
        return typeof id === 'boolean' ? u : axios().get(u, config)
      },
      update (id: UrlType, data?: ParamsType, config?: AxiosRequestConfig) {
        const u = makeUrl(id)
        if (typeof id === 'boolean') {
          return u
        }
        const formData = new FormData()
        formData.append('_method', 'put')
        data && Helpers.appendArray(formData, data)
        return axios().post(u, formData, config)
      },
      destroy (id: UrlType, config?: AxiosRequestConfig) {
        const u = makeUrl(id)
        return typeof id === 'boolean' ? u : axios().delete(u, config)
      },
      destroyAll (ids?: UrlType[] | boolean, config?: AxiosRequestConfig) {
        const u = makeUrl('DestroyAll')
        return typeof ids === 'boolean' ? u : axios().post(u, { ids: (ids ?? {}) }, config)
      },
      utilities (config?: ConfigType | boolean) {
        if (typeof config !== 'boolean') {
          config = config || {}
          config.params = {
            ...(config.params ?? {}),
            itemsPerPage: config.params?.itemsPerPage ?? -1
          }
        }
        return methods.index(config)
      },
      staticUtilities (config?: ConfigType | boolean) {
        const m = baseUrl ? baseUrl.toString().split('/').pop() : ''
        const u = 'Static' + (m ? `/${m}` : '')
        if (typeof config === 'boolean') {
          return u
        }
        config = config || {}
        config.params = {
          ...(config.params ?? {}),
          itemsPerPage: config.params?.itemsPerPage ?? -1
        }
        return axios().get(u, config)
      },
      uploadAttachments (id: UrlType, data: Record<string, any> | boolean, config?: AxiosRequestConfig) {
        const _url = makeUrl(`${id}/Attachment/Upload`)
        if (typeof data === 'boolean') {
          return _url
        }
        return axios().post(_url, data, config)
      },
      deleteAttachment (id: UrlType, fileId: string | number, config?: AxiosRequestConfig | boolean) {
        const _url = makeUrl(`${id}/Attachment/${fileId}/Delete`)
        if (typeof config === 'boolean') {
          return _url
        }
        return axios().delete(_url, config)
      }
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
