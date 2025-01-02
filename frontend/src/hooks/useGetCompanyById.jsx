import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";

const useGetCompanyById = ({companyId}) => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchCompany = async() => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true});
                if(res.data.success) {
                    dispatch(setSingleCompany(res.data.company))
                }
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchCompany()
    },[companyId,dispatch])
}

export default useGetCompanyById