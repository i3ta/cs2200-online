import { Text } from "@/components/ui/text";
import { useDims } from "@/hooks/useDims";
import { randomString } from "@/lib/random";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const TextBackground = () => {
  const {
    width: bgWidth,
    height: bgHeight,
    ref: bgRef,
  } = useDims<HTMLDivElement>();
  const [repeats, setRepeats] = useState(1);
  const charCount = 1000;
  const bgText = randomString(charCount, "01");

  useEffect(() => {
    const rows = bgHeight / 30;
    const cols = bgWidth / 12;
    setRepeats(Math.ceil((rows * cols) / charCount));
  }, [bgWidth, bgHeight]);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full overflow-hidden bg-neutral-900"
      ref={bgRef}
    >
      <Text className="absolute w-full h-full break-all text-neutral-700 text-[20px]">
        {Array.from({ length: repeats }).map((_) => (
          <>{bgText}</>
        ))}
      </Text>
      <div
        className={cn(
          "absolute w-full h-full z-1",
          "bg-radial-[at_0%_50%] from-neutral-900/60 to-neutral-900/95",
        )}
      />
    </div>
  );
};
