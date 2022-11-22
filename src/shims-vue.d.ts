/*
 * MyTh Ahmed Faiz Copyright © 2016-2022 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * https://www.4myth.com
 */

/* eslint-disable */

/// <reference types="vite/client" />

// Mocks all files ending in `.vue` showing them as plain Vue instances
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
