import Home from "./pages/home/page";
import DataProvider from "context/DataProvider";
import { Toaster } from "react-hot-toast";
export default function Page() {
  return (
    <>
      <DataProvider>
        <Home />
        <Toaster />
      </DataProvider>
    </>
  );
}
