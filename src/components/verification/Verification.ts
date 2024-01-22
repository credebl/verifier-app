import { apiRoutes } from "../../config/apiRoutes";
import { envConfig } from "../../config/envConfig";
import CryptoJS from "crypto-js"
import { axiosGet, axiosPost } from "../../services/apiRequests";
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
	const token = localStorage.getItem('session');
	const orgId = await envConfig.PUBLIC_ORGID;
	const url = `${apiRoutes.org}/${orgId}${apiRoutes.verification.sendProofRequest}`;
	const axiosPayload = {
		url,
		payload,
		config: {
			headers: {
			  "Content-Type": "application/json",
			  Authorization: `Bearer ${token}`,
			},
		  },	
		};

	try {
		return await axiosPost(axiosPayload);
	} catch (error) {
		const err = error as Error;
		return err?.message;
	}
};

export const getProofData = async (proofId: string, orgId: string) => {
	const token = localStorage.getItem('session');
	const url = `${apiRoutes.org}/${orgId}${apiRoutes.verification.sendProofRequest}/${proofId}`;
	const axiosPayload = {
	  url,
	  config: {
		headers: {
		  "Content-Type": "application/json",
		  Authorization: `Bearer ${token}`,
		},
	  },	
	};
  
	try {
	  return await axiosGet(axiosPayload);
	} catch (error) {
	  const err = error as Error;
	  return err?.message;
	}
  };

  export const verifyPresentation = async (proofId: string, orgId: string) => {
	const token = localStorage.getItem('session');
	const url = `${apiRoutes.org}/${orgId}${apiRoutes.verification.sendProofRequest}/${proofId}/${apiRoutes.verification.verifyProof}`;
	const axiosPayload = {
	  url,
	  config: {
		headers: {
		  "Content-Type": "application/json",
		  Authorization: `Bearer ${token}`,
		},
	  },	
	};
  
	try {
	  return await axiosGet(axiosPayload);
	} catch (error) {
	  const err = error as Error;
	  return err?.message;
	}
  };

