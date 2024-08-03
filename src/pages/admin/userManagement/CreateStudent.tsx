import { FieldValues, SubmitHandler } from "react-hook-form"
import PHForm from "../../../components/form/PHForm"
import PHInput from "../../../components/form/PHInput"
import { Button, Col, Divider, Row } from "antd"
import PHSelect from "../../../components/form/PHSelect"
import { bloodGroupOptions, genderOptions } from "../../../constant/global"
import PHDatePicker from "../../../components/form/PHDatePicker"
import { baseApi } from "../../../redux/api/baseApi"
import academicManagementApi from "../../../redux/features/admin/academicManagement.api"

const studentDummyData = {
	password: "rabby123",
	student: {
		name: {
			firstName: "Shakib",
			middleName: "Al",
			lastName: "Hasan",
		},
		gender: "male",
		dateOfBirth: "1995-05-15",
		bloodGroup: "A+",

		email: "student075@gmail.com",
		contactNo: "123456789010",
		emergencyContactNo: "98765432100",
		presentAddress: "123 Main St, City",
		permanentAddress: "456 Elm St, Town",

		guardian: {
			fatherName: "Michael Smith",
			fatherOccupation: "Engineer",
			fatherContactNo: "1112223333",
			motherName: "Emily Smith",
			motherOccupation: "Doctor",
			motherContactNo: "4445556666",
		},

		localGuardian: {
			name: "Jane Doe",
			occupation: "Teacher",
			contactNo: "7778889999",
			address: "789 Oak St, Village",
		},

		admissionSemester: "667552f5495925d1e83cefbb",
		academicDepartment: "66755241495925d1e83cefb7",
	},
}

const studentDummyValues = {
	name: {
		firstName: "Shakib",
		middleName: "Al",
		lastName: "Hasan",
	},
	gender: "male",
	bloodGroup: "A+",

	email: "student075@gmail.com",
	contactNo: "123456789010",
	emergencyContactNo: "98765432100",
	presentAddress: "123 Main St, City",
	permanentAddress: "456 Elm St, Town",

	guardian: {
		fatherName: "Michael Smith",
		fatherOccupation: "Engineer",
		fatherContactNo: "1112223333",
		motherName: "Emily Smith",
		motherOccupation: "Doctor",
		motherContactNo: "4445556666",
	},

	localGuardian: {
		name: "Jane Doe",
		occupation: "Teacher",
		contactNo: "7778889999",
		address: "789 Oak St, Village",
	},

	admissionSemester: "667552f5495925d1e83cefbb",
	academicDepartment: "66755241495925d1e83cefb7",
}

const CreateStudent = () => {
	const { data: semesterData, isLoading } =
		academicManagementApi.useGetAllAcademicSemesterQuery(undefined)

	const semesterOptions: any = semesterData?.data!.map((item) => ({
		value: item._id,
		label: `${item.name} ${item.year}`,
	}))

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		console.log(data)

		// const formData = new FormData()

		// formData.append("data", JSON.stringify(data))

		//! This is for development
		//! just for checking
		// console.log(Object.fromEntries(formData))
	}
	return (
		<>
			<Row>
				<Col span={24}>
					<PHForm onSubmit={onSubmit} defaultValues={studentDummyValues}>
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
									label="BloodGroup"
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
									name="admissionSemester"
									label="Admission Semester"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHSelect
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

export default CreateStudent
