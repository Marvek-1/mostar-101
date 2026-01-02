import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation schema
const DiagnoseSchema = z.object({
  signal_id: z.string().max(100).optional(),
  location: z.string().min(1).max(100).optional(),
  symptoms: z.array(z.string().min(1).max(200)).max(20).optional(),
  data: z.record(z.any()).optional(),
}).passthrough();

// Set your deployed FastAPI Assessor URL here
const ASSESSOR_URL = Deno.env.get('ASSESSOR_URL') || 'http://127.0.0.1:8080';

// Generate request ID for support tracking
function generateRequestId(): string {
  return crypto.randomUUID().slice(0, 8);
}

// Safe error message mapping
function getSafeErrorMessage(statusCode: number): string {
  if (statusCode === 429) return 'Too many requests. Please wait before trying again.';
  if (statusCode === 402) return 'Service limit reached. Please contact support.';
  if (statusCode >= 500) return 'Service temporarily unavailable.';
  return 'An error occurred processing your request.';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();

  try {
    const body = await req.json();
    
    // Validate input
    const validationResult = DiagnoseSchema.safeParse(body);
    if (!validationResult.success) {
      console.error(`[${requestId}] Validation error:`, validationResult.error.errors);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid input format. Please check your data and try again.',
          requestId 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const payload = validationResult.data;
    
    // Proxy request to FastAPI Assessor
    const response = await fetch(`${ASSESSOR_URL}/diagnose`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[${requestId}] Internal service error:`, response.status, errorText);
      return new Response(
        JSON.stringify({ 
          error: getSafeErrorMessage(response.status),
          requestId 
        }),
        { status: response.status >= 500 ? 503 : response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = await response.json();

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(`[${requestId}] Diagnose function error:`, error);
    return new Response(
      JSON.stringify({ 
        error: 'Service temporarily unavailable. Please try again later.',
        requestId 
      }), 
      {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
