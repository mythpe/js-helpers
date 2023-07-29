<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { useQuasar } from 'quasar'
import { computed, ref, watch } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'
import { useGeolocation } from '../../vue3'
import { ColStyleType } from '../grid/models'
import { CoordsType, GeocoderResult, GoogleGeocoder, GoogleMapsApi, GoogleMapsMVCObject, GooglePlacesService, MapCoordsClick, PlaceResult } from './models'
import { useI18n } from 'vue-i18n'

interface Props {
  auto?: boolean;
  col?: ColStyleType;
  xs?: ColStyleType;
  sm?: ColStyleType;
  md?: ColStyleType;
  lg?: ColStyleType;
  xl?: ColStyleType;
  style?: string;
  center?: CoordsType;
  zoom?: number;
  markers?: CoordsType[];
  centerMarker?: boolean;
  label?: string;
  errors?: Record<string, any>;
  region?: string;
}

const props = withDefaults(defineProps<Props>(), {
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  style: 'width: 100%; height: 350px',
  center: undefined,
  markers: () => ([]),
  zoom: 17,
  centerMarker: !0,
  label: undefined,
  errors: () => ({}),
  region: 'sa'
})

interface Events {
  (e: 'selectPlace', place: PlaceResult): void;

  (e: 'mapClick', event: CoordsType): void;

  (e: 'mapCenter', event: CoordsType): void;

  (e: 'mapAddress', event?: GeocoderResult | PlaceResult): void;
}

const emit = defineEmits<Events>()
const { coords } = useGeolocation()
const $q = useQuasar()
const { t } = useI18n({ useScope: 'global' })

const getCenter = computed<CoordsType>(() => {
  if (props.center?.lat && props.center?.lng) {
    return props.center
  }
  return {
    lat: coords.value.latitude,
    lng: coords.value.longitude
  }
})
const markersRef = ref(props.markers)
// const getMarkers = computed<CoordsType[]>(() => {
//   // if (props.markers === undefined && props.center) {
//   //   return [props.center]
//   // }
//   if (props.markers) {
//     if (_.isArray(props.markers)) {
//       return props.markers
//     }
//     return [props.markers]
//   }
//   if (props.centerMarker && props.center) {
//     return [props.center]
//   }
//   // console.log('position', selectedMarker.value)
//   // return []
//   return selectedMarker.value ? [selectedMarker.value] : []
// })
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
  // placeService.value?.findPlaceFromQuery({ query, language: $q.lang.isoName, fields: ['formatted_address', 'geometry'] }, (res: PlaceResult[] | null) => {
  placeService.value?.textSearch({
    query,
    region: props.region,
    language: $q.lang.isoName
  }, (res: PlaceResult[] | null) => {
    loading.value = !1
    searchResults.value = res?.slice(0, 20) ?? []
    // console.log(b)
  })
}
const onSelectSearch = (place: PlaceResult) => {
  emit('selectPlace', place)
  place.formatted_address && emitMapAddress(place)
  search.value = place.formatted_address
  searchResults.value = null
  if (place.geometry?.location?.lat() && place.geometry?.location?.lng()) {
    const pos = {
      lat: place.geometry?.location?.lat(),
      lng: place.geometry?.location?.lng()
    }
    emitSetMapCenter(pos)
  }
}
const emitSetMapCenter = (e: CoordsType) => {
  emit('mapCenter', e)
  setAddressFromCoords(e)
  // if (props.centerMarker) {
  // markersRef.value = [e]
  // setAddressFromCoords(e)
  // setTimeout(() => mapRef.value?.map?.setCenter(e), 600)
  // }
}
const onClickMap = ({ latLng }: { latLng: MapCoordsClick }) => {
  const position = latLng.toJSON()
  emit('mapClick', position)
  emitSetMapCenter(position)
}
const onDragend = ({ latLng }: { latLng: MapCoordsClick }) => {
  if (props.centerMarker) {
    emitSetMapCenter(latLng.toJSON())
  }
}
const emitMapAddress = (e?: GeocoderResult | PlaceResult) => {
  emit('mapAddress', e)
}
const setAddressFromCoords = async (location: CoordsType): Promise<void> => {
  const r = await Geocoder.value?.geocode({
    location,
    region: props.region
  })
  if (r?.results?.length) {
    emitMapAddress(r.results[0])
  }
}

