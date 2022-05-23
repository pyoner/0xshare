import { derived } from 'svelte/store';
import { provider } from 'svelte-ethers-store';

const store = derived(provider, async (p) => {
	const init = async () => {
		const { WebBundlr } = await import('@bundlr-network/client');
		const bundlr = new WebBundlr('https://node1.bundlr.network', 'bnb', p);
		await bundlr.ready();

		return bundlr;
	};
	if (p) {
		return await init();
	}
});

export default store;
