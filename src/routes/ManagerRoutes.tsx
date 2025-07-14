import { Route, Routes } from "react-router";
import { AppLayout } from "../components/AppLayout";
import { NotFound } from "../pages/NotFound";


export function ManagerRoutes(){
  return(
    <Routes>
      <Route path="/" element={<AppLayout />}>
      
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}