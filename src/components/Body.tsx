"use client";
import React from "react";
import { useDataContext } from "context/DataProvider";
const Body: React.FC = () => {
  const { jsonText, setJsonText } = useDataContext();
  console.log("jsonText", jsonText);

  // const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   // const textarea = e.target;
  //   // textarea.style.height = "auto";
  //   // textarea.style.height = `${textarea.scrollHeight}px`;
  // };

  const onValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonText(e.target.value);
  };

  return (
    <>
      <div className="lg:mt-4">
        {/* Content Type and Header Section */}
        <div className="border flex flex-row gap-4 lg:gap-32 p-2 lg:p-5 text-[#9ca3af] font-semibold truncate">
          <p>Content Type</p>
          <p>Application/json</p>
          <p>Overrider</p>
        </div>

        {/* Raw Request Body Section */}
        <div className="border text-[#9ca3af] font-semibold truncate p-2 lg:p-5">
          Raw Request Body
        </div>

        {/* Dynamic Textarea Section */}
        <div className="border ">
          <textarea
            placeholder="Enter JSON Data"
            className=" w-full text-black p-4 border border-gray-300 rounded-md lg:h-56"
            rows={1} // Number value for rows
            // onInput={handleInput} // Dynamic resizing handler
            onChange={(e) => onValueChange(e)}
          />
        </div>
      </div>
    </>
  );
};

export default Body;
