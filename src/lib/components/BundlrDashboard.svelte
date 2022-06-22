<script lang="ts">
	import type { WebBundlr } from '@bundlr-network/client';
	export let bundlr: WebBundlr;
</script>

<div>
	Balance:
	{#await bundlr.getLoadedBalance() then balance}
		{balance.toString()}
	{/await}
</div>
