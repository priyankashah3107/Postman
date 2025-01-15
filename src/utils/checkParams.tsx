"use client";
const checkValidJson = (text: any) => {
  if (
    /^[\],:{}\s]*$/.test(
      text
        .replace(/\\["\\\/bfnrtu]/g, "@")
        .replace(
          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
          "]"
        )
        .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
    )
  ) {
    return true;
  } else {
    return false;
  }
};

const checkParams = (
  formData,
  jsonText,
  paramData,
  headerData,
  setErrorMsg
) => {
  if (!formData.url || formData.url.trim() === "") {
    setErrorMsg("Request Url is Missing");
    return false;
  }

  if (!checkValidJson(jsonText)) {
    setErrorMsg("Enter Text is not valid Json");
    return false;
  }
  return true;
};

export default checkParams;

// import React from "react";

// // Utility function to validate JSON string
// const checkValidJson = (text: string): boolean => {
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

// // Interfaces for the parameters
// interface FormData {
//   url: string;
// }

// interface ParamData {
//   key: string;
//   value: string;
//   description: string;
//   enabled: boolean;
// }

// interface HeaderData {
//   key: string;
//   value: string;
//   description: string;
//   enabled: boolean;
// }

// // Main function to check parameters
// const checkParams = (
//   formData: FormData,
//   jsonText: string,
//   paramData: ParamData[],
//   headerData: HeaderData[],
//   setErrorMsg: (message: string) => void
// ): boolean => {
//   if (!formData.url || formData.url.trim() === "") {
//     setErrorMsg("Request URL is missing");
//     return false;
//   }

//   if (!checkValidJson(jsonText)) {
//     setErrorMsg("Entered text is not valid JSON");
//     return false;
//   }

//   return true;
// };

// export default checkParams;
