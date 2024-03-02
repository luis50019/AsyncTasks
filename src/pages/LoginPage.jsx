import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import img from '../img/img_login.jpeg';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

function LoginPage() {

	const { register, handleSubmit, formState: { errors } } = useForm();
	const { isAutenticated, singIn, errors: sigInErrors } = useAuth();

	const navigate = useNavigate();

	const onSubmit = handleSubmit((data) => {
		singIn(data);
		console.log(sigInErrors);

	});

	useEffect(() => {
		if (isAutenticated) navigate('/tasks');

	}, [isAutenticated]);
	
	return (
		<>
			<div className={`col-start-1 col-end-6 row-span-2
					w-full h-full flex py-16
					Desktop:flex-row-reverse Desktop:items-center Desktop:py-56 
					computer:flex-row-reverse computer:items-center computer:justify-around computer:h-11/12
					tablet:flex-col tablet:justify-around
					phone:flex-col phone:gap-y-16 phone:h-11/12
			`}>

				<div className={` contenedor of form 
						flex items-center justify-center flex-col w-auto
						computer:gap-y-2
						Desktop:gap-y-12 Desktop:w-full
						phone:h-1/3
				`}>

					<h2 className={`
							w-full text-center font-bold
							computer:text-5xl
							Desktop:text-9xl
							tablet:text-3xl
							phone:text-3xl
					`}>Welcome back!</h2>

					<h2 className={`
						font-semibold text-slate-500 text-center w-full mb-1
						Desktop:text-3xl
						tablet:text-1xl
					`}>Login to continue</h2>'

					<form className={`
						flex flex-col items-center 
						computer:w-full computer:h-5/6 computer:gap-y-2
						Desktop:w-2/4 Desktop:h-auto Desktop:gap-y-11
						tablet:w-full
					`} onSubmit={onSubmit}>

						<input
							type="text"
							className={`
								border-b-2 border-slate-950 outline outline-none w-64 h-9 
								computer:w-full computer:text-1xl
								Desktop:w-full Desktop:h-20 Desktop:text-4xl
								tablet:w-2/4 tablet:h-10 tablet:text-1xl
							`}
							{...register('email', { required: true })}
							placeholder="email@gmail.com" autoFocus />

						<div className="text-red-500 font-semibold h-3 w-64 text-left">
							{errors.email && <p>The email is required</p>}
						</div>

						<input
							type="password"
							className={`
								border-b-2 border-slate-950 outline outline-none w-64 h-9 
								computer:w-full computer:text-1xl
								Desktop:w-full Desktop:h-20 Desktop:text-4xl
								tablet:w-2/4 tablet:h-10 tablet:text-1xl
							`}
							{...register('password', { required: true })}
							placeholder="password"
						/>

						<div className="text-red-500 font-semibold h-3 w-64 text-left">
							{errors.password && <p >The password is required</p>}
						</div>

						<button
							className={`
								text-white text-center font-bold bg-blue-900 w-52 h-10 border border-blue-900 rounded-[12px] rounded-computer mt-4
									computer:w-10/12 computer:h-8 computer:text-1xl
									Desktop:w-3/5 Desktop:h-16 Desktop:text-3xl
									tablet:w-2/4 tablet:h-1/5
							`}
							type="submit">
							Login
						</button>
						<div className="flex flex-col h-8 w-64 computer:text-left computer:w-1/2 md:w-96">
							{
								sigInErrors && sigInErrors.map((error, i) => (
									<p className="text-red-600 font-semibold text-xs" key={i}>{error.message}</p>
							))
							}
						</div>
					</form>
				</div>

				<div className={`
					flex justify-center computer:w-2/4 Desktop:w-full tablet:h-full tablet:w-full phone:w-auto phone:h-auto	
				`}>
					<img
						alt="image of peoples"
						title="imagen of peoples"
						className='computer:w-full tablet:w-10/12 phone:w-11/12'
						src={img} />
				</div>
			</div>

		</>
	)
}

export default LoginPage; 