ALTER TABLE coffinho.conversations
  ADD COLUMN IF NOT EXISTS user_login   TEXT,
  ADD COLUMN IF NOT EXISTS company_name TEXT;

COMMENT ON COLUMN coffinho.conversations.user_login   IS 'Login do usuário Apollo (x-user-login)';
COMMENT ON COLUMN coffinho.conversations.company_name IS 'Razão social da empresa Apollo (x-company-name)';
