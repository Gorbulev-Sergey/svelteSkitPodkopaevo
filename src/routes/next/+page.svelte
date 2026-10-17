<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap-icons/font/bootstrap-icons.min.css';
	import Block from '#lib/components/Block.svelte';
	import { browser } from '$app/env';

	function initScrollSpy(offset = 100) {
		const links = document.querySelectorAll('.scroll-link');
		// Ищем все div у которых есть класс "scrollspy" и есть id
		const scrollspyItems = Array.from(document.querySelectorAll('div.scrollspy[id]')).filter(
			(el) => el.offsetHeight > 0
		);

		if (!links.length || !scrollspyItems.length) return;

		const getActiveitemId = () => {
			let current = '';
			const scrollY = window.scrollY + offset;

			for (const item of scrollspyItems) {
				const itemTop = item.offsetTop;
				const itemHeight = item.offsetHeight;

				// секция считается активной, если точка offset пересекает её
				if (scrollY >= itemTop && scrollY < itemTop + itemHeight) {
					current = item.id;
					break;
				}
			}

			// если ничего не подошло, берём последнюю секцию
			if (!current && scrollspyItems.length > 0) {
				current = scrollspyItems[scrollspyItems.length - 1].id;
			}
			return current;
		};

		const updateActiveLink = () => {
			const activeId = getActiveitemId();

			links.forEach((link) => {
				const targetId = link.getAttribute('href')?.replace('#', '');
				if (targetId === activeId) {
					link.classList.add('active');
				} else {
					link.classList.remove('active');
				}
			});
		};

		window.addEventListener('scroll', updateActiveLink, { passive: true });
		window.addEventListener('resize', updateActiveLink);

		// первый раз сразу
		updateActiveLink();
	}

	if (browser) {
		// запускаем только на клиенте (в SvelteKit это важно!)
		initScrollSpy(100); // 100px — отступ для фиксированного меню
	}

	let anhors = [...Array(5).keys()].map((v, i) => {
		return 'anhor' + String(i + 1);
	});
</script>

<nav class="position-fixed top-0 p-3 d-flex justify-content-end gap-2 w-100 bg-transparent">
	<div class="vr"></div>
	{#each anhors as item, i}
		<a href={'#' + item} class="scroll-link btn btn-sm rounded-3">{item}</a>
	{/each}
</nav>

{#each anhors as item, i}
	<Block id={item} _class="scrollspy">
		<h4>{i + 1}</h4>
	</Block>
{/each}

<style>
	:global(.active) {
		background-color: var(--bs-gray-900);
		color: var(--bs-gray-025);
	}
</style>
