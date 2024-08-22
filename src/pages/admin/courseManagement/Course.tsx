import { Button, Modal, Table } from "antd"
import courseManagementApi from "../../../redux/features/admin/courseManagement.api"
import { useState } from "react"
import PHForm from "../../../components/form/PHForm"
import PHSelect from "../../../components/form/PHSelect"
import userManagementApi from "../../../redux/features/admin/userManagement.api"

const Course = () => {
	// const [params, setParams] = useState<TQueryParam[] | undefined>(undefined)
	const { data: courseData, isFetching } =
		courseManagementApi.useGetAllCoursesQuery(undefined)

	const tableData = courseData?.data!.map(({ _id, title, prefix, code }) => ({
		key: _id,
		title,
		code: `${prefix}${code}`,
	}))

	const columns = [
		{
			title: "Title",
			key: "title",
			dataIndex: "title",
			showSorterTooltip: { target: "full-header" },
		},
		{
			title: "Code",
			key: "code",
			dataIndex: "code",
		},
		{
			title: "Action",
			key: "x",
			render: (item) => {
				return <AddFaculty facultyInfo={item} />
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

const AddFaculty = ({ facultyInfo }) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { data: facultiesData } =
		userManagementApi.useGetAllFacultiesQuery(undefined)

	const [assignFaculties] = courseManagementApi.useAddFacultiesMutation()

	const facultiesOptions = facultiesData?.data?.map((item) => ({
		value: item._id,
		label: item.fullName,
	}))

	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	const handleSubmit = (data) => {
		const facultyData = {
			courseId: facultyInfo.key,
			data,
		}
		assignFaculties(facultyData)
	}

	return (
		<>
			<Button onClick={showModal}>Assign Faculty</Button>
			<Modal
				title="Basic Modal"
				open={isModalOpen}
				onCancel={handleCancel}
				footer={null}
			>
				<PHForm onSubmit={handleSubmit}>
					<PHSelect
						name="faculties"
						label="Faculties"
						mode="multiple"
						options={facultiesOptions}
					/>
					<Button htmlType="submit">Submit</Button>
				</PHForm>
			</Modal>
		</>
	)
}

export default Course
