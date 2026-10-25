import { Access_Token } from '$env/static/private';
import { query } from '$app/server';

export const getFolders = query(async () => {
	const result = await fetch('https://cloud-api.yandex.net/v1/disk/resources?path=Подкопаево', {
		method: 'GET',
		headers: {
			Authorization: `OAuth ${Access_Token}`
		}
	});
	const json = await result.json();
	let folders = json._embedded.items
		.filter((item) => item.type === 'dir')
		.map((i) => {
			return i.name;
		});
	console.log(folders);
	return folders as string[];
});

export const getPhotos = query('unchecked', async (folder) => {
	const result = await fetch(
		`https://cloud-api.yandex.net/v1/disk/resources?path=Подкопаево/${folder}&media_type=image`,
		{
			method: 'GET',
			headers: {
				Authorization: `OAuth ${Access_Token}`
			}
		}
	);
	const json = await result.json();
	let files = json._embedded.items
		.filter((item) => item.media_type === 'image')
		.map((i) => {
			return i.file;
		});
	return files as string[];
});
