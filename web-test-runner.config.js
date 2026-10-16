import { readdirSync } from 'node:fs';
import { rollupBundlePlugin } from '@web/dev-server-rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
  plugins: [
    rollupBundlePlugin({
      rollupConfig: {
        input: readdirSync('test', { recursive: true }).filter(name => name.endsWith('.test.js')).map(name => `test/${name}`),
        plugins: [nodeResolve({ browser: true }), commonjs(), json()]
      }
    })
  ]
};
