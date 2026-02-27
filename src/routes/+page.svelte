<script lang="ts">
	import BlockError from '$lib/components/BlockError.svelte'
	import Filters from '$lib/components/Filters.svelte'
	import Task from '$lib/components/Task.svelte'

	let { data, form } = $props()
</script>

<h1>Manage Tasks</h1>

{#if form?.error}
	<BlockError message={form.error} />
{/if}

<section>
	<h2>Create Task</h2>

	<form action="?/create" method="POST">
		<div class="form-group">
			<input
				class="input"
				type="text"
				name="title"
				aria-label="task title"
				required
				value={form?.title}
			/>
		</div>
		<button class="button">Create</button>
	</form>
</section>

<section>
	<h2>List of Tasks</h2>

	<Filters filter={data.filter} />

	{#each data.tasks as task (task.id)}
		<Task {task} />
	{:else}
		<p>No tasks yet</p>
	{/each}
</section>

<style>
	section {
		margin-bottom: 2rem;
	}
</style>
