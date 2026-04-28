import '../.astro/types.d.ts';
import 'astro/client';

declare module '*.svg?raw' {
  const content: string;
  export default content;
}
