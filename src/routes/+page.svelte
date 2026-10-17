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
	class="position-fixed top-0 d-flex justify-content-end gap-2 px-7 py-3 w-100 bg-body bg-20 z-3 flex-wrap"
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

<Block id="anhor1" _class="scrollspy position-relative">
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

{#snippet contact(title: string, phone: string, haveSberLink: boolean = false)}
	<!-- svelte-ignore a11y_consider_explicit_label -->
	<div class="d-flex justify-content-start align-items-center gap-1">
		<div>{phone} {title}</div>
		<a
			href="tel:{phone}"
			target="_blank"
			class="d-flex align-items-center justify-content-center bg-dark text-light text-decoration-none rounded"
			style="width: 1.7rem; height:1.7rem"
		>
			<i class="fa-solid fa-phone-flip text-light" style="font-size: 1.1em;"></i>
		</a>
		<a
			class="d-flex align-items-center justify-content-center bg-success text-light text-decoration-none rounded"
			style="width: 1.7rem; height:1.7rem"
			href="https://api.whatsapp.com/send?phone={phone.replace('+', '')}"
			target="_blank"
		>
			<i class="fa-brands fa-whatsapp text-light" style="font-size: 1.4em;"></i>
		</a>
		{#if haveSberLink}
			<a
				class="d-flex align-items-center justify-content-center bg-success text-light text-decoration-none rounded"
				style="width: 1.7rem; height:1.7rem"
				href="sber://transfer?phone={phone.replace('+', '')}"
				onclick={() => {
					setTimeout(() => {
						window.location.href = 'https://online.sberbank.ru';
						//window.open('https://online.sberbank.ru', '_blank');
					}, 3000);
				}}
			>
				<i class="fa-solid fa-ruble-sign text-light" style="font-size: 1.4em;"></i>
			</a>
		{/if}
	</div>
{/snippet}

<Block
	id="anhor3"
	_class="anhor3 scrollspy d-flex flex-wrap flex-column pt-11"
	_style="min-height: 100vh;"
>
	<h4 class="fs-2xl text-uppercase pt-12 px-9">Расписание богослужений</h4>
	<div class="flex-grow-1 d-flex flex-column justify-content-end p-9 mb-9">
		<div class="text-dark rounded">
			<h5 class="fs-3xl"><b>по субботам</b>- Литургия, панихида (начало в 9:00)</h5>
			<div style="font-size: 1.6em;">
				(В настоящее время, в связи с отсутствием постоянного служащего священника,<br />
				богослужения в нашем скиту совершаются по субботам)
			</div>
		</div>
	</div>
</Block>

<Block
	id="anhor4"
	_class="anhor4 scrollspy d-flex flex-wrap flex-column pt-11"
	_style="min-height: 100vh;"
>
	<h4 class="fs-2xl text-uppercase pt-12 px-9">Контакты</h4>

	<div class="flex-grow-1 d-flex flex-column justify-content-end px-9 pb-9">
		<div class="row w-100 align-content-end">
			<div class="md:col-6">
				<div>
					<div><b>адрес:</b></div>
					<div>Калужская обл., Мещовский р-н, с. Подкопаево,</div>
					<div>Спасо-Преображенский Алексеевский скит</div>
				</div>
				<div>
					<div><b>телефоны:</b></div>
					<div class="d-flex flex-column gap-1">
						{@render contact?.('(иеромонах Савватий)', '+79308404432')}
						{@render contact?.('(монах Лука)', '+79011471012')}
					</div>
					{@render contact?.(
						'Алла Николаевна (сбор средств и организационные вопросы)',
						'+79260753464'
					)}
				</div>
				<div>
					<div><b>соцсети:</b></div>
					<div class="d-flex align-items-center gap-1">
						<div>ВКонтакте</div>
						<!-- svelte-ignore a11y_consider_explicit_label -->
						<a
							class="d-flex align-items-center justify-content-center bg-primary text-decoration-none rounded"
							style="width: 1.7rem; height:1.7rem"
							href="https://vk.com/club234174907"
							target="_blank"
						>
							<i class="fa-brands fa-vk text-light" style="font-size: 1.4em; "></i>
						</a>
					</div>
				</div>
			</div>
			<div class="md:col-6">
				<div>
					<div><b>поддержать наc:</b></div>
					<div class="w-100">
						Скит в данный момент проводит восстановительные работы основного храма в честь
						"Преображения Господня". Будем благодарны вам за строительные материалы (металл и доски
						для крыши, известь и цемент для стен, либо др. материалы).
					</div>
					<div class="w-100">
						Здания в нашем скиту отапливаются дровами, если есть возможность пожертвовать нам дрова
						(либо на дрова), наши сырые стены скажут вам спасибо.
					</div>
					<div>
						Если у вас есть желание нас поддержать, вы можете позвонить по указанным выше телефонам,
						либо поддержать нас через кнопку ниже.
					</div>
					<div>Будем благодарны вам за поддержку.</div>
					<div>
						<a
							href="https://tips.tips/000469264"
							target="_blank"
							class="btn btn-solid theme-success rounded-3 text-light mt-4"
						>
							Поддержать наш скит
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="w-100">
		<div style="position:relative; overflow:hidden;">
			<a
				href="https://yandex.ru/maps/10693/kaluga-oblast/search/%D1%81%D0%BA%D0%B8%D1%82%20%D0%BF%D0%BE%D0%B4%D0%BA%D0%BE%D0%BF%D0%B0%D0%B5%D0%B2%D0%BE%20%D0%B2%D0%BA/?utm_medium=mapframe&utm_source=maps"
				style="color:#eee;font-size:12px;position:absolute;top:0px;"
				>скит подкопаево вк в Калужской области</a
			><a
				href="https://yandex.ru/maps/10693/kaluga-oblast/?utm_medium=mapframe&utm_source=maps"
				style="color:#eee;font-size:12px;position:absolute;top:14px;">Калужская область</a
			>
		</div>
		<iframe
			title="Карта"
			class="border-0"
			src="https://yandex.ru/map-widget/v1/?ll=35.43%2C54.4703&mode=search&sctx=ZAAAAAgBEAAaKAoSCarTgayn3kFAEcHmHDwTMktAEhIJotPzbiwonD8RCRoziXrBlz8iBgABAgMEBSgKOABA9fQHSAFiM3ByaWNlc19zbmlwcGV0c19yYW5raW5nX21vZGVsPW1vZGVsXzIwMjUxMTE4XzE1NTM1OWIrcHJpY2VzX3NuaXBwZXRzX3JhbmtpbmdfbW9kZWxfdGhyZXNob2xkPTAuNWI6cmVhcnI9c2NoZW1lX0xvY2FsL0dlby9TdWJ0aXRsZXMvVXNlUGluR29vZHNQcmljZUZvcm11bGE9MWoCcnWdAc3MzD2gAQCoAQC9Ab6DJE3CAQbhtdfq6wGCAiLRgdC60LjRgiDQv9C%2B0LTQutC%2B0L%2FQsNC10LLQviDQstC6igIAkgIGMTI5NjUzmgIMZGVza3RvcC1tYXBz&sll=35.421875%2C54.470129&source=serp_navig&sspn=0.005450%2C0.001906&text=%D1%81%D0%BA%D0%B8%D1%82%20%D0%BF%D0%BE%D0%B4%D0%BA%D0%BE%D0%BF%D0%B0%D0%B5%D0%B2%D0%BE%20%D0%B2%D0%BA&z=17.15"
			width="100%"
			height="400px"
			frameborder="0"
		></iframe>
	</div>
</Block>

<style>
	:global(.active) {
		background-color: var(--bs-gray-800);
		color: var(--bs-gray-025);
	}
	:global(.anhor3) {
		background-color: var(--bs-cyan-100);
	}
	:global(.anhor4) {
		background-color: var(--bs-green-100);
	}
</style>
