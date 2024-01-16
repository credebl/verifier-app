import { apiRoutes } from "../../config/apiRoutes";
import { getHeaderConfigs } from "../../config/getHeaderConfig";
import { axiosGet, axiosPost } from "../../services/apiRequests";

export const getConnection=async (connectionId:string, orgId: string)=>{
	const url = `${apiRoutes.org}/${orgId}${apiRoutes.connection.getConnection}/${connectionId}`;
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

export const receiveInvitationUrl=async (orgId: string, payload: any)=>{
	const url = `http://192.168.1.76:5000${apiRoutes.org}/${orgId}${apiRoutes.connection.getInvitationUrl}`;
    // const url = `${apiRoutes.org}/${orgId}${apiRoutes.connection.getInvitationUrl}`;

    console.log("test::::23143456", url);
    console.log("payload::::payload", payload);
	const axiosPayload = {
		url,
        payload: {
            invitationUrl: payload,
			reuseConnection: true
        },
		config: await getHeaderConfigs(),
	};

	try {
		return await axiosPost(axiosPayload);
	} catch (error) {
		const err = error as Error;
		return err?.message;
	}
};
