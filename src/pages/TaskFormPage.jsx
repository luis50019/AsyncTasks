import { useForm } from "react-hook-form";
import {useTask} from '../context/TasksContext';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { useNavigate } from "react-router-dom/dist";

dayjs.extend(utc);

function TaskFormPage() {

	const { register, handleSubmit, formState: { errors } } = useForm();
	const {createTask} = useTask();
	const navigate = useNavigate();

	const onsubmit = handleSubmit((data) => {
		const dataValid = {
			...data,
			deadline: data.deadline ? dayjs.utc(data.deadline).format() : dayjs.utc().format() 
		}

		createTask(dataValid);
		navigate('/tasks');
	})

	return (
		<div className=" w-full h-auto flex justify-center">

			<form className="w-3/4 h-auto flex flex-col gap-y-4 " onSubmit={onsubmit}>

				<div className="flex flex-col">
					<label className="text-lg font-bold text-blue-700">Tittle: gegrgrg</label>
					<input
						className="border-b-2 border-slate-900 outline-none font-semibold"
						type="text"
						placeholder="Tittle"
						{...register('nametask', { required: true })} />
					<div className="text-red-500 font-semibold h-1 w-64 text-left">
						{errors.nameTask && <p>The tittle is required</p>}
					</div>
				</div>

				<div className="flex flex-col">
					<label className="text-lg font-bold text-blue-700">Description: </label>
					<textarea
						className="border border-slate-900"
						rows="3"
						placeholder="Description"
						{...register('description', { required: true })} />
					<div className="text-red-500 font-semibold h-1 w-64 text-left">
						{errors.description && <p>The description is required</p>}
					</div>
				</div>

				<div>
					<label className="text-lg font-bold text-blue-700" >Date: </label>
					<input type="date" className="border-b-2 border-slate-900 outline-none" {...register('deadline', { required: true })} />
					<div className="text-red-500 font-semibold h-1 w-64 text-left">
						{errors.deadline && <p>The date is required</p>}
					</div>
				</div>

				<button type="submit" className="border border-slate-900">submit</button>

			</form>

		</div>
	);
}

export default TaskFormPage;