
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface QuoteRequestFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceType: string;
  location: string;
  propertySize: string;
  securityNeeds: string;
  urgency: string;
  preferredContactTime: string;
}

const QuoteRequestForm = () => {
  const [formData, setFormData] = useState<QuoteRequestFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceType: '',
    location: '',
    propertySize: '',
    securityNeeds: '',
    urgency: 'normal',
    preferredContactTime: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof QuoteRequestFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const requiredFields = ['name', 'email', 'phone', 'serviceType', 'location', 'securityNeeds'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof QuoteRequestFormData].trim());
    
    if (missingFields.length > 0) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields marked with *",
      });
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please enter a valid email address",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      console.log('Submitting quote request with data:', formData);
      
      // Insert quote request
      const { data: quoteData, error: quoteError } = await supabase
        .from('quote_requests')
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          company: formData.company.trim() || null,
          service_type: formData.serviceType,
          location: formData.location.trim(),
          property_size: formData.propertySize || null,
          security_needs: formData.securityNeeds.trim(),
          urgency: formData.urgency,
          preferred_contact_time: formData.preferredContactTime || null,
          status: 'pending'
        })
        .select()
        .single();

      if (quoteError) {
        console.error('Quote submission error:', quoteError);
        throw quoteError;
      }

      console.log('Quote request submitted successfully:', quoteData);

      // Send auto-reply email
      try {
        console.log('Sending auto-reply email...');
        const { error: emailError } = await supabase.functions.invoke('send-contact-reply', {
          body: {
            to: formData.email.trim().toLowerCase(),
            name: formData.name.trim(),
            type: 'quote_request',
            subject: `Quote Request Confirmation - ${formData.serviceType}`,
            originalMessage: `Service: ${formData.serviceType}\nLocation: ${formData.location}\nSecurity Needs: ${formData.securityNeeds}`
          }
        });

        if (emailError) {
          console.error('Email sending error:', emailError);
        } else {
          console.log('Auto-reply email sent successfully');
        }
      } catch (emailErr) {
        console.error('Email function error:', emailErr);
      }

      // Success message
      toast({
        title: "Quote Request Submitted!",
        description: "Thank you for your request. We'll contact you within 24 hours with a detailed quote. A confirmation email has been sent to your inbox.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        serviceType: '',
        location: '',
        propertySize: '',
        securityNeeds: '',
        urgency: 'normal',
        preferredContactTime: '',
      });

    } catch (error: any) {
      console.error('Form submission error:', error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error.message || "There was an error submitting your request. Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-primary">Get Your Security Quote</CardTitle>
        <p className="text-center text-muted-foreground">
          Fill out the form below and we'll provide you with a customized quote within 24 hours
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+254 700 000 000"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company (Optional)</Label>
              <Input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Your company name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceType">Security Service Type *</Label>
            <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential">Residential Security</SelectItem>
                <SelectItem value="commercial">Commercial Security</SelectItem>
                <SelectItem value="event">Event Security</SelectItem>
                <SelectItem value="personal">Personal Protection</SelectItem>
                <SelectItem value="consultation">Security Consultation</SelectItem>
                <SelectItem value="installation">Security System Installation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="City, Area or Address"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertySize">Property Size (Optional)</Label>
              <Select value={formData.propertySize} onValueChange={(value) => handleInputChange('propertySize', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select property size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (1-2 rooms/units)</SelectItem>
                  <SelectItem value="medium">Medium (3-5 rooms/units)</SelectItem>
                  <SelectItem value="large">Large (6+ rooms/units)</SelectItem>
                  <SelectItem value="commercial">Commercial Building</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="securityNeeds">Security Requirements *</Label>
            <Textarea
              id="securityNeeds"
              value={formData.securityNeeds}
              onChange={(e) => handleInputChange('securityNeeds', e.target.value)}
              placeholder="Describe your security needs, concerns, and any specific requirements..."
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="urgency">Urgency Level</Label>
              <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Planning ahead</SelectItem>
                  <SelectItem value="normal">Normal - Within a week</SelectItem>
                  <SelectItem value="high">High - Within 2-3 days</SelectItem>
                  <SelectItem value="urgent">Urgent - Immediate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferredContactTime">Preferred Contact Time (Optional)</Label>
              <Input
                id="preferredContactTime"
                type="text"
                value={formData.preferredContactTime}
                onChange={(e) => handleInputChange('preferredContactTime', e.target.value)}
                placeholder="e.g., Weekdays 9-5, Evenings, etc."
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full py-6 text-lg font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Submitting Request...</span>
              </div>
            ) : (
              'Get My Security Quote'
            )}
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            By submitting this form, you agree to be contacted by our security team regarding your quote request.
            We respect your privacy and will not share your information with third parties.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuoteRequestForm;
