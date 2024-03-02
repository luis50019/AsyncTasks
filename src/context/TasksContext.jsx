import { createContext, useContext, useState } from "react";
import { tasksRequest, createTasksRequest, updateSectionRequest, deleteTasksRequest, taskRequest, updateTaskRequest } from '../api/tasks.js'

export const TasksContext = createContext();

export const useTask = () => {
	const context = useContext(TasksContext);
	if (!context) {
		throw new Error('useTask must be used within an TasksProvider');
	}

	return context;
}

export function TasksProvider({ children }) {

	const [tasks, setTasks] = useState({});
	const [updateTask, setUpdateTask] = useState();

	function filterTasks(data) {
		const startTasks = [];
		const progressTasks = [];
		const doneTasks = [];

		data.forEach(task => {

			switch (task.section) {
				case "start":
					startTasks.push(task);
					break;
				case "progress":
					progressTasks.push(task);
					break;
				case "Done":
					doneTasks.push(task);
					break;
				default:
					break;
			}
		});
		setTasks({ start: startTasks, progress: progressTasks, Done: doneTasks });
	}

	const getTasks = async () => {
		try {
			const res = await tasksRequest();
			if (res.data.length !== 0) {
				filterTasks(res.data);
			} else {
				setTasks({ start: [], progress: [], Done: [] });
			}
		} catch (error) {
			console.log(error);
		}
	}


	const getTask = async (id) => {
		try {
			const res = await taskRequest(id);
			setUpdateTask(res.data);
		} catch (error) {
			console.log(error);
		}
	}

	const createTask = async (task) => {
		try {
			const res = await createTasksRequest(task);
			getTasks();
		} catch (error) {
			console.log(error.message);
		}
	}
	const updateTasks = async (id, task) => {
		try {
			const res = await updateTaskRequest(id, task);
			getTasks()
		} catch (error) {
			console.log(error);
		}
	}

	const updateSectionTask = async (id, section) => {
		try {
			const res = await updateSectionRequest(id, section);
			getTasks();
		} catch (error) {
			console.log(error);
		}
	}

	const deleteTask = async (id) => {
		try {
			const res = await deleteTasksRequest(id);

			if (res.status === 204) {
				const { start, progress, Done } = tasks;

				const updateStart = start.filter((task) => task._id !== id);
				const updateProgress = progress.filter((task) => task._id !== id);
				const updateDone = Done.filter((task) => task._id !== id);

				setTasks({ start: updateStart, progress: updateProgress, Done: updateDone });
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<TasksContext.Provider value={{
			getTasks,
			createTask,
			deleteTask,
			getTask,
			updateTasks,
			updateSectionTask,
			tasks,
			updateTask
		}}>
			{children}
		</TasksContext.Provider>
	);

}