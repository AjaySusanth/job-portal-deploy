import { useEffect } from "react"
import ApplicantsTable from "./ApplicantsTable"
import axios from "axios"
import { APPLICATION_API_END_POINT } from "@/utils/constants"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setAllApplicants } from "@/redux/applicationSlice"

const Applicants = () => {
  const {allApplicants} = useSelector(store=>store.application)
  const params = useParams()
  const dispatch = useDispatch()
  const fetchAllApplicants = async() => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{withCredentials:true})
      if(res.data.success) {
        dispatch(setAllApplicants(res.data.applicants))
      }
    } catch (error) {
      console.error(error.message)
    }
  }
  useEffect(()=>{
    fetchAllApplicants()
  },[])


  return (
    <div className='max-w-7xl mx-auto'>
      <h1 className="font-bold text-xl my-5">Applicants ({allApplicants?.applications?.length})</h1>
      <ApplicantsTable refetchApplications={fetchAllApplicants}/>
    </div>
  )
}
export default Applicants