import { Navigate, useNavigate } from "react-router-dom";
import { clearUser, getUser } from "@/lib/user";
import { Button } from "@/components/ui/button";

export default function Todos() {
  const navigate = useNavigate();
  const user = getUser();
  if (!user) return <Navigate to="/" replace />;

  return (
    <main className="mx-auto max-w-2xl p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Hi, {user.name}</h1>
        <Button
          variant="outline"
          onClick={() => {
            clearUser();
            navigate("/");
          }}
        >
          Switch user
        </Button>
      </div>
    </main>
  );
}
