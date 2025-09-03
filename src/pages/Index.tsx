import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Bot, RefreshCw } from "lucide-react";
import SEO from "@/components/SEO";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  MotionValue,
} from "framer-motion";
import { useRef, useEffect } from "react";

// Custom animated card component
const AnimatedCard = ({ children, delay = 0, index = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: delay,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="relative overflow-hidden"
    >
      {/* Subtle hover gradient effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0"
        whileHover={{ opacity: 1 }}
      />
      {children}
    </motion.div>
  );
};

const Index = () => {
  const { scrollY } = useScroll();

  const ctaRef = useRef(null);
  const isCTAInView = useInView(ctaRef, { once: true, margin: "-100px" });

  const whyChooseRef = useRef(null);
  const isWhyChooseInView = useInView(whyChooseRef, {
    once: true,
    margin: "-100px",
  });

  const serverOwnersRef = useRef(null);
  const isServerOwnersInView = useInView(serverOwnersRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <>
      <SEO 
        title="International Freelancer Payments at Flat ₹49 Fee"
        description="Dreamnity helps freelancers receive international payments at a flat ₹49 fee. We handle invoicing on the company side so freelancers can focus on their work and earn money."
        keywords="freelancer payments, international payments, flat fee, invoicing, payment processing, remote work"
        url="https://dreamnity.in"
      />
      <div className="min-h-screen bg-gradient-to-b from-black via-[#161f55] to-black overflow-hidden">
        <Hero />
      <motion.div
        className="  relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
          </motion.div>
        </div>
      </motion.div>
      <Features />

      {/* Why Choose Dreamnity Section */}
      <div className="py-8 md:py-24 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            ref={whyChooseRef}
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isWhyChooseInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl text-white font-bold mb-4">
              Why Choose Dreamnity?
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl font-bold mx-auto">
              We provide a secure platform that protects both clients and
              freelancers during their transactions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
            <AnimatedCard delay={0.2}>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 card-shadow flex flex-col h-full relative overflow-hidden group">
                <h3 className="text-xl font-bold mb-4 flex items-center text-white">
                  <div className="w-12 h-12 bg-brand/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-brand/30 transition-colors">
                    <Shield className="h-6 w-6 text-brand" />
                  </div>
                  For Clients
                </h3>
                <ul className="space-y-4 mb-8 flex-grow">
                    {[
                    "Pay your freelancer the correct amount without stress",
                    "Never worry about overpaying or hidden fees",
                    "Funds are held securely until work is completed (comming soon)",
                    "Transparent transaction history and communication logs",
                    ].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isWhyChooseInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    >
                      <motion.span
                      className="text-brand mr-3 text-xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 1,
                        delay: 0.5 + i * 0.2,
                        repeat: 0,
                      }}
                      >
                      •
                      </motion.span>
                      <span className="text-gray-200">{item}</span>
                    </motion.li>
                    ))}
                </ul>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.4}>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 card-shadow flex flex-col h-full relative overflow-hidden group">
                <h3 className="text-xl font-bold mb-4 flex items-center text-white">
                  <div className="w-12 h-12 bg-brand/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-brand/30 transition-colors">
                    <Shield className="h-6 w-6 text-brand" />
                  </div>
                  For Freelancers
                </h3>
                <ul className="space-y-4 mb-8 flex-grow">
                    {[
                    "Receive international payments quickly and securely",
                    "Enjoy low transaction fees with no hidden charges",
                    "No more stress about payment delays or currency issues",
                    "Focus on your work while we handle the payment process",
                    ].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isWhyChooseInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                    >
                      <motion.span
                      className="text-brand mr-3 text-xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 1,
                        delay: 0.7 + i * 0.2,
                        repeat: 0,
                      }}
                      >
                      •
                      </motion.span>
                      <span className="text-gray-200">{item}</span>
                    </motion.li>
                    ))}
                </ul>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      

      {/* CTA Section */}
      <motion.div
        ref={ctaRef}
        className="py-24 pb-32 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isCTAInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isCTAInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Ready to secure your transactions?
          </motion.h2>
          <motion.p
            className="text-xl text-white/80 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isCTAInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join Dreamnity today and start freelancing with confidence.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isCTAInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.a
              href="https://discord.dreamnity.in/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button className="bg-white text-brand hover:bg-white hover:scale-105 transition-all text-lg h-12 px-8 w-full sm:w-auto shadow-lg group">
                <span>Get Started</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="ml-2 h-5 w-5 text-brand" />
                </motion.div>
              </Button>
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button
                variant="outline"
                className="text-black hover:text-white border-white/30 hover:bg-white/10 hover:border-white text-lg h-12 px-8 w-full sm:w-auto"
              >
                Contact Us
              </Button>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
      </div>
    </>
  );
};

export default Index;
