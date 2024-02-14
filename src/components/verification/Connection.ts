import { reCallAPI } from "../../api/auth";
import { apiRoutes } from "../../config/apiRoutes";
import { axiosGet, axiosPost } from "../../services/apiRequests";

export const getConnection = async (token:string, connectionId: string, orgId: string) => {
  const url = `${apiRoutes.org}/${orgId}${apiRoutes.connection.getConnection}/${connectionId}`;
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
    return reCallAPI(err, getConnection, [connectionId, orgId])
  }
};

export const getShorteningUrl = async (referenceId: string) => {
	const token = localStorage.getItem('session');
	const url = `${apiRoutes.connection.getShorteningUrl}/${referenceId}`;
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

export const receiveInvitationUrl = async (token: string, orgId: string, payload: any) => {
  console.log(`token000:::::, ${token}`);
  const url = `${apiRoutes.org}/${orgId}${apiRoutes.connection.getInvitationUrl}`;
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
    const res = await axiosPost(axiosPayload);
    return res;
  } catch (error) {
    const err = error as Error;
    return reCallAPI(err, receiveInvitationUrl, [orgId, payload])
  }
};
