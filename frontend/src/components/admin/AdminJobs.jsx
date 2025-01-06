import { useNavigate } from "react-router-dom"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import AdminJobsTable from "./AdminJobsTable"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs"
import { setSearchJob } from "@/redux/jobSlice"

const AdminJobs = () => {
    const navigate = useNavigate()
    const [searchValue,setSearchValue] = useState()
    const dispatch = useDispatch()
    useGetAllAdminJobs()
    useEffect(()=>{
        dispatch(setSearchJob(searchValue))
    },[searchValue])
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by name,role"
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Button onClick={() => navigate('/admin/companies/create')}>New Job</Button>
                </div>
                <AdminJobsTable />
            </div>
        </div>
    )
}
export default AdminJobs