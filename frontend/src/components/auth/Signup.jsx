import { Link, useNavigate } from "react-router-dom"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup } from "../ui/radio-group"
import { useState } from "react"
import axios from "axios"
import { USER_API_END_POINT } from "@/utils/constants"
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "@/redux/authSlice"
import { Loader2 } from "lucide-react"

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {loading} = useSelector(store=>store.auth)
    const [input,setInput] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    })

    const changeEventHandler = (e) => {
        setInput({...input,[e.target.name]:e.target.value})
    }

    const changeFileHandler = (e) => {
        setInput({...input,file:e.target.files?.[0]})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        dispatch(setLoading(true));
        const formData = new FormData();
        formData.append("name",input.name);
        formData.append("email",input.email);
        formData.append("phoneNumber",input.phoneNumber);
        formData.append("password",input.password)
        formData.append("role",input.role);
        if(input.file) {
            formData.append("file",input.file)
        }

        try{
            const res = await axios.post(`${USER_API_END_POINT}/register`,formData,{
                headers:{
                    "Content-Type":"mulitpart/form-data"
                },
                withCredentials:true
            })
            if(res.data.success) {
                navigate('/login');
                toast.success(res.data.message)
            }
        } catch(error) {
            console.error(error.message)
            toast.error(error.response.data.message)
        } finally {
            dispatch(setLoading(false))
        }
    }
    
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={handleSubmit} className="w-1/2 border border-gray-200 rounded-xl p-4 my-10" action="">
                    <h1 className='font-bold text-2xl mb-5'>Sign Up</h1>
                    <div className="my-2">
                        <Label>Name</Label>
                        <Input
                            type="text"
                            name='name'
                            value={input.name}
                            onChange={changeEventHandler}
                            placeholder='Ajay Susanth'
                        />
                    </div>

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
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            placeholder='8943450780'
                            name='phoneNumber'
                            value={input.phoneNumber}
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
                        <div className='flex items-center gap-2 my-2'>
                        <Label>Profile</Label>
                        <Input
                            accept="image/*"
                            type="file"
                            className="cursor-pointer"
                            onChange={changeFileHandler}
                        />
                    </div>
                    </div>
                    {
                        loading ? <Button className='w-full'><Loader2 className="mr-2 size-4 animate-spin"/></Button>
                        :  <Button type='submit' className='w-full my-2'>Signup</Button>
                    }
                    <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
                </form>
            </div>
        </div>
    )
}
export default Signup