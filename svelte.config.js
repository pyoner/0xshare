import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

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
					define: {
						global: 'globalThis'
					},
					plugins: [
						NodeGlobalsPolyfillPlugin({
							buffer: true
						}),
						NodeModulesPolyfillPlugin()
					]
				}
			}
		}
	}
};

export default config;
