# Orçamentos - Apollo

Atualizado em 03/11/2026

**Só na nuvem** (empresas sem Protheus). O orçamento é uma proposta comercial criada no Apollo, com produtos e/ou serviços, enviada ao cliente por PDF, planilha ou link público. Não confunda com **Pedidos de Venda**, que vêm do Protheus.

Menu: **"Orçamentos"** (item próprio no menu lateral). O resumo dos orçamentos fica na aba **"Orçamentos"** da Home: taxa de conversão, em análise, ticket médio e valor em aberto.

## Status
| Status | Significado |
|---|---|
| Em análise | Status inicial; aguardando resposta do cliente |
| Aprovado | Cliente aprovou |
| Declinado | Cliente recusou |

As abas da tela são Todos, Em análise, Aprovados e Declinados, com contagem. Só dá para editar um orçamento enquanto ele está "Em análise".

## Como criar um orçamento
1. Menu **Orçamentos** → **"Criar Orçamento"**.
2. Preencha:
   - "Número": gerado sozinho, no formato data + sequência;
   - "Cliente" (obrigatório): precisa estar cadastrado em Cadastros › Clientes;
   - "Referência" (opcional, até 50 caracteres): um texto para identificar o orçamento, como obra ou projeto.
3. **"Adicionar item"**: escolha produto ou serviço, informe a quantidade e o "Preço unitário". Para produto, a **"Unidade de medida"** é obrigatória. Use "Adicionar" (continua no modal) ou "Adicionar e fechar".
4. Desconto (opcional): escolha o "Tipo de desconto" ("Percentual" ou "Valor"), preencha o "Valor do desconto" e clique em "Aplicar".
5. Clique em **"Salvar"**. Aparece "Orcamento cadastrado".

O orçamento **não tem** campo de validade nem de observações. A validade é escolhida na hora de gerar o PDF ou a planilha (veja abaixo).

### Serviço com materiais vinculados
Se o serviço tiver materiais cadastrados, abre o aviso **"Materiais vinculados"**:
- **"Sim, incluir materiais"**: os materiais entram como **itens separados**, com a quantidade multiplicada pela quantidade do serviço;
- **"Não"**: só o serviço entra.

O custo dos materiais **não** é somado ao preço do serviço.

### Item repetido
Se você adicionar um item que já está na lista, abre "Item já adicionado" com a opção **"Incrementar quantidade"**. O mesmo item não pode aparecer duas vezes.

## Como criar a partir de outro orçamento
**"Criar a partir de"** → pesquise o orçamento ("Pesquisar orçamento" → "Buscar") → selecione → **"Criar"**. Abre um orçamento novo com os mesmos dados, para você ajustar e salvar.

## Como gerar PDF ou planilha
Na coluna **"Download"** da linha:
- **"Relatório em PDF"** ou **"Relatório em CSV"** (gera um arquivo XLS). O Apollo pergunta "Deseja adicionar uma data de validade ao orçamento?". Escolha "Gerar sem validade" ou informe a "Data de validade" e clique em "Gerar com validade".
- **"Espelho da nota"**: PDF com o espelho da nota do orçamento.

## Como enviar ao cliente por link
1. Menu da linha → **"Gerar link público"**.
2. Clique em **"Copiar link público"** e envie o link ao cliente.
3. O cliente abre o link e escolhe **"Aprovar Orçamento"** ou **"Rejeitar Orçamento"**. Ele também pode baixar o PDF ou o Excel. O status muda sozinho.

- Cada link vale **48 horas** e serve para **uma única resposta**. Depois disso, gere outro link.
- O link é aberto sem login.

## Como mudar o status manualmente
Menu da linha → **"Atualizar Status"** → escolha o "Novo status" → "Salvar". Para "Aprovado", a tela pede "Numero NF" e "Recebimento". Hoje esses dois campos ainda não ficam gravados no orçamento.

## Outros
- **"Visualizar"** (menu da linha): mostra o orçamento completo.
- Filtros: "Data de criação", "Identificador" e "Referência".
- **"Enviar por e-mail" ainda não está disponível.** O item aparece no menu, mas não envia nada. Para mandar ao cliente, use o link público ou o PDF.

## Quem pode
Usuários com a permissão de orçamentos (BUDGE) ou administradores da empresa. Se o menu não aparece, peça ao administrador da sua empresa.

## Problemas comuns (mensagens reais)
| Mensagem | O que fazer |
|---|---|
| "Cliente é obrigatório" | Selecione um cliente; cadastre-o antes em Cadastros › Clientes, se precisar. |
| "Selecione um produto ou serviço para cada item" | Algum item ficou sem produto ou serviço. |
| "Item duplicado no orçamento: …" | Remova o item repetido ou aumente a quantidade do existente. |
| "O desconto percentual não pode ser maior que 100%" / "Desconto percentual não pode ser maior que 100" | Use um percentual entre 0 e 100. |
| "O desconto não pode ser maior que o total (…)" | Diminua o desconto. |
| "Referência deve ter no máximo 50 caracteres" | Encurte a referência. |
| "Token público expirado" (cliente) | O link passou de 48 h. Gere um link novo. |
| "Token público já utilizado" (cliente) | O cliente já respondeu por esse link. Gere outro, se for preciso. |
| "Não foi possível gerar link público" | Tente de novo; se persistir, fale com o suporte. |

## Perguntas frequentes
- **Onde coloco a validade?** Na hora de gerar o PDF ou o CSV ("Gerar com validade").
- **Como duplico um orçamento?** Use "Criar a partir de".
- **Posso editar um orçamento aprovado?** Não. A edição só é possível com o status "Em análise".
- **O cliente diz que o link não abre.** O link expira em 48 h e só aceita uma resposta. Gere um novo.
- **Tenho Protheus e não vejo Orçamentos.** Orçamentos existem só na nuvem. No Protheus, use Pedidos de Venda.
