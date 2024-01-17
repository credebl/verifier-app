import { getFromLocalStorage } from "../components/verification/Verification"

export const getHeaderConfigs = async (tokenVal?: string) => {
    const token = await localStorage.getItem('session') || (typeof tokenVal === "string" ? tokenVal : "")

    return {
        headers: {
            'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
        }
    }

}
export const getHeaderConfigsForFormData = async () => {
	const token = await getFromLocalStorage('session')

	return {
			headers: {
				"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`
			}
	}

}
