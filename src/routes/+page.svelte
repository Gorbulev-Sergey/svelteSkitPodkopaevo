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
	let blur = 'backdrop-filter: blur(.15em);';
</script>

<nav
	class="position-fixed top-0 d-flex justify-content-end gap-2 px-7 py-2 w-100 bg-body bg-20 z-3 flex-wrap"
	style={blur}
>
	<a href={'#' + anhors[0].id} class="border-0 btn rounded-3 bg-body bg-transparent text-uppercase">
		<b>Спасо-Преображенский Алексеевский скит</b>
	</a>
	<div class="flex-grow-1 d-flex align-items-center justify-content-end gap-2">
		{#each anhors as item, i}
			<a
				href={'#' + item.id}
				class="scrollspy-link border-0 btn btn-sm rounded-3 bg-body bg-transparent text-uppercase"
				>{item.title}</a
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
		class="position-absolute d-flex flex-column align-items-end gap-0 bottom-0 end-0 w-100 py-11 px-9 text-end bg-body bg-20"
		style={blur}
	>
		<div class="fg-white">
			<h2 class="fs-4xl text-uppercase">Спасо-Преображенский Алексеевский скит</h2>
		</div>
		<div class="fg-white fg-60">
			<div class="fs-3xl fg-emphasis">Добро пожаловать на наш сайт!</div>
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
	id="anhor2"
	_class="anhor2 scrollspy d-flex flex-wrap flex-column pt-11"
	_style="min-height: 100vh;"
>
	<div class="row px-9 w-100">
		<div class="md:col-8">
			<h4 class="fs-2xl text-uppercase pt-12 pb-3">История Спасо-Преображенского храма</h4>
			<p>
				Храм Преображения Господня в селе Подкопаево Мещовского района Калужской области
				представляет собой кирпичную церковь, построенную после 1670 года, предположительно в 1688
				году, по заказу боярина Фёдора Абрамовича Лопухина. Архитектурный облик храма выполнен в
				стиле «московского барокко»: двусветный кубический объём завершён двумя ярусами закомар и
				пятиглавием, с западной стороны к нему примыкает трапезная, с восточной — трёхчастная
				апсида. Изначально задумывался как соборный храм монастыря, который Лопухин планировал
				основать для перевода туда своей дочери, царицы Евдокии Фёдоровны, первой супруги Петра I.
			</p>
			<p>
				В 1701 году рядом была возведена кирпичная надвратная церковь святителя Алексия, митрополита
				Московского, типа «иже под колоколы». Её архитектурная композиция включает кубический
				одноапсидный объём с восьмигранным столпом двухъярусной шатровой колокольни. Оба храма до
				1820-х годов были обнесены каменной оградой, ныне утраченной. В XVIII веке усадьба
				принадлежала Лопухиным, в XIX веке перешла к помещику Н. Рюмину, а в 1910 году — к В. Н.
				Томановской.
			</p>
			<p>
				В конце 1930-х годов храмы были закрыты и приспособлены под хозяйственные нужды:
				Преображенская церковь использовалась как склад и мастерские, Алексиевская — для хранения
				удобрений. В 1990-х годах оба храма переданы Калужской епархии. В ходе ремонтных работ в
				Преображенском храме обнаружен фрагмент белокаменного надгробия XVII века. В 2004 году
				освящён Преображенский храм, в 2009 году — Алексиевский. С 2008 года ансамбль функционирует
				как Спасо-Преображенский Алексиевский скит Свято-Георгиевского Мещовского монастыря.
			</p>
			<p>
				Село Подкопаево (известное также как Спасское-Подкопаево или Преображенское) с середины XVII
				века принадлежало роду Лопухиных. Здесь родилась Прасковья Илларионовна Лопухина — будущая
				царица Евдокия Фёдоровна. По местным преданиям, не подтверждённым документально, царица
				некоторое время содержалась в основанном отцом монастыре, а царевич Алексей Петрович посещал
				её. Легенда о подземном ходе, ведущем к Георгиевскому монастырю в Мещовске, исторических
				свидетельств не имеет.
			</p>
		</div>
		<div class="md:col-4">
			<h4 class="fs-2xl text-uppercase pt-12 pb-4">Скит сегодня</h4>
			<iframe
				title="Скит сегодня"
				class="rounded-3 border-0"
				src="https://rutube.ru/play/embed/415ce371d9aeeacc51a26fe9b6eb834e"
				width="100%"
				height="300"
				allow="clipboard-write; autoplay"
				allowFullScreen
			></iframe>
		</div>
	</div>

	<h4 class="fs-2xl text-uppercase pt-12 px-9 pb-3">История Села Подкопаево</h4>
	<div class="px-9 pb-9">
		<p>
			Село Подкопаево (Спасское-Подкопаево, Преображенское) c середины XVII века принадлежало
			дворянскому роду Лопухиных, как и соседнее Серебряно, в котором 20 июля 1669 года полковника
			Иллариона Абрамовича (Авраамовича) Лопухина и его жены Устиньи Богдановны (урожд. Ртищевой)
			родилась дочь Прасковья – будущая царица Евдокия Фёдоровна, первая супруга Петра I.
		</p>
		<p>
			Царицей Наталией Кирилловной Лопухина была выбрана в невесты молодому царю Петру I. На решение
			спешно женить 17-летнего сына повлияла новость о беременности царицы Прасковьи Фёдоровны, жены
			царя Ивана V Алексеевича, единокровного брата и соправителя Петра. Ребёнок которой мог стать
			наследником престола. Венчание Петра I и Прасковьи Лопухиной состоялось 27 января 1689 года,
			при этом имя и отчество новобрачной были изменены. В соответствии с традицией, царица получила
			отчество Фёдоровна. Обычай менять отчество цариц связывают с реликвией Романовых Фёдоровской
			иконой Божьей Матери. А имя новобрачной, по-видимому, изменили, чтобы не было одновременно
			двух цариц с одинаковым именем. Отец новоиспеченной царицы вошёл в историю как Фёдор Абрамович
			(Авраамович) Лопухин.
		</p>
		<p>
			В царской семье родилось двое сыновей, из которых младший Александр, родившийся в 1691 году, в
			следующем году скончался, а старшему – Алексею, родившемуся в 1690 году, в 1718-м был вынесен
			смертный приговор. Брачный союз не был счастливым. Охладевший к жене царь увлёкся Анной Монс и
			в 1698 году заставил царицу принять монашеский постриг. Лопухину отправили сначала в
			суздальский Покровский, а затем в Ладожский Успенский монастырь. После кончины Петра I его
			вторая жена императрица Екатерина I перевела Лопухину в крепость Шлиссельбург. Пётр II вернул
			узницу, приходившуюся ему бабушкой, в Москву, где она в почёте и достатке проживала в
			Новодевичьем монастыре. Лопухина скончалась в 1731 году и была погребена в Смоленском соборе
			обители.
		</p>
		<p>
			Многочисленные представители рода Лопухиных, которые после единоличного воцарения Петра I
			получили боярство, высокие посты и земли, позднее были заподозрены в неблагонадежности и
			удалены из Москвы. Своего тестя боярина Фёдора Абрамовича Пётр I назначил воеводой в Тотьму,
			его братьев послал воеводствовать в Саранск, Вязьму, Казань. В 1705 году Ф. А. Лопухин показан
			в списке бояр, живущих в своих деревнях, в том же году он основал в Мещовске Афанасьевский
			Петропавловский женский монастырь (упразднён в 1764 году). Скончался Лопухин в 1713 году,
			погребён в Москве, в родовой усыпальнице в церкви Михаила Архангела Спасо-Андроникова
			монастыря.
		</p>
		<p>
			Храмовый комплекс расположен на возвышении на южной границе села, раскинувшегося на берегах
			речки Песочни (Окский бассейн).
		</p>
		<p>
			Кирпичная церковь Преображения Господня была построена после 1670 года (предположительно в
			1688 году) по заказу и на средства Ф. А. Лопухина. Её двусветный кубический объём завершён
			двумя ярусами закомар и пятиглавием. С запада к основному объёму примыкает трапезная, с
			востока – трёхчастная апсида. Церковь декорирована в духе «московского барокко». Задумывалась
			как соборный храм монастыря, который Лопухин намеревался основать в надежде получить
			разрешение перевести туда опальную дочь.
		</p>
		<p>
			Стоящая поблизости кирпичная церковь свт. Алексия, митрополита Московского, относящаяся к типу
			«иже под колоколы», построена в 1701 году также по заказу и на средства Ф. А. Лопухина. Над
			ярусом проездных ворот расположен кубический одноапсидный объём храма, увенчанный
			восьмигранным столпом двухъярусной шатровой колокольни. Алексиевский храм стал надвратной
			церковью монастыря. Храмовый комплекс до 1820-х годов был обнесён каменной оградой (утрачена).
		</p>
		<p>
			Согласно местным преданиям, не подтверждаемым документально, Лопухина некоторая время
			содержалась в основанном отцом монастыре, к ней якобы приезжал сын – царевич Алексей Петрович.
			Легенда о существовании подземного хода, ведущего от Алексиевской церкви до Мещовского
			Георгиевского монастыря (восстановлен и действует), по которому Лопухина «на золотой карете»
			ездила в обитель, не имеет под собой никакой реальной основы.
		</p>
		<p>
			Усадьба принадлежала Лопухиным до конца XVIII века, в XIX веке её хозяевами стал помещик Н.
			Рюмин, в 1910 году – В. Н. Томановская – возможно, Вера (Елена) Николаевна Тучкова, ставшая
			женой Николая Дмитриевича Томановского, офицера лейб-гвардии гусарского полка. В середине XIX
			века в усадьбе был разбит парк, остатки которого сохраняются до сих пор (усадебные постройки
			не сохранились).
		</p>
		<p>
			Преображенская и Алексиевская церкви были закрыты в конце 1930-х годов и приспособлены под
			хозяйственные нужды. Преображенская церковь использовалась под склад и мастерские по ремонту
			сельхозтехники, в Алексиевской хранили удобрения.
		</p>
		<p>
			Переданные в 1990-х годах епархии, обе церкви ремонтировались. В ходе ремонта в Преображенском
			храме, в пороге северного портала был обнаружен хорошо сохранившийся фрагмент белокаменного
			надгробия XVII века. В 2004 году освящена Преображенская церковь, в 2009-м – году
			Алексиевская. Начато восстановление всего храмового комплекса. Начато строительство
			Алексиевского скита.
		</p>
	</div>
</Block>

<Block
	id="anhor3"
	_class="anhor3 scrollspy d-flex flex-wrap flex-column pt-11"
	_style="min-height: 100vh;"
>
	<h4 class="fs-2xl text-uppercase pt-12 px-9">Расписание богослужений</h4>
	<div class="flex-grow-1 d-flex flex-column justify-content-end p-9 mb-9">
		<div class="text-dark rounded">
			<h5 class="fs-3xl"><b>по субботам</b>- Литургия, панихида (начало в 9:00)</h5>
			<div class="fs-2xl">
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
	<div class="d-flex align-items-center pt-12 px-9">
		<h4 class="fs-2xl text-uppercase w-100">Контакты</h4>
		<div>
			<a
				href="https://tips.tips/000469264"
				target="_blank"
				class="btn btn-lg btn-solid theme-inverse rounded-3 text-uppercase"
			>
				Поддержать наш скит
			</a>
		</div>
	</div>

	<div class="flex-grow-1 d-flex flex-column justify-content-end px-9 pb-9">
		<div class="row w-100">
			<div class="md:col-6">
				<div class="d-flex flex-column justify-content-end align-items-start h-100">
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
			</div>
			<div class="md:col-6">
				<div class="d-flex flex-column justify-content-end align-items-start h-100">
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
				</div>
			</div>
		</div>
	</div>

	<div class="w-100">
		<div class=" position-relative">
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
	:global(body) {
		font-size: 1.15rem;
	}
	:global(.active) {
		background-color: var(--bs-gray-800);
		color: var(--bs-gray-025);
	}
	:global(.anhor2) {
		background-color: var(--bs-white);
	}
	:global(.anhor3) {
		background-color: var(--bs-blue-200);
	}
	:global(.anhor4) {
		background-color: var(--bs-white);
	}
</style>
