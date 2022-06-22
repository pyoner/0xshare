<script lang="ts">
	import type { WebBundlr } from '@bundlr-network/client';
	import type { Readable } from 'svelte/store';

	import { onMount } from 'svelte';
	import { connected, provider, defaultEvmStores, signer } from 'svelte-ethers-store';

	import initBundlr from '$lib/stores/bundlr';
	import BundlrUploader from '$lib/components/BundlrUploader.svelte';
	import BundlrDashboard from '$lib/components/BundlrDashboard.svelte';

	function connectMetamask() {
		console.log('connect metamask');
		return defaultEvmStores.setProvider();
	}
	function disconnectMetamask() {
		console.log('disconnect metamask');
		return defaultEvmStores.disconnect();
	}
	let bundlr: Readable<WebBundlr>;
	onMount(async () => {
		bundlr = await initBundlr();
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<div>
	{#if $connected}
		<button on:click={disconnectMetamask}>Disconnect Metamask</button>
		<div>
			network<br />
			{#await $provider.getNetwork() then network}
				name: {network.name}<br />
				chainId: {network.chainId}<br />
			{:catch error}
				{error}
			{/await}
		</div>

		{#await $bundlr.ready()}
			...loading
		{:then}
			=====
			<BundlrDashboard bundlr={$bundlr} />
			<BundlrUploader bundlr={$bundlr} />
		{/await}
	{:else}
		<button on:click={connectMetamask}>Connect Metamask</button>
	{/if}
</div>
