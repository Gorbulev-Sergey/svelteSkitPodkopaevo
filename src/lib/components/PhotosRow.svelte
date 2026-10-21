<script lang="ts">
	import DialogPhoto from './DialogPhoto.svelte';

	interface IModalState {
		image: string;
		photos: string[];
		isImageModalShow: boolean;
	}

	interface IProps {
		title: string;
		items: string[];
		modalState: IModalState;
	}

	let { title, items, modalState = $bindable({} as IModalState) }: IProps = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="d-flex flex-column gap-1">
	<div
		class="photos-row d-flex align-items-center gap-2 w-100 overflow-x-auto pb-1"
		style="max-height: 30em;"
	>
		{#each items as item}
			<div
				class="rounded-3 flex-shrink-0"
				style="background-image: url({item}); background-repeat: no-repeat; background-position: center; background-size: cover; min-height: 7.5em; width: 7.5em; cursor: pointer;"
				onclick={() => {
					modalState = {
						isImageModalShow: true,
						photos: Object.assign(items),
						image: item
					};
				}}
			></div>
		{/each}
	</div>
</div>

<DialogPhoto
	photo={modalState.image}
	photos={modalState.photos}
	bind:isShow={modalState.isImageModalShow}
	onCancel={() => {
		modalState.image = '';
	}}
/>

<style>
	/* Сам скроллбар (полоса прокрутки) */
	.photos-row::-webkit-scrollbar {
		height: 0.6em; /* высота — это и есть «толщина» горизонтального скролла */
		background-color: transparent;
	}

	/* Дорожка (фон полосы) */
	.photos-row::-webkit-scrollbar-track {
		border-radius: 10px;
		background-color: transparent;
	}

	/* Ползунок (движущаяся часть) */
	.photos-row::-webkit-scrollbar-thumb {
		background-color: var(--bs-gray-400);
		border-radius: 10px;
		border: 2px solid var(--bs-gray-600); /* создаёт эффект «вдавленности» */
	}

	/* Ползунок при наведении */
	.photos-row::-webkit-scrollbar-thumb:hover {
		background-color: var(--bs-gray-600);
	}
</style>
