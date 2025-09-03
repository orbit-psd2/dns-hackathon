import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen pt-24 animate-fade-in bg-gradient-to-b from-black via-[#161f55] to-black">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-200">Contact Us</h1>
          
          {/* Glassmorphism Card */}
          <div className="bg-white/5 backdrop-blur-xl outline outline-1 outline-white/20 rounded-xl p-8 card-shadow mb-12 hover:shadow-lg transition-all duration-300">
            <p className="text-lg mb-8 text-gray-200">
              Have questions about Dreamnity? We're here to help! You can reach out to us through any of the following methods:
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start group">
                <div className="p-3 bg-brand/10 rounded-full mr-4 group-hover:bg-brand/20 transition-colors duration-300">
                  <Mail className="h-6 w-6 text-brand" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-gray-200">Email</h3>
                  <p className="text-gray-300 mb-2">For general inquiries and support:</p>
                  <a href="mailto:support@dreamnity.in" className="text-brand hover:underline font-medium">
                    support@dreamnity.in
                  </a>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="p-3 bg-brand/10 rounded-full mr-4 group-hover:bg-brand/20 transition-colors duration-300">
                  <MapPin className="h-6 w-6 text-brand" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-gray-200">Address</h3>
                  <p className="text-gray-300">
                    Dreamnity Global Pvt. Ltd..<br />
                    Plot No 70 Kalpana Flats,<br />
                    Sri Shakthi Nagar Annanur,<br />
                    Tirumullaivoyal, Tamilnadu, India, 600062
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Discord Card - same glass style */}
          <div className="bg-white/5 backdrop-blur-xl outline outline-1 outline-white/20 rounded-xl p-8 card-shadow mb-8 transition-all hover:shadow-lg duration-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-200">Join Our Discord Community</h2>
            <p className="mb-6 text-gray-200">
              For immediate support and to connect with our community of freelancers and clients, join our Discord server:
            </p>
            <a href="https://discord.dreamnity.in/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-brand hover:bg-brand-dark mb-2 transform transition-transform hover:translate-y-[-2px]">
                Join Discord Server
              </Button>
            </a>
            <p className="text-sm text-gray-200">
              Our support team is active on Discord 24/7.
            </p>
          </div>
          
          <div className="mt-12 flex justify-center">
            <a href="/">
              <Button variant="outline" className="text-brand bg-transparent hover:text-brand border-brand hover:bg-white transform transition-transform hover:translate-y-[-2px]">
                Back to Home
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
