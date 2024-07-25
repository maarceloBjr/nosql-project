import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type BoxProps = {
  className?: string;
};

export const Sidebar: React.FC<BoxProps> = ({ className }) => {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Control
          </h2>
          <div className="space-y-1">
            <Button
              variant="secondary"
              size="sm"
              className="w-full justify-start"  
            >
              Users
            </Button>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Test
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
}
