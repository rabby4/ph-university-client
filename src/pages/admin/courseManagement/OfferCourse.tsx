import { Button, Col, Flex } from "antd"
import PHForm from "../../../components/form/PHForm"
import PHInput from "../../../components/form/PHInput"
import academicManagementApi from "../../../redux/features/admin/academicManagement.api"
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch"
import { useState } from "react"
import { FieldValues, SubmitHandler } from "react-hook-form"
import courseManagementApi from "../../../redux/features/admin/courseManagement.api"
import PHSelect from "../../../components/form/PHSelect"
import PHTimePicker from "../../../components/form/PHTimePicker"
import { weekDaysOptions } from "../../../constant/global"
import moment from "moment"

const OfferCourse = () => {
	const [courseId, setCourseId] = useState("")

	const [addOfferedCourse] =
		courseManagementApi.useCreateOfferedCourseMutation()

	const { data: semesterRegistrationData } =
		courseManagementApi.useGetAllRegisteredSemestersQuery([
			{ name: "sort", value: "year" },
			{ name: "status", value: "UPCOMING" },
		])

	const { data: academicFacultyData } =
		academicManagementApi.useGetAcademicFacultiesQuery(undefined)

	const { data: academicDepartmentData } =
		academicManagementApi.useGetAcademicDepartmentsQuery(undefined)

	const { data: coursesData } =
		courseManagementApi.useGetAllCoursesQuery(undefined)

	const { data: facultiesData, isFetching: fetchingFaculties } =
		courseManagementApi.useGetCourseFacultiesQuery(courseId, {
			skip: !courseId,
		})

	const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
		(item) => ({
			value: item._id,
			label: `${item.academicSemester.name} ${item.academicSemester.year}`,
		})
	)

	const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
		value: item._id,
		label: item.name,
	}))

	const academicDepartmentOptions = academicDepartmentData?.data?.map(
		(item) => ({
			value: item._id,
			label: item.name,
		})
	)

	const courseOptions = coursesData?.data?.map((item) => ({
		value: item._id,
		label: item.title,
	}))

	const facultiesOptions = facultiesData?.data?.faculties?.map((item) => ({
		value: item._id,
		label: item.fullName,
	}))

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const offeredCourseData = {
			...data,
			maxCapacity: Number(data.maxCapacity),
			section: Number(data.section),
			startTime: moment(new Date(data.startTime)).format("HH:mm"),
			endTime: moment(new Date(data.endTime)).format("HH:mm"),
		}

		const res = await addOfferedCourse(offeredCourseData)
		console.log(res)
	}

	return (
		<Flex justify="center" align="center">
			<Col span={6}>
				<PHForm onSubmit={onSubmit}>
					<PHSelect
						name="semesterRegistration"
						label="Semester Registrations"
						options={semesterRegistrationOptions}
					/>
					<PHSelect
						name="academicFaculty"
						label="Academic Faculty"
						options={academicFacultyOptions}
					/>
					<PHSelect
						name="academicDepartment"
						label="Academic Department"
						options={academicDepartmentOptions}
					/>
					<PHSelectWithWatch
						onValueChange={setCourseId}
						options={courseOptions}
						name="course"
						label="Course"
					/>
					<PHSelect
						disabled={!courseId || fetchingFaculties}
						name="faculty"
						label="Faculty"
						options={facultiesOptions}
					/>
					<PHInput type="text" name="section" label="Section" />
					<PHInput type="text" name="maxCapacity" label="Max Capacity" />
					<PHSelect
						mode="multiple"
						options={weekDaysOptions}
						name="days"
						label="Days"
					/>
					<PHTimePicker name="startTime" label="Start Time" />
					<PHTimePicker name="endTime" label="End Time" />

					<Button htmlType="submit">Submit</Button>
				</PHForm>
			</Col>
		</Flex>
	)
}

export default OfferCourse
