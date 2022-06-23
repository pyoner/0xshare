<script lang="ts">
	import type { WebBundlr } from '@bundlr-network/client';
	export let bundlr: WebBundlr;
</script>

<div>
	Price for 1 byte:
	{#await bundlr.getPrice(1) then price}
		{price.toString()}
	{/await}
</div>

<div>
	Address:
	{bundlr.address}
</div>

<div>
	Balance:
	{#await bundlr.getLoadedBalance() then balance}
		{balance.toString()}
	{/await}
</div>
