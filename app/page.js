import Loader from "@/components/Loader";
import Home from "@/sections/Home";
import { Suspense } from "react";




export default function Page() {
  return (
    <>
    {/* <Suspense fallback={<Loader/>} > */}
    <Home/>
    {/* </Suspense> */}
    
    </>
    
  );
}
