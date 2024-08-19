import { Button, Col, Flex } from "antd"
import { FieldValues, SubmitHandler } from "react-hook-form"
import { toast } from "sonner"
import PHDatePicker from "../../../components/form/PHDatePicker"
import PHForm from "../../../components/form/PHForm"
import PHInput from "../../../components/form/PHInput"
import PHSelect from "../../../components/form/PHSelect"
import { semesterStatusOptions } from "../../../constant/semester"
import academicManagementApi from "../../../redux/features/admin/academicManagement.api"
import courseManagementApi from "../../../redux/features/admin/courseManagement.api"
import { TResponse } from "../../../types"

const SemesterRegistration = () => {
	const [addSemesterRegistration] =
		courseManagementApi.useAddSemesterRegistrationMutation()
	const { data: academicSemester } =
		academicManagementApi.useGetAllAcademicSemesterQuery(undefined)

	const academicSemesterOptions = academicSemester?.data!.map((item) => ({
		value: item._id,
		label: `${item.name} ${item.year}`,
	}))

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const toastId = toast.loading("Creating...")

		const semesterRegistrationData = {
			...data,
			minCredit: Number(data.minCredit),
			maxCredit: Number(data.maxCredit),
		}

		console.log(semesterRegistrationData)

		try {
			const res = (await addSemesterRegistration(
				semesterRegistrationData
			)) as TResponse<any>
			if (res.error) {
				toast.error(res.error.data.message, { id: toastId })
			} else {
				toast.success("Semester Registration created success!", { id: toastId })
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
						<PHSelect
							label={"Academic Semester"}
							name={"academicSemester"}
							options={academicSemesterOptions}
						/>
						<PHSelect
							label={"Status"}
							name={"status"}
							options={semesterStatusOptions}
						/>
						<PHDatePicker label={"Start Month"} name={"startDate"} />
						<PHDatePicker label={"End Month"} name={"endDate"} />
						<PHInput type="text" name="minCredit" label="Min Credit" />
						<PHInput type="text" name="maxCredit" label="Max Credit" />
						<Button htmlType="submit">Submit</Button>
					</PHForm>
				</Col>
			</Flex>
		</>
	)
}

export default SemesterRegistration
