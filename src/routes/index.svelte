<script lang="ts">
	import type { providers } from 'ethers';

	import { onMount } from 'svelte';
	import { connected, provider, defaultEvmStores } from 'svelte-ethers-store';

	const initialiseBundlr = async (p: providers.Provider) => {
		const WebBundlr = (await import('@bundlr-network/client')).WebBundlr;
		const bundlr = new WebBundlr('https://node1.bundlr.network', 'bnb', p);
		await bundlr.ready();

		console.log(bundlr);
		return bundlr; // done!
	};

	onMount(async () => {
		await defaultEvmStores.setProvider();
		if ($connected && $provider) {
			console.log($provider);
			initialiseBundlr($provider);
		}
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<div>
	metamask connected: {$connected}
</div>
