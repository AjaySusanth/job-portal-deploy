import { useNavigate } from "react-router-dom"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import CompaniesTable from "./CompaniesTable"
import useGetAllCompanies from "@/hooks/useGetAllCompanies"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setSearchCompany } from "@/redux/companySlice"

const Companies = () => {
    const navigate = useNavigate()
    const [searchValue,setSearchValue] = useState()
    const dispatch = useDispatch()
    useGetAllCompanies()
    useEffect(()=>{
        dispatch(setSearchCompany(searchValue))
    },[searchValue])
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by name"
                        onChange={(e)=>setSearchValue(e.target.value)}
                    />
                    <Button onClick={()=> navigate('/admin/companies/create')}>New Company</Button>
                </div>
                <CompaniesTable />
            </div>
        </div>
    )
}
export default Companies