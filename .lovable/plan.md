
# Integrate Custom MoStar Ollama AI Model

## Overview
Replace the current Lovable AI Gateway (Google Gemini) with your custom `Mostar/mostar-ai` Ollama model running on your external server. The chatbot (Woo) and all AI-powered features will use your trained MoStar AI model instead.

## Current Architecture
```text
+------------------+       +------------------------+       +----------------------+
|  React Frontend  | ----> | mostar-chat Edge Func  | ----> | Lovable AI Gateway   |
|  (ChatBot.tsx)   |       | (JWT Protected)        |       | (Gemini 2.5 Flash)   |
+------------------+       +------------------------+       +----------------------+
```

## Target Architecture
```text
+------------------+       +------------------------+       +----------------------+
|  React Frontend  | ----> | mostar-chat Edge Func  | ----> | Your Ollama Server   |
|  (ChatBot.tsx)   |       | (JWT Protected)        |       | (Mostar/mostar-ai)   |
+------------------+       +------------------------+       +----------------------+
```

## Implementation Steps

### Step 1: Add Ollama Server URL as a Secret
Store your Ollama server URL securely in the backend secrets so the edge function can access it.

**Secret to add:**
- `OLLAMA_BASE_URL` - Your Ollama server URL (e.g., `https://your-ollama-server.com`)

### Step 2: Update mostar-chat Edge Function
Modify the edge function to call your Ollama API instead of the Lovable AI Gateway.

**Key changes:**
- Replace the Lovable AI Gateway URL with Ollama's `/api/chat` endpoint
- Adapt the request format to Ollama's expected structure:
  - Model: `Mostar/mostar-ai`
  - Messages array with role/content
  - Stream: true for real-time responses
- Parse Ollama's streaming response format (JSON lines instead of SSE)
- Keep the existing MoStar system prompt and knowledge base intact
- Maintain all error handling and validation

**Ollama API format:**
```text
POST /api/chat
{
  "model": "Mostar/mostar-ai",
  "messages": [
    {"role": "system", "content": "..."},
    {"role": "user", "content": "Hello!"}
  ],
  "stream": true
}
```

**Ollama streaming response format:**
```text
{"message":{"role":"assistant","content":"Hello"},"done":false}
{"message":{"role":"assistant","content":"!"},"done":false}
{"done":true}
```

### Step 3: Update Frontend Streaming Parser
Modify the ChatBot component to parse Ollama's streaming format, which differs from OpenAI's SSE format.

**Ollama returns:** Newline-delimited JSON objects
**Current parser expects:** SSE format (`data: {...}`)

The streaming parser needs to:
- Read JSON lines (not SSE data: lines)
- Extract content from `message.content` field
- Check for `done: true` to end streaming

### Step 4: Deploy and Test
- Deploy the updated mostar-chat edge function
- Test the chat functionality with your MoStar AI model
- Verify streaming works correctly

## Technical Details

### Edge Function Changes (mostar-chat/index.ts)

**Before:**
```typescript
const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${LOVABLE_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "google/gemini-2.5-flash",
    messages: [...],
    stream: true,
  }),
});
```

**After:**
```typescript
const OLLAMA_BASE_URL = Deno.env.get("OLLAMA_BASE_URL");
const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "Mostar/mostar-ai",
    messages: [...],
    stream: true,
  }),
});
```

### Frontend Streaming Changes (ChatBot.tsx)

**Current SSE parser:**
```typescript
// Looks for: data: {"choices":[{"delta":{"content":"..."}}]}
if (!line.startsWith('data: ')) continue;
const jsonStr = line.slice(6).trim();
const parsed = JSON.parse(jsonStr);
const content = parsed.choices?.[0]?.delta?.content;
```

**New Ollama parser:**
```typescript
// Looks for: {"message":{"content":"..."},"done":false}
const parsed = JSON.parse(line);
if (parsed.done) break;
const content = parsed.message?.content;
```

## Files to Modify
1. **supabase/functions/mostar-chat/index.ts** - Switch from Lovable AI to Ollama API
2. **src/components/ChatBot.tsx** - Update streaming parser for Ollama format
3. **Secret configuration** - Add OLLAMA_BASE_URL secret

## Security Considerations
- The Ollama server URL is stored as a secret, not hardcoded
- JWT authentication remains in place for the edge function
- All existing input validation (Zod schemas) stays intact
- Consider adding an API key header if your Ollama server requires authentication

## Optional Enhancements (Future)
- Add fallback to Lovable AI if Ollama server is unavailable
- Add a toggle for users to switch between AI providers
- Configure timeout handling for Ollama requests
