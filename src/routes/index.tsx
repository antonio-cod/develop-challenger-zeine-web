import { BrowserRouter } from "react-router";

import { SaleRoutes } from "./SaleRoutes";
import { AuthRoutes } from "./authRouters";

import { Loading } from "../components/Loading";
import { useAuth } from "../hooks/useAuth";


export function Routes() {
  const { session, isLoading } = useAuth()
  function Route(){
    switch (session?.user.role) {
     case "sale":
      return <SaleRoutes />
   
     default:
      return <AuthRoutes />
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <BrowserRouter>
      <Route/>
    </BrowserRouter>

  )
}