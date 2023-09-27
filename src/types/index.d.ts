import type Utools from "utools-api-types";

export {};

declare global {
  interface Window {}
}
declare module "@vue/runtime-dom" {
  export interface CSSProperties {
    [key: `--${string}`]: string | undefined;
  }
}
