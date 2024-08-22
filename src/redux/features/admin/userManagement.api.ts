import { TQueryParam, TResponseRedux, TStudent } from "../../../types"
import { baseApi } from "../../api/baseApi"

const userManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllStudents: builder.query({
			query: (args) => {
				const params = new URLSearchParams()

				if (args) {
					args.forEach((item: TQueryParam) => {
						params.append(item.name, item.value as string)
					})
				}

				return {
					url: "/students",
					method: "GET",
					params: params,
				}
			},
			transformResponse: (response: TResponseRedux<TStudent[]>) => {
				return {
					data: response.data,
					meta: response.meta,
				}
			},
		}),
		addStudent: builder.mutation({
			query: (data) => ({
				url: "/users/create-student",
				method: "POST",
				body: data,
			}),
		}),
		getSingleStudent: builder.query({
			query: (id) => {
				return {
					url: `students/${id}`,
					method: "GET",
				}
			},
		}),
		// updateStudent: builder.mutation({
		// 	query: (id) => {
		// 		return {
		// 			url: `students/${id}`,
		// 			method: "PUT",
		// 			data:
		// 		}
		// 	},
		// }),

		getAllFaculties: builder.query({
			query: (args) => {
				const params = new URLSearchParams()

				if (args) {
					args.forEach((item: TQueryParam) => {
						params.append(item.name, item.value as string)
					})
				}

				return {
					url: "/faculties",
					method: "GET",
					params: params,
				}
			},
			transformResponse: (response: TResponseRedux<TStudent[]>) => {
				return {
					data: response.data,
					meta: response.meta,
				}
			},
		}),

		addFaculty: builder.mutation({
			query: (data) => ({
				url: "/users/create-faculty",
				method: "POST",
				body: data,
			}),
		}),
		addAdmin: builder.mutation({
			query: (data) => ({
				url: "/users/create-admin",
				method: "POST",
				body: data,
			}),
		}),
	}),
})

export default userManagementApi
