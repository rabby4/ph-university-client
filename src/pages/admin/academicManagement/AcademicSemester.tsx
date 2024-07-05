import academicSemesterApi from "../../../redux/features/academicSemester/academicSemester"

const AcademicSemester = () => {
	const { data } = academicSemesterApi.useGetAllAcademicSemesterQuery(undefined)
	console.log(data)
	return (
		<div>
			<h1>This is academic semester component</h1>
		</div>
	)
}

export default AcademicSemester
