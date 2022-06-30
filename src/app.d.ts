/// <reference types="@sveltejs/kit" />

import type { providers } from 'ethers';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

declare global {
	interface Window {
		ethereum?: providers.ExternalProvider;
	}
}
