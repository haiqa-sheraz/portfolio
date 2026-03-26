"use client";
import { useEffect, useMemo } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/utils/cn";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();

  // Memoize to prevent re-renders causing mismatches
  const wordsArray = useMemo(() => words.split(" "), [words]);

  useEffect(() => {
    if (!scope.current) return; // Prevent running before mount
    animate("span", { opacity: 1, filter: filter ? "blur(0px)" : "none" }, { duration: duration || 1, delay: stagger(0.2) });
  }, [animate, filter, duration]); // Removed scope.current

  const renderWords = () => (
    <motion.div ref={scope}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          suppressHydrationWarning // Ignore mismatches
          className={cn("opacity-0", idx > 3 ? "text-purple" : "dark:text-white text-black")}
        >
          {word}{" "}
        </motion.span>
      ))}
    </motion.div>
  );

  return (
    <div className={cn("font-bold", className)}>
      <div className="my-4">
        <div className="dark:text-white text-black leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
