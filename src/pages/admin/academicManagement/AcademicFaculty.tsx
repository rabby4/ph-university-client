import { Button, Table } from "antd"
import academicManagementApi from "../../../redux/features/admin/academicManagement.api"

const AcademicFaculty = () => {
	const { data: academicFaculty, isFetching } =
		academicManagementApi.useGetAcademicFacultiesQuery(undefined)

	const tableData = academicFaculty?.data!.map(({ _id, name }) => ({
		key: _id,
		name,
	}))

	const columns = [
		{
			title: "Name",
			key: "name",
			dataIndex: "name",
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

export default AcademicFaculty
