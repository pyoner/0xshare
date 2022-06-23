<script lang="ts">
	import { appTags } from '$lib/bundlr';
	import type { Tag } from '$lib/types';

	import type { WebBundlr } from '@bundlr-network/client';

	export let bundlr: WebBundlr;
	let files: FileList;

	async function upload(b: WebBundlr, f: File) {
		// Create, sign and upload the transaction
		const data = new Uint8Array(await f.arrayBuffer());

		const tags: Tag[] = [...appTags(), { name: 'Content-Type', value: f.type }];
		const tx = b.createTransaction(data, { tags });
		console.log('tx', tx);

		const signature = await tx.sign();
		console.log('signature', signature);

		await tx.upload();
		return tx;
	}

	let tx;
	let link = '';
	let message = '';
	async function uploadHandler() {
		link = '';
		message = '';
		if (!files.length) {
			return;
		}

		const balance = await bundlr.getLoadedBalance();
		const price = await bundlr.getPrice(files[0].size);
		console.log('balance', balance);
		console.log('price', price);
		if (price.isGreaterThan(balance)) {
			message = `You don't have enough balance for the upload (${price.toString()})`;
			return;
		}

		tx = await upload(bundlr, files[0]);
		console.log('tx', tx);
		link = `https://arweave.net/${tx.id}`;
	}
</script>

<div>
	<input type="file" bind:files />
</div>

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

{#if link}
	<div>
		<a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
	</div>
{/if}

{#if message}
	<div>{message}</div>
{/if}
