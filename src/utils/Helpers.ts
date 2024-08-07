/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { AxiosInstance, AxiosRequestConfig } from 'axios'
import lodash from 'lodash'
import { scroll } from 'quasar'
import { ConfigType, DownloadFromResponse, DownloadFromResponseCode, HelpersStubSchema, ParamsType, UrlType } from '../types'
import { nextTick } from 'vue'

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
          if (lodash.isArray(value) && value.length < 1) {
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
  Stub (baseUrl: UrlType, axios: () => AxiosInstance): HelpersStubSchema {
    const makeUrl = Helpers.StubUrl(baseUrl)
    const methods: HelpersStubSchema = {
      async index (config?: ConfigType) {
        const u = makeUrl()
        return axios().get(u, config)
        // return typeof config === 'boolean' ? u : axios().get(u, config)
      },
      async staticIndex (config?: ConfigType) {
        const u = `Static${baseUrl ? `/${baseUrl}` : ''}`
        return axios().get(u, config)
        // config = config || {}
        // config.params = {
        //   page: 1,
        //   itemsPerPage: -1,
        //   ...(config.params ?? {})
        // }
        // return axios().get(u, config)
      },
      async export (data?: ParamsType, config?: AxiosRequestConfig) {
        return axios().post(makeUrl('Export'), data, config)
      },
      async store (data?: ParamsType, config?: AxiosRequestConfig) {
        const u = makeUrl()
        // if (typeof data === 'boolean') {
        //   return u
        // }
        const formData = new FormData()
        data && Helpers.appendArray(formData, data)
        return axios().post(u, formData, config)
      },
      async show (id: UrlType, config?: AxiosRequestConfig) {
        const u = makeUrl(id)
        return axios().get(u, config)
        // return typeof id === 'boolean' ? u : axios().get(u, config)
      },
      async staticShow (id: UrlType, config?: AxiosRequestConfig) {
        // const m = baseUrl ? baseUrl.toString().split('/').pop() : ''
        // const u = 'Static' + (m ? `/${m}` : '') + `/${id}`
        const u = `Static${baseUrl ? `/${baseUrl}` : ''}` + `/${id}`
        // if (typeof id === 'boolean') {
        //   return u
        // }
        return axios().get(u, config)
      },
      async update (id: UrlType, data?: ParamsType, config?: AxiosRequestConfig) {
        const u = makeUrl(id)
        // if (typeof id === 'boolean') {
        //   return u
        // }
        const formData = new FormData()
        formData.append('_method', 'put')
        data && Helpers.appendArray(formData, data)
        return axios().post(u, formData, config)
      },
      async destroy (id: UrlType, config?: AxiosRequestConfig) {
        const u = makeUrl(id)
        return axios().delete(u, config)
        // return typeof id === 'boolean' ? u : axios().delete(u, config)
      },
      async destroyAll (ids?: UrlType[], config?: AxiosRequestConfig) {
        const u = makeUrl('DestroyAll')
        return axios().post(u, { ids: (ids || []) }, config)
      },
      getUploadAttachmentsUrl: (id: UrlType) => makeUrl(`${id}/Attachment/Upload`),
      async uploadAttachments (id: UrlType, data: Record<string, any>, config?: AxiosRequestConfig) {
        const _url = makeUrl(`${id}/Attachment/Upload`)
        // if (typeof data === 'boolean') {
        //   return _url
        // }
        return axios().post(_url, data, config)
      },
      async deleteAttachment (id: UrlType, fileId: string | number, config?: AxiosRequestConfig) {
        const _url = makeUrl(`${id}/Attachment/${fileId}/Delete`)
        // if (typeof config === 'boolean') {
        //   return _url
        // }
        return axios().delete(_url, config)
      }
    }
    return methods
  },
  StubUrl: (group?: UrlType): ((segments?: UrlType, parent?: UrlType) => string) => (
    segments?: UrlType,
    parent?: UrlType
  ): string => ((parent ?? '') + (parent && group ? '/' : '')) + (group ?? '') + ((group && segments ? '/' : '') + (segments ?? '')),
  findBy (search: any, value: any, column: string | number = 'id') {
    return lodash.find(search, (e: any) => lodash.isPlainObject(e) ? e[column] === value : e === value)
  },
  // queryStringify: (v: never) => new URLSearchParams(qs.stringify(v, {
  //   arrayFormat: 'indices'
  //   // encodeValuesOnly: true,
  //   // encode: false,
  // })),
  /**
   * Open unique window popup of application
   *
   * @param url
   * @param name
   * @param args
   */
  openWindow (url: string | undefined | null, name = 'AppWindow', ...args: any[]) {
    return url ? window.open(url, name, ...args) : null
  },
  /**
   * Customized helper to download blob from axios response
   * @param response
   * @param callback
   */
  downloadFromResponse (response: any, callback?: ((url: string, response: any) => void)) {
    return new Promise<DownloadFromResponse>((resolve, reject) => {
      const rejectPromise = (e?: {code: DownloadFromResponseCode}) => reject(e ?? { status: !1, code: 'unknown' })
      const resolvePromise = (response: DownloadFromResponse['response']) => resolve({ status: !0, response })
      try {
        if (!response) {
          rejectPromise({ code: 'no_response' })
          return
        }

        if (response?.data?.data?.url) {
          const url = response?.data?.data?.url
          if (callback) {
            callback(url, response)
            resolvePromise(response)
            return
          }
          const elm = document.createElement('a')
          elm.setAttribute('href', url)
          elm.setAttribute('target', '_blank')
          document.body.appendChild(elm)
          elm.click()
          resolvePromise(response)
          return
        }

        const name = (response.headers['content-disposition'] || '').split('filename=').pop().replace(/^"+|"+$/g, '')
        if (!name) {
          rejectPromise({ code: 'no_file_name' })
          return
        }
        const file = new Blob([response.data])
        const fileURL = window.URL.createObjectURL(file)
        const fileLink = document.createElement('a')
        if (!fileLink || !fileURL) {
          rejectPromise({ code: 'no_file_url' })
          return
        }

        fileLink.href = fileURL
        fileLink.setAttribute('download', name)
        document.body.appendChild(fileLink)
        fileLink.click()
        resolvePromise(response)
        setTimeout(() => {
          try {
            document.body.removeChild(fileLink)
            URL.revokeObjectURL(fileURL)
          } catch (e : any) {
            console.log(e)
            if (e?.message) {
              alert(e.message)
            }
          }
        }, 3000)
      } catch (e: any) {
        console.log(e)
        rejectPromise(e)
      }
    })
  },
  async scrollToElement (el: HTMLElement | string, opt?: { target?: HTMLElement, duration?: number; }) {
    await nextTick()
    const { getScrollTarget, setVerticalScrollPosition, getVerticalScrollPosition } = scroll
    const scrollTo = typeof el === 'string' ? document.querySelector(el) as HTMLElement : el
    if (!scrollTo) {
      return
    }
    await nextTick()
    const target = getScrollTarget(opt?.target || window.document.documentElement)
    // let offset = 0
    // try {
    //   let parent = scrollTo
    //   do {
    //     // console.log(parent.getBoundingClientRect().top)
    //     offset += parent?.offsetTop || 0
    //     parent = parent.offsetParent as HTMLElement
    //   } while (parent?.offsetParent)
    // } catch (e) {
    //   offset = scrollTo?.offsetTop || 0
    // }
    // offset = scrollTo.getBoundingClientRect().top
    const current = getVerticalScrollPosition(target)
    // const offset = scrollTo.getBoundingClientRect().top
    const duration = opt?.duration || 1000

    let offset = 0
    try {
      let parent = scrollTo
      do {
        // console.log(parent.getBoundingClientRect().top)
        offset = parent.getBoundingClientRect().top
        if (offset === 0 && !parent.parentElement) {
          offset = parent.scrollTop
          break
        } else if (offset !== 0 && parent.parentElement) {
          break
        }
        parent = parent.parentElement as HTMLElement
      } while (parent)
    } catch (e) {
      offset = scrollTo?.offsetTop || 0
    }
    // const position = offset
    // if (offset > current) {
    //   position = (current - offset) + current
    // } else if (offset < current) {
    //   position = current + offset
    // }
    // console.log({
    //   target,
    //   scrollTo,
    //   position,
    //   offset,
    //   current
    // })
    setVerticalScrollPosition(target, (offset + current) - 100, duration)
  },
  async scrollToElementFromErrors (errors?: Record<number, string[]>, elm?: any) {
    if (!errors) {
      return
    }
    const list = Object.values(errors).filter(e => !!e && e?.length > 0)
    if (list.length > 0) {
      const k = Object.keys(errors)[0]
      // console.log(elm || `[name='${k}']`)
      await this.scrollToElement(elm || `[name='${k}']`)
    }
  },
  makeUrl (path: string) {
    path = path || ''
    if (path.slice(0, 1) === '/') {
      path = path.slice(1)
    }
    if (window) {
      const l = window.location
      return `${l.protocol}//${l.host}/${path}`
    }
    return `//${path}`
  }
}

export default {}
