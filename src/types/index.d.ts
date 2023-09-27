import type Utools from "utools-api-types";
import type Everything from "everything-node";

export {};

declare global {
  interface Window {
    everything: Everything;
  }
}
declare module "@vue/runtime-dom" {
  export interface CSSProperties {
    [key: `--${string}`]: string | undefined;
  }
}
