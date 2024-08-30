/*
 * MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { AxiosRequestConfig } from 'axios'
import { ApiServiceParams } from '../components'
import { ApiInterface, Generic, ResponseDataType } from '../types/m-helpers'

export type UrlType = string | number | any;
export type ParamsType = Record<string, any> | FormData | object
export type ConfigType = AxiosRequestConfig<ApiInterface> & Partial<{
  params: Partial<ApiServiceParams> & Generic
}>
export type HelpersStubSchema = {

  index (config?: ConfigType): Promise<ApiInterface>;

  staticIndex (config?: ConfigType): Promise<ApiInterface>;

  export (data?: ParamsType, config?: AxiosRequestConfig): Promise<ApiInterface>;

  store (data?: ParamsType, config?: AxiosRequestConfig): Promise<ApiInterface>;

  show (id: UrlType, config?: AxiosRequestConfig): Promise<ApiInterface>;

  staticShow (id: UrlType, config?: AxiosRequestConfig): Promise<ApiInterface>;

  update (id: UrlType, data?: ParamsType, config?: AxiosRequestConfig): Promise<ApiInterface>;

  destroy (id: UrlType, config?: AxiosRequestConfig): Promise<ApiInterface>;

  destroyAll (ids?: UrlType[], config?: AxiosRequestConfig): Promise<ApiInterface>;

  getUploadAttachmentsUrl (id: UrlType): string;

  uploadAttachments (id: UrlType, data: Generic, config?: AxiosRequestConfig): Promise<ApiInterface>;

  deleteAttachment (id: UrlType, fileId: string | number, config?: AxiosRequestConfig): Promise<ApiInterface>;

  updateAttachment (id: UrlType, fileId: string | number, data: Record<string, any>, config?: AxiosRequestConfig): Promise<ApiInterface>;
};
export type StubSchemaContext = HelpersStubSchema
  & Record<string, ((...args: any) => Promise<ApiInterface>)>
  & Record<string, Record<string, ((...args: any) => Promise<ApiInterface>)>>
  & Record<string, Record<string, Record<string, ((...args: any) => Promise<ApiInterface>)>>>
export type StubSchema = StubSchemaContext
  & ((...args: any) => Promise<ApiInterface>)
  & string
  & Record<string, StubSchemaContext>
export type MythApiServicesSchema = { [key: string | symbol | number]: StubSchema }
