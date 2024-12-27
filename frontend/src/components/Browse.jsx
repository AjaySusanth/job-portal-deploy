import JobCard from "./JobCard";
import Navbar from "./shared/Navbar"

const Browse = () => {
    const allJobs = [1, 2, 4, 5, 6];
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allJobs.map((job) => {
                            return (
                                <JobCard/>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}
export default Browse