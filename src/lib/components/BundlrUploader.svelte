<script lang="ts">
	import type { WebBundlr } from '@bundlr-network/client';

	export let bundlr: WebBundlr;
	let files: FileList;

	async function upload(b: WebBundlr, files: FileList) {
		const ff = Array.from(files);
		const totalSize = ff.reduce((acc, file) => acc + file.size, 0);
		console.log('totalSize', totalSize);

		// Get the cost for upload
		const price = await b.getPrice(totalSize);
		console.log('price', price.toString());

		// Get your current balance
		const balance = await b.getLoadedBalance();
		console.log('balance', balance.toString());

		// If you don't have enough balance for the upload
		if (price.isGreaterThan(balance)) {
			// Fund your account with the difference
			// We multiply by 1.1 to make sure we don't run out of funds
			await b.fund(price.minus(balance), 1.1);
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

	async function uploadHandler() {
		if (!files.length) {
			return;
		}
		await bundlr.ready();
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
