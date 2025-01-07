
import { MoreHorizontal } from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useSelector } from "react-redux"
import axios from "axios"
import { APPLICATION_API_END_POINT } from "@/utils/constants"
import { toast } from "sonner"

const ApplicantsTable = ({refetchApplications}) => {
    const shortlistingStatus = ["Accepted", "Rejected"];
    const { allApplicants } = useSelector(store => store.application)
    const handleUpdateStatus = async(status,id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{withCredentials:true})
            if(res.data.success) {
                toast.success(res.data.message)
                refetchApplications()
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        allApplicants?.applications?.length <= 0 ?
                            <TableCell className="text-red-500 text-base">No applicants</TableCell>
                            :
                            <>
                                {
                                    allApplicants?.applications?.map((item) => (
                                        <TableRow key={item._id}>
                                            <TableCell>{item?.applicant?.name}</TableCell>
                                            <TableCell>{item?.applicant?.email}</TableCell>
                                            <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                            <TableCell>
                                                {
                                                    item?.applicant?.profile?.resumeOriginalName ?
                                                        <a className="text-blue-500" href={item?.applicant?.profile?.resume} target="_blank">
                                                            {item?.applicant?.profile?.resumeOriginalName}
                                                        </a> :
                                                        <span>NA</span>
                                                }
                                            </TableCell>
                                            <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                                            <TableCell>{item?.status}</TableCell>
                                            <TableCell className='float-right cursor-pointer'>
                                                <Popover >
                                                    <PopoverTrigger>
                                                        <MoreHorizontal />
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-32">
                                                        {
                                                            shortlistingStatus.map((status, index) => {
                                                                return (
                                                                    <div
                                                                    onClick={()=>handleUpdateStatus(status,item?._id)}
                                                                    key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                                        <span>{status}</span>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </PopoverContent>
                                                </Popover>

                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </>
                    }
                </TableBody>
            </Table>
        </div>
    )
}
export default ApplicantsTable