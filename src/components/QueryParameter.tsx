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
import React, { useState } from "react";

interface Row {
  key: string;
  value: string;
  description: string;
  enabled: boolean;
}

const QueryParameter: React.FC = () => {
  const [rows, setRows] = useState<Row[]>([
    { key: "", value: "", description: "", enabled: true },
  ]);

  const handleAddRow = () => {
    setRows([...rows, { key: "", value: "", description: "", enabled: true }]);
  };

  const handleRemoveRow = (index: number) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const handleInputChange = (
    index: number,
    field: "key" | "value" | "description", // Explicitly specify valid keys
    value: string
  ) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const newRows = [...rows];
    newRows[index].enabled = checked;
    setRows(newRows);
  };

  return (
    <div className="p-4">
      <table className="w-full border-collapse border">
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
          {rows.map((row, index) => (
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
                  className="w-full p-1 border rounded"
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
