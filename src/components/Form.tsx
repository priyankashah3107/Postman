// "use client";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@radix-ui/react-dropdown-menu";
// import React, { useState } from "react";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { useContext } from "react";
// import { DataContext } from "context/DataProvider";

// const Form = () => {
//   const [method, setMethod] = useState("GET");
//   // console.log(method);
//   const { formData, setFormData } = useContext(DataContext);
//   const handleSelectMethod = (selectMethod: any) => {
//     setMethod(selectMethod);
//   };
//   return (
//     <form className="max-w-6xl w-screen   bg-[#36125d] flex flex-row justify-between gap-4 sm:gap-10 p-4  rounded items-center  shadow-lg ">
//       <DropdownMenu>
//         {/* <DropdownMenuTrigger>GET</DropdownMenuTrigger> */}
//         <DropdownMenuTrigger value={formData.type}>
//           {method}
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="bg-[#431774] p-6 ml-32 mt-8 rounded-md gap-2 cursor-pointer ">
//           <DropdownMenuSeparator />

//           <DropdownMenuItem onClick={() => handleSelectMethod("POST")}>
//             POST
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={() => handleSelectMethod("PUT")}>
//             PUT
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={() => handleSelectMethod("DELETE")}>
//             DELETE
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={() => handleSelectMethod("PATCH")}>
//             PATCH
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={() => handleSelectMethod("HEAD")}>
//             HEAD
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={() => handleSelectMethod("OPTIONS")}>
//             OPTIONS
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={() => handleSelectMethod("GET")}>
//             GET
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>

//       <Input required type="url" placeholder="Enter Url or Paste the text" />

//       <Button variant="secondary" size="lg">
//         Send
//       </Button>
//     </form>
//   );
// };

// export default Form;

// Form.tsx
"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDataContext } from "context/DataProvider";

type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS";

const Form: React.FC = () => {
  const { formData, setFormData } = useDataContext();

  console.log(formData);

  const handleSelectMethod = (selectedMethod: HttpMethod) => {
    setFormData((prev) => ({ ...prev, type: selectedMethod }));
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, url: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl w-screen bg-[#36125d] flex flex-row justify-between gap-4 sm:gap-10 p-4 rounded items-center shadow-lg"
    >
      <DropdownMenu>
        <DropdownMenuTrigger className="px-4 py-2 rounded bg-[#431774]">
          {formData.type}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#431774] p-6 ml-32 mt-8 rounded-md gap-2 cursor-pointer">
          <DropdownMenuSeparator />
          {["POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS", "GET"].map(
            (method) => (
              <DropdownMenuItem
                key={method}
                onClick={() => handleSelectMethod(method as HttpMethod)}
              >
                {method}
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Input
        required
        type="url"
        placeholder="Enter Url or Paste the text"
        value={formData.url}
        onChange={handleUrlChange}
      />

      <Button type="submit" variant="secondary" size="lg">
        Send
      </Button>
    </form>
  );
};

export default Form;
