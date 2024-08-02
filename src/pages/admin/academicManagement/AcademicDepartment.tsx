import { Button, Table } from "antd"
import academicManagementApi from "../../../redux/features/admin/academicManagement.api"

const AcademicDepartment = () => {
	const { data: academicDepartment, isFetching } =
		academicManagementApi.useGetAcademicDepartmentsQuery(undefined)

	const tableData = academicDepartment?.data!.map(
		({ _id, name, academicFaculty }) => ({
			key: _id,
			name,
			academicFaculty: academicFaculty.name,
		})
	)

	const columns = [
		{
			title: "Academic Department",
			key: "name",
			dataIndex: "name",
			showSorterTooltip: { target: "full-header" },
		},
		{
			title: "Academic Faculty",
			key: "academicFaculty",
			dataIndex: "academicFaculty",
			showSorterTooltip: { target: "full-header" },
		},
		{
			title: "Action",
			key: "x",
			render: () => {
				return (
					<div>
						<Button>Update</Button>
					</div>
				)
			},
		},
	]

	return (
		<>
			<Table
				columns={columns}
				loading={isFetching}
				dataSource={tableData}
				// onChange={onChange}
				showSorterTooltip={{ target: "sorter-icon" }}
			/>
		</>
	)
}

export default AcademicDepartment
