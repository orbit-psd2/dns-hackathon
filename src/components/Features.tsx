import { CheckCircle, Clock, Lock, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Features = () => {
  const [activeStep, setActiveStep] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Features data
  const features = [
    {
      icon: Clock,
      title: "Onboard with Ease",
      description: "Start your journey by onboarding through our Discord bot. Simply specify your details."
    },
    {
      icon: Lock,
      title: "Generate Payment Link",
      description: "Secure your transaction by generating a unique payment link. The client sends payment to Dreamnity."
    },
    {
      icon: CheckCircle,
      title: "Get Paid for Your Work",
      description: "Freelancers can focus on delivering quality work, knowing payment is guaranteed at just ₹49 fee. Get live notifications on payments."
    },
    {
      icon: DollarSign,
      title: "Payout in INR",
      description: "Once the payment is done, you will receive your amount to your bank account. excluding a small fee. Enjoy hassle-free transactions without worrying about currency conversion or international fees."
    }
  ];

  useEffect(() => {
    // Intersection observer for activating steps when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) {
              setActiveStep(index);
            }
          }
        });
      },
      { threshold: 0.5, rootMargin: "-100px" }
    );

    const steps = document.querySelectorAll('.feature-step');
    steps.forEach(step => observer.observe(step));

    return () => {
      steps.forEach(step => observer.unobserve(step));
    };
  }, []);

  return (
    <motion.div 
      className="py-8 md:py-24 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      ref={containerRef}
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute top-1/4 -left-64 w-[400px] h-[400px] rounded-full bg-brand/10 blur-[120px] opacity-40"
          animate={{ 
            y: [0, 50, 0],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-0 -right-64 w-[500px] h-[500px] rounded-full bg-[#8d88ff]/10 blur-[150px] opacity-40"
          animate={{ 
            y: [0, -50, 0],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </motion.div>
      
      <div className="container mx-auto px-8 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            How Dreamnity Works
          </motion.h2>
          <motion.p 
            className="text-xl max-w-2xl mx-auto text-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Our platform provides a secure escrow service for freelance transactions on Discord, protecting both clients and freelancers.
          </motion.p>
        </motion.div>
        
        {/* Vertical Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Timeline Line */}
          <motion.div 
            className="absolute left-6 top-10 bottom-16 w-0.5 bg-brand/30 hidden md:block"
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          
          <div className="flex flex-col space-y-20 md:space-y-32">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="flex flex-col md:flex-row gap-6 feature-step"
                data-index={index}
                initial={{ opacity: 0, y: 50 }}
                animate={activeStep >= index ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="flex-shrink-0 relative">
                  <motion.div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center relative z-10 border ${
                      activeStep >= index 
                        ? "bg-brand text-white border-brand" 
                        : "bg-white/10 text-gray-400 border-white/30"
                    }`}
                    animate={activeStep >= index ? { 
                      scale: [1, 1.2, 1],
                      boxShadow: ["0 0 0 0 rgba(235, 86, 142, 0)", "0 0 0 8px rgba(235, 86, 142, 0.2)", "0 0 0 0 rgba(235, 86, 142, 0)"]
                    } : {}}
                    transition={{ duration: 1.5, repeat: 0 }}
                  >
                    <feature.icon className="h-6 w-6" />
                  </motion.div>
                  {/* Step number */}
                  <motion.div 
                    className="absolute -right-1 -top-1 bg-brand rounded-full w-5 h-5 flex items-center justify-center text-xs text-white font-bold md:hidden"
                    initial={{ scale: 0 }}
                    animate={activeStep >= index ? { scale: 1 } : {}}
                  >
                    {index + 1}
                  </motion.div>
                </div>
                
                <div className="flex-1 pt-0">
                  <h3 className="text-2xl font-bold mb-3 text-white flex items-center">
                    {/* Step number for desktop */}
                    <motion.span 
                      className="mr-3 opacity-30 hidden md:inline"
                      initial={{ opacity: 0 }}
                      animate={activeStep >= index ? { opacity: 0.3 } : {}}
                    >
                      0{index + 1}
                    </motion.span>
                    <span>{feature.title}</span>
                  </h3>
                  <motion.p 
                    className="text-gray-200 text-lg"
                    initial={{ opacity: 0 }}
                    animate={activeStep >= index ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4 }}
                  >
                    {feature.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Features;