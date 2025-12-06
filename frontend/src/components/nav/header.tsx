import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Text } from "../ui/text";
import { Link } from "react-router";

export const Header = () => {
  return (
    <div className="fixed z-100 top-0 w-full flex justify-center pt-4">
      <Card
        className={cn(
          "w-11/12 max-w-7xl h-16",
          "bg-neutral-800/10 backdrop-blur-xs",
          "flex flex-row justify-between items-center",
        )}
      >
        <Link to="/">
          <Text size="h3" className="text-white font-bold cursor-pointer gap-8">
            CS_2200
          </Text>
        </Link>
        <div className="h-full flex flex-row gap-8 items-center">
          {/* <Link to="/"> */}
          {/*   <Text className="text-white cursor-pointer gap-4 hover:opacity-50 transition-all"> */}
          {/*     Vistool */}
          {/*   </Text> */}
          {/* </Link> */}
          {/* <Link to="/"> */}
          {/*   <Text className="text-white cursor-pointer gap-4 hover:opacity-50 transition-all"> */}
          {/*     Office Hours */}
          {/*   </Text> */}
          {/* </Link> */}
          <Link to="/">
            <Text className="text-white cursor-pointer gap-4 hover:opacity-50 transition-all">
              Demos
            </Text>
          </Link>
          <Link to="/">
            <Text className="text-white cursor-pointer gap-4 hover:opacity-50 transition-all">
              Login
            </Text>
          </Link>
        </div>
      </Card>
    </div>
  );
};
