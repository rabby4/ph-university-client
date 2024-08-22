import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd"
import courseManagementApi from "../../../redux/features/admin/courseManagement.api"
import { TSemester } from "../../../types"
import moment from "moment"
import { useState } from "react"
import { FieldValues, SubmitHandler } from "react-hook-form"

type TTableData = Pick<
	TSemester,
	"academicSemester" | "startDate" | "endDate" | "status"
>

const items = [
	{ label: "Upcoming", key: "UPCOMING" },
	{ label: "Ongoing", key: "ONGOING" },
	{ label: "Ended", key: "ENDED" },
]

const RegisteredSemesters = () => {
	// const [params, setParams] = useState<TQueryParam[] | undefined>(undefined)
	const [semesterId, setSemesterId] = useState("")
	const { data: semesterData, isFetching } =
		courseManagementApi.useGetAllRegisteredSemestersQuery(undefined)
	const [updateSemesterStatus] =
		courseManagementApi.useUpdateSemesterRegistrationMutation()

	console.log(semesterId)

	const tableData = semesterData?.data!.map(
		({ _id, academicSemester, startDate, endDate, status }) => ({
			key: _id,
			name: `${academicSemester.name} ${academicSemester.year}`,
			academicSemester,
			startDate: moment(new Date(startDate)).format("MMMM YYYY"),
			endDate: moment(new Date(endDate)).format("MMMM YYYY"),
			status,
		})
	)

	const handleStatusUpdate: SubmitHandler<FieldValues> = (data) => {
		const updateData = {
			id: semesterId,
			data: {
				status: data.key,
			},
		}
		updateSemesterStatus(updateData)
	}

	const menuProps = {
		items,
		onClick: handleStatusUpdate,
	}

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
			render: (item) => {
				let color = ""
				if (item === "UPCOMING") {
					color = "blue"
				}
				if (item === "ONGOING") {
					color = "green"
				}
				if (item === "ENDED") {
					color = "red"
				}
				return <Tag color={color}>{item}</Tag>
			},
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
			render: (item) => {
				return (
					<Dropdown menu={menuProps} trigger={["click"]}>
						<Button onClick={() => setSemesterId(item.key)}>Update</Button>
					</Dropdown>
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
