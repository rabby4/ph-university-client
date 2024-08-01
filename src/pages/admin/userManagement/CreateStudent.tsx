const studentDummyData = {
	password: "rabby123",
	student: {
		name: {
			firstName: "Shakib",
			middleName: "Al",
			lastName: "Hasan",
		},
		gender: "male",
		dateOfBirth: "1995-05-15",
		email: "student075@gmail.com",
		contactNo: "123456789010",
		emergencyContactNo: "98765432100",
		bloodGroup: "A+",
		presentAddress: "123 Main St, City",
		permanentAddress: "456 Elm St, Town",
		guardian: {
			fatherName: "Michael Smith",
			fatherOccupation: "Engineer",
			fatherContactNo: "1112223333",
			motherName: "Emily Smith",
			motherOccupation: "Doctor",
			motherContactNo: "4445556666",
		},
		localGuardian: {
			name: "Jane Doe",
			occupation: "Teacher",
			contactNo: "7778889999",
			address: "789 Oak St, Village",
		},
		admissionSemester: "667552f5495925d1e83cefbb",
		academicDepartment: "66755241495925d1e83cefb7",
	},
}

const CreateStudent = () => {
	return (
		<div>
			<h1>This is create student route</h1>
		</div>
	)
}

export default CreateStudent
