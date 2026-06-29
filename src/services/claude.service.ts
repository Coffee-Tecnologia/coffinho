import Anthropic from '@anthropic-ai/sdk';
import 'dotenv/config';

export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface AskClaudeParams {
  docs: string;
  history: ChatMessage[];
  question: string;
}

export const UNANSWERED_MARKER = '[[SEM_RESPOSTA]]';

export async function askClaude({ docs, history, question }: AskClaudeParams): Promise<string> {
  const messages: Anthropic.MessageParam[] = [
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: 'user', content: question },
  ];

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: `Você é o Coffinho, assistente do sistema Apollo.

Documentação:
${docs}

Responda de forma clara e objetiva.

Se, mesmo com a documentação fornecida, você não conseguir responder a pergunta com confiança, explique isso ao usuário de forma natural e honesta, e finalize sua resposta inteira em uma linha própria, exatamente assim (sem aspas, sem markdown, sem variação):
[[SEM_RESPOSTA]]
Essa marcação é um sinal interno do sistema. Nunca explique ou mencione essa marcação ao usuário — ela será removida automaticamente antes de qualquer pessoa ver a resposta.`,
    messages,
  });

  const block = message.content[0];
  if (block.type !== 'text') throw new Error('Resposta inesperada do Claude');
  return block.text;
}
