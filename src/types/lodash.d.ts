/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
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
