import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

import stdLibBrowser from 'node-stdlib-browser';
import inject from'@rollup/plugin-inject';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

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

			resolve: {
			alias: stdLibBrowser
		},
		optimizeDeps: {
			include: ['buffer', 'process']
		},
		plugins: [
			{
				...inject({
					global: [
						require.resolve(
							'node-stdlib-browser/helpers/esbuild/shim'
						),
						'global'
					],
					process: [
						require.resolve(
							'node-stdlib-browser/helpers/esbuild/shim'
						),
						'process'
					],
					Buffer: [
						require.resolve(
							'node-stdlib-browser/helpers/esbuild/shim'
						),
						'Buffer'
					]
				}),
				enforce: 'post'
			}
		]
		}
	}
};

export default config;
