import { Routes, Route } from "react-router";
import { NotFound } from "../pages/NotFound";
import { AppLayout } from "../components/AppLayout";


export function SaleRoutes(){
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
       
       
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}