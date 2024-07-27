import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

type BoxProps = {
  className?: string;
};

export const Sidebar: React.FC<BoxProps> = ({ className }) => {
  const navigate = useNavigate();
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="flex items-center h-12">
          <img
            src="https://logos-world.net/wp-content/uploads/2021/08/Among-Us-Logo.png"
            alt="SuuS"
            className="h-full object-cover rounded-lg pl-14"
          />
          <h1 className="text-2xl font-bold">SuuS</h1>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Control
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => navigate("/users")}>
              Users
            </Button>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Configs
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
