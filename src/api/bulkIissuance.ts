import { apiRoutes } from '../config/apiRoutes';
import { envConfig } from '../config/envConfig';
import API from './api';
import { reCallAPI } from './auth';
import axios from 'axios'

export const DownloadCsvTemplate = async (credDefId: string) => {
	const orgId = await envConfig.PUBLIC_ORGID;
	const token = await localStorage.getItem('session') || "";
	const url = `${apiRoutes.org}/${orgId}/${credDefId}${apiRoutes.downloadTemplate}`;

	try {
		const response = await API({
			url,
			method: 'GET',
			token,
			headerData: {
				'Content-Type': 'application/csv; charset=utf-8'
			}
		});
		console.log(3342, response);
		return response
	} catch (error) {
		const err = error as Error;
		console.error("DOWNLOAD CSV ERROR:::", error);
		return reCallAPI(err, DownloadCsvTemplate)
	}
};

export const uploadCsvFile = async (token: string, payload: { file: Uint8Array | Blob, fileName: string }, credefId: string): Promise<any> => {
	const orgId = await envConfig.PUBLIC_ORGID;
	const url = `${apiRoutes.org}/${orgId}${apiRoutes.bulk.uploadCsv}?credDefId=${credefId}`;
	const baseURL = globalThis.baseUrl || envConfig.PUBLIC_BASE_URL || process.env.PUBLIC_BASE_URL;

	try {
		const response = await axios.post(
			baseURL + url, payload, {
			headers: {
				'Authorization': `bearer ${token}`,
				'Content-Type': 'multipart/form-data'
			}
		})
		return response?.data
		// const response = await API({
		// 	url,
		// 	method: 'POST',
		// 	token,
		// 	headerData: {
		// 		'Content-Type': 'multipart/form-data'
		// 	},
		// 	payload
		// });
		// console.log(3342, response);
		// return response
	} catch (error) {
		const err = error as Error;
		console.error("UPLOAD CSV ERROR:::", error);
		return reCallAPI(err, uploadCsvFile, [payload, credefId])
	}
};

export const getCsvFileData = async (
	token: string,
	requestId: any
) => {
	const orgId = await envConfig.PUBLIC_ORGID;
	const url = `${apiRoutes.org}/${orgId}/${requestId}${apiRoutes.bulk.preview}?pageNumber=1&pageSize=500&search=`;

	try {
		const response = await API({
			url,
			method: 'GET',
			token,
			headerData: {}
		});
		console.log(3342, response);
		return response
	} catch (error) {
		const err = error as Error;
		console.error("UPLOAD CSV ERROR:::", error);
		return reCallAPI(err, getCsvFileData)
	}
};

export const issueBulkCredential = async (requestId: string, clientId: string) => {
	const orgId = await localStorage.getItem('org-id');
	const url = `${apiRoutes.org}/${orgId}/${requestId}${apiRoutes.bulk.bulk}`;

	const axiosPayload = {
		url,
		config: await getHeaderConfigs(),
		payload: {
			clientId
		}
	};

	try {
		return await axiosPost(axiosPayload);
	} catch (error) {
		const err = error as Error;
		return err?.message;
	}
};

export const retryBulkIssuance = async (fileId: string, clientId: string) => {
	const orgId = await localStorage.getItem('org-id');
	const url = `${apiRoutes.org}/${orgId}/${fileId}${apiRoutes.bulk.retry}`;

	const axiosPayload = {
		url,
		payload: { clientId: clientId },
		config: await getHeaderConfigs(),
	};

	try {
		return await axiosPost(axiosPayload);
	} catch (error) {
		const err = error as Error;
		return err?.message;
	}
};

export const getFilesHistory = async (
	pageNumber: number,
	pageSize: number,
	search: string,
) => {
	const orgId = await localStorage.getItem('org-id');
	const url = `${apiRoutes.org}/${orgId}${apiRoutes.bulk.files}?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`;

	const axiosPayload = {
		url,
		config: await getHeaderConfigs(),
	};

	try {
		return await axiosGet(axiosPayload);
	} catch (error) {
		const err = error as Error;
		return err?.message;
	}
};

export const getFilesDataHistory = async (
	requestId: string,
	pageNumber: number,
	pageSize: number,
	search: string,
	sortBy: string
) => {
	const orgId = await localStorage.getItem('org-id');
	const url = `${apiRoutes.org}/${orgId}/${requestId}${apiRoutes.bulk.filesData}?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}&sortBy=${sortBy}`;

	const axiosPayload = {
		url,
		config: await getHeaderConfigs(),
	};

	try {
		return await axiosGet(axiosPayload);
	} catch (error) {
		const err = error as Error;
		return err?.message;
	}
};
