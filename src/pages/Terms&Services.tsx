import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="min-h-screen pt-24 animate-fade-in bg-gradient-to-b from-black via-[#161f55] to-black">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-lg mb-6">Last Updated: July 15, 2025</p>

            <p className="mb-6">
              By using Dreamnity (website, Discord bot, or tools), you agree to these terms set by Dreamnity Global Pvt. Ltd.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. What We Do</h2>
            <p className="mb-6">
              Dreamnity helps Indian freelancers receive payments from international clients. We use Razorpay Route to settle INR payouts after KYC. We do not hold money or offer escrow services.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Key Rules</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Freelancers must complete KYC.</li>
              <li>We charge a flat ₹49 fee per payment.</li>
              <li>Refunds and disputes are currently handled directly between client and freelancer.</li>
              <li>Freelancers are treated as independent contractors. GST invoicing and tax responsibilities are managed by Dreamnity, no need for the freelancer to register for GST.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. What's Coming</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Escrow-based payment hold system.</li>
              <li>Dispute resolution and moderation.</li>
              <li>TrustButton, the end of cash on delivery for trust issue. (Yes, we are cooking something big).</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Limitations</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>We are not a wallet, bank, or escrow platform.</li>
              <li>We are not liable for project outcomes, delays, or incorrect user data.</li>
              <li>All settlements are handled via Razorpay post-KYC.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Changes</h2>
            <p className="mb-6">
              Terms may change. Major updates will be notified 15 days in advance.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Contact</h2>
            <p className="mb-6">
              Questions? <a href="/contact" className="text-brand hover:underline">Contact us</a> or visit dreamnity.in.
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

export default TermsOfService;
