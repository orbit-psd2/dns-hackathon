import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, ExternalLink, Hash, Link as LinkIcon, CheckCircle, Loader2 } from 'lucide-react';
import { generateMockRazorpayLink, generateRandomHash, generateRandomIPFSCid, USDT_TO_INR_RATE } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { useTransactions } from '@/contexts/TransactionContext';

const formSchema = z.object({
  clientName: z.string().min(2, 'Client name must be at least 2 characters'),
  amount: z.number().min(1, 'Amount must be at least $1'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

interface PaymentLink {
  razorpayLink: string;
  blockchainHash: string;
  ipfsCid: string;
  amountInr: number;
}

const CreatePaymentLink: React.FC = () => {
  const [paymentLink, setPaymentLink] = useState<PaymentLink | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const { toast } = useToast();
  const { addTransaction } = useTransactions();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const amount = watch('amount') || 0;
  const amountInr = amount * USDT_TO_INR_RATE;

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newPaymentLink: PaymentLink = {
      razorpayLink: generateMockRazorpayLink(),
      blockchainHash: generateRandomHash(),
      ipfsCid: generateRandomIPFSCid(),
      amountInr: data.amount * USDT_TO_INR_RATE,
    };
    
    // Add transaction to global state
    addTransaction({
      clientName: data.clientName,
      amount: data.amount,
      amountInr: data.amount * USDT_TO_INR_RATE,
      status: 'pending',
      razorpayLink: newPaymentLink.razorpayLink,
      blockchainHash: newPaymentLink.blockchainHash,
      ipfsCid: newPaymentLink.ipfsCid,
      description: data.description,
    });
    
    setPaymentLink(newPaymentLink);
    toast({
      title: "Payment link created!",
      description: "Your payment link has been generated successfully.",
    });
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast({
        title: "Copied!",
        description: `${field} has been copied to clipboard.`,
      });
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleCompletePayment = async () => {
    if (!paymentLink) return;
    
    setIsCompleting(true);
    
    // Simulate payment completion
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Payment Completed!",
      description: "The payment has been successfully completed and recorded.",
    });
    
    // Clear the payment link to show the form again
    setPaymentLink(null);
    setIsCompleting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Payment Link</h1>
          <p className="text-gray-600">
            Generate a secure payment link for your clients with blockchain transparency
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>
                  Fill in the details to create a payment link
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input
                      id="clientName"
                      placeholder="Enter client name"
                      {...register('clientName')}
                    />
                    {errors.clientName && (
                      <p className="text-sm text-red-600">{errors.clientName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (USD)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register('amount', { valueAsNumber: true })}
                    />
                    {errors.amount && (
                      <p className="text-sm text-red-600">{errors.amount.message}</p>
                    )}
                    {amount > 0 && (
                      <p className="text-sm text-gray-600">
                        ≈ ₹{amountInr.toLocaleString()} (Rate: 1 USD = ₹{USDT_TO_INR_RATE})
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the work or service being paid for"
                      rows={4}
                      {...register('description')}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-600">{errors.description.message}</p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating Payment Link...' : 'Create Payment Link'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payment Link Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {paymentLink ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LinkIcon className="h-5 w-5 text-green-600" />
                    <span>Payment Link Created</span>
                  </CardTitle>
                  <CardDescription>
                    Your payment link has been generated successfully
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Razorpay Link */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Razorpay Payment Link</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={paymentLink.razorpayLink}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(paymentLink.razorpayLink, 'Payment Link')}
                      >
                        {copiedField === 'Payment Link' ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(paymentLink.razorpayLink, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Blockchain Hash */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center space-x-2">
                      <Hash className="h-4 w-4" />
                      <span>Blockchain Transaction Hash</span>
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={paymentLink.blockchainHash}
                        readOnly
                        className="font-mono text-xs"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(paymentLink.blockchainHash, 'Blockchain Hash')}
                      >
                        {copiedField === 'Blockchain Hash' ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* IPFS CID */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">IPFS Document CID</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={paymentLink.ipfsCid}
                        readOnly
                        className="font-mono text-xs"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(paymentLink.ipfsCid, 'IPFS CID')}
                      >
                        {copiedField === 'IPFS CID' ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Amount Summary */}
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Payment Summary</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-700">Amount (USD):</span>
                        <span className="font-medium">${amount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Amount (INR):</span>
                        <span className="font-medium">₹{paymentLink.amountInr.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <Alert>
                    <AlertDescription>
                      This payment link is now active and can be shared with your client. 
                      The transaction will be recorded on the blockchain for transparency.
                    </AlertDescription>
                  </Alert>

                  <div className="flex space-x-3">
                    <Button 
                      onClick={handleCompletePayment}
                      className="flex-1"
                      disabled={isCompleting}
                    >
                      {isCompleting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Completing Payment...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Complete Payment
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <LinkIcon className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Payment Link Yet
                  </h3>
                  <p className="text-gray-600">
                    Fill out the form to create your first payment link
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreatePaymentLink;
