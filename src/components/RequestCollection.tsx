"use client";
import React, { JSX, useState } from "react";
import Authorization from "./Authorization";
import Body from "./Body";
import QueryParameter from "./QueryParameter";
import Headers from "./Headers";
import PreRequestScript from "./PreRequestScript";

const RequestCollection = () => {
  const [selectedComponent, setSelectedComponent] =
    useState<JSX.Element | null>(null); // how can i fix this JSX by using JSX from react..?

  const handleComponents = (component: string) => {
    switch (component) {
      case "Parameters":
        setSelectedComponent(<QueryParameter />);
        break;
      case "Body":
        setSelectedComponent(<Body />);
        break;
      case "Headers":
        setSelectedComponent(<Headers />);
        break;
      case "Authorization":
        setSelectedComponent(<Authorization />);
        break;
      case "Pre-Request Script":
        setSelectedComponent(<PreRequestScript />);
        break;
      // default:
      //   setSelectedComponent(<QueryParameter />);
      default:
        setSelectedComponent(null);
    }
  };

  return (
    <>
      <div className="w-full">
        <ul className="flex flex-row gap-10 font-mono mt-10">
          <li
            className="hover:underline"
            onClick={() => handleComponents("Parameters")}
          >
            Parameters
          </li>
          <li
            className="hover:underline"
            onClick={() => handleComponents("Body")}
          >
            Body
          </li>
          <li
            className="hover:underline"
            onClick={() => handleComponents("Headers")}
          >
            Headers
          </li>
          <li
            className="hover:underline"
            onClick={() => handleComponents("Authorization")}
          >
            Authorization
          </li>
          <li
            className="hover:underline"
            onClick={() => handleComponents("Pre-Request Script")}
          >
            Pre-Request Script
          </li>
        </ul>
      </div>

      <div className="mt-10">
        {selectedComponent}
        {/* dynamically render of the selected comp */}
      </div>
    </>
  );
};

export default RequestCollection;

// "use client";
// import React, { useState } from "react";
// import Authorization from "./Authorization";
// import Body from "./Body";
// import QueryParameter from "./QueryParameter";
// import Headers from "./Headers";
// import PreRequestScript from "./PreRequestScript";

// const componentMap = {
//   Parameters: <QueryParameter />,
//   Body: <Body />,
//   Headers: <Headers />,
//   Authorization: <Authorization />,
//   "Pre-Request Script": <PreRequestScript />,
// };

// const RequestCollection = () => {
//   const [selectedComponent, setSelectedComponent] = useState<JSX.Element | null>(null);

//   const handleComponents = (component: string) => {
//     // Use the component map to set the selected component
//     setSelectedComponent(componentMap[component] || null);
//   };

//   return (
//     <>
//       <div className="w-full">
//         <ul className="flex flex-row gap-10 font-mono mt-10">
//           <li className="hover:underline" onClick={() => handleComponents("Parameters")}>
//             Parameters
//           </li>
//           <li className="hover:underline" onClick={() => handleComponents("Body")}>
//             Body
//           </li>
//           <li className="hover:underline" onClick={() => handleComponents("Headers")}>
//             Headers
//           </li>
//           <li className="hover:underline" onClick={() => handleComponents("Authorization")}>
//             Authorization
//           </li>
//           <li className="hover:underline" onClick={() => handleComponents("Pre-Request Script")}>
//             Pre-Request Script
//           </li>
//         </ul>
//       </div>

//       <div className="mt-10">
//         {selectedComponent}
//       </div>
//     </>
//   );
// };

// export default RequestCollection;
