/*
 * MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * https://www.4myth.com
 */

export default function useAcceptProp (props: any) {
  const accepts: string[] = []
  if (props.accept) {
    accepts.push(props.accept)
  }
  if (props.images) {
    accepts.push('image/png,image/jpg,image/jpeg')
  }
  if (props.video) {
    accepts.push('video/mp4,video/x-m4v,video/*')
  }
  if (props.pdf) {
    accepts.push('application/pdf')
  }
  if (props.excel) {
    accepts.push('.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  }
  return accepts
}
