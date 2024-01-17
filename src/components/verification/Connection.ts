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
        // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzA1MzMwNjIwLCJpYXQiOjE3MDUzMjcwMjAsImlzcyI6Imh0dHA6Ly8xMjcuMC4wLjE6NTQzMjEvYXV0aC92MSIsInN1YiI6IjE1ZDhiODI4LTliZmQtNDQwNC1iZWU0LTMwY2Q5YjU3MGU1NCIsImVtYWlsIjoic2hhc2hhbmsua3Vsa2FybmlAYXlhbndvcmtzLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzA1MzI3MDIwfV0sInNlc3Npb25faWQiOiJlYzMzZDcwNC03MDRmLTQ5YjAtYjk3YS0zNmY5YWRjMzBjYzAifQ.ulKjbLtPi95zeGqGCrb-8qJF941iwAFbpIOCFuhsczg'
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
        Authorization: `Bearer ${token}`,
        // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzA1MzMwNjIwLCJpYXQiOjE3MDUzMjcwMjAsImlzcyI6Imh0dHA6Ly8xMjcuMC4wLjE6NTQzMjEvYXV0aC92MSIsInN1YiI6IjE1ZDhiODI4LTliZmQtNDQwNC1iZWU0LTMwY2Q5YjU3MGU1NCIsImVtYWlsIjoic2hhc2hhbmsua3Vsa2FybmlAYXlhbndvcmtzLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzA1MzI3MDIwfV0sInNlc3Npb25faWQiOiJlYzMzZDcwNC03MDRmLTQ5YjAtYjk3YS0zNmY5YWRjMzBjYzAifQ.ulKjbLtPi95zeGqGCrb-8qJF941iwAFbpIOCFuhsczg'
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
