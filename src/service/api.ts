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

import axios, { AxiosRequestConfig } from "axios";

// Define types for formData, jsonText, paramData, and headerData
interface FormData {
  type: string; // The HTTP method (GET, POST, etc.)
  url: string; // The API URL
}

interface ParamData {
  [key: string]: string | number | boolean | undefined; // Key-value pairs for parameters
}

interface HeaderData {
  [key: string]: string; // Key-value pairs for headers
}

// Function to send requests
export const getData = async (
  formData: FormData,
  jsonText: object | string | null,
  paramData: ParamData | null,
  headerData: HeaderData | null
): Promise<any> => {
  const apiType = formData.type.toLowerCase(); // HTTP method (GET, POST, etc.)
  const apiURL = formData.url; // API URL

  try {
    const config: AxiosRequestConfig = {
      method: apiType as
        | "get"
        | "post"
        | "put"
        | "delete"
        | "patch"
        | "head"
        | "options", // Axios expects HTTP methods as strings
      url: apiURL,
      headers: headerData ? headerData : {}, // Provide headers if available
      data: jsonText, // The request body (can be null if no body)
      params: paramData, // The query parameters (can be null if not provided)
    };

    return await axios(config); // Make the request
  } catch (error) {
    console.error("Error while calling getData API", error);
    return "error"; // Return an error message in case of failure
  }
};
