
-- Drop the existing restrictive insert policy
DROP POLICY IF EXISTS "Anyone can submit quote requests" ON public.quote_requests;

-- Create a new policy that truly allows anyone to submit quote requests
CREATE POLICY "Public can submit quote requests" 
ON public.quote_requests 
FOR INSERT 
WITH CHECK (true);

-- Also ensure the table has the correct RLS setup
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
