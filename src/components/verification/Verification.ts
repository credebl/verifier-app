import { apiRoutes } from "../../config/apiRoutes";
import { envConfig } from "../../config/envConfig";
import CryptoJS from "crypto-js"
import { axiosPost } from "../../services/apiRequests";
import { getHeaderConfigs } from "../../config/getHeaderConfig";

export const decryptData = (value: any): string => {
    const CRYPTO_PRIVATE_KEY: string = `${envConfig.PUBLIC_CRYPTO_PRIVATE_KEY}`
    const bytes = CryptoJS.AES.decrypt(value, CRYPTO_PRIVATE_KEY)
    let originalValue: string = bytes.toString(CryptoJS.enc.Utf8);
    return originalValue
}

export const getFromLocalStorage = async (key: string) =>{
    const value = await localStorage.getItem(key)
    const convertedValue = value ? decryptData(value) : ''
    return convertedValue
}

export const sendProofRequest = async (payload: any) => {
	const orgId = await getFromLocalStorage('orgId');
	const url = `${apiRoutes.org}/${orgId}${apiRoutes.verification.sendProofRequest}`;
	const axiosPayload = {
		url,
		payload,
		config: await getHeaderConfigs(),
	};

	try {
		return await axiosPost(axiosPayload);
	} catch (error) {
		const err = error as Error;
		return err?.message;
	}
};
