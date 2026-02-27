<script lang="ts">
	import { page } from '$app/state'
	import type { TaskFilter } from '$lib/types'

	let { filter }: { filter: TaskFilter } = $props()
</script>

<nav aria-label="Task filter">
	<a href={page.url.pathname} aria-current={filter === 'all'}>All</a>

	<a href="{page.url.pathname}?filter=done" aria-current={filter === 'done'}>Done</a>

	<a href="{page.url.pathname}?filter=undone" aria-current={filter === 'undone'}>Undone</a
	>
</nav>

<style>
	nav {
		display: flex;
		gap: 0.5rem;
	}

	a {
		display: inline-block;
		text-decoration: none;
		border: 1px solid var(--font-color);
		padding: 0.1rem 0.75rem;
		border-radius: 100vw;
		font-size: 0.75rem;
		opacity: 0.75;
	}

	a[aria-current='true'] {
		opacity: 1;
		background-color: var(--font-color);
		color: var(--bg-color);
	}
</style>
