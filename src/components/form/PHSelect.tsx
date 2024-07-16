import { Form, Select } from "antd"
import { Controller } from "react-hook-form"

type PHSelectProps = {
	label: string
	name: string
	options: {
		value: string
		label: string
		disabled?: boolean
	}[]
}

const PHSelect = ({ label, name, options }: PHSelectProps) => {
	return (
		<Controller
			name={name}
			render={({ field }) => (
				<Form.Item label={label}>
					<Select
						{...field}
						style={{ width: "100%" }}
						options={options}
						size="large"
					/>
				</Form.Item>
			)}
		/>
	)
}

export default PHSelect
