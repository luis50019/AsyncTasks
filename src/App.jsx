import { Route, Routes, BrowserRouter } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TaskPage from './pages/TaskPage'
import TaskFormPage from './pages/TaskFormPage'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoutes from './ProtectedRoutes'
import { TasksProvider } from './context/TasksContext'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'

function App() {

  return (
    <AuthProvider>
      <TasksProvider>
        <BrowserRouter>
          <div className={`grid grid-cols-5 grid-rows-[100px_minmax(500px,1fr)] w-full h-screen 
            tablet:gap-y-1 phone:grid-rows-[80px_minmax(500px,1fr)] `}>
            <NavBar />
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/login' element={<LoginPage />} />

              <Route element={<ProtectedRoutes />}>

                <Route path='/tasks' element={<TaskPage />} />
                <Route path='/newTask' element={<TaskPage />}/>
                <Route path='/tasks/:id' element={<TaskPage />}/>
              </Route >

            </Routes>
          </div>
        </BrowserRouter>
      </TasksProvider>
    </AuthProvider>
  )
}

export default App
