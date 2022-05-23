<script lang="ts">
	import {
		connected,
		provider,
		defaultEvmStores,
		signer,
		signerAddress
	} from 'svelte-ethers-store';

	import bundlr from '$lib/stores/bundlr';

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
		<div>
			network<br />
			{#await $provider.getNetwork() then network}
				name: {network.name}<br />
				chainId: {network.chainId}<br />
			{/await}
		</div>
		<div>
			{#await $bundlr then b}
				{b?.address}
			{/await}
		</div>
	{:else}
		<button on:click={connectMetamask}>Connect Metamask</button>
	{/if}
</div>
