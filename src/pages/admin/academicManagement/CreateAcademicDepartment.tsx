/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Flex } from "antd"
import PHForm from "../../../components/form/PHForm"
import { zodResolver } from "@hookform/resolvers/zod"
import PHSelect from "../../../components/form/PHSelect"
import { academicDepartmentSchema } from "../../../schemas/academicManagement"
import { FieldValues, SubmitHandler } from "react-hook-form"
import { toast } from "sonner"
import academicManagementApi from "../../../redux/features/admin/academicManagement.api"
import PHInput from "../../../components/form/PHInput"

const CreateAcademicDepartment = () => {
	const [addAcademicDepartment] =
		academicManagementApi.useAddAcademicDepartmentMutation()

	const { data: academicFaculty } =
		academicManagementApi.useGetAcademicFacultiesQuery(undefined)

	const facultyOptions: any = academicFaculty?.data!.map((item) => ({
		value: item._id,
		label: item.name,
	}))

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const toastId = toast.loading("Creating...")
		console.log(data)

		const departmentData = {
			name: data.name,
			academicFaculty: data.academicFaculty,
		}

		try {
			const res = await addAcademicDepartment(departmentData)
			if (res.error) {
				toast.error(res.error.data.message, { id: toastId })
			} else {
				toast.success("Department created success!", { id: toastId })
			}
		} catch (error) {
			toast.error("Something went wrong", { id: toastId })
		}
	}

	return (
		<>
			<Flex justify="center" align="center" style={{ height: "100vh" }}>
				<Col span={6}>
					<PHForm
						onSubmit={onSubmit}
						resolver={zodResolver(academicDepartmentSchema)}
					>
						<PHInput type="text" label={"Department Name"} name={"name"} />
						<PHSelect
							label={"Academic Faculty"}
							name={"academicFaculty"}
							options={facultyOptions}
						/>
						<Button htmlType="submit">Submit</Button>
					</PHForm>
				</Col>
			</Flex>
		</>
	)
}

export default CreateAcademicDepartment
