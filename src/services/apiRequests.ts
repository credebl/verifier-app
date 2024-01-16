import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";

export interface APIParameters {
    url: string,
    payload?: Record<never, unknown>
    config?: Record<string, unknown>
}

export const axiosGet = async ({ url, config }: APIParameters): Promise<AxiosResponse> => {
    try {
        const response = await axios.get(url, config);

        return response
    }
    catch (error) {
        const err = error as AxiosError
        return HandleResponse(err.response ? err.response : err)
    }
}

export const axiosPost = async ({ url, payload, config }: APIParameters): Promise<AxiosResponse> => {
    try {		
        const response = await axios.post(url, payload, config);

        return response
    }
    catch (error) {
        const err = error as AxiosError
        return HandleResponse(err.response ? err.response : err)
    }
}

const HandleResponse = (responseData: any): Promise<AxiosResponse> => {
    if (responseData) {

        return Promise.reject(new Error(
            responseData?.data?.message
              ? responseData?.data?.message
              : responseData?.message
                ? responseData?.message
                : "Something went wrong, please try later..."
          ));
          

    } else {
        return Promise.reject(new Error("Please check your internet connectivity and try again"))
    }
}
