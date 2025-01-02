import { Edit2, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

const CompaniesTable = () => {
    const { companies,searchCompany } = useSelector((store) => store.company)
    const [filterCompany,setFilterCompany] = useState(companies)

    useEffect(()=>{
        const filteredCompany = companies.length > 0 && companies.filter((company)=>{
            if(!searchCompany) return true;
            return company?.name.toLowerCase().includes(searchCompany.toLowerCase())
        })
        setFilterCompany(filteredCompany)
    },[companies,searchCompany])


    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        filterCompany?.length <= 0 ? <p className="text-red-500 mt-5 text-base">No registered company found</p> :
                            <>
                                {
                                    filterCompany?.map((company) => (
                                        <TableRow key={company?._id}>
                                            <TableCell>
                                                <Avatar>
                                                    <AvatarImage src={company?.logo || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} />
                                                </Avatar>
                                            </TableCell>
                                            <TableCell>{company?.name}</TableCell>
                                            <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
                                            <TableCell className="text-right cursor-pointer">
                                                <Popover>
                                                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                    <PopoverContent className="w-32">
                                                        <div className='flex items-center gap-2 w-fit cursor-pointer'>
                                                            <Edit2 className='w-4' />
                                                            <span>Edit</span>
                                                        </div>
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
export default CompaniesTable
