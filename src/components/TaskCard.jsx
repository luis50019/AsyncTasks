import { useTask } from "../context/TasksContext";
import { HiMiniPencil, HiArchiveBoxXMark } from "react-icons/hi2";
import Modal from './Modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { colorTask } from "../functions/colors";
import { sectionTask } from "../functions/sectionTask";

function TaskCard({ task }) {
  const { deleteTask, getTask, updateSectionTask } = useTask();
  const [isUpdate, setIsUpdate] = useState();

  const navigate = useNavigate();

  const closeModal = () => {
    setIsUpdate(false);
    navigate('/tasks');
  }

  const taskUpdate = async (id) => {
    setIsUpdate(true);
    getTask(id)
  }

  const updateSection = async (id, section) => {
    updateSectionTask(id, section);
  }

  return (
    <>
      <Modal isOpen={isUpdate} closeModal={closeModal} />
      <div className={`
          flex flex-row border-2 rounded-[4px] ${colorTask[task.section].border}
          w-11/12
          computer:h-48
          tablet:w-full
          phone:min-w-72 phone:h-48
        `}>

        <div className="flex flex-col gap-y-1 text-wrap font-semibold text-xs text-slate-950 px-1 w-3/4">

          <h3 className="text-lg Desktop:text-3xl font-bold text-slate-900"> {task.nametask} </h3>
          <p className="w-full h-14 text-1xl text-prety border-2 rounded-[2px] border-gray-100 my-5 overflow-y-auto tasks Desktop:text-2xl Desktop:h-28
            phone:h-5/6">
            {task.description}
          </p>
          <p className="my-2 Desktop:text-2xl"> Deadline: {task.deadline} </p>

        </div>

        <div className="flex flex-col items-center justify-end gap-y-3 w-1/4 h-auto py-2 mr-2">
          {
            task.section !== "Done" ? <HiArchiveBoxXMark className=" w-1/3 h-auto text-righ " onClick={() => deleteTask(task._id)} /> : ""
          }
          {
            task.section !== "Done" ? <Link to={`/tasks/${task._id}`} className="w-1/3 Desktop:text-3xl h-auto text-righ " onClick={() => taskUpdate(task._id)}><HiMiniPencil /></Link> : ""
          }
          <button
            onClick={task.section !== "Done" ? () => updateSection(task._id, task.section) : () => deleteTask(task._id)}
            className={`w-5/4 px-1 text-xs text-center text-white font-semibold border rounded-[3px] border-slate-950 ${colorTask[task.section].bgBoton}`}>
            {sectionTask[task.section]}
          </button>
        </div>

      </div>
    </>
  );
}

export default TaskCard;