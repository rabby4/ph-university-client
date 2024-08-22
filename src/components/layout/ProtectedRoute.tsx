import { ReactNode } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
	currentToken,
	currentUser,
	logout,
} from "../../redux/features/auth/authSlice"
import { Navigate } from "react-router-dom"
import { verifyToken } from "../../utils/verifyToken"

type TProtectedRoute = {
	children: ReactNode
	role: string | undefined
}

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
	const dispatch = useAppDispatch()
	const token = useAppSelector(currentToken)

	let user

	if (token) {
		user = verifyToken(token)
	}

	if (role !== undefined && role !== user?.role) {
		dispatch(logout())
		return <Navigate to={"/login"} replace={true} />
	}

	if (!token) {
		return <Navigate to={"/login"} replace={true} />
	}

	return children
}

export default ProtectedRoute