const infoWindow = ref()

function handleLocationError (
  map: any,
  browserHasGeolocation: boolean,
  infoWindow: any,
  pos: any
) {
  infoWindow.setPosition(pos)
  infoWindow.setContent(
    browserHasGeolocation
      ? t('messages.errors.location_permissions')
      : 'Error: Your browser doesn\'t support geolocation.'
  )
  infoWindow.open(map)
}

const isInitCurrentLocation = ref(!1)
const currentLocationRef = ref()
const iniCurrentLocation = () => {
  // eslint-disable-next-line no-undef
  mapRef.value.map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(currentLocationRef.value.$el)
  isInitCurrentLocation.value = !0
}
const findCurrentLocation = () => {
  if (!mapRef.value?.ready) return

  const map = mapRef.value?.map
  const api = mapRef.value?.api

  if (!map) return
  infoWindow.value = new api.InfoWindow()
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: any) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        emitSetMapCenter(pos)
      },
      (positionError) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        handleLocationError(map, true, infoWindow.value, map.getCenter()!)
        console.log(positionError)
      }
    )
  } else {
    // Browser doesn't support Geolocation
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    handleLocationError(map, false, infoWindow.value, map.getCenter()!)
  }
}

const searchCard = ref()
const isInitSearchCard = ref(!1)
const iniSearchCard = () => {
  // eslint-disable-next-line no-undef
  mapRef.value.map.controls[google.maps.ControlPosition.TOP_CENTER].push(searchCard.value.$el)
  isInitSearchCard.value = !0
}

watch([mapRef, () => mapRef.value?.map], () => {
  if (mapRef.value && mapRef.value?.ready) {
    if (!placeService.value) {
      placeService.value = new mapRef.value.api.places.PlacesService(mapRef.value.map)
    }
    if (!Geocoder.value) {
      Geocoder.value = new mapRef.value.api.Geocoder()
    }
    if (!isInitCurrentLocation.value) {
      iniCurrentLocation()
    }
    if (!isInitSearchCard.value) {
      iniSearchCard()
    }
  }
})
const computedCenterMarker = computed(() => {
  if (props.center?.lng && props.center?.lng) {
    return { position: props.center }
  }

  return null
})
</script>

<script lang="ts">

export default {
  inheritAttrs: !1
}
</script>

<template>
  <MCol
    :auto="auto"
    :col="col"
    :lg="lg"
    :md="md"
    :sm="sm"
    :xs="xs"
  >
    <MRow
      class="m--google-maps"
    >
      <MCol col="12">
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
      </MCol>
      <MCol col="12">
        <GoogleMap
          ref="mapRef"
          :api-key="$myth.options.google.apiKey"
          :center="getCenter"
          :language="appLocale"
          :style="style"
          :zoom="zoom"
          v-bind="$attrs"
          @click="onClickMap"
        >
          <Marker
            v-if="computedCenterMarker"
            :options="computedCenterMarker"
          />
          <Marker
            v-for="(marker,i) in markersRef"
            :key="`marker-${i}`"
            :options="marker"
            @dragendf="onDragend"
          />
        </GoogleMap>
      </MCol>
    </MRow>
    <MRow class="hidden">
      <q-card
        ref="searchCard"
        class="m--gm-searchbar-card"
      >
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
      <MBtn
        ref="currentLocationRef"
        class="q-mb-md"
        color="white"
        icon="o_my_location"
        round
        text-color="black"
        @click="findCurrentLocation"
      />
    </MRow>
  </MCol>
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
  margin-top: 10px;
  width: 300px;
}

.m--gm-search-result {
  position: absolute;
  top: 41px;
  z-index: 9999;
  width: 100%;
}
</style>
