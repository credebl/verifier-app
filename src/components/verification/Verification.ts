import { apiRoutes } from "../../config/apiRoutes";
import { envConfig } from "../../config/envConfig";
import CryptoJS from "crypto-js"
import { axiosGet, axiosPost } from "../../services/apiRequests";
import { reCallAPI } from "../../api/auth";

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

export const sendProofRequest = async (token: string, payload: any) => {
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
		return reCallAPI(err, sendProofRequest, [payload])
	}
};

export const getProofData = async (token: string, proofId: string, orgId: string) => {
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
	  return reCallAPI(err, getProofData, [proofId, orgId])
	}
  };

  export const verifyPresentation = async (token: string, proofId: string, orgId: string) => {
	const url = `${apiRoutes.org}/${orgId}${apiRoutes.verification.sendProofRequest}/${proofId}${apiRoutes.verification.verifyProof}`;
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
	  return await axiosPost(axiosPayload);
	} catch (error) {
	  const err = error as Error;
	  return reCallAPI(err, verifyPresentation, [proofId, orgId])
	}
  };

  export const fetchPresentationData = async (token: string, proofId: string, orgId: string) => {
	const url = `${apiRoutes.org}/${orgId}${apiRoutes.verification.getProofDetails}${proofId}`;
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
	  return reCallAPI(err, fetchPresentationData, [proofId, orgId])
	}
  };

