export type Task = {
	id: string
	title: string
	done: boolean
}

export type TaskFilter = 'all' | 'done' | 'undone'
