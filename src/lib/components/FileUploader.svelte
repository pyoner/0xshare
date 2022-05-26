<script lang="ts">
	let files: FileList | undefined;
	function upload() {
		if (!files?.length) {
			return;
		}

		console.log(files);
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
	<button on:click={upload}>upload</button>
{/if}
