import { Form, Input } from "antd"
import { Controller } from "react-hook-form"

type TIputProps = {
	label?: string
	type: string
	name: string
	defaultValue?: string
}

const PHInput = ({ label, type, name, defaultValue }: TIputProps) => {
	return (
		<div style={{ marginBottom: "20px" }}>
			<Controller
				name={name}
				render={({ field }) => (
					<Form.Item label={label}>
						<Input
							{...field}
							type={type}
							id={name}
							defaultValue={defaultValue}
						/>
					</Form.Item>
				)}
			/>
		</div>
	)
}

export default PHInput
