import { useState, useEffect } from "react";
import { timerConfig } from "@/utils/timerConfig";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [prevTimeLeft, setPrevTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  if (!timerConfig.enabled) return null;

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +timerConfig.targetDate - +new Date();
      let newTimeLeft: TimeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      
      // Store previous time for animation comparison
      setPrevTimeLeft(timeLeft);
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format number with leading zero
  const formatNumber = (num: number) => String(num).padStart(2, '0');
  
  const timeUnits = [
    { label: "Days", value: timeLeft.days, prevValue: prevTimeLeft.days },
    { label: "Hours", value: timeLeft.hours, prevValue: prevTimeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes, prevValue: prevTimeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds, prevValue: prevTimeLeft.seconds }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="w-full p-6 bg-black/20 border border-white/20 mb-8 rounded-2xl overflow-hidden backdrop-blur-md relative">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-[#8d88ff]/10"
          animate={{
            background: [
              "radial-gradient(circle at 30% 50%, rgba(235, 86, 142, 0.1), transparent 60%)",
              "radial-gradient(circle at 70% 50%, rgba(141, 136, 255, 0.1), transparent 60%)",
              "radial-gradient(circle at 30% 50%, rgba(235, 86, 142, 0.1), transparent 60%)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="relative z-10">
          <motion.h3 
            className="text-3xl font-extrabold text-white text-center mb-2"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {timerConfig.title}
          </motion.h3>
          <motion.p 
            className="text-white/80 text-lg text-center font-medium mb-6"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {timerConfig.description}
          </motion.p>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {timeUnits.map((unit, index) => {
              const hasChanged = unit.value !== unit.prevValue;
              
              return (
                <div
                  key={index}
                  className="perspective-500"
                >
                  <motion.div
                    className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 min-w-[90px] relative overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="relative h-16 flex items-center justify-center">
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={unit.value}
                          className="text-4xl font-bold text-white absolute"
                          initial={hasChanged ? { y: -20, opacity: 0 } : false}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 20, opacity: 0 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 300, 
                            damping: 20 
                          }}
                        >
                          {formatNumber(unit.value)}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <span className="text-xs uppercase tracking-wider font-medium text-white/60 group-hover:text-white/90 transition-colors">
                      {unit.label}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Timer;