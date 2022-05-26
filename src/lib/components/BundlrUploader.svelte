<script lang="ts">
	import type { WebBundlr } from '@bundlr-network/client';

	export let bundlr: WebBundlr;
	let files: FileList;

	async function upload(b: WebBundlr, files: FileList) {
		const ff = Array.from(files);
		const totalSize = ff.reduce((acc, file) => acc + file.size, 0);

		// Get the cost for upload
		const price = await b.getPrice(totalSize);
		// Get your current balance
		const balance = await b.getLoadedBalance();

		// If you don't have enough balance for the upload
		if (balance.isGreaterThan(price)) {
			// Fund your account with the difference
			// We multiply by 1.1 to make sure we don't run out of funds
			await b.fund(balance.minus(price).multipliedBy(1.1));
		}

		// Create, sign and upload the transaction
		ff.forEach(async (f) => {
			const data = new Uint8Array(await f.arrayBuffer());

			const tx = b.createTransaction(data);
			console.log('tx', tx);

			const signature = await tx.sign();
			console.log('signature', signature);

			await tx.upload();
		});
	}

	function uploadHandler() {
		if (!files.length) {
			return;
		}
		upload(bundlr, files);
	}
</script>

<input type="file" bind:files multiple />
<br />
{#if files?.length}
	<ul>
		{#each files as file}
			<li>
				{file.name} ({file.type}) - {file.size} bytes
			</li>
		{/each}
	</ul>
	<button on:click={uploadHandler}>upload</button>
{/if}
