-- Enable RLS on internal logging tables that have policies but RLS disabled
ALTER TABLE grid.assess_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE grid.decisions_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE grid.audit_validation_events ENABLE ROW LEVEL SECURITY;