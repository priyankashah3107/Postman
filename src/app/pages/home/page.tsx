"use client";

import ErrorScreen from "@/components/ErrorScreen";
import Form from "@/components/Form";
import RequestCollection from "@/components/RequestCollection";
import Response from "@/components/Response";
import { useState } from "react";
import { useDataContext } from "context/DataProvider";
import checkParams from "utils/checkParams";
import toast from "react-hot-toast";
import { APIResponse, sendRequest } from "service/api";

export default function Home() {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  // const [errorResponse, setErrorResponse] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<APIResponse | null>(null);

  const { formData, jsonText, paramData, headerData } = useDataContext();

  const onSendClick = async () => {
    if (isLoading) return;
    setError(false);
    setLoading(true);

    if (!checkParams(formData, jsonText, paramData, headerData, setErrorMsg)) {
      toast.error(errorMsg || "An error occurred");
      setError(true);
      return;
    }

    try {
      const response = await sendRequest(
        formData.url,
        formData.type,
        paramData,
        headerData,
        jsonText
      );

      // You can add a state for the response and set it here
      // setApiResponse(response);
      setApiResponse(response.data);
      console.log("abc", response.data);

      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success(`Request completed in ${response.duration}ms`);
      }
    } catch (error) {
      console.log("err", error);
      toast.error("Failed to send request");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <p>Error......</p>;
  }

  return (
    <>
      <div className="bg-gradient-to-tr from-[#63298d] via-[#181f47] to-[#480776] h-screen w-screen   text-white   ">
        <div className="">
          <Form onSendClick={onSendClick} />
          <RequestCollection />
          {/* <Response />
          <ErrorScreen /> */}

          {apiResponse ? <Response data={apiResponse} /> : <ErrorScreen />}

          {errorMsg && <p className="text-red-500 mt-4">{errorMsg}</p>}

          {/* {error && errorMsg && toast.error(errorMsg)} */}
        </div>
      </div>
    </>
  );
}
