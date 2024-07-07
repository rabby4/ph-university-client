import { Input } from "antd"
import { Controller } from "react-hook-form"

type TIputProps = {
	label?: string
	type: string
	name: string
}

const PHInput = ({ label, type, name }: TIputProps) => {
	return (
		<div style={{ marginBottom: "20px" }}>
			{label ? <label>{label}</label> : null}
			<Controller
				name={name}
				render={({ field }) => <Input {...field} type={type} id={name} />}
			/>
		</div>
	)
}

export default PHInput
