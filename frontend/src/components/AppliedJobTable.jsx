import { Badge } from "./ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

const AppliedJobTable = () => {
    const allAppliedJobs = [1, 2, 3, 4]
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? <span>You haven't applied any job yet.</span> : allAppliedJobs.map((appliedJob,index) => (
                            <TableRow key={index}>
                                <TableCell>25-05-2005</TableCell>
                                <TableCell>Backend Developer</TableCell>
                                <TableCell>Google</TableCell>
                                <TableCell className="text-right"><Badge>Selected</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}
export default AppliedJobTable