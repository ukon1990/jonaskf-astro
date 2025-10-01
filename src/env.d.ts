/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module '*.svg?raw' {
  const content: string;
  export default content;
}
