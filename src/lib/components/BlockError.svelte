<script lang="ts">
	import { CircleAlert } from 'lucide-svelte'

	let { message }: { message: string } = $props()
</script>

<div>
	<CircleAlert size={20} />
	{message}
</div>

<style>
	div {
		margin-block: 1rem;
		border-radius: 0.25rem;
		background-color: var(--error-color);
		padding: 0.4rem 0.8rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
</style>
