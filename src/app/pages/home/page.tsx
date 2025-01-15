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
// import Image from "next/image";

export default function Home() {
  const [method, setMethod] = useState("GET");

  const handleSelectMethod = (selectMethod: any) => {
    setMethod(selectMethod);
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

          <Form />

          <div>
            <RequestCollection />
            <Response />
            <ErrorScreen />
          </div>
        </div>
      </div>
    </>
  );
}
