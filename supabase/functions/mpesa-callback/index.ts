
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

serve(async (req) => {
  try {
    const body = await req.json()
    console.log('M-Pesa Callback received:', JSON.stringify(body, null, 2))
    
    const { Body } = body
    const { stkCallback } = Body
    
    const checkoutRequestId = stkCallback.CheckoutRequestID
    const merchantRequestId = stkCallback.MerchantRequestID
    const resultCode = stkCallback.ResultCode
    const resultDesc = stkCallback.ResultDesc
    
    let status = 'failed'
    let mpesaReceiptNumber = null
    let transactionDate = null
    
    if (resultCode === 0) {
      status = 'success'
      const callbackMetadata = stkCallback.CallbackMetadata
      
      if (callbackMetadata && callbackMetadata.Item) {
        const items = callbackMetadata.Item
        
        // Extract receipt number and transaction date
        for (const item of items) {
          if (item.Name === 'MpesaReceiptNumber') {
            mpesaReceiptNumber = item.Value
          }
          if (item.Name === 'TransactionDate') {
            const dateStr = item.Value.toString()
            // Convert from format YYYYMMDDHHMMSS to ISO string
            const year = dateStr.substring(0, 4)
            const month = dateStr.substring(4, 6)
            const day = dateStr.substring(6, 8)
            const hour = dateStr.substring(8, 10)
            const minute = dateStr.substring(10, 12)
            const second = dateStr.substring(12, 14)
            transactionDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`).toISOString()
          }
        }
      }
    }
    
    // Update payment transaction in database
    const { error } = await supabase
      .from('payment_transactions')
      .update({
        status: status,
        result_code: resultCode.toString(),
        result_desc: resultDesc,
        mpesa_receipt_number: mpesaReceiptNumber,
        transaction_date: transactionDate,
        updated_at: new Date().toISOString()
      })
      .eq('checkout_request_id', checkoutRequestId)
    
    if (error) {
      console.error('Database update error:', error)
    }
    
    return new Response(
      JSON.stringify({ ResultCode: 0, ResultDesc: 'Success' }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Callback processing error:', error)
    return new Response(
      JSON.stringify({ ResultCode: 1, ResultDesc: 'Error processing callback' }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
