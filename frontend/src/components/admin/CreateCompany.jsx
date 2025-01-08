import { useNavigate } from "react-router-dom"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { toast } from "sonner"
import axios from "axios"
import { COMPANY_API_END_POINT } from "@/utils/constants"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setSingleCompany } from "@/redux/companySlice"

const CreateCompany = () => {
    const navigate = useNavigate()
    const [company,setCompany] = useState('')
    console.log(company)
    const dispatch = useDispatch()
    const registerCompany = async() => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`,{name:company},{
                headers:{
                'Content-Type':'application/json',
                },
                withCredentials:true
            })
            if(res.data.success) {
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message)
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.error(error.message)
            toast.error(error.response.data.message)
        }
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name? you can change this later.</p>
                </div>
                <Label>Company Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="JobHunt, Microsoft etc."
                    onChange={(e)=>setCompany(e.target.value)}
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
                    <Button onClick={registerCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}
export default CreateCompany