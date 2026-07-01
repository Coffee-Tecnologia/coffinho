ALTER TABLE coffinho.conversations
  ADD COLUMN IF NOT EXISTS app_id TEXT NOT NULL DEFAULT 'apollo';

CREATE INDEX IF NOT EXISTS idx_conversations_app_id
  ON coffinho.conversations (app_id);
