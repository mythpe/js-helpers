/*
 * MyTh Ahmed Faiz Copyright © 2016-2022 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * https://www.4myth.com
 */
/* eslint-disable */

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
  }
}

declare global {
  interface Window {
    push_token?: string | null | undefined;
  }
}

export {}
