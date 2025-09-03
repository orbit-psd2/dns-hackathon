import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  Zap, 
  Clock, 
  Shield, 
  DollarSign, 
  CheckCircle, 
  AlertTriangle,
  Info,
  TrendingUp,
  Users,
  Globe
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SameDaySettlement: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleToggleSettlement = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsEnabled(!isEnabled);
    setIsProcessing(false);
    
    toast({
      title: isEnabled ? "Same-Day Settlement Disabled" : "Same-Day Settlement Enabled",
      description: isEnabled 
        ? "Your payments will now follow standard settlement times."
        : "Your payments will now be settled within 24 hours!",
    });
  };

  const features = [
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: "24-Hour Settlement",
      description: "Get your payments settled within 24 hours instead of the standard 2-3 business days."
    },
    {
      icon: <Shield className="h-6 w-6 text-green-600" />,
      title: "Enhanced Security",
      description: "Advanced fraud detection and risk management for faster, safer settlements."
    },
    {
      icon: <DollarSign className="h-6 w-6 text-purple-600" />,
      title: "Priority Processing",
      description: "Your transactions get priority in the settlement queue for faster processing."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-orange-600" />,
      title: "Improved Cash Flow",
      description: "Better cash flow management with predictable, fast payment settlements."
    }
  ];

  const benefits = [
    "Faster access to your earnings",
    "Improved cash flow management",
    "Reduced waiting time for payments",
    "Priority customer support",
    "Advanced fraud protection",
    "Real-time settlement notifications"
  ];

  const stats = [
    {
      icon: <Clock className="h-5 w-5 text-blue-600" />,
      label: "Average Settlement Time",
      value: "4-6 hours",
      description: "With same-day settlement enabled"
    },
    {
      icon: <Users className="h-5 w-5 text-green-600" />,
      label: "Active Users",
      value: "10,000+",
      description: "Using same-day settlement"
    },
    {
      icon: <Globe className="h-5 w-5 text-purple-600" />,
      label: "Global Coverage",
      value: "50+ Countries",
      description: "Supported worldwide"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 md:pt-28 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Same-Day Settlement</h1>
          <p className="text-gray-600">
            Get your payments settled within 24 hours with our advanced settlement system
          </p>
        </motion.div>

        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="p-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <Zap className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Lightning Fast Settlements</h2>
                  <p className="text-blue-100">
                    Transform your payment experience with same-day settlement
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-blue-100 mb-1">{stat.label}</div>
                    <div className="text-xs text-blue-200">{stat.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* How It Works */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Info className="h-5 w-5 text-blue-600" />
                    <span>How Same-Day Settlement Works</span>
                  </CardTitle>
                  <CardDescription>
                    Understanding the process behind faster payments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Payment Received</h4>
                        <p className="text-gray-600">Client makes payment through your payment link</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Instant Verification</h4>
                        <p className="text-gray-600">Advanced AI verifies the transaction in real-time</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Priority Processing</h4>
                        <p className="text-gray-600">Your payment enters the priority settlement queue</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Settlement Complete</h4>
                        <p className="text-gray-600">Funds are transferred to your account within 24 hours</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                  <CardDescription>
                    What makes our same-day settlement special
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 p-2 bg-gray-100 rounded-lg">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Toggle Switch */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    <span>Settlement Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="settlement-toggle" className="text-base font-medium">
                        Same-Day Settlement
                      </Label>
                      <p className="text-sm text-gray-600">
                        Enable 24-hour payment settlement
                      </p>
                    </div>
                    <Switch
                      id="settlement-toggle"
                      checked={isEnabled}
                      onCheckedChange={handleToggleSettlement}
                      disabled={isProcessing}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <Badge variant={isEnabled ? "default" : "secondary"}>
                        {isEnabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Settlement Time</span>
                      <span className="text-sm font-medium">
                        {isEnabled ? "4-6 hours" : "2-3 days"}
                      </span>
                    </div>
                  </div>

                  {isEnabled && (
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        Same-day settlement is active. Your payments will be processed within 24 hours.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Important Note */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Note:</strong> Same-day settlement is available for verified accounts only. 
                  Some transactions may require additional verification.
                </AlertDescription>
              </Alert>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SameDaySettlement;
