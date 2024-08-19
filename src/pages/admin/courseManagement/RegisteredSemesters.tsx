import { Button, Table, TableColumnsType, TableProps } from "antd"
import academicManagementApi from "../../../redux/features/admin/academicManagement.api"
import { TAcademicSemester, TQueryParam } from "../../../types"
import { useState } from "react"
import courseManagementApi from "../../../redux/features/admin/courseManagement.api"

type TTableData = Pick<
	TAcademicSemester,
	"name" | "year" | "startMonth" | "endMonth"
>

const RegisteredSemesters = () => {
	// const [params, setParams] = useState<TQueryParam[] | undefined>(undefined)
	const { data: semesterData, isFetching } =
		courseManagementApi.useGetAllRegisteredSemestersQuery(undefined)

	const tableData = semesterData?.data!.map(
		({ _id, academicSemester, startDate, endDate, status }) => ({
			key: _id,
			name: `${academicSemester.name} ${academicSemester.year}`,
			academicSemester,
			startDate,
			endDate,
			status,
		})
	)

	const columns: TableColumnsType<TTableData> = [
		{
			title: "Name",
			key: "name",
			dataIndex: "name",
			showSorterTooltip: { target: "full-header" },
		},
		{
			title: "Status",
			key: "status",
			dataIndex: "status",
		},
		{
			title: "Start Date",
			key: "startDate",
			dataIndex: "startDate",
		},
		{
			title: "End Date",
			key: "endDate",
			dataIndex: "endDate",
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

	// const onChange: TableProps<TTableData>["onChange"] = (
	// 	_pagination,
	// 	filters,
	// 	_sorter,
	// 	extra
	// ) => {
	// 	if (extra.action === "filter") {
	// 		const queryParams: TQueryParam[] = []
	// 		filters.name?.forEach((item) =>
	// 			queryParams.push({ name: "name", value: item })
	// 		)
	// 		filters.year?.forEach((item) =>
	// 			queryParams.push({ name: "year", value: item })
	// 		)
	// 		setParams(queryParams)
	// 	}
	// }

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

export default RegisteredSemesters
