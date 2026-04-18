// react.d.ts
import 'react';

declare module 'react' {
  type CSSProperties = Record<`--${string}`, number | string>;
}
