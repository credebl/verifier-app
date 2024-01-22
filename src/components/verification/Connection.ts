import { apiRoutes } from "../../config/apiRoutes";
import { axiosGet, axiosPost } from "../../services/apiRequests";

export const getConnection = async (connectionId: string, orgId: string) => {
  const token = localStorage.getItem("session");
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
    return err?.message;
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

export const receiveInvitationUrl = async (orgId: string, payload: any) => {
  const token = localStorage.getItem("session");
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
    return err?.message;
  }
};
