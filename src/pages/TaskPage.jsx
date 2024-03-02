
import { useTask } from '../context/TasksContext';
import { useEffect } from 'react';
import TaskCard from '../components/TaskCard';

function TaskPage() {

  const { getTasks, tasks} = useTask();

  useEffect(() => {
    getTasks();
  },[]);

  return (
    <div className={`col-start-2 col-end-6 row-start-1 row-end-3 h-11/12 w-full
      tablet:col-start-1 tablet:col-end-6 tablet:row-start-2 tablet:row-end-3
      phone:col-start-1 phone:col-end-6 phone:row-start-2 phone:row-end-3 phone:h-full
    `}>
{/* mt-44 */}
      <div className={`
        w-full h-5/6 flex flex-col items-start gap-y-4 mt-5
        phone:grid phone:grid-cols-5 phone:grid-rows-[80px_1fr_1fr] phone:h-full phone:mt-0
      `}>

        <h2 className={`
          text-sky-900 font-bold text-left w-full text-7xl phone:col-start-1 phone:col-end-6 phone:row-start-1 phone:row-end-2 
          phone:w-full phone:text-5xl phone:px-6
        `}>Task <sub className='text-sm text-red-200'> ( alpha version )</sub></h2>

        <div className={`
          w-full flex justify-around text-left Desktop:text-3xl phone:text-[12px] phone:font-black
          phone:col-start-1 phone:col-end-2 phone:row-start-2 phone:row-end-4 phone:flex-col phone:h-full
        `}>
          <div className="w-1/4 phone:w-full">
            <p className='font-semibold px-2 text-wrap'>{`To do| ${tasks.start ? tasks.start.length : 0 }`}</p>
          </div>
          <div className="w-1/5 phone:w-full">
            <p className='font-semibold px-2 text-center phone:px-0 text-wrap'>{`In progress| ${tasks.progress ? tasks.progress.length : 0 }`}</p>
          </div>
          <div className="w-1/4 phone:w-full text-wrap">
            <p className='font-semibold px-2'>{`Done| ${tasks.Done ? tasks.Done.length : 0 }`}</p>
          </div>
        </div>

        <div className="w-full Desktop:h-5/6 h-5/6 flex gap-x-1 gap-y-6 phone:col-start-2 phone:col-end-6
          phone:row-start-2 phone:row-end-4 phone:gap-y-10 phone:flex-col phone:h-full" >

          <div className={`
            flex items-start gap-x-2 flex-col w-1/3 overflow-y-auto tasks
            Desktop:gap-y-5 computer:gap-y-2 mr-8 tablet:mr-0 tablet:ml-2 tablet:gap-y-3
            phone:h-full phone:w-full phone:flex-row phone:overflow-x-auto phone:min-h-56 phone:max-h-56
          `}>
            {
              tasks.start && tasks.start.map((task)=>(<TaskCard task={task} key={task._id}/>))
            }
          </div>

          <div className={`
            items-start gap-x-2 flex flex-col w-1/3 overflow-y-auto tasks
            Desktop:gap-y-5 computer:gap-y-2 mr-8 tablet:mr-0 tablet:ml-2 tablet:gap-y-3
            phone:h-full phone:w-full phone:flex-row phone:overflow-x-auto phone:min-h-56 phone:max-h-56
          `}>
            {
              tasks.progress && tasks.progress.map((task)=>(<TaskCard task={task} key={task._id}/>))
            }
          </div>

          <div className={`
            flex gap-x-2 flex-col w-1/3 overflow-y-auto tasks
            Desktop:gap-y-5 computer:gap-y-2 mr-8 tablet:mr-0 tablet:ml-2 tablet:gap-y-3
            phone:h-full phone:w-full phone:flex-row phone:overflow-x-auto phone:min-h-56 phone:max-h-56
          `}>
            {
              tasks.Done && tasks.Done.map((task)=>(<TaskCard task={task} key={task._id}/>))
            }
          </div>
        </div>
      </div>

    </div>
  );
}

export default TaskPage;