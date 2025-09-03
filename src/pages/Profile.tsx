import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { userDatabase } from '@/data/userDatabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  CreditCard, 
  Building, 
  Save, 
  Loader2,
  Edit3,
  Check
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import DataManager from '@/components/DataManager';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  accountNo: z.string().min(10, 'Account number must be at least 10 digits'),
  ifscCode: z.string().min(8, 'Please enter a valid IFSC code'),
});

type ProfileData = z.infer<typeof profileSchema>;

const Profile: React.FC = () => {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      accountNo: user?.accountNo || '',
      ifscCode: user?.ifscCode || '',
    }
  });

  const handleSave = async (data: ProfileData) => {
    if (!user) return;

    setIsLoading(true);
    setSuccess(false);

    try {
      // Update user in database
      const updatedUser = userDatabase.updateUser(user.id, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        accountNo: data.accountNo,
        ifscCode: data.ifscCode.toUpperCase(),
      });

      if (updatedUser) {
        // Update auth context
        await login(data.email, user.password);
        
        setSuccess(true);
        setIsEditing(false);
        
        toast({
          title: "Profile Updated!",
          description: "Your profile has been updated successfully.",
        });

        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">
            Manage your personal information and account details
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <span>Profile Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="text-2xl">
                      {user?.name?.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900">{user?.name}</h3>
                    <p className="text-gray-600">{user?.email}</p>
                    <Badge variant="secondary" className="mt-2">
                      Member since {new Date(user?.joinedDate || '').toLocaleDateString()}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{user?.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      ****{user?.accountNo?.slice(-4)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Building className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{user?.ifscCode}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Edit3 className="h-5 w-5 text-blue-600" />
                      <span>Edit Profile</span>
                    </CardTitle>
                    <CardDescription>
                      Update your personal and banking information
                    </CardDescription>
                  </div>
                  {!isEditing && (
                    <Button onClick={() => setIsEditing(true)} variant="outline">
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          disabled={!isEditing}
                          {...register('name')}
                        />
                        {errors.name && (
                          <p className="text-sm text-red-600">{errors.name.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          disabled={!isEditing}
                          {...register('email')}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-600">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        disabled={!isEditing}
                        {...register('phone')}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-600">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Banking Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Banking Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="accountNo">Account Number</Label>
                        <Input
                          id="accountNo"
                          disabled={!isEditing}
                          {...register('accountNo')}
                        />
                        {errors.accountNo && (
                          <p className="text-sm text-red-600">{errors.accountNo.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="ifscCode">IFSC Code</Label>
                        <Input
                          id="ifscCode"
                          disabled={!isEditing}
                          {...register('ifscCode')}
                        />
                        {errors.ifscCode && (
                          <p className="text-sm text-red-600">{errors.ifscCode.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {success && (
                    <Alert>
                      <Check className="h-4 w-4" />
                      <AlertDescription>
                        Profile updated successfully!
                      </AlertDescription>
                    </Alert>
                  )}

                  {isEditing && (
                    <div className="flex space-x-3">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                      <Button type="button" variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Data Management Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <DataManager />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
