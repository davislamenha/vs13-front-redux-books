import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Navigate, Outlet } from "react-router-dom";

export function Authenticated() {
  const token = localStorage.getItem("token");

  return (
    <>
      <Header />
      {token ? <Outlet /> : <Navigate to={"/auth"} />}
      <Footer />
    </>
  );
}
