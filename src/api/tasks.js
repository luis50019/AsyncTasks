import axios from './axios.js';

export const tasksRequest =()=> axios.get('/tasks');
export const createTasksRequest = (task)=>axios.post('/task',task);
export const deleteTasksRequest = (id) => axios.delete(`/tasks/${id}`);
export const taskRequest =(id)=> axios.get(`/task/${id}`);
export const updateTaskRequest = (id, task) => axios.put(`/tasks/${id}`, task);
export const updateSectionRequest = (id,sectionTask) => axios.put(`/taskSection/${id}/${sectionTask}`);
