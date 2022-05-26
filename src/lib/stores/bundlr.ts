import type { WebBundlr } from '@bundlr-network/client/build/web';
import { derived, type Readable } from 'svelte/store';
import { provider } from 'svelte-ethers-store';

const initStore = async () => {
	const { WebBundlr } = await import('@bundlr-network/client');
	const store: Readable<WebBundlr> = derived(provider, (p, set) => {
		const bundlr = new WebBundlr('https://node1.bundlr.network', 'bnb', p);
		set(bundlr);
	});

	return store;
};

export default initStore;
