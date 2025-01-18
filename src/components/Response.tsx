import React from "react";

// Define the structure of your API response
interface APIResponseData {
  // Add the specific properties you expect from your API
  // This is an example - adjust according to your actual API response
  [key: string]: any; // For dynamic properties
  statusCode?: number;
  headers?: Record<string, string>;
  body?: any;
}

interface ResponseProps {
  data: APIResponseData;
}

const Response: React.FC<ResponseProps> = ({ data }) => {
  return (
    <>
      <h1 className="text-3xl mt-10">Response</h1>
      <div className="bg-[#36125d] rounded-lg p-4 mt-4 overflow-hidden  ">
        <pre className=" h-72 overflow-y-scroll">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </>
  );
};

export default Response;

// import React from 'react'

// const Response = ({data}) => {
//   return (
//     <div>{JSON.stringify(data, null, 2)}</div>
//   )
// }

// export default Response
