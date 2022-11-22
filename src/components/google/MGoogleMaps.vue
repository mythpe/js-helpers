<!--
  - MyTh Ahmed Faiz Copyright © 2016-2022 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - https://www.4myth.com
  -->

<script lang="ts" setup>
import _ from 'lodash'
import { computed, nextTick, ref, watch } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'
import { useGeolocation } from '../../vue3/MGeolocation'
import { CoordsType, GeocoderResult, GoogleGeocoder, GoogleMapsApi, GoogleMapsMVCObject, GooglePlacesService, MapCoordsClick, MGoogleMapsProps, PlaceResult } from './models'

interface Props extends MGoogleMapsProps {
  style?: string | undefined;
  center?: CoordsType | undefined;
  zoom?: number | undefined;
  markers?: CoordsType | CoordsType[] | undefined;
  oneMarker?: boolean | undefined;
  label?: string | undefined;
  errors?: Record<string, any> | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  style: 'width: 100%; height: 350px',
  center: undefined,
  markers: undefined,
  zoom: 17,
  oneMarker: !0,
  label: undefined,
  errors: undefined
})

interface Events {
  (e: 'selectPlace', place: PlaceResult): void;

  (e: 'onMapClick', event: CoordsType): void;

  (e: 'set-map-center', event: CoordsType): void;

  (e: 'set-map-address', event?: GeocoderResult | PlaceResult): void;
}

const emits = defineEmits<Events>()
const { coords } = useGeolocation()

const getCenter = computed<CoordsType>(() => {
  return props.center ?? {
    lat: coords.value.latitude,
    lng: coords.value.longitude
  }
})
const selectedMarker = ref<CoordsType | null>(null)

const getMarkers = computed<CoordsType[]>(() => {
  // if (props.markers === undefined && props.center) {
  //   return [props.center]
  // }
  if (props.markers) {
    if (_.isArray(props.markers)) {
      return props.markers
    }
    return [props.markers]
  }
  if (props.oneMarker && props.center) {
    return [props.center]
  }
  // console.log('position', selectedMarker.value)
  // return []
  return selectedMarker.value ? [selectedMarker.value] : []
})
const search = ref<string | undefined>()
const loading = ref(!1)
const mapRef = ref<any | { api: GoogleMapsApi, map: GoogleMapsMVCObject }>(null)
const placeService = ref<GooglePlacesService>()
const Geocoder = ref<GoogleGeocoder>()
const searchResults = ref<PlaceResult[] | null>(null)
const onSearch = (query: string | null) => {
  searchResults.value = []
  if (loading.value || !mapRef.value || (!query || query.length < 3)) {
    return
  }
  loading.value = !0
  // eslint-disable-next-line no-undef
  placeService.value?.textSearch({ query }, (res: PlaceResult[] | null) => {
    loading.value = !1
    searchResults.value = res?.slice(0, 20) ?? []
  })
}
const onSelectSearch = (place: PlaceResult) => {
  emits('selectPlace', place)
  search.value = place.formatted_address
  nextTick(() => {
    if (props.oneMarker) {
      if (place.geometry?.location?.lat() && place.geometry?.location?.lng()) {
        setMapCenter({
          lat: place.geometry?.location?.lat(),
          lng: place.geometry?.location?.lng()
        })
      }
      setMapAddress(place)
    }
    searchResults.value = null
  })
}
const setMapCenter = (e: CoordsType) => {
  emits('set-map-center', e)
  if (props.oneMarker) {
    selectedMarker.value = e
    mapRef.value?.map?.setCenter(e)
    getAddressFromCords(e)
  }
}
const onClickMap = ({ latLng }: { latLng: MapCoordsClick }) => {
  const position = latLng.toJSON()
  emits('onMapClick', position)
  setMapCenter(position)
}
const onDragend = ({ latLng }: { latLng: MapCoordsClick }) => {
  setMapCenter(latLng.toJSON())
}
const setMapAddress = (e?: GeocoderResult | PlaceResult) => {
  emits('set-map-address', e)
}
const getAddressFromCords = async (e: CoordsType): Promise<void> => {
  const r = await Geocoder.value?.geocode({
    location: e,
    region: 'SA'
  })
  if (r?.results?.length) {
    setMapAddress(r.results[0])
  }
}

