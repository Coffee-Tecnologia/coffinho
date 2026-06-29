ALTER TABLE coffinho.messages
  ADD COLUMN IF NOT EXISTS feedback SMALLINT CHECK (feedback IN (-1, 1));

CREATE TABLE IF NOT EXISTS coffinho.unanswered_questions (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID        REFERENCES coffinho.conversations(id) ON DELETE SET NULL,
  message_id      UUID        REFERENCES coffinho.messages(id) ON DELETE SET NULL,
  question        TEXT        NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_unanswered_questions_created_at
  ON coffinho.unanswered_questions (created_at);
