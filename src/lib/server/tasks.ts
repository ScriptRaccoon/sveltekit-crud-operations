import type { Task, TaskFilter } from '$lib/types'
import crypto from 'node:crypto'

// in memory map of tasks, replace with db table if necessary
const tasks: Map<string, Task> = new Map()

export async function get_tasks(filter: TaskFilter) {
	const all_tasks = [...tasks.values()]
	if (filter === 'done') {
		return all_tasks.filter((task) => task.done)
	}
	if (filter === 'undone') {
		return all_tasks.filter((task) => !task.done)
	}
	return all_tasks
}

export async function create_task(title: string) {
	const id = crypto.randomUUID()
	const task: Task = { id, title, done: false }
	tasks.set(id, task)
	return task
}

export async function toggle_task_done(id: string) {
	const task = tasks.get(id)
	if (!task) return
	task.done = !task.done
	return task
}

export async function rename_task(id: string, new_title: string) {
	const task = tasks.get(id)
	if (!task) return
	task.title = new_title
	return task
}

export async function delete_task(id: string) {
	tasks.delete(id)
}
