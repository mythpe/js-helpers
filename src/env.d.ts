/*
 * MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * https://www.4myth.com
 */
/* eslint-disable */

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;

    /**
     * env api url
     */
    VUE_BASE_API: string
    /**
     * Application Name
     */
    VUE_APP_NAME: string
    /**
     * Application Description
     */
    VUE_APP_DESCRIPTION: string
    /**
     * Application Keywords
     */
    VUE_APP_KEYWORDS: string
  }
}

export {}
