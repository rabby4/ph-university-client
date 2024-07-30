import { Table, TableColumnsType, TableProps } from "antd"
import academicManagementApi from "../../../redux/features/admin/academicManagement.api"
import { TAcademicSemester } from "../../../types"
import { useState } from "react"

type TTableData = Pick<
	TAcademicSemester,
	"_id" | "name" | "year" | "startMonth" | "endMonth"
>

const AcademicSemester = () => {
	const [params, setParams] = useState([])
	const { data: semesterData } =
		academicManagementApi.useGetAllAcademicSemesterQuery(params)

	const tableData = semesterData?.data!.map(
		({ _id, name, year, startMonth, endMonth }) => ({
			key: _id,
			name,
			year,
			startMonth,
			endMonth,
		})
	)

	const columns: TableColumnsType<TTableData> = [
		{
			title: "Name",
			key: "name",
			dataIndex: "name",
			showSorterTooltip: { target: "full-header" },
			filters: [
				{
					text: "Autumn",
					value: "Autumn",
				},
				{
					text: "Fall",
					value: "Fall",
				},
				{
					text: "Summer",
					value: "Summer",
				},
			],
		},
		{
			title: "Year",
			key: "year",
			dataIndex: "year",
			filters: [
				{
					text: "2024",
					value: "2024",
				},
				{
					text: "2025",
					value: "2025",
				},
				{
					text: "2026",
					value: "2026",
				},
			],
		},
		{
			title: "Start Month",
			key: "startMonth",
			dataIndex: "startMonth",
		},
		{
			title: "End Month",
			key: "endMonth",
			dataIndex: "endMonth",
		},
	]

	const onChange: TableProps<TTableData>["onChange"] = (
		pagination,
		filters,
		sorter,
		extra
	) => {
		if (extra.action === "filter") {
			const queryParams = []
			filters.name?.forEach((item) =>
				queryParams.push({ name: "name", value: item })
			)
			filters.year?.forEach((item) =>
				queryParams.push({ name: "year", value: item })
			)
			setParams(queryParams)
		}
	}

	return (
		<>
			<Table
				columns={columns}
				dataSource={tableData}
				onChange={onChange}
				showSorterTooltip={{ target: "sorter-icon" }}
			/>
		</>
	)
}

export default AcademicSemester
