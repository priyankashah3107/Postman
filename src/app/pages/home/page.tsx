"use client";

import ErrorScreen from "@/components/ErrorScreen";
import Form from "@/components/Form";
import RequestCollection from "@/components/RequestCollection";
import Response from "@/components/Response";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { useDataContext } from "context/DataProvider";
import checkParams from "utils/checkParams";
import toast from "react-hot-toast";
import { APIResponse, sendRequest } from "service/api";
// import Image from "next/image";

export default function Home() {
  const [method, setMethod] = useState("GET");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [apiResponse, setApiResponse] = useState<APIResponse | null>(null);

  const handleSelectMethod = (selectMethod: any) => {
    setMethod(selectMethod);
  };

  const { formData, jsonText, paramData, headerData } = useDataContext();

  // const onSendClick = () => {
  //   // alert("Love you universe");
  //   setError(false);
  //   if (!checkParams(formData, jsonText, paramData, headerData, setErrorMsg)) {
  //     toast.error(errorMsg || "An error occurred");
  //     setError(true);
  //     return;
  //   }
  //   console.log("Sending request with data:", { formData, jsonText });
  // };

  const onSendClick = async () => {
    setError(false);

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
      setApiResponse(response);

      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success(`Request completed in ${response.duration}ms`);
      }
    } catch (error) {
      console.log("err", error);
      toast.error("Failed to send request");
      setError(true);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-tr from-[#63298d] via-[#181f47] to-[#480776] min-h-screen w-screen h-full  text-white  relative ">
        {/* <div className="bg-gradient-to-tr from-[#d4b1f4] via-[#9775f5] to-[#bf73f6] absolute z-50 w-96 h-96 rounded-full backdrop-blur-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg animate-pulse opacity-90" /> */}
        <div className="absolute top-4  lg:top-10  lg:left-44">
          {/* <form className="max-w-6xl w-screen   bg-[#36125d] flex flex-row justify-between gap-4 sm:gap-10 p-4  rounded items-center  shadow-lg ">
            <DropdownMenu>
              
              <DropdownMenuTrigger>{method}</DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#431774] p-6 ml-32 mt-8 rounded-md gap-2 cursor-pointer ">
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => handleSelectMethod("POST")}>
                  POST
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSelectMethod("PUT")}>
                  PUT
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSelectMethod("DELETE")}>
                  DELETE
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSelectMethod("PATCH")}>
                  PATCH
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSelectMethod("HEAD")}>
                  HEAD
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSelectMethod("OPTIONS")}>
                  OPTIONS
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSelectMethod("GET")}>
                  GET
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Input
              required
              type="url"
              placeholder="Enter Url or Paste the text"
            />

            <Button variant="secondary" size="lg">
              Send
            </Button>
          </form> */}

          <Form onSendClick={onSendClick} />
          <RequestCollection />
          <Response />
          <ErrorScreen />

          {errorMsg && <p className="text-red-500 mt-4">{errorMsg}</p>}

          {/* {error && errorMsg && toast.error(errorMsg)} */}
        </div>
      </div>
    </>
  );
}
