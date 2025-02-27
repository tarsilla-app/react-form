import { rollupReactConfig } from '@tarsilla/rollup-config/react';

export default rollupReactConfig({
  external: ['@tarsilla/react-components/tab'],
  paths: {
    '@types': ['./src/types/index.ts'],
  },
});
