import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function MyAccount() {
  const navigate = useNavigate();
  return (
    <div className="flex-1 max-w-screen">
      <div className="pl-4 pr-4 pt-12 pb-12 m-auto flex items-start gap-16 max-w-[1440px] justify-center">
        <h1 className="text-3xl">Minha conta</h1>
        <Button
          onClick={() => {
            navigate("/auth");
            localStorage.removeItem("token");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
