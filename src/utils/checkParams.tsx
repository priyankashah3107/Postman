// "use client";
// const checkValidJson = (text: any) => {
//   if (
//     /^[\],:{}\s]*$/.test(
//       text
//         .replace(/\\["\\\/bfnrtu]/g, "@")
//         .replace(
//           /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
//           "]"
//         )
//         .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
//     )
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// };

// const checkParams = (
//   formData,
//   jsonText,
//   paramData,
//   headerData,
//   setErrorMsg
// ) => {
//   if (!formData.url || formData.url.trim() === "") {
//     setErrorMsg("Request Url is Missing");
//     return false;
//   }

//   if (!checkValidJson(jsonText)) {
//     setErrorMsg("Enter Text is not valid Json");
//     return false;
//   }
//   return true;
// };

// export default checkParams;

// // import React from "react";

// // // Utility function to validate JSON string
// // const checkValidJson = (text: string): boolean => {
// //   if (
// //     /^[\],:{}\s]*$/.test(
// //       text
// //         .replace(/\\["\\\/bfnrtu]/g, "@")
// //         .replace(
// //           /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
// //           "]"
// //         )
// //         .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
// //     )
// //   ) {
// //     return true;
// //   } else {
// //     return false;
// //   }
// // };

// // // Interfaces for the parameters
// // interface FormData {
// //   url: string;
// // }

// // interface ParamData {
// //   key: string;
// //   value: string;
// //   description: string;
// //   enabled: boolean;
// // }

// // interface HeaderData {
// //   key: string;
// //   value: string;
// //   description: string;
// //   enabled: boolean;
// // }

// // // Main function to check parameters
// // const checkParams = (
// //   formData: FormData,
// //   jsonText: string,
// //   paramData: ParamData[],
// //   headerData: HeaderData[],
// //   setErrorMsg: (message: string) => void
// // ): boolean => {
// //   if (!formData.url || formData.url.trim() === "") {
// //     setErrorMsg("Request URL is missing");
// //     return false;
// //   }

// //   if (!checkValidJson(jsonText)) {
// //     setErrorMsg("Entered text is not valid JSON");
// //     return false;
// //   }

// //   return true;
// // };

// // export default checkParams;

// utils/checkParams.ts

interface FormData {
  url: string;
  type: string;
}

interface ParamData {
  key: string;
  value: string;
  description: string;
  enabled: boolean;
}

interface HeaderData {
  key: string;
  value: string;
  description: string;
  enabled: boolean;
}

const checkParams = (
  formData: FormData,
  jsonText: string,
  paramData: ParamData[],
  headerData: HeaderData[],
  setErrorMsg: (msg: string) => void
): boolean => {
  // Check if URL is provided and valid
  if (!formData.url) {
    setErrorMsg("Please provide a URL");
    return false;
  }

  try {
    new URL(formData.url);
  } catch (e) {
    setErrorMsg("Please provide a valid URL");
    return false;
  }

  // For POST, PUT, PATCH requests, validate JSON if provided
  if (
    ["POST", "PUT", "PATCH"].includes(formData.type.toUpperCase()) &&
    jsonText.trim()
  ) {
    try {
      JSON.parse(jsonText);
    } catch (e) {
      setErrorMsg("Invalid JSON in request body");
      return false;
    }
  }

  // Check for duplicate parameter keys
  const enabledParams = paramData.filter((param) => param.enabled);
  const paramKeys = enabledParams.map((param) => param.key);
  if (new Set(paramKeys).size !== paramKeys.length) {
    setErrorMsg("Duplicate parameter keys found");
    return false;
  }

  // Check for duplicate header keys
  const enabledHeaders = headerData.filter((header) => header.enabled);
  const headerKeys = enabledHeaders.map((header) => header.key);
  if (new Set(headerKeys).size !== headerKeys.length) {
    setErrorMsg("Duplicate header keys found");
    return false;
  }

  // Validate enabled parameters have values
  const invalidParams = enabledParams.find(
    (param) => param.enabled && !param.value
  );
  if (invalidParams) {
    setErrorMsg("All enabled parameters must have values");
    return false;
  }

  // Validate enabled headers have values
  const invalidHeaders = enabledHeaders.find(
    (header) => header.enabled && !header.value
  );
  if (invalidHeaders) {
    setErrorMsg("All enabled headers must have values");
    return false;
  }

  return true;
};

export default checkParams;
