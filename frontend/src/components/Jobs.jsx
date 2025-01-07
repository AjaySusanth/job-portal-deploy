import { useDispatch, useSelector } from "react-redux"
import FilterCard from "./FilterCard"
import JobCard from "./JobCard"
import Navbar from "./shared/Navbar"
import { useEffect, useState } from "react"
import { setFilterJob } from "@/redux/jobSlice"


const Jobs = () => {
    const dispatch = useDispatch()
    const {allJobs, filterJob} = useSelector(store=>store.job)
    const [filterJobs,setFilterJobs] = useState(allJobs)
    useEffect(()=>{
        if(filterJob) {
            const filteredJobs = allJobs.filter((job)=>{
                return job.title.toLowerCase().includes(filterJob.toLowerCase()) ||
                job.description.toLowerCase().includes(filterJob.toLowerCase()) ||
                job.location.toLowerCase().includes(filterJob.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        }
        else{
            setFilterJobs(allJobs)
        }
    },[allJobs,filterJob])

    useEffect(() => {
        return () => {
            dispatch(setFilterJob("")); // Clear jobSearch when the component unmounts
        };
    }, [dispatch]);


    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>

                    {
                        filterJobs.length <= 0 ? 
                        <span>Job not found</span> :
                        (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job)=>(
                                            <div key={job._id}>
                                                <JobCard job={job}/>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default Jobs