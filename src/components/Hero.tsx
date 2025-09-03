import { ArrowRight, CircleCheck, User, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Timer from "./Timer";
// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [calculatorAmount, setCalculatorAmount] = useState(1000);
  const [usdToInrRate, setUsdToInrRate] = useState(85); // Default fallback rate
  const [isLoadingRate, setIsLoadingRate] = useState(true);
  const [calculatorRef, calculatorInView] = useInView({
    threshold: 0.0,
    triggerOnce: true,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
      const cachedRate = localStorage.getItem("usdToInrRate");
      const cachedTimestamp = localStorage.getItem("usdToInrRateTimestamp");
      const now = Date.now();
      const TWO_HOURS = 2 * 60 * 60 * 1000;

      if (cachedRate && cachedTimestamp && now - Number(cachedTimestamp) < TWO_HOURS) {
        setUsdToInrRate(parseFloat(cachedRate));
        setIsLoadingRate(false);
        return;
      }

      setIsLoadingRate(true);
      const response = await fetch(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      const data = await response.json();

      if (data.rates && data.rates.INR) {
        setUsdToInrRate(data.rates.INR);
        localStorage.setItem("usdToInrRate", data.rates.INR.toString());
        localStorage.setItem("usdToInrRateTimestamp", now.toString());
      }
      } catch (error) {
      console.error("Failed to fetch exchange rate:", error);
      const cachedRate = localStorage.getItem("usdToInrRate");
      if (cachedRate) {
        setUsdToInrRate(parseFloat(cachedRate));
      }
      } finally {
      setIsLoadingRate(false);
      }
    };

    fetchExchangeRate();
  }, []);

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
  }));

  const dreamnityFeeINR = 49;
  const dreamnityFeeUSD = dreamnityFeeINR / usdToInrRate;
  const traditionalFee = calculatorAmount * 0.08;
  const savings = traditionalFee - dreamnityFeeUSD;

  return (
    <div className="relative overflow-hidden pt-20 min-h-[90vh] flex flex-col items-center">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/10"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 30, 0],
            x: [0, 20, -20, 0],
            opacity: [0.1, 0.7, 0.3, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container mx-auto px-4 pt-16 pb-24 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-6xl mb-6">
              <motion.span
                className="text-gradient pb-3 font-extrabold flex items-center text-center justify-center overflow-visible"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Dreamnity
              </motion.span>
              <motion.span
                className="block text-white mt-2 font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Get paid by international clients.
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            className="text-xl text-white/90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <span className="font-bold text-3xl">@ Flat ₹49</span>
          </motion.p>
          {/*
<motion.div
  // Set the initial state: opacity 0 and move it 30px down
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1, duration: 0.8 }}
>
  <Timer />
</motion.div>
*/}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.a
              href="https://discord.dreamnity.in/"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Button className="bg-brand hover:bg-brand-dark text-lg h-12 px-8 w-full sm:w-auto shadow-lg hover:shadow-xl hover:shadow-brand/20 group">
                <span>Get Started</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                >
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:ml-3 transition-all" />
                </motion.div>
              </Button>
            </motion.a>
            <motion.a
              href="/terms-&-services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
                <Button
                variant="outline"
                className="text-white bg-black/60 border-white/30 hover:bg-white/10 hover:border-white/70 text-lg h-12 px-8 w-full sm:w-auto hover:text-white"
                >
                Learn More
                </Button>
            </motion.a>
          </motion.div>



        {/* ↓↓↓ Calci Section Starts Here ↓↓↓ */}
        <section id="calculator" ref={calculatorRef} className="py-1">
          <motion.div
            initial="visible"
            animate={calculatorInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-6"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold mb-2 text-white"
            >
              Calculate Your <span className="text-brand">Savings</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Become a freelancer, don't let the payment issue stops you...
              {isLoadingRate && (
                <span className="text-sm block mt-2 text-gray-400">
                  Loading current exchange rates...
                </span>
              )}
            </motion.p>
          </motion.div>

          <motion.div
            variants={scaleIn}
            className="max-w-4xl mx-auto bg-slate-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-slate-700/50"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Transaction Volume
                </h3>
                <input
                  type="range"
                  min="10"
                  max="2000"
                  value={calculatorAmount}
                  onChange={(e) => setCalculatorAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>$10</span>
                  <span>$2,000</span>
                </div>
                <div className="text-center mt-4">
                  <span className="text-3xl font-bold text-brand">
                    ${calculatorAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-brand/10 border border-brand/20 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Paypal (8% fee)</span>
                    <div className="text-right">
                      <span className="text-xl font-bold text-white block">
                        ₹{(traditionalFee * usdToInrRate).toFixed(2)}
                      </span>
                      <span className="text-md text-gray-400">
                        (${traditionalFee.toFixed(2)})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-brand/10 border border-brand/20 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Dreamnity (₹49 flat)</span>
                    <div className="text-right">
                      <span className="text-xl font-bold text-white block">
                        ₹49
                      </span>
                      <span className="text-sm text-gray-400">
                        (${dreamnityFeeUSD.toFixed(2)})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-brand/20 border border-brand/30 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Your Savings</span>
                    <div className="text-right">
                      <span className="text-xl font-bold text-white block">
                        ₹{(Math.abs(savings) * usdToInrRate).toFixed(2)}
                      </span>
                      <span className="text-md text-gray-400">
                        (${Math.abs(savings).toFixed(2)})
                      </span>
                    </div>
                  </div>
                </div>

                <motion.a
                  href="https://discord.dreamnity.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-brand hover:bg-brand-dark px-8 py-4 rounded-full font-semibold text-lg transition-all text-white flex items-center justify-center"
                >
                  Start Saving ₹{(Math.abs(savings) * usdToInrRate).toFixed(2)} Today
                </motion.a>
              </div>
            </div>
          </motion.div>
        </section>
        {/* ↑↑↑ Calci Section Ends Here ↑↑↑ */}



          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {[
              {
                icon: CircleCheck,
                title: "Easy Onboarding",
                desc: "Just give us your bank details for payout.",
                delay: 0.1,
              },
              {
                icon: Link2,
                title: "Payment Links",
                desc: "Send payment links to clients in 5 seconds.",
                delay: 0.2,
              },
              {
                icon: User,
                title: "24/7 Live support",
                desc: "Priority support via our discord server directly.",
                delay: 0.3,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10 group relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + item.delay, duration: 0.6 }}
                whileHover={{ y: -10 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-brand/5 via-transparent to-purple-500/5 opacity-0"
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 1.5 }}
                />
                <div className="relative z-10">
                  <motion.div
                    className="w-14 h-14 bg-brand/10 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <item.icon className="h-7 w-7 text-brand" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3 text-white text-center">
                    {item.title}
                  </h3>
                  <p className="text-gray-200 text-center">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
