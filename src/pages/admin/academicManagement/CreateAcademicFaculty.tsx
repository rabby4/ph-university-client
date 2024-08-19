import { zodResolver } from "@hookform/resolvers/zod"
import { academicFacultySchema } from "../../../schemas/academicManagement"
import { Button, Col, Flex } from "antd"
import PHForm from "../../../components/form/PHForm"
import PHInput from "../../../components/form/PHInput"
import { toast } from "sonner"
import { FieldValues, SubmitHandler } from "react-hook-form"
import academicManagementApi from "../../../redux/features/admin/academicManagement.api"
import { TResponse } from "../../../types"

const CreateAcademicFaculty = () => {
	const [addAcademicFaculty] =
		academicManagementApi.useAddAcademicFacultyMutation()

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const toastId = toast.loading("Creating...")

		const facultyData = {
			name: data.name,
		}

		try {
			const res = (await addAcademicFaculty(facultyData)) as TResponse<any>
			if (res.error) {
				toast.error(res.error.data.message, { id: toastId })
			} else {
				toast.success("Faculty created success!", { id: toastId })
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
						resolver={zodResolver(academicFacultySchema)}
					>
						<PHInput type="text" label={"Name"} name={"name"} />
						<Button htmlType="submit">Submit</Button>
					</PHForm>
				</Col>
			</Flex>
		</>
	)
}

export default CreateAcademicFaculty
