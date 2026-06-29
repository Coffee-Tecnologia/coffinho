// test-coffinho.js
import Anthropic from '@anthropic-ai/sdk';
import 'dotenv/config';
import fs from 'fs';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// Lê um doc do Apollo (exemplo)
const docContent = fs.readFileSync('./instructions/fluxo-pedidos.md', 'utf-8');

async function perguntarCoffinho(pergunta) {
  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [{
      role: "user",
      content: `Você é o Coffinho, assistente do sistema Apollo.
      
Documentação:
${docContent}

Pergunta do usuário: ${pergunta}

Responda de forma clara e objetiva.`
    }]
  });
  
  return message.content[0].text;
}

// Teste
const resposta = await perguntarCoffinho("Como acessar o .env do apollo?");
console.log(resposta);
