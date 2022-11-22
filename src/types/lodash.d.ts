/*
 * MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * https://www.4myth.com
 */
/* eslint-disable */

declare module 'lodash' {
  interface LoDashStatic {
    /**
     * Converts string to pascal case.
     *
     * @param string The string to convert.
     * @return Returns the pascal cased string.
     */
    pascalCase (string?: string): string;

    pluralize (string?: string): string;

    singularize (string?: string): string;
  }
}

export {}
