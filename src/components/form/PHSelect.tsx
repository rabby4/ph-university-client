/* eslint-disable no-mixed-spaces-and-tabs */
import { Form, Select } from "antd"
import { Controller } from "react-hook-form"

type PHSelectProps = {
	label: string
	name: string
	options: { value: string; label: string; disabled?: boolean }[] | undefined
	disabled?: boolean
	mode?: "multiple" | undefined
}

const PHSelect = ({ label, name, options, disabled, mode }: PHSelectProps) => {
	return (
		<Controller
			name={name}
			render={({ field, fieldState: { error } }) => (
				<Form.Item label={label}>
					<Select
						{...field}
						style={{ width: "100%" }}
						options={options}
						size="large"
						disabled={disabled}
						mode={mode}
					/>
					{error && <small style={{ color: "red" }}>{error.message}</small>}
				</Form.Item>
			)}
		/>
	)
}

export default PHSelect
