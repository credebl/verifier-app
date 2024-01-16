import React, { useRef, useEffect, useState } from "react";
import QrScanner from "qr-scanner";
import { getFromLocalStorage, sendProofRequest } from "./Verification";
import { getConnection, receiveInvitationUrl } from "./Connection";
import type { AxiosResponse } from "axios";
import { apiStatusCodes } from "../../config/commonConstants";
import { envConfig } from "../../config/envConfig";
// import { setInterval } from "timers/promises";
interface IOpenWebCamProps {
  onCloseWebCam: () => void;
  onScan: (result: any) => void;
  scanData: any;
}
interface ISelectedUsers {
	userName: string,
	connectionId: string
}
interface IProofRequest {
	connectionId: string;
	attributes: Array<{
		attributeName: string;
		credDefId?: string  ;
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
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [connectId, setConnectId] = useState("");
	const [selectedUsersData, setSelectedUsersData] = useState<Array<{ name: string, selected: boolean }>>([]);
console.log("loading-----",loading);

  const handleQrCodeScanned = async (result: any) => {
    console.log("result111", result);
    const data = await acceptInvitation(result);
    console.log(3534543, data);
    setConnectId(data?.connectionId);
    onScan(result);
    onCloseWebCam();
    // setLoading(false);
  };

  const getConnectionDetails = async (connectionId: string) => {
    try {
      const orgId = await getFromLocalStorage("orgId");
      const response = await getConnection(connectionId, orgId);

      const { data } = response as AxiosResponse;
      if (data?.statusCode === apiStatusCodes?.API_STATUS_SUCCESS) {
        setUserData(data?.data);
        if (data?.data) {
          // return data?.data;
        }
      } else {
        setErrMsg(response as string);
      }
    } catch (error) {
      throw error;
    }
  };

  const fetchData = () => {
    if (!userData) {
      getConnectionDetails(connectId);
    }
  };

  useEffect(() => {
    console.log("interval useeffect", connectId, userData);
    if (connectId) {
      let count = 0;
      const interval = setInterval(() => {
        console.log(765765762, userData);
        fetchData();
        count++;
      }, 3000);

      console.log(765765761, interval, connectId);

      if (count > 5) {
        console.log(765765763, "clear");
        clearInterval(interval);
      }
    }
    // getConnectionDetails(connectId);
  }, [connectId, userData]);

  //   useEffect(() => {
  //     setUserData(setInterval(() => {
  //         console.log("loading")
  //         // setLoadingStatus(loadingStatus + ".")
  //     }, 1000))

  //     return function cleanup() {
  //         console.log('cleaning up')
  //         clearInterval(userData)
  //     }
  // }, [])

  // useEffect(() => {

  // const intervalId = setInterval(() => {
  //   console.log('4567');
  // }, 1000);

  // }, [connectId, userData]);

  // useEffect(() => {
  //   console.log("Use effect called>>>")
  //   getConnectionDetails(connectId)
  //   let count = 0
  //   setInterval(() => {
  //     console.log("Interval called::", count++)
  //   }, 1000)
  // }, [connectId])

  const acceptInvitation = async (invitationUrl: string) => {
    try {
      const orgId = envConfig.PUBLIC_ORGID;
      console.log("orgId", orgId);

      // const invitationUrl = await getFromLocalStorage('orgId');
      console.log("invitationUrl::", invitationUrl);
      if (orgId) {
        const response = await receiveInvitationUrl(orgId, invitationUrl);

        const { data } = response as AxiosResponse;
        if (data?.statusCode === apiStatusCodes?.API_STATUS_CREATED) {
          setUserData(data?.data);
        } else {
          setErrMsg(response as string);
        }
      }
    } catch (error) {
      throw error;
    }
  };

	const getSelectedUsers = async (): Promise<ISelectedUsers[]> => {
		const selectedUsers = await getFromLocalStorage('selected_user')
		return JSON.parse(selectedUsers)
	}

  const selectConnection = (attributes: string, checked: boolean) => {
		if (checked) {
			setSelectedUsersData(prevSelectedUsersData => [
				...prevSelectedUsersData,
				{ name: attributes, selected: true }
			]);
		} else {
			setSelectedUsersData(prevSelectedUsersData =>
				prevSelectedUsersData.filter(item => item.name !== attributes)
			);
		}
	}
 
	const createProofRequest = async () => {
		try {
			// setRequestLoader(true);
			const selectedUsers = await getSelectedUsers();
			const credDefId = await getFromLocalStorage('cred_def_id');
			const schemaId = await getFromLocalStorage('schema_id');
			const orgId = await getFromLocalStorage('orgId');
	
			const attributes = selectedUsersData.map(user => ({
        attributeName: user.name,
        ...(credDefId ? { credDefId } : {}),
        schemaId: schemaId
      }));
			const proofRequest: IProofRequest = {
				connectionId: `${selectedUsers[0].connectionId}`,
				attributes: attributes,
				comment: "string",
				orgId: orgId
			};
			if (attributes) {
				const response = await sendProofRequest(proofRequest);
				const { data } = response as AxiosResponse;
				if (data?.statusCode === apiStatusCodes.API_STATUS_CREATED) {
					// setProofReqSuccess(data?.message);
					// setRequestLoader(false);
					// clearLocalStorage()
					// setTimeout(()=>{
					// 	window.location.href = '/organizations/verification'
					// }, 2000)
				} else {
					setErrMsg(response as string);
				}
			}
			setTimeout(()=>{
				setErrMsg('');
				// setProofReqSuccess('')

			}, 4000)
		} catch (error) {
			console.error("Error:", error);
			setErrMsg("An error occurred. Please try again.");
			// setRequestLoader(false);
		}
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
      } finally{

        setLoading(false)
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
    startScanning();
    return () => {
      stopScanning();
    };
  }, []);

  useEffect(() => {
    console.log(434542, scanData);
  }, [scanData]);

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
