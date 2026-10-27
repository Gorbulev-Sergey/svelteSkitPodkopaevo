<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	interface IProps {
		photo?: string;
		photos?: string[];
		children?: Snippet<[]>;
		isShow?: boolean;
		onCancel?: () => void;
	}
	let {
		photo,
		photos,
		children,
		isShow = $bindable(false),
		onCancel = () => {}
	}: IProps = $props();

	// let id = crypto.randomUUID();
	let id = Date.now().toString();

	let dialog = $derived(document.getElementById(id) as HTMLDialogElement);

	$effect(() => {
		if (isShow) dialog.showModal();
		else dialog.close();
	});

	onMount(async () => {
		document.addEventListener('keydown', (e) => {
			if (e.key !== 'Escape') return;
			isShow = false;
		});
		document.addEventListener('wheel', (e) => {
			if (photo && photos && photos.length > 0) {
				let index = photos.indexOf(photo);
				if (e.deltaY > 0) {
					index = photos.indexOf(photo) < photos.length - 1 ? photos.indexOf(photo) + 1 : 0;
				} else if (e.deltaY < 0) {
					index = photos.indexOf(photo) > 0 ? photos.indexOf(photo) - 1 : photos.length - 1;
				}
				photo = photos[index];
			}
		});
	});
</script>

<dialog {id} class="my-dialog dialog-fullscreen border-0 p-0 bg-transparent">
	<div
		class="position-relative img-fluid h-100"
		style="background-image: url({photo}); background-repeat: no-repeat; background-position: center; background-size: contain;"
	>
		{#if children}
			{@render children?.()}
		{/if}

		<button
			aria-label="Закрыть"
			class="btn btn-sm bg-body bg-20 p-1 position-absolute rounded-3"
			style="top:.375rem; right:.375rem;"
			onclick={(e) => {
				e.stopPropagation();
				isShow = false;
				onCancel();
			}}
		>
			<i class="bi bi-x-lg"></i>
		</button>
	</div>
</dialog>

<style>
	.my-dialog::backdrop {
		background: #212529f0;
		backdrop-filter: blur(1em);
	}
</style>
