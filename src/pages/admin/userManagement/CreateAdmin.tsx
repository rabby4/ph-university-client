import { Button, Col, Divider, Form, Input, Row } from "antd"
import PHForm from "../../../components/form/PHForm"
import PHInput from "../../../components/form/PHInput"
import PHSelect from "../../../components/form/PHSelect"
import PHDatePicker from "../../../components/form/PHDatePicker"
import { Controller, FieldValues, SubmitHandler } from "react-hook-form"
import { bloodGroupOptions, genderOptions } from "../../../constant/global"
import userManagementApi from "../../../redux/features/admin/userManagement.api"

const adminDummyData = {
	name: {
		firstName: "Abdul",
		middleName: "Hannan",
		lastName: "Fahad",
	},
	gender: "male",
	bloodGroup: "O+",
	email: "imtiyazifty@gmail.com",
	contactNo: "12345678901",
	emergencyContactNo: "9876543210",
	presentAddress: "123 Main St, City",
	permanentAddress: "456 Elm St, Town",
	designation: "Admin",
}

const CreateAdmin = () => {
	const [addAdmin, { data, error }] = userManagementApi.useAddAdminMutation()

	console.log({ data: data, error: error })

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		console.log(data)
		const adminData = {
			password: "rabby123",
			admin: data,
		}

		const formData = new FormData()

		formData.append("data", JSON.stringify(adminData))
		formData.append("file", data.image)
		addAdmin(formData)

		//! This is for development
		//! just for checking
		console.log(Object.fromEntries(formData))
	}

	return (
		<>
			<Row>
				<Col span={24}>
					<PHForm onSubmit={onSubmit} defaultValues={adminDummyData}>
						<Divider>Personal Info.</Divider>
						<Row gutter={10}>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput type="text" name="name.firstName" label="First Name" />
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

						<Divider>Academic Info</Divider>
						<Row gutter={10}>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput type="text" name="designation" label="Designation" />
							</Col>
						</Row>
						<Button htmlType="submit">Submit</Button>
					</PHForm>
				</Col>
			</Row>
		</>
	)
}

export default CreateAdmin
