import React from 'react';
import { motion } from 'framer-motion';
import { Transaction } from '@/data/mockData';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Download, 
  Printer, 
  Share2, 
  CheckCircle, 
  Calendar, 
  Hash, 
  ExternalLink,
  FileText,
  CreditCard
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentReceiptModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}

const PaymentReceiptModal: React.FC<PaymentReceiptModalProps> = ({
  transaction,
  isOpen,
  onClose
}) => {
  const { toast } = useToast();

  if (!transaction) return null;

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your payment receipt is being downloaded.",
    });
  };

  const handlePrint = () => {
    window.print();
    toast({
      title: "Print Dialog Opened",
      description: "Use your browser's print dialog to print the receipt.",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Payment Receipt',
          text: `Payment receipt for ${transaction.clientName}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Receipt link has been copied to clipboard.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>Payment Receipt</span>
          </DialogTitle>
          <DialogDescription>
            Transaction details and invoice for {transaction.clientName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Receipt Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center space-y-4"
          >
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <h2 className="text-2xl font-bold text-gray-900">Payment Successful</h2>
            </div>
            <p className="text-gray-600">
              Transaction ID: <span className="font-mono text-sm">{transaction.id}</span>
            </p>
          </motion.div>

          {/* Invoice Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-2 border-gray-200">
              <CardContent className="p-8">
                {/* Invoice Header */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">INVOICE</h3>
                    <p className="text-gray-600">Dreamnity Payment Platform</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Invoice #</p>
                    <p className="font-mono text-lg font-semibold">{transaction.id}</p>
                    <Badge className={`mt-2 ${
                      transaction.status === 'completed' 
                        ? 'bg-green-100 text-green-800 border-green-200' 
                        : 'bg-orange-100 text-orange-800 border-orange-200'
                    }`}>
                      {transaction.status === 'completed' ? 'Paid' : 'Pending'}
                    </Badge>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Bill To */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Bill To:</h4>
                    <p className="text-gray-700">{transaction.clientName}</p>
                    <p className="text-sm text-gray-600">Client</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Payment Details:</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span>{new Date(transaction.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="capitalize">{transaction.status}</span>
                      </div>
                      {transaction.completedAt && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Completed:</span>
                          <span>{new Date(transaction.completedAt).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4">Service Details:</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{transaction.description}</p>
                  </div>
                </div>

                {/* Amount */}
                <div className="bg-blue-50 p-6 rounded-lg mb-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="text-3xl font-bold text-blue-900">
                        ${transaction.amount.toFixed(2)}
                      </p>
                      <p className="text-lg text-blue-700">
                        ₹{transaction.amountInr.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Currency</p>
                      <p className="font-semibold">USD</p>
                      <p className="text-sm text-gray-600">Rate: 1 USD = ₹83</p>
                    </div>
                  </div>
                </div>

                {/* Blockchain Details */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Blockchain Information:</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Transaction Hash:</p>
                      <div className="flex items-center space-x-2">
                        <code className="text-xs bg-gray-100 p-2 rounded flex-1 font-mono">
                          {transaction.blockchainHash}
                        </code>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(`https://etherscan.io/tx/${transaction.blockchainHash}`, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 mb-1">IPFS Document CID:</p>
                      <div className="flex items-center space-x-2">
                        <code className="text-xs bg-gray-100 p-2 rounded flex-1 font-mono">
                          {transaction.ipfsCid}
                        </code>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(`https://ipfs.io/ipfs/${transaction.ipfsCid}`, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Link */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-700 font-medium">Payment Link:</p>
                      <p className="text-xs text-green-600 font-mono">{transaction.razorpayLink}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(transaction.razorpayLink, '_blank')}
                    >
                      <CreditCard className="h-3 w-3 mr-1" />
                      View Payment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <Button onClick={handleDownload} className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </Button>
                         <Button onClick={handlePrint} variant="outline" className="flex items-center space-x-2">
               <Printer className="h-4 w-4" />
               <span>Print</span>
             </Button>
            <Button onClick={handleShare} variant="outline" className="flex items-center space-x-2">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentReceiptModal;
