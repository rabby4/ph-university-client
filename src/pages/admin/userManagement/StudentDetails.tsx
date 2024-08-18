import { useParams } from "react-router-dom"
import userManagementApi from "../../../redux/features/admin/userManagement.api"

const StudentDetails = () => {
	const { studentId } = useParams()
	const { data: detailsData } =
		userManagementApi.useGetSingleStudentQuery(studentId)
	console.log(detailsData?.data)
	return (
		<div>
			<h1>Student details of {studentId}</h1>
		</div>
	)
}

export default StudentDetails
