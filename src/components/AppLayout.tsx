// import { Outlet } from "react-router";
import { Header } from "./Header";


export function AppLayout(){
  return (
    <div className="w-screen h-screen bg-background flex flex-col items-center">
      <main className="p-3 w-full ">
        <Header />
        {/* <Outlet /> */}
      </main>
    </div>
  )
}