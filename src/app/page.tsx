import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import Home from "./pages/home/page";
import DataProvider from "context/DataProvider";

export default function Page() {
  return (
    <>
      <DataProvider>
        <Home />
      </DataProvider>
    </>
  );
}
