/* eslint-disable no-mixed-spaces-and-tabs */
import { Button, Col, Flex } from "antd"
import { FieldValues, SubmitHandler } from "react-hook-form"
import { toast } from "sonner"
import PHForm from "../../../components/form/PHForm"
import PHInput from "../../../components/form/PHInput"
import PHSelect from "../../../components/form/PHSelect"
import courseManagementApi from "../../../redux/features/admin/courseManagement.api"
import { TResponse } from "../../../types"

const CreateCourse = () => {
	const [addCourse] = courseManagementApi.useAddCoursesMutation()
	const { data: courseData } =
		courseManagementApi.useGetAllCoursesQuery(undefined)

	const preRequisiteCoursesOptions = courseData?.data!.map((item) => ({
		value: item._id,
		label: item.title,
	}))

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const toastId = toast.loading("Creating...")

		const semesterRegistrationData = {
			...data,
			isDeleted: false,
			code: Number(data.code),
			credits: Number(data.credits),
			preRequisiteCourses: data.preRequisiteCourses
				? data.preRequisiteCourses.map((item) => ({
						course: item,
						isDeleted: false,
				  }))
				: [],
		}

		console.log(semesterRegistrationData)

		try {
			const res = (await addCourse(semesterRegistrationData)) as TResponse<any>
			if (res.error) {
				toast.error(res.error.data.message, { id: toastId })
			} else {
				toast.success("Course created success!", { id: toastId })
			}
		} catch (error) {
			toast.error("Something went wrong", { id: toastId })
		}
	}

	return (
		<>
			<Flex justify="center" align="center" style={{ height: "100vh" }}>
				<Col span={6}>
					<PHForm onSubmit={onSubmit}>
						<PHInput type="text" name="title" label="Title" />
						<PHInput type="text" name="prefix" label="Prefix" />
						<PHInput type="text" name="code" label="Code" />
						<PHInput type="text" name="credits" label="Credits" />
						<PHSelect
							name="preRequisiteCourses"
							label="Pre Requisite Courses"
							mode="multiple"
							options={preRequisiteCoursesOptions}
						/>

						<Button htmlType="submit">Submit</Button>
					</PHForm>
				</Col>
			</Flex>
		</>
	)
}

export default CreateCourse
