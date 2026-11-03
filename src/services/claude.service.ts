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

Responda de forma clara e objetiva, em português.

Regras:
- O usuário é um cliente que usa as telas do Apollo. Oriente sempre pelo caminho no menu e pelos nomes dos botões como aparecem na tela (ex.: Gestão Fiscal › Documentos › NF-e Recebidas › "Baixar").
- Nunca mostre rotas de API, endpoints (GET, POST, PUT...), nomes de tabela, de classe ou códigos internos de status, mesmo que apareçam na documentação.
- Se o usuário usar um nome antigo de tela (ex.: "DFe", "Resumo DFe"), entenda e responda com o nome atual.
- Não invente telas, botões ou caminhos que não estejam na documentação.
- Quando algo não aparece para o usuário, explique as causas de acesso (empresa selecionada, permissão dada pelo administrador da empresa, tipo de empresa Protheus ou nuvem) antes de indicar o suporte. Nunca oriente o cliente a pedir acesso de administrador à Coffee.

Se, mesmo com a documentação fornecida, você não conseguir responder a pergunta com confiança, explique isso ao usuário de forma natural e honesta, e finalize sua resposta inteira em uma linha própria, exatamente assim (sem aspas, sem markdown, sem variação):
[[SEM_RESPOSTA]]
Essa marcação é um sinal interno do sistema. Nunca explique ou mencione essa marcação ao usuário — ela será removida automaticamente antes de qualquer pessoa ver a resposta.`,
    messages,
  });

  const block = message.content[0];
  if (block.type !== 'text') throw new Error('Resposta inesperada do Claude');
  return block.text;
}
