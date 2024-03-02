import {useForm } from "react-hook-form";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { IoMdClose } from "react-icons/io";
import { useTask } from "../context/TasksContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

dayjs.extend(utc);

function ModalFormTask({ isOpen = false, closeModal}) {

	const { register, handleSubmit, formState: { errors }, setValue } = useForm();
	const { createTask, updateTask, updateTasks} = useTask();
	const params = useParams();

	const onsubmit = handleSubmit((data) => {

		if(params.id){
			updateTasks(params.id, data);
		}else{

			createTask(data);
			setValue('nametask', null);
			setValue('description', null);
			setValue('deadline', null);
		}
		closeModal();
	});

	useEffect(()=>{
		if(params.id){
			setValue('nametask', updateTask.nametask);
			setValue('description', updateTask.description);
			setValue('deadline', updateTask.deadline);
		}
	},[updateTask]);

	return (
		<div className={`
			z-10 absolute left-10 ${isOpen ? 'block' : 'hidden'} bg-white border-2 border-sky-900 rounded-lg
			Desktop:w-1/3 Desktop:h-auto  Desktop:top-24
			computer:top-16 computer:w-1/3 computer:h-auto
			tablet:left-80 tablet:top-5 tablet:w-1/2 tablet:h-auto
			phone:w-11/12 phone:left-5 phone:top-2 phone:h-auto
		`}>
			
			<div className="w-full bg-sky-900 flex justify-end px-4 tablet:h-10">
				<IoMdClose onClick={closeModal} className="text-4xl text-white computer:text-3xl " />
			</div>

			<form onSubmit={onsubmit} 
				className={`
					w-full h-full flex flex-col justify-around items-center gap-y-10
				`}> 

				<div className="flex flex-col items-center w-2/4 mt-7">
					<label className={`
						text-left font-semibold text-slate-950 w-full
						Desktop:text-7xl
					`}>Tittle: </label>
					<input
						className={`
							w-full border-b-2 border-slate-950 bg-transparent outline-none font-semibold text-slate-950
							Desktop:h-24 Desktop:text-4xl
						`}
						type="text"
						placeholder="Tittle"
						{...register('nametask', { required: true })} />
					<div className="text-red-500 font-semibold h-1 w-full text-left Desktop:text-5xl">
						{errors.nametask && <p>The tittle is required</p>}
					</div>
				</div>

				<div className="flex flex-col items-center w-2/4">
					<label className={`
						w-full text-left font-semibold text-slate-950
						Desktop:text-7xl
					`}>Description: </label>

					<textarea
						className={`
							border border-slate-900 w-full Desktop:text-5xl rounded-lg bg-white px-3 overflow-y-auto outline-none
							Desktop:min-h-96 Desktop:max-h-96
							computer:min-h-24 computer:max-h-24
							tablet:min-h-24 tablet:max-h-24
							phone:min-h-36 phone:max-h-36
						`}
						rows="3"
						placeholder="Description"
						{...register('description', { required: true })} />

					<div className="text-red-500 font-semibold h-1 w-full text-left Desktop:text-5xl">
						{errors.description && <p>The description is required</p>}
					</div>

				</div>

				<div className="flex flex-col w-2/4 items-start">
					<label className={`
						w-2/4 font-semibold text-slate-950
						Desktop:text-7xl
					`} >Deadline: </label>

					<input type="date" className={`
						w-full text-slate-950 font-semibold bg-transparent outline-none
						Desktop:text-4xl
					`} {...register('deadline', { required: true })} />
					<div className="text-red-500 font-semibold h-1 w-64 text-left Desktop:text-5xl Desktop:w-full">
						{errors.deadline && <p>The date is required</p>}
					</div>
				</div>

				<button type="submit" className={`
					bg-sky-900 text-white font-semibold text-lg w-2/4 mb-7 rounded-lg 
					Desktop:h-16 Desktop:text-5xl hover:bg-sky-950
				`}>submit</button>

			</form>

		</div>
	);
}

export default ModalFormTask;