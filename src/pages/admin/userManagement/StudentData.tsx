import {
	Button,
	Pagination,
	Space,
	Table,
	TableColumnsType,
	TableProps,
} from "antd"
import { useState } from "react"
import userManagementApi from "../../../redux/features/admin/userManagement.api"
import { TQueryParam, TStudent } from "../../../types"
import { Link } from "react-router-dom"

type TTableData = Pick<TStudent, "fullName" | "id" | "email" | "contactNo">

const StudentData = () => {
	const [params, setParams] = useState<TQueryParam[]>([])
	const [page, setPage] = useState(1)
	const { data: studentData, isFetching } =
		userManagementApi.useGetAllStudentsQuery([
			{ name: "page", value: page },
			...params,
		])

	const metaData = studentData?.meta
	const tableData = studentData?.data!.map(
		({ _id, fullName, id, email, contactNo }) => ({
			key: _id,
			fullName,
			id,
			email,
			contactNo,
		})
	)

	const columns: TableColumnsType<TTableData> = [
		{
			title: "Name",
			key: "name",
			dataIndex: "fullName",
			showSorterTooltip: { target: "full-header" },
		},
		{
			title: "Roll No.",
			key: "id",
			dataIndex: "id",
		},
		{
			title: "Email",
			key: "email",
			dataIndex: "email",
		},
		{
			title: "Contact No.",
			key: "contactNo",
			dataIndex: "contactNo",
		},
		{
			title: "Action",
			key: "x",
			render: (item) => {
				console.log(item)
				return (
					<Space>
						<Link to={`/admin/student-data/${item.key}`}>
							<Button>Details</Button>
						</Link>
						<Link to={`/admin/student-update/${item.key}`}>
							<Button>Update</Button>
						</Link>
						<Button>Block</Button>
					</Space>
				)
			},
			width: "1%",
		},
	]

	const onChange: TableProps<TTableData>["onChange"] = (
		_pagination,
		filters,
		_sorter,
		extra
	) => {
		if (extra.action === "filter") {
			const queryParams: TQueryParam[] = []
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
				loading={isFetching}
				dataSource={tableData}
				onChange={onChange}
				showSorterTooltip={{ target: "sorter-icon" }}
				pagination={false}
			/>
			<Pagination
				onChange={(value) => setPage(value)}
				pageSize={metaData?.limit}
				total={metaData?.total}
			/>
		</>
	)
}

export default StudentData
