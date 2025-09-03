import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen pt-24 animate-fade-in bg-gradient-to-b from-black via-[#161f55] to-black">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Refund Policy</h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-lg mb-6">
              Effective Date: July 15, 2025
            </p>

            <p className="mb-6">
              Currently, Dreamnity does not provide refunds or hold client payments. All transactions are processed directly to the freelancer once payment is received and KYC is completed.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. No Refunds</h2>
            <p className="mb-6">
              As of now, clients are expected to resolve service issues or refund requests directly with the freelancer they hired. Dreamnity is not responsible for handling disputes, reversals, or cancellations at this stage.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Future Support</h2>
            <p className="mb-6">
              We are actively developing an escrow system and dispute resolution process that will allow us to hold payments and provide partial or full refunds where necessary. This policy will be updated once those features are live.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Contact</h2>
            <p className="mb-6">
              If you have questions about a transaction, please <a href="/contact" className="text-brand hover:underline">contact us</a> and we’ll try to assist where possible, though we cannot guarantee resolution at this time.
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

export default RefundPolicy;
