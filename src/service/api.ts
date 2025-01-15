// // we are using axios as a functions here and passes a object in in to user can select what they choose on the fe

// import axios from "axios";

// export const getData = async (formData, jsonText, paramData, headerData) => {
//     const apiType = formData.type.toLowerCase();
//     const apiURL = formData.url;

//     try {
//       return await axios({
//         method: apiType,
//         url: apiURL,
//         body: jsonText
//       })
//     } catch (error) {
//       console.log("Error while calling getData API", error)
//       return "error"
//     }
// }

// import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
// import { toast } from "react-hot-toast";

// interface RequestParams {
//   key: string;
//   value: string;
//   description: string;
//   enabled: boolean;
// }

// interface RequestHeaders {
//   key: string;
//   value: string;
//   description: string;
//   enabled: boolean;
// }

// export interface APIResponse {
//   data: any;
//   status: number;
//   headers: any;
//   error?: string;
//   duration?: number;
// }

// const formatParams = (params: RequestParams[]): Record<string, string> => {
//   return params
//     .filter((param) => param.enabled)
//     .reduce(
//       (acc, param) => ({
//         ...acc,
//         [param.key]: param.value,
//       }),
//       {}
//     );
// };

// const formatHeaders = (headers: RequestHeaders[]): Record<string, string> => {
//   return headers
//     .filter((header) => header.enabled)
//     .reduce(
//       (acc, header) => ({
//         ...acc,
//         [header.key]: header.value,
//       }),
//       {}
//     );
// };

// export const sendRequest = async (
//   url: string,
//   method: string,
//   params: RequestParams[],
//   headers: RequestHeaders[],
//   body: string
// ): Promise<APIResponse> => {
//   const startTime = Date.now();

//   try {
//     // Validate URL
//     if (!url) {
//       throw new Error("URL is required");
//     }

//     // Parse JSON body if present and method is not GET
//     let parsedBody = undefined;
//     if (body && method !== "GET") {
//       try {
//         parsedBody = JSON.parse(body);
//       } catch (e) {
//         throw new Error("Invalid JSON in request body");
//       }
//     }

//     const config: AxiosRequestConfig = {
//       url,
//       method: method.toLowerCase(),
//       params: formatParams(params),
//       headers: formatHeaders(headers),
//       data: parsedBody,
//       validateStatus: () => true, // This allows us to handle all status codes
//     };

//     const response: AxiosResponse = await axios(config);

//     const duration = Date.now() - startTime;

//     return {
//       data: response.data,
//       status: response.status,
//       headers: response.headers,
//       duration,
//     };
//   } catch (error: any) {
//     const duration = Date.now() - startTime;

//     if (axios.isAxiosError(error)) {
//       toast.error(error.message || "Request failed");
//       return {
//         data: error.response?.data || null,
//         status: error.response?.status || 500,
//         headers: error.response?.headers || {},
//         error: error.message,
//         duration,
//       };
//     }

//     toast.error(error.message || "An unexpected error occurred");
//     return {
//       data: null,
//       status: 500,
//       headers: {},
//       error: error.message || "An unexpected error occurred",
//       duration,
//     };
//   }
// };

// service/api.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-hot-toast";

export interface APIResponse {
  data: any;
  status: number;
  headers: any;
  error?: string;
  duration?: number;
}

interface RequestParams {
  key: string;
  value: string;
  description: string;
  enabled: boolean;
}

interface RequestHeaders {
  key: string;
  value: string;
  description: string;
  enabled: boolean;
}

// Format enabled params into key-value pairs
const formatParams = (params: RequestParams[]): Record<string, string> => {
  return params
    .filter((param) => param.enabled)
    .reduce(
      (acc, param) => ({
        ...acc,
        [param.key]: param.value,
      }),
      {}
    );
};

// Format enabled headers into key-value pairs
// const formatHeaders = (headers: RequestHeaders[]): Record<string, string> => {
//   const formattedHeaders = headers
//     .filter((header) => header.enabled)
//     .reduce(
//       (acc, header) => ({
//         ...acc,
//         [header.key]: header.value,
//       }),
//       {}
//     );

//   // Ensure proper headers for JSON content
//   if (!formattedHeaders["Content-Type"]) {
//     formattedHeaders["Content-Type"] = "application/json";
//   }

//   return formattedHeaders;
// };

export const sendRequest = async (
  url: string,
  method: string,
  params: RequestParams[],
  headers: RequestHeaders[],
  body: string
): Promise<APIResponse> => {
  const startTime = Date.now();

  try {
    // Validate URL
    if (!url) {
      throw new Error("URL is required");
    }

    // Prepare request configuration
    const config: AxiosRequestConfig = {
      url,
      method: method.toLowerCase(),
      params: formatParams(params),
      // headers: formatHeaders(headers),
      validateStatus: () => true, // Handle all status codes
    };

    // Handle request body based on method
    if (["post", "put", "patch"].includes(method.toLowerCase()) && body) {
      try {
        config.data = JSON.parse(body);
      } catch (e) {
        config.data = body; // Use raw body if not JSON
      }
    }

    // Add timeout
    config.timeout = 30000; // 30 seconds timeout

    // Make the request
    const response: AxiosResponse = await axios(config);

    const duration = Date.now() - startTime;

    // Handle different response types
    let responseData = response.data;
    try {
      // Try to parse if string
      if (typeof responseData === "string") {
        responseData = JSON.parse(responseData);
      }
    } catch (e) {
      // Keep original response if parsing fails
    }

    // Format success response
    return {
      data: responseData,
      status: response.status,
      headers: response.headers,
      duration,
    };
  } catch (error: any) {
    const duration = Date.now() - startTime;

    // Handle Axios errors
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || error.message || "Request failed";
      toast.error(errorMessage);
      return {
        data: error.response?.data || null,
        status: error.response?.status || 500,
        headers: error.response?.headers || {},
        error: errorMessage,
        duration,
      };
    }

    // Handle other errors
    const errorMessage = error.message || "An unexpected error occurred";
    toast.error(errorMessage);
    return {
      data: null,
      status: 500,
      headers: {},
      error: errorMessage,
      duration,
    };
  }
};
