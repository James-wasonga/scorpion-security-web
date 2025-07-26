
-- Create a table for payment transactions
CREATE TABLE public.payment_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  checkout_request_id TEXT,
  merchant_request_id TEXT,
  mpesa_receipt_number TEXT,
  transaction_date TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'cancelled')),
  result_code TEXT,
  result_desc TEXT,
  quote_request_id UUID REFERENCES public.quote_requests(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;

-- Create policy for payment transactions (admins can see all)
CREATE POLICY "Admins can view all payment transactions" 
  ON public.payment_transactions 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Allow anyone to create payment transactions (for STK push)
CREATE POLICY "Anyone can create payment transactions" 
  ON public.payment_transactions 
  FOR INSERT 
  WITH CHECK (true);

-- Allow system to update payment status
CREATE POLICY "System can update payment transactions" 
  ON public.payment_transactions 
  FOR UPDATE 
  WITH CHECK (true);
