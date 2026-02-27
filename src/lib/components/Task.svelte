<script lang="ts">
	import { page } from '$app/state'
	import type { Task } from '$lib/types'
	import { Circle, CircleCheck, Save, SquarePen, Trash, X } from 'lucide-svelte'

	let { task }: { task: Task } = $props()
</script>

<form class="task" class:done={task.done} method="POST">
	<input type="hidden" name="id" value={task.id} />

	{#if page.url.searchParams.get('rename') === task.id}
		<input
			class="title-input"
			type="text"
			aria-label="title"
			name="title"
			value={task.title}
			required
		/>
		<div class="actions">
			<button formaction="?/rename" aria-label="save new name">
				<Save size={20} />
			</button>
			<a href={page.url.pathname} aria-label="cancel">
				<X size={20} />
			</a>
		</div>
	{:else}
		<h3 class="title">{task.title}</h3>

		<div class="actions">
			<a href="{page.url.pathname}?rename={task.id}" aria-label="rename">
				<SquarePen size={20} />
			</a>

			{#if task.done}
				<button formaction="?/toggle_done" aria-label="mark as undone">
					<CircleCheck size={20} />
				</button>
			{:else}
				<button formaction="?/toggle_done" aria-label="mark as done">
					<Circle size={20} />
				</button>
			{/if}

			<button formaction="?/delete" aria-label="delete task">
				<Trash size={20} />
			</button>
		</div>
	{/if}
</form>

<style>
	.task {
		margin-block: 1rem;
		background-color: var(--task-bg-color);
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: 1rem;
	}

	.task:first-of-type {
		margin-top: 2rem;
	}

	.actions {
		display: flex;
		gap: 0.75rem;
	}

	.title-input {
		width: 100%;
		outline: 1px dashed var(--dashed-outline-color);
		outline-offset: 4px;
	}

	.task.done {
		background-color: var(--task-done-bg-color);

		.title {
			text-decoration: line-through;
			opacity: 0.5;
		}
	}
</style>
