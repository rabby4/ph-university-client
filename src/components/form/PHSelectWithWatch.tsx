/* eslint-disable no-mixed-spaces-and-tabs */
import { Form, Select } from "antd"
import { useEffect } from "react"
import { Controller, useFormContext, useWatch } from "react-hook-form"

type PHSelectProps = {
	label: string
	name: string
	options: { value: string; label: string; disabled?: boolean }[] | undefined
	disabled?: boolean
	mode?: "multiple" | undefined
	onValueChange: React.Dispatch<React.SetStateAction<string>>
}

const PHSelectWithWatch = ({
	label,
	name,
	options,
	disabled,
	mode,
	onValueChange,
}: PHSelectProps) => {
	const { control } = useFormContext()
	const inputValues = useWatch({
		control,
		name,
	})

	useEffect(() => {
		onValueChange(inputValues)
	}, [inputValues])

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

export default PHSelectWithWatch
