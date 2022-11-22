/*
 * MyTh Ahmed Faiz Copyright © 2016-2022 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * https://www.4myth.com
 */

import axios from 'axios'
import { onMounted, onUnmounted, ref } from 'vue'
import { CoordsProps } from '../types/MGeolocation'
import { MyThVue3 } from '../vue3/MyThVue3'

const getStreetAddress = async (lat: number, long: number) => {
  try {
    const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${MyThVue3.options?.google?.apiKey}`)
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
    latitude: 0,
    longitude: 0
  })
  const isSupported = 'navigator' in window && 'useGeolocation' in navigator

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
