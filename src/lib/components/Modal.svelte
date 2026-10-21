<script lang="ts">
	import { onMount } from 'svelte';

	interface IProps {
		src: string;
		photos?: string[];
		isShow: boolean;
		onClose?(): void;
	}
	let { src, photos = [], isShow = $bindable(false), onClose = () => () => {} }: IProps = $props();

	let isPhotosShow = $state(true);
	let toPrevImage = () => {
		let index = photos.indexOf(src);
		if (index > 0) src = photos[index - 1];
		else src = photos[photos.length - 1];
	};
	let toNextImage = () => {
		let index = photos.indexOf(src);
		if (index < photos.length - 1) src = photos[index + 1];
		else src = photos[0];
	};

	onMount(() => {
		document.addEventListener('keydown', (e: KeyboardEvent) => {
			if (e.key == 'Escape') isShow = false;
			if (e.key == 'ArrowLeft') toPrevImage();
			if (e.key == 'ArrowRight') toNextImage();
		});
		document.addEventListener('wheel', (e) => {
			if (e.deltaY < 0) toPrevImage();
			if (e.deltaY > 0) toNextImage();
		});
	});

	$effect(() => {
		if (isShow) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	});
</script>

<div
	class="modal {isShow ? 'show' : 'fade '} bg-transparent w-100"
	style="display: {isShow ? 'block' : 'none'}; z-index: 20000; height:100dvh"
>
	<div class="d-flex align-items-center justify-content-center" style="height: 100dvh;">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div class="bg-transparent">
			<div
				class="position-relative bg-dark modal-content rounded-0 border-0 shadow-sm"
				style="width: 100vw!important; "
			>
				<button
					aria-label="Close"
					class="btn btn-dark bg-opacity-10 text-light text-opacity-50 position-absolute end-0 m-1"
					onclick={() => {
						isShow = false;
						onClose();
					}}
				>
					<i class="fa-solid fa-xmark"></i>
				</button>
				<div
					onclick={() => (isPhotosShow = !isPhotosShow)}
					style="background-image: url({src}); background-repeat: no-repeat; background-position: center; background-size: contain; min-height: 100dvh;"
				></div>
				<div
					class="position-absolute start-0 top-50 bottom-50 text-light text-opacity-50 px-3"
					onclick={() => toPrevImage()}
				>
					<i class="fa-solid fa-chevron-left" style="font-size: 2em; cursor: pointer"></i>
				</div>
				<div
					class="position-absolute end-0 top-50 bottom-50 text-light text-opacity-50 px-3"
					onclick={() => toNextImage()}
				>
					<i class="fa-solid fa-chevron-right" style="font-size: 2em; cursor: pointer"></i>
				</div>
				{#if photos.length > 0 && isPhotosShow}
					<div
						class="position-absolute bottom-0 text-light w-100 start-0 end-0"
						style="contain: layout; backdrop-filter: blur(.15em)"
					>
						<div>
							<div
								class="d-flex flex-nowrap align-items-center justify-content-evenly px-2 my-2 gap-2 w-100 overflow-x-auto"
								style="min-width: 0;"
							>
								{#each photos as item}
									<div
										onclick={() => (src = item)}
										class="rounded flex-shrink-0 {src == item
											? 'border border-2 border-light'
											: ''}"
										style="background-image: url({item}); background-repeat: no-repeat; background-position: center; background-size: cover; width:100px; height: 100px; cursor: pointer;"
									></div>
								{/each}
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
