import { Link, useNavigate } from "react-router-dom"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup } from "../ui/radio-group"
import { useState } from "react"
import { toast } from "sonner"
import axios from "axios"
import { USER_API_END_POINT } from "@/utils/constants.js"
import { useDispatch, useSelector } from "react-redux"
import { setLoading, setUser } from "@/redux/authSlice"
import { Loader2 } from "lucide-react"

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loading} = useSelector(store=>store.auth)
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        dispatch(setLoading(true))
        try{
            const res = await axios.post(`${USER_API_END_POINT}/login`,input,{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            })
            if(res.data.success) {
                dispatch(setUser(res.data.user))
                navigate('/');
                toast.success(res.data.message)
            }
        } catch(error) {
            console.error(error.message)
            toast.error(error.response.data.message)
        } finally{
            dispatch(setLoading(false))
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={handleSubmit} className="w-1/2 border border-gray-200 rounded-xl p-4 my-10" action="">
                    <h1 className='font-bold text-2xl mb-5'>Login</h1>

                    <div className="my-2">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            placeholder='ajay@gmail.com'
                            name='email'
                            value={input.email}
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div className="my-2">
                        <Label>Password</Label>
                        <Input
                            type="password"
                            placeholder='Enter your password'
                            name='password'
                            value={input.password}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div className="flex items-center justify-between my-2">
                        <RadioGroup className='flex items-center gap-4'>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type='radio'
                                    name='role'
                                    value='student'
                                    checked={input.role == 'student'}
                                    onChange={changeEventHandler}
                                    className='cursor-pointer'
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type='radio'
                                    name='role'
                                    value='recruiter'
                                    checked={input.role == 'recruiter'}
                                    onChange={changeEventHandler}
                                    className='cursor-pointer'
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        loading ? <Button className='w-full'><Loader2 className="mr-2 size-4 animate-spin"/></Button>
                        :  <Button type='submit' className='w-full my-2'>Login</Button>
                    }
                    <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
                </form>
            </div>
        </div>
    )
}
export default Login