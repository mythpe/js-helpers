/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { MaybeRef, onUnmounted, ref, toRefs, toValue, watchEffect } from 'vue'
import { MAvatarViewerProps, MFileProps, MUploaderProps } from 'app/src'

type PropsList = MFileProps | MUploaderProps | MAvatarViewerProps;
type Arg = MaybeRef<Partial<PropsList>> | Partial<PropsList>;

export function useAcceptProp (Props: Arg) {
  const accepts = ref<string[]>([])
  const updateAccepts = (remove?: boolean) => {
    const props = toValue(Props)
    accepts.value = []
    if (remove) {
      return
    }
    if (props.accept) {
      accepts.value.push(props.accept)
    }
    if (props.images) {
      accepts.value.push('image/png,image/jpg,image/jpeg')
    }
    if (props.video) {
      accepts.value.push('video/mp4,video/x-m4v,video/*')
    }
    if (props.pdf) {
      accepts.value.push('application/pdf')
    }
    if (props.excel) {
      accepts.value.push('.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    }
  }
  onUnmounted(() => {
    updateAccepts(!0)
  })
  watchEffect(() => updateAccepts())
  return toRefs({ accepts })
}
