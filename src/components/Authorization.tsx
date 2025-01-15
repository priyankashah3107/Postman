// "use client";
// import React, { JSX, useState } from "react";
// const Authorization: React.FC = () => {
//   const [selectedComponent, setSelectedComponent] = useState<
//     "basicAuth" | "Bearer" | null
//   >(null);

//   const handleRadioClick = (value: "basicAuth" | "Bearer") => {
//     setSelectedComponent((prevValue) => (prevValue === value ? null : value));
//   };

//   const handleComponents = () => {
//     switch (selectedComponent) {
//       case "basicAuth":
//         return <BasicAuth />;
//       case "Bearer":
//         return <Bearer />;
//       default:
//         return null;
//     }
//   };
//   return (
//     <div>
//       <div>
//         <p className="text-[#9ca3af] font-semibold truncate mb-4">
//           Authorization Type
//         </p>
//         <form className="flex flex-col">
//           <label>
//             <input
//               type="radio"
//               name="basicAuth"
//               value="basicAuth"
//               checked={selectedComponent === "basicAuth"}
//               onChange={() => handleRadioClick("basicAuth")}
//             />
//             Basic Auth
//           </label>
//           <br />
//           <label>
//             <input
//               type="radio"
//               name="Bearer"
//               value="Bearer"
//               checked={selectedComponent === "basicAuth"}
//               onChange={() => handleRadioClick("Bearer")}
//             />
//             Bearer
//           </label>
//         </form>
//       </div>
//       {/* dynamically render of the selected comp */}
//       <div className="mt-10">{handleComponents()}</div>
//     </div>
//   );
// };

// export default Authorization;

// export const BasicAuth: React.FC = () => {
//   return (
//     <>
//       <div className="flex flex-col gap-4 text-black">
//         <input
//           type="text"
//           placeholder="Username"
//           className=" p-2 lg:p-4 m-4 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Password"
//           className="p-2 lg:p-4 m-4 rounded-md"
//         />
//       </div>
//     </>
//   );
// };

// export const Bearer: React.FC = () => {
//   return (
//     <>
//       <div className="">
//         <input
//           type="text"
//           placeholder="Token"
//           className="p-2 lg:p-4 m-4 rounded-md text-black  w-1/2"
//         />
//       </div>
//     </>
//   );
// };

"use client";

import React, { JSX, useState } from "react";
const Authorization = () => {
  const [selectedComponent, setSelectedComponent] =
    useState<JSX.Element | null>(null);

  const handleComponents = (component: string) => {
    switch (component) {
      case "basicAuth":
        setSelectedComponent(<BasicAuth />);
        break;
      case "Bearer":
        setSelectedComponent(<Bearer />);
        break;
      default:
        setSelectedComponent(null);
    }
  };
  return (
    <div>
      <div>
        <p className="text-[#9ca3af] font-semibold truncate mb-4">
          Authorization Type
        </p>
        <form className="flex flex-col">
          <label>
            <input
              type="radio"
              name="basicAuth"
              value="basicAuth"
              onClick={() => handleComponents("basicAuth")}
            />
            Basic Auth
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="Bearer"
              value="Bearer"
              onClick={() => handleComponents("Bearer")}
            />
            Bearer
          </label>
        </form>
      </div>
      {/* dynamically render of the selected comp */}
      <div className="mt-10">{selectedComponent}</div>
    </div>
  );
};

export default Authorization;

export const BasicAuth = () => {
  return (
    <>
      <div className="flex flex-col gap-4 text-black">
        <input
          type="text"
          placeholder="Username"
          className=" p-2 lg:p-4 m-4 rounded-md"
        />
        <input
          type="text"
          placeholder="Password"
          className="p-2 lg:p-4 m-4 rounded-md"
        />
      </div>
    </>
  );
};

export const Bearer = () => {
  return (
    <>
      <div className="">
        <input
          type="text"
          placeholder="Token"
          className="p-2 lg:p-4 m-4 rounded-md text-black  w-1/2"
        />
      </div>
    </>
  );
};
