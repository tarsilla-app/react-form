// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

import { eslintStorybookConfig } from '@tarsilla/eslint-config';

const config = eslintStorybookConfig({
  ignores: ['**/.vscode/', '**/node_modules/', '**/lib/', '**/.storybook/', '**/storybook-static/'],
  testRunner: 'vitest',
  tsconfigRootDir: import.meta.dirname,
});
export default config;
