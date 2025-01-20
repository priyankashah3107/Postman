"use client";
import React, { useEffect } from "react";
import CookiePage from "./CookiePage";
import { useDataContext } from "context/DataProvider";

// Define the structure of your API response
interface APIResponseData {
  [key: string]: any; // For dynamic properties
  statusCode?: number;
  headers?: Record<string, string>;
  body?: string | any;
}

interface ResponseProps {
  data: APIResponseData;
}

const Response: React.FC<ResponseProps> = ({ data }) => {
  const { setCookies } = useDataContext();

  console.log("Cookie", data);
  console.log("Response cookie", data?.body);

  // Update cookies when response data changes
  useEffect(() => {
    if (data?.cookies) {
      setCookies(data.cookies);
    }
  }, [data, setCookies]);
  return (
    <>
      <div>
        <h1 className="text-3xl mt-10">Response</h1>
        <div className="bg-[#36125d] rounded-lg p-4 mt-4 overflow-hidden  ">
          <pre className=" h-72 overflow-y-scroll">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
        <CookiePage />
      </div>
    </>
  );
};

export default Response;
