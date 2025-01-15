"use client";
import React, { useState } from "react";

const PreRequestScript: React.FC = () => {
  const [script, setScript] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  // Function to run the script
  const runScript = (): void => {
    try {
      // Collect console output
      const consoleOutput: string[] = [];
      const consoleLog = (msg: any): void => {
        consoleOutput.push(String(msg));
      };

      // Create and execute script
      const scriptFunction = new Function("console", script);
      scriptFunction({ log: consoleLog });

      // Set the output
      setOutput(consoleOutput.join("\n") || "Script executed successfully");
    } catch (error: unknown) {
      // Handle errors safely
      if (error instanceof Error) {
        setOutput(`Error: ${error.message}`);
      } else {
        setOutput("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="p-4 border rounded-md">
      <p className="font-bold mb-2">JavaScript Code</p>
      <textarea
        className="w-full h-32 p-2 border rounded mb-4 text-black"
        value={script}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setScript(e.target.value)
        }
        placeholder="Write your JavaScript code here..."
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={runScript}
      >
        Run
      </button>
      <div className="mt-4">
        <p className="font-bold">Output:</p>
        <pre className="bg-gray-100 p-2 border rounded text-red-500">
          {output}
        </pre>
      </div>
    </div>
  );
};

export default PreRequestScript;
