import { Access_Token } from '$app/env/public';
import { query } from '$app/server';

export const getPhotos = query(async () => {
	const result = await fetch(
		'https://cloud-api.yandex.net/v1/disk/resources?path=Подкопаево/Общий%20вид&media_type=image',
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
	return files;
});
