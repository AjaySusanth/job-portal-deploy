import { useDispatch, useSelector } from "react-redux";
import JobCard from "./JobCard";
import Navbar from "./shared/Navbar"
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useEffect } from "react";
import { setJobSearch } from "@/redux/jobSlice";

const Browse = () => {
    useGetAllJobs()
    const {allJobs} = useSelector(store=>store.job)
    const dispatch = useDispatch()
    useEffect(()=>{
        return ()=> {
            dispatch(setJobSearch(""))
        }
    },[])
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allJobs.map((job) => {
                            return (
                                <JobCard job={job} key={job?._id}/>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}
export default Browse