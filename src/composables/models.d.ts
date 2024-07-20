/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { QInfiniteScroll } from 'quasar'
import { MaybeRefOrGetter, Ref, UnwrapNestedRefs } from 'vue'
import { AxiosRequestConfig } from 'axios'

export type UseModelsOptionsArg = {
  lazy?: boolean;
  isPanel?: MaybeRefOrGetter<boolean>;
  method?: MaybeRefOrGetter<string>;
  timeout?: number;
  qInfiniteScroll?: Ref<QInfiniteScroll | undefined>;
  onSuccess?: (data: any) => void;
  onError?: (e: any) => void;
  config?: MaybeRefOrGetter<AxiosRequestConfig>
}
// export type UseModelOptions = {
//   lazy?: boolean;
//   isPanel?: MaybeRefOrGetter<boolean>;
//   method?: MaybeRefOrGetter<string>;
//   timeout?: number;
//   qInfiniteScroll?: Ref<QInfiniteScroll | undefined>;
//   onSuccess?: (data: any) => void;
//   onError?: (e: any) => void;
//   config?: MaybeRefOrGetter<AxiosRequestConfig>
// }
export type UseModelsOptions = UnwrapNestedRefs<UseModelsOptionsArg> | Ref<UseModelsOptionsArg> | UseModelsOptionsArg
