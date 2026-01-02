-- Fix RLS policies: Restrict public access to authenticated users only
-- And add proper policies for internal grid tables

-- 1. Drop overly permissive public policies on grid_signals
DROP POLICY IF EXISTS "Anyone can read grid_signals" ON grid.grid_signals;
DROP POLICY IF EXISTS "Public read access to grid_signals" ON grid.grid_signals;

-- 2. Drop overly permissive public policies on grid_decisions
DROP POLICY IF EXISTS "Anyone can read grid_decisions" ON grid.grid_decisions;
DROP POLICY IF EXISTS "Public read access to grid_decisions" ON grid.grid_decisions;

-- 3. Drop overly permissive public policies on ai_memory
DROP POLICY IF EXISTS "Anyone can read ai_memory" ON grid.ai_memory;
DROP POLICY IF EXISTS "Public read access to ai_memory" ON grid.ai_memory;

-- 4. Add authenticated user policies for grid_signals
CREATE POLICY "Authenticated users can read grid_signals"
  ON grid.grid_signals FOR SELECT
  USING (auth.role() = 'authenticated');

-- 5. Add authenticated user policies for grid_decisions  
CREATE POLICY "Authenticated users can read grid_decisions"
  ON grid.grid_decisions FOR SELECT
  USING (auth.role() = 'authenticated');

-- 6. Add authenticated user policies for ai_memory
CREATE POLICY "Authenticated users can read ai_memory"
  ON grid.ai_memory FOR SELECT
  USING (auth.role() = 'authenticated');

-- 7. Add service role INSERT policies for internal logging tables
-- assess_log
CREATE POLICY "Service role can insert assess_log"
  ON grid.assess_log FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can select assess_log"
  ON grid.assess_log FOR SELECT
  USING (auth.role() = 'authenticated');

-- decisions_log
CREATE POLICY "Service role can insert decisions_log"
  ON grid.decisions_log FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can select decisions_log"
  ON grid.decisions_log FOR SELECT
  USING (auth.role() = 'authenticated');

-- audit_validation_events
CREATE POLICY "Service role can insert audit_validation_events"
  ON grid.audit_validation_events FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can select audit_validation_events"
  ON grid.audit_validation_events FOR SELECT
  USING (auth.role() = 'authenticated');