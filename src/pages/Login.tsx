/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Row } from "antd"
import { FieldValues } from "react-hook-form"
import authApi from "../redux/features/auth/authApi"
import { useAppDispatch } from "../redux/hooks"
import { setUser, TUser } from "../redux/features/auth/authSlice"
import { verifyToken } from "../utils/verifyToken"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import PHForm from "../components/form/PHForm"
import PHInput from "../components/form/PHInput"

const Login = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	// const { register, handleSubmit } = useForm({
	// 	defaultValues: {
	// 		userId: "A-0002",
	// 		password: "rabby123",
	// 	},
	// })

	const defaultValues = {
		userId: "A-0002",
		password: "rabby123",
	}

	const [login] = authApi.useLoginMutation()

	const onSubmit = async (data: FieldValues) => {
		console.log(data)
		const toastId = toast.loading("Logging in...")

		try {
			const userInfo = {
				id: data.userId,
				password: data.password,
			}
			const res = await login(userInfo).unwrap()
			const user = verifyToken(res.data.accessToken) as TUser

			dispatch(setUser({ user: user, token: res.data.accessToken }))
			toast.success("Logged in success", { id: toastId })
			navigate(`/${user.role}/dashboard`)
		} catch (error) {
			toast.error("Something went wrong", { id: toastId })
		}
	}

	return (
		<>
			<Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
				<PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
					<PHInput type={"text"} name={"userId"} label={"ID:"} />
					<PHInput type={"text"} name={"password"} label={"Password"} />
					<Button htmlType="submit">Login</Button>
				</PHForm>
			</Row>
		</>
	)
}

export default Login
