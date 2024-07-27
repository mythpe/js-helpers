/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { QInfiniteScroll } from 'quasar'
import { MaybeRefOrGetter, Ref, UnwrapNestedRefs } from 'vue'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ApiErrorResponse, ApiInterface } from 'src/types'

export type UseModelsOptionsArg<T extends ApiInterface = ApiInterface> = {
  lazy?: boolean;
  isPanel?: MaybeRefOrGetter<boolean>;
  method?: MaybeRefOrGetter<string>;
  timeout?: number;
  qInfiniteScroll?: Ref<QInfiniteScroll | undefined>;
  onSuccess?: (data: AxiosResponse<T>) => void;
  onError?: (e: ApiErrorResponse) => void;
  config?: MaybeRefOrGetter<AxiosRequestConfig>
}
export type UseModelsOptions<T> = UnwrapNestedRefs<UseModelsOptionsArg<T>> | Ref<UseModelsOptionsArg<T>> | UseModelsOptionsArg<T>
