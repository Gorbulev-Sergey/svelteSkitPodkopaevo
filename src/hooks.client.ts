import type { HandleClientError } from '@sveltejs/kit/hooks';

export const handleClientError: HandleClientError = async () => {};

if (typeof window !== 'undefined') {
	// import('bootstrap').catch(console.error);
}
