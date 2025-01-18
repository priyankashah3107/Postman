"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";

interface FormData {
  url: string;
  type: string;
}

interface Cookie {
  name: string;
  value: string;
  domain: string;
  path: string;
}

interface ParamData {
  // key: string;
  // value: string;
  key: string;
  value: string;
  description: string;
  enabled: boolean;
}

interface HeaderData {
  // headerName: string;
  // headerValue: string;
  key: string;
  value: string;
  description: string;
  enabled: boolean;
}

interface DataContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  paramData: ParamData[];
  setParamData: React.Dispatch<React.SetStateAction<ParamData[]>>;
  headerData: HeaderData[];
  setHeaderData: React.Dispatch<React.SetStateAction<HeaderData[]>>;
  jsonText: string;
  setJsonText: React.Dispatch<React.SetStateAction<string>>;
  cookies: Cookie[];
  setCookies: React.Dispatch<React.SetStateAction<Cookie[]>>;
}

interface DataProviderProps {
  children: ReactNode;
}

// Create context with a default value matching the type
export const DataContext = createContext<DataContextType>({
  formData: { url: "", type: "POST" },
  setFormData: () => {},
  paramData: [],
  setParamData: () => {},
  headerData: [],
  setHeaderData: () => {},
  jsonText: "",
  setJsonText: () => {},
  cookies: [],
  setCookies: () => {},
});

// Custom hook for using the context
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({ url: "", type: "POST" });
  const [paramData, setParamData] = useState<ParamData[]>([]);
  const [headerData, setHeaderData] = useState<HeaderData[]>([]);
  const [jsonText, setJsonText] = useState("");
  const [cookies, setCookies] = useState<Cookie[]>([]);

  return (
    <DataContext.Provider
      value={{
        formData,
        setFormData,
        paramData,
        setParamData,
        headerData,
        setHeaderData,
        jsonText,
        setJsonText,
        cookies,
        setCookies,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
