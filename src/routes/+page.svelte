<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap-icons/font/bootstrap-icons.min.css';
	import Block from '#lib/components/Block.svelte';
	import { browser } from '$app/env';

	function initScrollSpy(offset = 100) {
		// Ищем все ссылки, у которых есть класс "scrollspy-link"
		const links = document.querySelectorAll('.scrollspy-link');
		// Ищем все div, у которых есть класс "scrollspy" и есть id
		const scrollspyItems = Array.from(
			document.querySelectorAll<HTMLDivElement>('div.scrollspy[id]')
		).filter((el) => el.offsetHeight > 0);

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

	interface IAnhor {
		title?: string;
		description?: string;
		id?: string;
	}
	let anhors: IAnhor[] = [
		{ title: 'Главная', id: 'anhor1' },
		{ title: 'История', id: 'anhor2' },
		{ title: 'Расписание', id: 'anhor3' },
		{ title: 'Контакты', id: 'anhor4' }
	];
	let blur = 'backdrop-filter: blur(.1em);';
</script>

<nav
	class="position-fixed top-0 d-flex justify-content-end gap-2 p-3 w-100 bg-body bg-20 z-3 flex-wrap"
	style={blur}
>
	<a href={'#' + anhors[0].id} class="border-0 btn rounded-3 bg-body bg-transparent text-uppercase">
		<b>Спасо-Преображенский Алексеевский скит</b>
	</a>
	<div class="flex-grow-1 d-flex align-items-center justify-content-end gap-2">
		{#each anhors as item, i}
			<a
				href={'#' + item.id}
				class="scrollspy-link border-0 btn btn-sm rounded-3 bg-body bg-transparent">{item.title}</a
			>
		{/each}
	</div>
</nav>

{#each anhors as item, i}
	{#if item.id === 'anhor1'}
		<Block id={item.id} _class="scrollspy position">
			<div
				class="w-100"
				style="height: 100vh; background-size: cover; background-position: center; background-image: url('https://sun9-61.vkuserphoto.ru/s/v1/ig2/RyI25JH9h00-gCxnh1atNmKXhLom-44mBHJrNIfPdf2dAF_m9997U-gjzjZ0bzUyE6vdfZR84KYe-tvfo4u2hWW_.jpg?quality=95&as=32x18,48x27,72x40,108x61,160x90,240x135,360x202,480x270,540x303,640x359,720x404,1080x607,1280x719,1440x809,2560x1438&from=bu&cs=2560x0');"
			></div>
			<div
				class="position-absolute d-flex flex-column align-items-end gap-0 bottom-0 end-0 w-100 py-8 px-6 text-end bg-body bg-20"
				style={blur}
			>
				<div class="fg-white">
					<h2 class="fs-4xl text-uppercase">Спасо-Преображенский Алексеевский скит</h2>
				</div>
				<div class="">
					<div class="fs-3xl fg-emphasis">Добро пожаловать на наш сайт</div>
				</div>
			</div>
		</Block>
	{:else}
		<Block id={item.id} _class="scrollspy position">
			<h4>{item.title}</h4>
		</Block>
	{/if}
{/each}

<style>
	:global(.active) {
		background-color: var(--bs-gray-800);
		color: var(--bs-gray-025);
	}
</style>
