// import React, { useEffect, useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Eye, EyeOff, Copy, Check } from "lucide-react";

// const CookiePage = () => {
//   const [cookies, setCookies] = useState<{ [key: string]: string }>({});
//   const [showTokens, setShowTokens] = useState<{ [key: string]: boolean }>({});
//   const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
//     {}
//   );

//   useEffect(() => {
//     // Parse all cookies
//     const cookieObject = document.cookie
//       .split(";")
//       .reduce((acc: { [key: string]: string }, cookie) => {
//         const [key, value] = cookie.trim().split("=");
//         if (key) acc[key] = value || "";
//         return acc;
//       }, {});

//     setCookies(cookieObject);

//     // Initialize visibility state for each token
//     const initialShowStates = Object.keys(cookieObject).reduce(
//       (acc: { [key: string]: boolean }, key) => {
//         acc[key] = false;
//         return acc;
//       },
//       {}
//     );
//     setShowTokens(initialShowStates);
//   }, []);

//   const toggleTokenVisibility = (key: string) => {
//     setShowTokens((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   const copyToClipboard = async (key: string, value: string) => {
//     try {
//       await navigator.clipboard.writeText(value);
//       setCopiedStates((prev) => ({ ...prev, [key]: true }));
//       setTimeout(() => {
//         setCopiedStates((prev) => ({ ...prev, [key]: false }));
//       }, 2000);
//     } catch (err) {
//       console.error("Failed to copy:", err);
//     }
//   };

//   const getTokenPreview = (token: string, show: boolean) => {
//     if (show) return token;
//     return token.length > 8
//       ? `${token.slice(0, 4)}...${token.slice(-4)}`
//       : "••••••••";
//   };

//   // Function to determine if a cookie might be a token
//   const isLikelyToken = (value: string) => {
//     // Check for common token formats (JWT, Bearer, etc.)
//     return (
//       value.length > 20 || // Longer strings are likely tokens
//       /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(value) || // JWT format
//       /^Bearer\s+/.test(value) // Bearer token
//     );
//   };

//   return (
//     <Card className="mt-4">
//       <CardHeader>
//         <CardTitle className="flex items-center justify-between">
//           <span>Authentication Tokens & Cookies</span>
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           {Object.entries(cookies).map(([key, value]) => (
//             <div
//               key={key}
//               className={`p-4 rounded-lg ${
//                 isLikelyToken(value)
//                   ? "bg-purple-50 border border-purple-100"
//                   : "bg-gray-50"
//               }`}
//             >
//               <div className="flex justify-between items-start mb-2">
//                 <span className="font-medium text-sm text-gray-700">{key}</span>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => toggleTokenVisibility(key)}
//                     className="text-gray-500 hover:text-gray-700"
//                   >
//                     {showTokens[key] ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                   <button
//                     onClick={() => copyToClipboard(key, value)}
//                     className="text-gray-500 hover:text-gray-700"
//                   >
//                     {copiedStates[key] ? (
//                       <Check size={18} className="text-green-500" />
//                     ) : (
//                       <Copy size={18} />
//                     )}
//                   </button>
//                 </div>
//               </div>
//               <div className="font-mono text-sm break-all">
//                 {getTokenPreview(value, showTokens[key])}
//               </div>
//               {isLikelyToken(value) && (
//                 <div className="mt-2 text-xs text-purple-600">
//                   Likely authentication token
//                 </div>
//               )}
//             </div>
//           ))}
//           {Object.keys(cookies).length === 0 && (
//             <div className="text-center text-gray-500 py-4">
//               No cookies or tokens found
//             </div>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default CookiePage;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDataContext } from "context/DataProvider";

interface Cookie {
  name: string;
  value: string;
  domain: string;
  path: string;
}

const CookiePage: React.FC = () => {
  const { cookies } = useDataContext();
  console.log("Cookies from CookiePage", cookies);

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Cookies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {cookies && cookies.length > 0 ? (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-secondary">
                    <th className="p-2 text-left border">Name</th>
                    <th className="p-2 text-left border">Value</th>
                    <th className="p-2 text-left border">Domain</th>
                    <th className="p-2 text-left border">Path</th>
                  </tr>
                </thead>
                <tbody>
                  {cookies.map((cookie, index) => (
                    <tr key={index} className="hover:bg-muted">
                      <td className="p-2 border">{cookie.name}</td>
                      <td className="p-2 border">{cookie.value}</td>
                      <td className="p-2 border">{cookie.domain}</td>
                      <td className="p-2 border">{cookie.path}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-muted-foreground">
                No cookies found
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookiePage;
