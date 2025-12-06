import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { TextBackground } from "./textBackground";

export const HomePage = () => {
  return (
    <div
      className={cn(
        "relative w-screen h-screen",
        "flex justify-center items-center pt-40",
      )}
    >
      <TextBackground />
      <div
        className={cn(
          "w-11/12 max-w-7xl min-h-screen z-10",
          "grid grid-cols-1 lg:grid-cols-2 gap-4",
        )}
      >
        <div className="col-span-1 w-full lg:min-h-screen flex flex-col items-start justify-center z-10">
          <Text size="h1">Welcome to</Text>
          <Text size="t1" className="text-[96px]">
            CS_2200
          </Text>
          <Text size="h1">Systems and Networks</Text>
        </div>
        <div className="lg:min-h-screen flex flex-col gap-4 justify-center">
          <Text size="h3" className="font-bold">
            Welcome to CS2200: Systems and Networking!
          </Text>
          <Text>
            In this course, you’ll get a behind-the-scenes look at how computers
            really work—everything from processors and memory to operating
            systems and networks. Each week, you’ll join one in-person lecture
            and one livestreamed/recorded lecture, plus a required lab where
            you’ll practice the concepts with your classmates. You’ll tackle
            homework, projects, quizzes, and demos that build on each other, so
            it’s important to stay on track and engaged—the material can be
            tough to catch up on if you fall behind. By the end of the semester,
            you’ll not only understand the “big picture” of how computer systems
            are organized and connected, but also gain hands-on experience
            writing code that brings these ideas to life.
          </Text>
        </div>
      </div>
    </div>
  );
};
