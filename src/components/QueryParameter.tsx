// import React from "react";

// const tablerow = [
//   { id: 1, val: "Key" },
//   { id: 2, val: "Value" },
//   { id: 3, val: "Description" },
// ];

// const QueryParameter = () => {
//   return (
//     <>
//       <div>
//         <table className="flex flex-col">
//           <thead>
//             <tr className="flex flex-row gap-96 border p-4 rounded-lg">
//               {tablerow.map((item, index) => (
//                 <th key={index} className="">
//                   {item.val}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="flex flex-row border p-4 rounded-lg gap-6 text-black">
//               <th className="bg-gray-50 opacity-60 p-2 rounded-md w-full">
//                 <textarea typeof="text" placeholder="Key" />
//               </th>
//               <th className="bg-gray-50 opacity-60 p-2 rounded-md  w-full">
//                 <input type="text" placeholder="value" />
//               </th>
//               <th className="bg-gray-50 opacity-60 p-2 rounded-md  w-full">
//                 <input type="text" placeholder="Description" />
//               </th>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default QueryParameter;
"use client";
import React, { useState, useContext } from "react";
import { useDataContext } from "context/DataProvider";

// interface Row {
//   key: string;
//   value: string;
//   description: string;
//   enabled: boolean;
// }

const QueryParameter: React.FC = () => {
  const { paramData, setParamData } = useDataContext();

  // const [rows, setRows] = useState<Row[]>([
  //   { key: "", value: "", description: "", enabled: true },
  // ]);

  // console.log("Rows", rows);

  const handleAddRow = () => {
    // setRows([...rows, { key: "", value: "", description: "", enabled: true }]);
    setParamData([
      ...paramData,
      { key: "", value: "", description: "", enabled: true },
    ]);
  };

  console.log("ParamsData", paramData);

  const handleRemoveRow = (index: number) => {
    // const newRows = rows.filter((_, i) => i !== index);
    // setRows(newRows);
    setParamData(paramData.filter((_, i) => i !== index));
  };

  const handleInputChange = (
    index: number,
    field: "key" | "value" | "description", // Explicitly specify valid keys
    value: string
  ) => {
    const newRows = [...paramData];
    newRows[index][field] = value;
    setParamData(newRows);
  };

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const newRows = [...paramData];
    newRows[index].enabled = checked;
    setParamData(newRows);
  };

  return (
    <div className="p-4 ">
      <p className="text-[#9ca3af] font-semibold truncate lg:mb-7">
        Query Parameters
      </p>
      <table className="w-full border-collapse border ">
        <thead>
          <tr className="">
            <th className="border p-2">Enable</th>
            <th className="border p-2">Key</th>
            <th className="border p-2">Value</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paramData.map((row, index) => (
            <tr key={index} className="text-black">
              <td className="border p-2">
                <input
                  type="checkbox"
                  checked={row.enabled}
                  onChange={(e) =>
                    handleCheckboxChange(index, e.target.checked)
                  }
                />
              </td>
              <td className="border p-2">
                <textarea
                  className="w-full p-1 border rounded "
                  placeholder="Key"
                  value={row.key}
                  onChange={(e) =>
                    handleInputChange(index, "key", e.target.value)
                  }
                />
              </td>
              <td className="border p-2">
                <textarea
                  className="w-full p-1 border rounded"
                  placeholder="Value"
                  value={row.value}
                  onChange={(e) =>
                    handleInputChange(index, "value", e.target.value)
                  }
                />
              </td>
              <td className="border p-2">
                <textarea
                  className="w-full p-1 border rounded"
                  placeholder="Description"
                  value={row.description}
                  onChange={(e) =>
                    handleInputChange(index, "description", e.target.value)
                  }
                />
              </td>
              <td className="border p-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleRemoveRow(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAddRow}
      >
        Add Row
      </button>
    </div>
  );
};

export default QueryParameter;
