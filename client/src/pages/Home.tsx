import { motion } from "framer-motion";
import { useMessage } from "@/hooks/use-message";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { data, isLoading, isError } = useMessage();

  // Determine the display message. Fallback to "Hello World" 
  // as explicitly requested by the implementation notes.
  const displayMessage = data?.message || "Hello World";

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden flex flex-col items-center justify-center p-6 md:p-12 lg:p-24">
      
      {/* Extremely subtle background gradient for minimal depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-muted/50 via-background to-background pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center">
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4 text-muted-foreground"
          >
            <Loader2 className="w-6 h-6 animate-spin opacity-50" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase">
              Initializing
            </span>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1] // Custom refined ease-out
            }}
            className="flex flex-col items-center justify-center space-y-8"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold text-foreground leading-[0.9] tracking-tighter mix-blend-difference">
              {displayMessage}
            </h1>
            
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.6, duration: 1, ease: "anticipate" }}
              className="w-16 h-[2px] bg-foreground/20 rounded-full"
            />
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-xs sm:text-sm md:text-base font-medium text-muted-foreground uppercase tracking-[0.3em] sm:tracking-[0.4em]"
            >
              {isError ? "Fallback State Active" : "Minimalist Canvas"}
            </motion.p>
          </motion.div>
        )}
      </div>

      {/* Decorative minimalist corner accents */}
      <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-foreground/10" />
      <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-foreground/10" />
      <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-foreground/10" />
      <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-foreground/10" />
    </div>
  );
}
