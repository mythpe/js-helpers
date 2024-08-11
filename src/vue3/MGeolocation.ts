/*
 * MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import axios from 'axios'
import { onMounted, onUnmounted, ref } from 'vue'
import { CoordsProps } from '../types'
import { useMyth } from './InstallPlugin'

const getStreetAddress = async (lat: number, long: number) => {
  const options = useMyth().options || {}
  try {
    const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${options.google?.apiKey}`)
    if (data.error_message) {
      // console.log(data.error_message)
    } else if (data?.results?.length > 0) {
      // return data.results[0].formatted_address
      return data.results
    }
  } catch (error: any) {
    console.log(error.message)
  }
  return []
}

export function useGeolocation () {
  const coords = ref<CoordsProps>({
    latitude: 24.5524457,
    longitude: 46.62481
  })

  const isSupported = typeof window !== 'undefined' && 'navigator' in window && 'useGeolocation' in navigator

  let watcher: number | undefined
  onMounted(() => {
    if (isSupported) {
      watcher = navigator.geolocation.watchPosition(
        position => (coords.value = position.coords),
        (positionError) => {
          console.log(positionError)
        }
      )
    }
  })
  onUnmounted(() => {
    if (watcher) navigator.geolocation.clearWatch(watcher)
  })

  return { coords, isSupported, getStreetAddress }
}
