import { apiRoutes } from "../../config/apiRoutes";
import { getHeaderConfigs } from "../../config/getHeaderConfig";
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

export const receiveInvitationUrl = async (orgId: string, payload: any) => {
  const token = localStorage.getItem("session");
  console.log("test::::23143456", orgId);
  const url = `${apiRoutes.org}/${orgId}${apiRoutes.connection.getInvitationUrl}`;
  console.log("Received invitation payload::", payload);
  const axiosPayload = {
    url,
    payload,
    config: {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    },
  };

  try {
    console.log("receive invitation payload:::", axiosPayload);
    const res = await axiosPost(axiosPayload);
    console.log("Receive invitation Response::::", res);
    return res;
  } catch (error) {
    const err = error as Error;
    console.log("Receive invitation Error::::", err);
    return err?.message;
  }
};
