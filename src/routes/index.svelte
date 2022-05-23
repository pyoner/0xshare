<script lang="ts">
	import type { WebBundlr } from '@bundlr-network/client';

	import type { providers } from 'ethers';

	import { onMount } from 'svelte';
	import {
		connected,
		provider,
		defaultEvmStores,
		signer,
		signerAddress
	} from 'svelte-ethers-store';

	let bundlr: WebBundlr;
	const initialiseBundlr = async (p: providers.Provider) => {
		const WebBundlr = (await import('@bundlr-network/client')).WebBundlr;
		bundlr = new WebBundlr('https://node1.bundlr.network', 'bnb', p);
		await bundlr.ready();

		bundlr.createTransaction;

		console.log('address', bundlr.address);

		const loadedBalance = await bundlr.getLoadedBalance();
		console.log('loadedBalance', loadedBalance.toString());

		const balance = await bundlr.getBalance($signerAddress);
		console.log('balance', balance.toString());
	};

	// onMount(async () => {
	// 	await defaultEvmStores.setProvider();
	// 	if ($connected && $provider) {
	// 		console.log($provider);
	// 		initialiseBundlr($provider);
	// 	}
	// });

	function connectMetamask() {
		console.log('connect metamask');
		return defaultEvmStores.setProvider();
	}
	function disconnectMetamask() {
		console.log('disconnect metamask');
		return defaultEvmStores.disconnect();
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<div>
	{#if $connected}
		<button on:click={disconnectMetamask}>Disconnect Metamask</button>
	{:else}
		<button on:click={connectMetamask}>Connect Metamask</button>
	{/if}
</div>
