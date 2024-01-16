import { getFromLocalStorage } from "../components/verification/Verification"

export const getHeaderConfigs = async (tokenVal?: string) => {
    const token = await getFromLocalStorage('access_token') || (typeof tokenVal === "string" ? tokenVal : "")

    return {
        headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzA1MzMwNjIwLCJpYXQiOjE3MDUzMjcwMjAsImlzcyI6Imh0dHA6Ly8xMjcuMC4wLjE6NTQzMjEvYXV0aC92MSIsInN1YiI6IjE1ZDhiODI4LTliZmQtNDQwNC1iZWU0LTMwY2Q5YjU3MGU1NCIsImVtYWlsIjoic2hhc2hhbmsua3Vsa2FybmlAYXlhbndvcmtzLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzA1MzI3MDIwfV0sInNlc3Npb25faWQiOiJlYzMzZDcwNC03MDRmLTQ5YjAtYjk3YS0zNmY5YWRjMzBjYzAifQ.ulKjbLtPi95zeGqGCrb-8qJF941iwAFbpIOCFuhsczg'
        }
    }

}
export const getHeaderConfigsForFormData = async () => {
	const token = await getFromLocalStorage('access_token')

	return {
			headers: {
				"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`
			}
	}

}
