"use client";

import React, { useRef, useEffect, useState } from "react";
import QrScanner from "qr-scanner";
import {
  getFromLocalStorage,
  getProofData,
  sendProofRequest,
  verifyPresentation,
} from "./Verification";
import { getConnection, receiveInvitationUrl } from "./Connection";
import type { AxiosResponse } from "axios";
import { apiStatusCodes } from "../../config/commonConstants";
import { envConfig } from "../../config/envConfig";
interface IOpenWebCamProps {
  onCloseWebCam: () => void;
  onScan: (result: any) => void;
  scanData: any;
}
interface ISelectedUsers {
  userName: string;
  connectionId: string;
}
interface IProofRequest {
  connectionId: string;
  attributes: Array<{
    attributeName: string;
    credDefId?: string;
  }>;
  comment: string;
  orgId: string;
}

const OpenWebCam: React.FC<IOpenWebCamProps> = ({
  onCloseWebCam,
  onScan,
  scanData,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const [userData, setUserData] = useState();
  const [QRData, setQRData] = useState({});
  const [step, setStep] = useState(0);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [connectId, setConnectId] = useState(
    "9924aebe-d529-4b52-be9b-c2963fb44dbe"
  );
  const [connectionStatus, setConnectionStatus] = useState("");
  const [proofId, setProofId] = useState("");
  const [proofStatus, setProofStatus] = useState("");
  const [selectedUsersData, setSelectedUsersData] = useState<
    Array<{ name: string; selected: boolean }>
  >([]);
  console.log("loading-----", loading);

  const handleQrCodeScanned = async (result: any) => {
    console.log("result111", result);
    const data = await acceptInvitation(result);
    console.log(3534543, data);
    setStep(1)
    // setTimeout(() => {
    //   console.log(765765764, "set connectid");
    //   setConnectId("9924aebe-d529-4b52-be9b-c2963fb44dbe");
    // }, 2000);
    // setConnectId(data?.connectionId);
    onScan(result);
    onCloseWebCam();
    // setLoading(false);
  };

  const getConnectionDetails = async (connectionId: string) => {
    try {
      console.log(765765767, connectionId);
      const orgId = await envConfig.PUBLIC_ORGID;
      if (!connectionStatus) {
        const response = await getConnection(connectionId, orgId);
        console.log(765765765, response);
        const { data } = response as AxiosResponse;
        if (data?.statusCode === apiStatusCodes?.API_STATUS_SUCCESS) {
          const status = data?.data?.state
          setConnectionStatus(status);
          if(status === 'completed'){
            setStep(2)
          }
        } else {
          setErrMsg(response as string);
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const getProofDetails = async (proofId: string) => {
    try {
      console.log(865765767, proofId);
      const orgId = await envConfig.PUBLIC_ORGID;
      const response = await getProofData(proofId, orgId);
      console.log(865765765, response);
      const { data } = response as AxiosResponse;
      if (data?.statusCode === apiStatusCodes?.API_STATUS_SUCCESS) {
        setProofStatus(data?.data?.state);
      } else {
        setErrMsg(response as string);
      }
    } catch (error) {
      throw error;
    }
  };

  const AcceptinvitationStep = async () => {
    try {
      let intervalOne;
      const status = await getConnectionDetails(connectId);
      console.log(765765766, userData, connectId, status);

      if (connectId && connectionStatus && connectionStatus !== "completed") {
        intervalOne = setInterval(async () => {
          console.log(765765762, connectionStatus);
          await getConnectionDetails(connectId);
        }, 3000);
      } else if (connectionStatus === "completed") {
        console.log(765765763, "clear");
        setStep(2);
        return clearInterval(intervalOne);
      } else {
        console.log(76576576, "else called!!");
      }
    } catch (err) {
      console.log("Accept inviation Error:::", err);
    }
  };

  const CreateProofRequestStep = async () => {
    try {
      if (connectionStatus === "completed") {
        const credDefId =
          "8SmUTa2PG5X9miX6LvoqU1:3:CL:265220:voter id Maharashtra";
        const schemaId = "8SmUTa2PG5X9miX6LvoqU1:2:Voter Card:0.1.1";
        const payload = {
          connectionId: connectId,
          attributes: [
            {
              attributeName: "name",
              credDefId,
              schemaId,
            },
            {
              attributeName: "age",
              credDefId,
              schemaId,
            },
          ],
          comment: "",
        };
        console.log(7657657612, payload)
        const res = await createProofRequest(payload);
        console.log(765765769, res);
        setTimeout(() => {
          setProofId("7c034605-e3d4-4990-ba81-8026bdc0d7c6");
          setStep(3);
        }, 3000);
      }
    } catch (err) {
      console.log("Create Proof Request Error::::", err);
    }
  };

  const fetchData = async (step: number) => {
    switch (step) {
      case 0:
        console.log("STEP:::", 0)
        startScanning();
        break;
      case 1:
        console.log("STEP:::", 1)
        AcceptinvitationStep();
        break;
      case 2:
        console.log("STEP:::", 2)
        CreateProofRequestStep();
        break;
      case 3:
        console.log("STEP:::", 3)
        console.log("ProofRequestStatusCheck");
        if (!proofStatus && proofId) {
          const status = await getProofDetails(proofId);
          setStep(4);
          console.log(7657657610, userData, proofId, status);
        }
        break;

      case 4:
        if (proofStatus === "presentation-received") {
          const res = await verifyProofPresentation("");
          setStep("ProofRequestStatusDone");
          console.log("verifyStatusResponse::", res);
        }
        console.log("VerifyProofRequest");
        break;

      case 5:
        if (proofStatus === "done") {
          const status = await getProofDetails(proofId);
          console.log("DoneVerificationstatus:::", status);
        }
        break;

      default:
        console.log("No any step");
        break;
    }
  };

  console.log(765765768, "connectionStatus", connectionStatus);

  useEffect(() => {
    console.log("interval useeffect", connectId, connectionStatus);
    let intervalOne;
    fetchData("ConnStatusCompleted");

    if (connectId && connectionStatus && connectionStatus !== "completed") {
      intervalOne = setInterval(() => {
        console.log(765765762, connectionStatus);
        fetchData("ConnStatusCompleted");
      }, 3000);
    } else if (connectionStatus === "completed") {
      console.log(765765763, "clear");
      setStep("CreateProofRequest");
      return clearInterval(intervalOne);
    } else {
      console.log(76576576, "else called!!");
    }

    // Create proof request
    if (connectionStatus === "completed") {
      fetchData("CreateProofRequest");
    }

    // Pool to get proof request status
    let intervalTwo;
    fetchData("ProofRequestStatusDone");

    if (proofId && proofStatus && proofStatus !== "presentation-received") {
      intervalTwo = setInterval(() => {
        console.log(765765760, proofStatus);
        fetchData("ProofRequestStatusDone");
      }, 3000);
    } else if (proofStatus === "completed") {
      console.log(765765763, "clear");
      setStep("VerifyProofRequest");
      return clearInterval(intervalTwo);
    } else {
      console.log(76576574, "else called!!");
    }
  }, [proofId, proofStatus, step]);

  const acceptInvitation = async (qrData: string) => {
    try {
      const orgId = envConfig.PUBLIC_ORGID;
      console.log("orgId", orgId);
      const payloadData = qrData ? JSON.parse(qrData) : ''
      setQRData(payloadData);

      console.log("qrData::", payloadData);

      if (orgId && payloadData) {
        const response = await receiveInvitationUrl(orgId, payloadData);

        console.log(7657657611, response)
        const { data } = response as AxiosResponse;

        if (data?.statusCode === apiStatusCodes?.API_STATUS_CREATED) {
          // setUserData(data?.data);
          // const connectionId = data?.data?.connectionRecord?.id
          const connectionId = '9924aebe-d529-4b52-be9b-c2963fb44dbe'
          if (connectionId) {
            console.log(7657657612, "connectionId", connectionId)
            setConnectId(connectionId)
            await getConnectionDetails(connectionId);
          }

          if (data?.data?.connectionId) {
            // await createProofRequest();
          }
        } else {
          setErrMsg(response as string);
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const getSelectedUsers = async (): Promise<ISelectedUsers[]> => {
    const selectedUsers = await getFromLocalStorage("selected_user");
    return JSON.parse(selectedUsers);
  };

  const createProofRequest = async (payload: any) => {
    try {
      // setRequestLoader(true);
      // const selectedUsers = await getSelectedUsers();
      // const credDefId = await getFromLocalStorage("cred_def_id");
      // const schemaId = await getFromLocalStorage("schema_id");
      // const orgId = envConfig.PUBLIC_ORGID;

      // const attributes = payload.attributes
      // .map((item) => ({
      //   attributeName: item.name,
      //   ...(credDefId ? { credDefId } : {}),
      //   schemaId: item.schemaId,
      // }));
      // const proofRequest: IProofRequest = {
      //   connectionId: `${connectId}`,
      //   attributes: attributes,
      //   comment: "string",
      //   orgId: orgId,
      // };
      if (payload?.attributes?.length > 0) {
        const response = await sendProofRequest(payload);
        const { data } = response as AxiosResponse;
        if (data?.statusCode === apiStatusCodes.API_STATUS_CREATED) {
          console.log(765765769, "RSPONSE:::", data);
        } else {
          setErrMsg(response as string);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setErrMsg("An error occurred. Please try again.");
    }
  };

  const verifyProofPresentation = async (proofId: string) => {
    try {
      const orgId = envConfig.PUBLIC_ORGID;
      const response = await verifyPresentation(proofId, orgId);
      const { data } = response as AxiosResponse;

      if (data?.statusCode === apiStatusCodes.API_STATUS_CREATED) {
        console.log(865765769, "RSPONSE:::", data);
      } else {
        setErrMsg(response as string);
      }
    } catch (error) {}
  };

  const startScanning = () => {
    // setLoading(true);
    // setLoading(false);
    if (videoRef.current) {
      try {
        const scanner = new QrScanner(videoRef.current, (result) => {
          console.log(3443, result);
          handleQrCodeScanned(result);
        });
        scanner.start();
        scannerRef.current = scanner;
        // setLoading(true);
        console.log("QR scanner started successfully.  abc------");
      } catch (error) {
        console.error("Error starting QR scanner:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const stopScanning = () => {
    console.log("---------------");

    if (scannerRef.current) {
      scannerRef.current.stop();
      console.log("QR scanner stopped.");
      onCloseWebCam();
    }
  };

  useEffect(() => {
    fetchData(step);

    return () => {
      stopScanning();
    };
  }, [step]);

  return (
    <div className="px-12 py-4 md:px-24 lg:px-32 z-30 bg-white sticky top-[60px] border-b border-b-slate-50">
      {/* {loading ? (
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
          <video ref={videoRef} className="w-150 h-150"></video>
      )} */}
      <video ref={videoRef} className="w-150 h-150"></video>
      <div className="flex items-center justify-center">
        <button
          onClick={stopScanning}
          className="mt-4 px-12 py-2 min-w-fit min-h-[43px] sm:min-w-[12rem] rounded-md text-center font-medium leading-5 border-indigo-700 hover:bg-secondary-700 bg-indigo-700 ring-2 text-black text-sm"
        >
          <span className="text-lg text-white">Stop Scanning</span>
        </button>
      </div>
    </div>
  );
};

export default OpenWebCam;
