import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/Home"
import Signup from "./components/auth/Signup"
import Login from "./components/auth/Login"
import Jobs from "./components/Jobs"
import Browse from "./components/Browse"

const appRouter = createBrowserRouter([
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
])

const App = () => {
  return (
    <div>
      <RouterProvider router = {appRouter}/>
    </div>
  )
}
export default App