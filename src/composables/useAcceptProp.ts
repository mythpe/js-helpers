/*
 * MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { computed, MaybeRef, toValue } from 'vue'
import { MAvatarViewerProps, MFileProps, MUploaderProps } from '../components'

type PropsList = MFileProps | MUploaderProps | MAvatarViewerProps;
type Arg = MaybeRef<Partial<PropsList>> | Partial<PropsList>;

export const useAcceptProp = (Props: Arg) => {
  const accepts = computed(() => {
    const props = toValue(Props)
    const l = []
    if (props.accept) {
      l.push(props.accept)
    }
    if (props.images) {
      l.push('image/png,image/jpg,image/jpeg')
    }
    if (props.video) {
      l.push('video/mp4,video/x-m4v,video/*')
    }
    if (props.pdf) {
      l.push('application/pdf')
    }
    if (props.excel) {
      l.push('.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    }
    return l
  })
  return { accepts }
}
