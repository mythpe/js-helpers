/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { QInfiniteScroll } from 'quasar'
import { Ref, UnwrapNestedRefs } from 'vue'

export type UseModelsOptionsArg = {
  lazy?: boolean;
  isPanel?: boolean;
  method?: string;
  timeout?: number | undefined;
  qInfiniteScroll?: Ref<QInfiniteScroll | undefined>;
  onSuccess?: (data: any) => void;
}
export type UseModelsOptions = UnwrapNestedRefs<UseModelsOptionsArg> | Ref<UseModelsOptionsArg> | UseModelsOptionsArg
