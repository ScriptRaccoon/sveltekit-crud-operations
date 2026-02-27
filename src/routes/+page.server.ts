import {
	create_task,
	delete_task,
	get_tasks,
	rename_task,
	toggle_task_done,
} from '$lib/server/tasks'
import type { TaskFilter } from '$lib/types'
import { fail } from '@sveltejs/kit'

function get_filter(url: URL): TaskFilter {
	const filter = url.searchParams.get('filter')
	if (filter === 'done' || filter === 'undone') return filter
	return 'all'
}

export const load = async (event) => {
	const filter = get_filter(event.url)
	const tasks = await get_tasks(filter)

	return { tasks, filter }
}

export const actions = {
	create: async (event) => {
		const form = await event.request.formData()
		const title = form.get('title') as string

		if (!title) {
			return fail(400, { error: 'Title required', title })
		}

		if (title.length > 100) {
			return fail(400, { error: 'Title must be at most 100 characters long', title })
		}

		await create_task(title)
	},

	toggle_done: async (event) => {
		const form = await event.request.formData()
		const task_id = form.get('id') as string
		await toggle_task_done(task_id)
	},

	rename: async (event) => {
		const form = await event.request.formData()
		const task_id = form.get('id') as string
		const new_title = form.get('title') as string

		if (!new_title) {
			return fail(400, { error: 'Title required' })
		}

		if (new_title.length > 100) {
			return fail(400, { error: 'Title must be at most 100 characters long' })
		}

		await rename_task(task_id, new_title)
	},

	delete: async (event) => {
		const form = await event.request.formData()
		const task_id = form.get('id') as string
		await delete_task(task_id)
	},
}
