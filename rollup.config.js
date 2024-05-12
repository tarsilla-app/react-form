/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/default */
/* eslint-disable import/namespace */
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

function generateBuild(folder) {
  const url = folder ? `${folder}/` : '';
  return [
    {
      input: `src/${url}index.ts`,
      output: [
        {
          file: `lib/${url}index.cjs`,
          format: 'cjs',
          sourcemap: true,
          exports: 'auto',
        },
        {
          file: `lib/${url}index.mjs`,
          format: 'esm',
          sourcemap: true,
          exports: 'auto',
        },
      ],
      plugins: [
        peerDepsExternal({ includeDependencies: true }),
        typescript({ tsconfig: './tsconfig.json' }),
        postcss({
          modules: true,
        }),
        terser(),
      ],
    },
    {
      input: `./src/${url}index.ts`,
      output: [{ file: `./lib/${url}index.d.ts`, format: 'esm' }],
      plugins: [dts()],
    },
  ];
}

export default [...generateBuild()];
