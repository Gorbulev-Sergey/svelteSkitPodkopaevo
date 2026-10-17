<script lang="ts">
	import type { Snippet } from 'svelte';

	interface IProps {
		id?: string;
		_class?: string;
		children?: Snippet<[]>;
	}
	let { id = $bindable(''), _class, children }: IProps = $props();
</script>

<div {id} class="w-100 {_class}" style="min-height: 100vh;">
	{@render children?.()}
</div>
