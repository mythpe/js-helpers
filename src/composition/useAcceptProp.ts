/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { computed } from 'vue'

export default function useAcceptProp (Props: any) {
  const props = computed(() => Props)
  const accepts: string[] = []
  if (props.value.accept) {
    accepts.push(props.value.accept)
  }
  if (props.value.images) {
    accepts.push('image/png,image/jpg,image/jpeg')
  }
  if (props.value.video) {
    accepts.push('video/mp4,video/x-m4v,video/*')
  }
  if (props.value.pdf) {
    accepts.push('application/pdf')
  }
  if (props.value.excel) {
    accepts.push('.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  }
  return accepts
}
