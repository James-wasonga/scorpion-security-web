
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

async function getAccessToken() {
  const consumerKey = Deno.env.get('MPESA_CONSUMER_KEY') || '5wK7nYSW5CsBQ2TSiMjeIO9ARnSToeLAUqxqqj4fM373QV8u'
  const consumerSecret = Deno.env.get('MPESA_CONSUMER_SECRET') || 'fbFAobAajNLyh2vucvIiWSuT9aqpqRpf8aSjT5MLfPsjbuOnxaG22RHnq3sJs7GV'
  
  const auth = btoa(`${consumerKey}:${consumerSecret}`)
  
  const response = await fetch(
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
      },
    }
  )
  
  const data = await response.json()
  return data.access_token
}

async function initiateSTKPush(phoneNumber: string, amount: number, accountRef: string) {
  const accessToken = await getAccessToken()
  // Using default testing credentials
  const shortcode = Deno.env.get('MPESA_SHORTCODE') || '174379'
  const passkey = Deno.env.get('MPESA_PASSKEY') || 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'
  
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3)
  const password = btoa(`${shortcode}${passkey}${timestamp}`)
  
  const stkPushPayload = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: phoneNumber,
    PartyB: shortcode,
    PhoneNumber: phoneNumber,
    CallBackURL: `${Deno.env.get('SUPABASE_URL')}/functions/v1/mpesa-callback`,
    AccountReference: accountRef,
    TransactionDesc: 'Security Services Payment'
  }
  
  const response = await fetch(
    'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stkPushPayload),
    }
  )
  
  return await response.json()
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { phoneNumber, amount, quoteRequestId } = await req.json()
    
    console.log('Initiating STK Push for:', phoneNumber, amount)
    
    // Clean phone number (remove + and ensure it starts with 254)
    let cleanPhone = phoneNumber.replace(/[^0-9]/g, '')
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '254' + cleanPhone.slice(1)
    }
    
    const stkResponse = await initiateSTKPush(cleanPhone, amount, quoteRequestId || 'QUOTE')
    
    // Store payment transaction in database
    const { data: transaction, error } = await supabase
      .from('payment_transactions')
      .insert({
        phone_number: cleanPhone,
        amount: amount,
        checkout_request_id: stkResponse.CheckoutRequestID,
        merchant_request_id: stkResponse.MerchantRequestID,
        quote_request_id: quoteRequestId,
        status: 'pending'
      })
      .select()
      .single()
    
    if (error) {
      console.error('Database error:', error)
      throw error
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'STK Push initiated successfully',
        checkoutRequestId: stkResponse.CheckoutRequestID,
        transaction: transaction
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('STK Push error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
