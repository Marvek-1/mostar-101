import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation schema
const SignalSchema = z.object({
  location: z.string().min(1).max(100).regex(/^[a-zA-Z0-9\-_\s]+$/),
  symptoms: z.array(z.string().min(1).max(200)).min(1).max(20),
  evidence: z.array(z.record(z.any())).max(50).optional().default([]),
});

// Set your deployed FastAPI Executor URL here
const EXECUTOR_URL = Deno.env.get('EXECUTOR_URL') || 'http://127.0.0.1:8082';

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
    const validationResult = SignalSchema.safeParse(body);
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

    const { location, symptoms, evidence } = validationResult.data;
    
    // Call FastAPI Executor (which orchestrates Assessor -> Judge)
    const response = await fetch(`${EXECUTOR_URL}/signal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location, symptoms, evidence }),
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
    
    // Store result in Supabase grid_signals table
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
    
    const { error: insertError } = await supabase
      .from('grid_signals')
      .insert({
        location: result.location,
        symptoms: symptoms,
        odu: result.odu,
        ihash: result.assessor_hash,
        verdict: result.root_cause,
        action: result.recommended_action,
      });
    
    if (insertError) {
      console.error(`[${requestId}] Database insert error:`, insertError);
      // Don't fail the request, just log
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(`[${requestId}] Signal function error:`, error);
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
