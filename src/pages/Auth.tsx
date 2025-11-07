import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { supabase } from '@/integrations/supabase/client-fallback';
import { PUBLIC_ENV } from '@/lib/env';
import { toast } from '@/hooks/use-toast';
import { Loader2, Mail, Phone } from 'lucide-react';

export default function Auth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [emailStep, setEmailStep] = useState<'input' | 'verify'>('input');
  const [phoneStep, setPhoneStep] = useState<'input' | 'verify'>('input');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailOTP, setEmailOTP] = useState('');
  const [phoneOTP, setPhoneOTP] = useState('');

  const handleEmailSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;

      setEmailStep('verify');
      toast({
        title: 'Check your email',
        description: 'We sent you a 6-digit verification code.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailVerify = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (emailOTP.length !== 6) return;
    
    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: emailOTP,
        type: 'email',
      });

      if (error) throw error;

      toast({ title: 'Success!', description: 'You are now signed in.' });
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Invalid code',
        description: 'Please check your code and try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneSend = async (e: React.FormEvent, channel: 'sms' | 'call' = 'sms') => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${PUBLIC_ENV.SUPABASE_URL}/functions/v1/send-auth-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${PUBLIC_ENV.SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ phone, channel }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setPhoneStep('verify');
      toast({
        title: channel === 'sms' ? 'SMS sent' : 'Call initiated',
        description: 'Enter the 6-digit code you received.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneVerify = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (phoneOTP.length !== 6) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${PUBLIC_ENV.SUPABASE_URL}/functions/v1/verify-phone-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${PUBLIC_ENV.SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ phone, code: phoneOTP }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || 'Verification failed');

      // Sign in with phone
      const { error } = await supabase.auth.signInWithOtp({ phone });
      if (error) throw error;

      toast({ title: 'Success!', description: 'You are now signed in.' });
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Invalid code',
        description: 'Please check your code and try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome to HumanyxAI</h1>
          <p className="text-muted-foreground">Sign in to continue your growth journey</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </TabsTrigger>
              <TabsTrigger value="phone">
                <Phone className="w-4 h-4 mr-2" />
                Phone
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="mt-6">
              {emailStep === 'input' ? (
                <form onSubmit={handleEmailSend} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Send Verification Code
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleEmailVerify} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Enter the code sent to {email}</Label>
                    <InputOTP value={emailOTP} onChange={setEmailOTP} maxLength={6} onComplete={handleEmailVerify}>
                      <InputOTPGroup className="w-full justify-center gap-2">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={emailOTP.length !== 6 || loading}
                  >
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Verify Code
                  </Button>
                  <Button onClick={() => setEmailStep('input')} variant="ghost" className="w-full" type="button">
                    Use a different email
                  </Button>
                </form>
              )}
            </TabsContent>

            <TabsContent value="phone" className="mt-6">
              {phoneStep === 'input' ? (
                <form onSubmit={handlePhoneSend} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1234567890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">Include country code (e.g., +1)</p>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1" disabled={loading}>
                      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      Send SMS
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="flex-1" 
                      disabled={loading}
                      onClick={(e) => handlePhoneSend(e, 'call')}
                    >
                      Call Me
                    </Button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handlePhoneVerify} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Enter the code sent to {phone}</Label>
                    <InputOTP value={phoneOTP} onChange={setPhoneOTP} maxLength={6} onComplete={handlePhoneVerify}>
                      <InputOTPGroup className="w-full justify-center gap-2">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={phoneOTP.length !== 6 || loading}
                  >
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Verify Code
                  </Button>
                  <Button onClick={() => setPhoneStep('input')} variant="ghost" className="w-full" type="button">
                    Use a different phone
                  </Button>
                </form>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
