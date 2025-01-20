"use client";
import React from "react";
import { useDataContext } from "context/DataProvider";
// interface Row {
//   key: string;
//   value: string;
//   description: string;
//   enabled: boolean;
// }

const Headers: React.FC = () => {
  const { headerData, setHeaderData } = useDataContext();
  // const [rows, setRows] = useState<Row[]>([
  //   { key: "", value: "", description: "", enabled: true },
  // ]);

  const handleAddRow = () => {
    setHeaderData([
      ...headerData,
      { key: "", value: "", description: "", enabled: true },
    ]);
  };

  console.log("HeadersData", headerData);

  const handleRemoveRow = (index: number) => {
    // const newRows = rows.filter((_, i) => i !== index);
    // setRows(newRows);
    setHeaderData(headerData.filter((_, i) => i !== index));
  };

  const handleInputChange = (
    index: number,
    field: "key" | "value" | "description", // Explicitly specify valid keys
    value: string
  ) => {
    const newRows = [...headerData];
    newRows[index][field] = value;
    setHeaderData(newRows);
  };

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const newRows = [...headerData];
    newRows[index].enabled = checked;
    setHeaderData(newRows);
  };

  return (
    <div className="p-4">
      <p className="text-[#9ca3af] font-semibold truncate lg:mb-7">
        Header List
      </p>
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
          {headerData.map((row, index) => (
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

export default Headers;
