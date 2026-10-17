<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap-icons/font/bootstrap-icons.min.css';
	import { onMount } from 'svelte';

	let { children } = $props();
	onMount(() => {
		const badge = document.getElementById('layero-badge');
		if (badge) badge.remove();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Скит ПОДКОПАЕВО</title>
</svelte:head>

<div class="sticky-top w-100 bg-1">
	<div class="d-flex align-items-center p-3">
		<a class="btn btn-sm bg-1 rounded-3" href="/">Скит <b class="text-uppercase">Подкопаево</b></a>
		<div class="flex-grow-1 justify-content-end d-flex align-items-center gap-1">
			<a class="btn btn-sm rounded-3" href="/">Главная</a>
		</div>
	</div>
</div>
<div class="container my-7">
	{@render children()}
</div>