watch([mapRef, () => mapRef.value?.ready], () => {
  if (mapRef.value && mapRef.value.ready) {
    if (placeService.value === null) {
      placeService.value = new mapRef.value.api.places.PlacesService(mapRef.value.map)
    }
    if (Geocoder.value === null) {
      Geocoder.value = new mapRef.value.api.Geocoder()
    }
  }
})
</script>

<script lang="ts">

export default {
  inheritAttrs: !1
}
</script>

<template>
  <m-row class="m--google-maps">
    <m-col col="12">
      <p class="text-body1 q-ma-none">
        {{ label }}
      </p>
      <q-slide-transition>
        <p
          v-if="errors?.latitude?.length>0 || errors?.longitude?.length>0"
          class="text-body2 q-ma-none text-negative"
        >
          {{ errors.latitude[0] }}
        </p>
      </q-slide-transition>
    </m-col>
    <m-col col="12">
      <q-card class="m--gm-searchbar-card">
        <q-input
          v-model="search"
          :label="$t('search')"
          :loading="loading"
          clearable
          debounce="600"
          dense
          outlined
          @update:model-value="onSearch"
        >
          <template #append>
            <q-icon name="o_search" />
          </template>
        </q-input>
        <div
          class="m--gm-search-result"
        >
          <q-card
            class="scroll"
            square
          >
            <q-list
              bordered
              dense
              separator
              style="max-height: 250px;"
            >
              <q-item
                v-for="(r,i) in searchResults"
                :key="`search-item-${i}`"
                clickable
                @click="onSelectSearch(r)"
              >
                <q-item-section no-wrap>
                  <q-item-label lines="1">
                    <!--<q-img-->
                    <!--  v-if="r.icon"-->
                    <!--  :src="r.icon"-->
                    <!--  sizes="10px"-->
                    <!--  height="20px"-->
                    <!--  width="20px"-->
                    <!--  ratio="1"-->
                    <!--/>-->
                    {{ r.name }}
                  </q-item-label>
                  <q-item-label lines="1">
                    {{ r.formatted_address }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-if="searchResults && searchResults.length === 0 && !loading && search">
                <q-item-section>
                  {{ $t('messages.no_items') }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </q-card>
    </m-col>
    <m-col col="12">
      <GoogleMap
        ref="mapRef"
        :api-key="GOOGLE_API_KEY"
        :center="getCenter"
        :language="AppLocale"
        :style="style"
        :zoom="zoom"
        v-bind="$attrs"
        @click="onClickMap"
      >
        <Marker
          v-for="(position,i) in getMarkers"
          :key="`marker-${i}`"
          :options="{ position,draggable:oneMarker}"
          @dragend="oneMarker ? onDragend : undefined"
        />
      </GoogleMap>
    </m-col>
  </m-row>
</template>

<style lang="scss">
.m--google-maps {
  //position: relative;
  //display: flex;
  //width: auto;
  //background-color: brown;
}

.m--gm-map {
  //margin-top: 20px;
}

.m--gm-searchbar-container {
  //position: absolute;
  //top: 30px;
  //z-index: 900;
  //width: 80%;
  //background-color: #1cac00;
  //margin-right: auto;
  //margin-left: auto;
}

[dir=rtl] .m--gm-searchbar-container {
  //left: 10px;
}

[dir=ltr] .m--gm-searchbar-container {
  //right: 10px;
}

.m--gm-searchbar-card {
  //margin-top: 20px;
}

.m--gm-search-result {
  position: absolute;
  top: 41px;
  z-index: 9999;
  width: 100%;
}
</style>
