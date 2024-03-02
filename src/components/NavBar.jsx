import { Link } from 'react-router-dom';
import addTaskImg from '../img/anadir.jpeg'
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router';
import { paths } from '../functions/path.js';
import Modal from './Modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiArrowLeftOnRectangle } from "react-icons/hi2";

function NavBar() {
	const location = useLocation();
	const [isOpen,setIsOpen] = useState(false);
	const { isAutenticated,logOut } = useAuth();
	const navigate = useNavigate();

	const closeModal = ()=>{
		setIsOpen(false);
		navigate('/tasks');
	}
	
	return (
		<>
			<Modal isOpen={isOpen} closeModal={closeModal}/>
			{
				/* 
					onClick={()=> setIsOpen(true)} 
					<Link className="w-3/4"><img src={profileImg} /></Link> 
					<Link to='/tasks' className="w-3/4"><img src={homeImg} /></Link>				
				*/
				isAutenticated || location.pathname == "/tasks" ? (
					<>
						<div className={`col-start-1 col-end-2 row-start-1 row-end-3 w-full h-11/12 
							tablet:col-start-1 tablet:col-end-6 tablet:row-start-1 tablet:row-end-2 tablet:justify-around tablet:items-center
							phone:col-start-1 phone:col-end-6 phone:row-start-1 phone:row-end-2 phone:justify-around phone:items-start phone:py-2 
							phone:gap-x-5
							flex flex-row gap-x-14 items-center
							Desktop:flex-col Desktop:gap-y-80
							computer:flex-col computer:gap-y-28 computer:h-5/6
						`}>
							<h1 className={`
									text-blue-800 font-bold 
									Desktop:text-7xl 
									computer:text-4xl 
									tablet:text-5xl
									phone:text-2xl phone:px-1
							`}><Link to='/'>AsyncTasks</Link></h1>
							<div className={`
								border border-black rounded-full flex flex-col items-center px-7
								Desktop:w-36 Desktop:h-96 Desktop:gap-y-16 Desktop:py-16
								computer:w-3 computer:h-48 computer:gap-y-8 computer:py-10
								tablet:flex-row tablet:h-14 tablet:w-56 tablet:justify-center tablet:gap-x-10
								phone:flex-row phone:h-10 phone:w-32 phone:justify-center phone:gap-x-5
							`}>
								
								<Link to ='/newTask' onClick={()=> setIsOpen(true)} className={`Desktop:w-24 computer:w-10 tablet:w-10 phone:w-10`}>
									<img src={addTaskImg} className='Desktop:w-full'/>
								</Link>
								<Link className={`Desktop:w-24 computer:w-10 tablet:w-10 phone:w-10 text-blue-950 cursor-pointer`} onClick={()=>logOut()}>
									<HiArrowLeftOnRectangle  className='w-full h-full'/>
								</Link>
							</div>

						</div>
					</>
				) :
					(
						<>
							<div className={`col-start-1 col-end-6 row-start-1 row-end-2 flex justify-around items-start w-full
								tablet:mt-5 Desktop:mt-28 computer:mt-7 phone:mt-2 phone:h-10 phone:gap-x-10
							`}>
								<div className={`
									flex justify-between items-center h-5 w-full
									Desktop:px-28
									computer:px-16
									tablet:px-8
									phone:px-3
								`}>
									<h1 className={`
											text-blue-800 font-bold 
											Desktop:text-9xl 
											computer:text-6xl 
											tablet:text-4xl
											phone:text-2xl
									`}><Link to='/'>AsyncTasks</Link></h1>

									<p className={`
										font-semibold 
										Desktop:text-6xl
										computer:text-2xl
										tablet:text-1xl
										phone:text-sm
									`}>
										{`${paths[location.pathname].message}`}<Link to={`/${paths[location.pathname].link}`} className='underline text-blue-600' >{`${paths[location.pathname].link}`}</Link>
									</p>
								</div>

							</div>
						</>
					)
			}
		</>
	);
}

export default NavBar;