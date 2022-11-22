/*
 * MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * https://www.4myth.com
 */

/* eslint-disable */
/// <reference types="google.maps" />
/// <reference types="vue3-google-map/dist/types" />

import { VNode } from 'vue'

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
  style?: string | undefined;
  center?: CoordsType | undefined;
  zoom?: number | undefined;
  markers?: CoordsType | CoordsType[] | undefined;
  oneMarker?: boolean | undefined;
  label?: string | undefined;
  errors?: Record<string, any> | undefined;
}

export type MGoogleMapsSlots = {
  default: () => VNode[];
}

export {}
