<script lang="ts">
	interface IProps {
		title?: string;
		phone?: string;
		max?: string;
	}
	let { title, phone, max }: IProps = $props();
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<div class="d-flex justify-content-start align-items-center gap-1">
	<div>{title}:</div>
	<a
		class="badge text-decoration-none py-1 px-2 rounded-3 theme-inverse"
		href="tel:{phone?.replace('+7', '8')}"
		target="_blank">{phone}</a
	>
	{#if max !== undefined}
		<a
			class="badge text-decoration-none p-0"
			href="https://max.ru/{max}"
			target="_blank"
			title="Max"
			><img
				alt=""
				style="width: 1.7em; height: 1.7em;"
				src="https://web.max.ru/_app/immutable/assets/favicon.SKKGCh52.png"
			/></a
		>
	{/if}
</div>
