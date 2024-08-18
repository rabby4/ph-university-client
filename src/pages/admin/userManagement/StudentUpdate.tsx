import { Button, Col, Divider, Form, Input, Row } from "antd"
import PHForm from "../../../components/form/PHForm"
import PHInput from "../../../components/form/PHInput"
import PHSelect from "../../../components/form/PHSelect"
import PHDatePicker from "../../../components/form/PHDatePicker"
import { Controller, FieldValues, SubmitHandler } from "react-hook-form"
import { bloodGroupOptions, genderOptions } from "../../../constant/global"
import academicManagementApi from "../../../redux/features/admin/academicManagement.api"
import userManagementApi from "../../../redux/features/admin/userManagement.api"
import { useParams } from "react-router-dom"

const StudentUpdate = () => {
	// const [addStudent, { data, error }] =
	// 	userManagementApi.useAddStudentMutation()
	const { studentId } = useParams()
	const { data: detailsData } =
		userManagementApi.useGetSingleStudentQuery(studentId)

	const studentDefaultData = detailsData?.data

	console.log(studentDefaultData)

	const { data: semesterData, isLoading } =
		academicManagementApi.useGetAllAcademicSemesterQuery(undefined)

	const { data: departmentData } =
		academicManagementApi.useGetAcademicDepartmentsQuery(undefined)

	const semesterOptions: any = semesterData?.data!.map((item) => ({
		value: item._id,
		label: `${item.name} ${item.year}`,
	}))

	const departmentOptions: any = departmentData?.data!.map((item) => ({
		value: item._id,
		label: item.name,
	}))

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		console.log(data)
		// 		const studentData = {
		// 			password: "student123",
		// 			student: data,
		// 		}
		//
		// 		const formData = new FormData()
		//
		// 		formData.append("data", JSON.stringify(studentData))
		// 		formData.append("file", data.image)
		// 		addStudent(formData)
		//! This is for development
		//! just for checking
		// console.log(Object.fromEntries(formData))
	}
	return (
		<>
			<Row>
				<Col span={24}>
					<PHForm onSubmit={onSubmit} defaultValues={studentDefaultData}>
						<Divider>Personal Info.</Divider>
						<Row gutter={10}>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput type="text" name="name.firstName" label="First Name" />
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput
									type="text"
									name="name.middleName"
									label="Middle Name"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput type="text" name="name.lastName" label="Last Name" />
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHSelect
									options={genderOptions}
									name="gender"
									label="Gender"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHDatePicker name="dateOfBirth" label="Date Of Birth" />
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHSelect
									options={bloodGroupOptions}
									name="bloodGroup"
									label="Blood Group"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<Controller
									name="image"
									render={({ field: { onChange, value, ...field } }) => (
										<Form.Item label="Image">
											<Input
												type="file"
												value={value?.fileName}
												{...field}
												onChange={(e) => onChange(e.target.files?.[0])}
											/>
										</Form.Item>
									)}
								/>
							</Col>
						</Row>
						<Divider>Contact Info.</Divider>
						<Row gutter={10}>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput type="email" name="email" label="Email" />
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput type="text" name="contactNo" label="Contact Number" />
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput
									type="text"
									name="emergencyContactNo"
									label="Emergency Contact Number"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput
									type="text"
									name="presentAddress"
									label="Present Address"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput
									type="text"
									name="permanentAddress"
									label="Permanent Address"
								/>
							</Col>
						</Row>
						<Divider>Guardian Info</Divider>
						<Row gutter={10}>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput
									type="text"
									name="guardian.fatherName"
									label="Father Name"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput
									type="text"
									name="guardian.fatherOccupation"
									label="Father Occupation"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput
									type="text"
									name="guardian.fatherContactNo"
									label="Father Contact Number"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput
									type="text"
									name="guardian.motherName"
									label="Mother Name"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput
									type="text"
									name="guardian.motherOccupation"
									label="Mother Occupation"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput
									type="text"
									name="guardian.motherContactNo"
									label="Mother Contact Number"
								/>
							</Col>
						</Row>
						<Divider>Local Guardian Info</Divider>
						<Row gutter={10}>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput type="text" name="localGuardian.name" label="Name" />
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput
									type="text"
									name="localGuardian.occupation"
									label="Occupation"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput
									type="text"
									name="localGuardian.contactNo"
									label="Contact Number"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput
									type="text"
									name="localGuardian.address"
									label="Contact Number"
								/>
							</Col>
						</Row>
						<Divider>Academic Info</Divider>
						<Row gutter={10}>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHSelect
									options={semesterOptions}
									disabled={isLoading}
									name="admissionSemester"
									label="Admission Semester"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHSelect
									options={departmentOptions}
									name="academicDepartment"
									label="Academic Department"
								/>
							</Col>
						</Row>
						<Button htmlType="submit">Submit</Button>
					</PHForm>
				</Col>
			</Row>
		</>
	)
}

export default StudentUpdate
