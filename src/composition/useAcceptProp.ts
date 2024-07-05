/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { MaybeRef, onUnmounted, ref, toValue } from 'vue'
import { MFileProps } from 'app/src'

export default function useAcceptProp (Props: MaybeRef<Partial<MFileProps>>) {
  const props = toValue(Props)
  const accepts = ref<string[]>([])
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
  onUnmounted(() => {
    accepts.value = []
  })
  return accepts
}
