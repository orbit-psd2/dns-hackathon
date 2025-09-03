import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen pt-24 animate-fade-in bg-gradient-to-b from-black via-[#161f55] to-black">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-lg mb-6">Last Updated: July 15, 2025</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. What We Collect</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Name, PAN, Aadhar, bank details, phone, email.</li>
              <li>Client payment info: amount, currency.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Why We Collect</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>To verify identities (KYC).</li>
              <li>To process international payments legally via Razorpay.</li>
              <li>To follow Indian regulations (FEMA, RBI, etc.).</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Who We Share With</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Razorpay (for KYC and payouts).</li>
              <li>Authorities (if legally required).</li>
              <li>We do NOT sell or rent your data ever.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Security</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>HTTPS enforced site-wide.</li>
              <li>Rate limiting and admin logging in place.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Future Use</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>We may collect project metadata if disputes go live.</li>
              <li>You'll be notified and your consent will be asked.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Your Rights</h2>
            <p className="mb-6">
              Request data changes or removal anytime by contacting us via Discord or website.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Updates</h2>
            <p className="mb-6">
              If this policy changes, we'll notify you via Discord or email.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Contact</h2>
            <p className="mb-6">
              Questions? <a href="/contact" className="text-brand hover:underline">Reach us here</a> or via dreamnity.in.
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-md border border-brand bg-transparent px-4 py-2 text-sm font-medium text-brand hover:bg-white transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
