import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const publicNavLinks = [
    { name: "Home", path: "/" },
    { name: "Terms & Services", path: "/terms-&-services" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Refund Policy", path: "/refund-policy" },
    { name: "Contact", path: "/contact" },
  ];

  const authNavLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Create Payment", path: "/create-payment" },
    { name: "Transactions", path: "/transactions" },
    { name: "Wallet", path: "/wallet" },
    { name: "Settlement", path: "/settlement" },
    { name: "Profile", path: "/profile" },
  ];

  const navLinks = isAuthenticated ? authNavLinks : publicNavLinks;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      
      // Hide navbar on scroll down, show on scroll up
      if (currentScrollY > prevScrollY + 10 && currentScrollY > 100) {
        setVisible(false);
      } else if (currentScrollY < prevScrollY - 5 || currentScrollY < 10) {
        setVisible(true);
      }
      
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50`}
      initial={{ y: -100 }}
      animate={{ 
        y: visible ? 0 : -100,
        backgroundColor: isScrolled ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 0.9)",
        backdropFilter: isScrolled ? "blur(12px)" : "blur(8px)",
        boxShadow: isScrolled ? "0 4px 30px rgba(0, 0, 0, 0.3)" : "0 2px 20px rgba(0, 0, 0, 0.1)",
      }}
      transition={{ 
        duration: 0.3,
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
    >
      <div className="container mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        <Link 
          to={isAuthenticated ? "/dashboard" : "/"}
          className="flex items-center group"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="drop-shadow-lg"
          >
            <motion.img
              src="https://imgur.com/pIqbQ8g.png"
              alt="Dreamnity logo"
              className="w-11 md:w-11 h-auto filter drop-shadow-md"
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center space-x-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium relative transition-all duration-300 hover:scale-110 ${
                isScrolled 
                  ? 'text-white hover:text-blue-300' 
                  : 'text-brand hover:text-brand-dark'
              }`}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {link.name}
                <motion.div 
                  className={`absolute -bottom-1 left-0 h-0.5 rounded-full ${
                    isScrolled ? 'bg-white' : 'bg-brand'
                  } ${
                    location.pathname === link.path ? "w-full" : "w-0"
                  }`}
                  initial={false}
                  animate={{ width: location.pathname === link.path ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                  layoutId="navIndicator"
                />
              </motion.div>
            </Link>
          ))}
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 transition-all duration-300 hover:scale-110 ${
                isScrolled 
                  ? 'text-white hover:text-blue-300' 
                  : 'text-brand hover:text-brand-dark'
              }`}>
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">{user?.name}</span>
              </div>
              <Button 
                onClick={logout}
                variant="outline"
                size="sm"
                className={`transition-all duration-300 hover:scale-110 font-medium ${
                  isScrolled 
                    ? 'bg-brand text-white' 
                    : 'border-brand text-brand hover:bg-brand hover:text-white'
                }`}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className={`transition-all duration-300 hover:shadow-lg hover:scale-110 font-medium ${
                  isScrolled 
                    ? 'bg-brand hover:bg-brand-dark text-white' 
                    : 'bg-brand hover:bg-brand-dark text-white'
                }`}>
                  Get Started
                </Button>
              </motion.div>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
            className={`md:hidden p-2 rounded-full transition-colors duration-200 ${
              isScrolled 
                ? 'hover:bg-white/10' 
                : 'hover:bg-brand/10'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <div className="w-6 h-5 relative flex flex-col justify-center">
              <motion.span
                animate={{
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 0 : -8,
                }}
                transition={{ duration: 0.3 }}
                className={`absolute w-full h-0.5 rounded origin-center ${
                  isScrolled ? 'bg-white' : 'bg-brand'
                }`}
              />
              <motion.span
                animate={{
                  opacity: isMenuOpen ? 0 : 1,
                  scale: isMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
                className={`absolute w-full h-0.5 rounded ${
                  isScrolled ? 'bg-white' : 'bg-brand'
                }`}
              />
              <motion.span
                animate={{
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? 0 : 8,
                }}
                transition={{ duration: 0.3 }}
                className={`absolute w-full h-0.5 rounded origin-center ${
                  isScrolled ? 'bg-white' : 'bg-brand'
                }`}
              />
            </div>
          </motion.button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-full left-0 w-full bg-black/98 backdrop-blur-lg overflow-hidden shadow-2xl"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="container h-full mx-auto px-4 py-8">
              <div className="flex flex-col h-full space-y-4">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      location.pathname === link.path 
                        ? "text-white bg-white/25 border border-white/40 shadow-lg" 
                        : "text-white/90 hover:text-white hover:bg-white/15 hover:shadow-md"
                    }`}
                  >
                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.name}
                    </motion.div>
                  </Link>
                ))}
                
                {isAuthenticated ? (
                  <motion.div 
                    className="px-4 mt-2"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center space-x-2 text-white mb-4">
                      <User className="h-4 w-4" />
                      <span className="text-sm">{user?.name}</span>
                    </div>
                    <Button 
                      onClick={logout}
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-black w-full transition-colors duration-200"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </motion.div>
                ) : (
                  <Link to="/login" className="px-4 mt-2">
                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="bg-brand hover:bg-brand-dark w-full text-white transition-colors duration-200">
                        Get Started
                      </Button>
                    </motion.div>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;