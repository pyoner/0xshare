import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

import stdLibBrowser from 'node-stdlib-browser';
import plugin from 'node-stdlib-browser/helpers/esbuild/plugin';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			fallback: '200.html'
		}),
		vite: {
			build: {
				target: 'esnext'
			},
			optimizeDeps: {
				esbuildOptions: {
					inject: ['node_modules/node-stdlib-browser/helpers/esbuild/shim.js'],
					define: {
						// global: 'globalThis'
						global: 'global',
						process: 'process',
						Buffer: 'Buffer'
					},
					plugins: [
						// NodeGlobalsPolyfillPlugin({
						// 	buffer: true
						// }),
						// NodeModulesPolyfillPlugin()
						plugin(stdLibBrowser)
					]
				}
			}
		}
	}
};

export default config;
