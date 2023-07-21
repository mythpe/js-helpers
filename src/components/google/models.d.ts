/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

/* eslint-disable */
/// <reference types="google.maps" />
/// <reference types="vue3-google-map/dist/types" />

import { VNode } from 'vue'
import { ColStyleType } from '../grid/models'

export type CoordsType = {
  lat: number;
  lng: number;
}

export type MapCoordsClick = {
  /**
   * Comparison function.
   */
  equals (other: google.maps.LatLng | null): boolean;
  /**
   * Returns the latitude in degrees.
   */
  lat (): number;
  /**
   * Returns the longitude in degrees.
   */
  lng (): number;
  /**
   * Converts to JSON representation. This function is intended to be used via
   * <code>JSON.stringify</code>.
   */
  toJSON (): google.maps.LatLngLiteral;
  /**
   * Converts to string representation.
   */
  toString (): string;
  /**
   * Returns a string of the form &quot;lat,lng&quot; for this LatLng. We
   * round the lat/lng values to 6 decimal places by default.
   */
  toUrlValue (precision?: number): string;
}

export type GoogleMapsMVCObject = google.maps.Map
export type GoogleMapsApi = typeof google
export type GooglePlacesService = google.maps.places.PlacesService
export type GoogleGeocoder = google.maps.Geocoder
export type PlaceResult = google.maps.places.PlaceResult
export type GeocoderResult = google.maps.GeocoderResult

export type MGoogleMapsProps = {
  auto?: boolean | undefined;
  col?: ColStyleType;
  xs?: ColStyleType;
  sm?: ColStyleType;
  md?: ColStyleType;
  lg?: ColStyleType;
  xl?: ColStyleType;
  style?: string | undefined;
  center?: CoordsType | undefined;
  zoom?: number | undefined;
  markers?: CoordsType[] | undefined;
  centerMarker?: boolean | undefined;
  label?: string | undefined;
  errors?: Record<string, any> | undefined;
  region?: string;
}

export type MGoogleMapsSlots = {
  default: () => VNode[];
}

export {}
