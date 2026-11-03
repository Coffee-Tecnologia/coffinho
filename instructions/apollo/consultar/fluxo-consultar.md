# Consultar - Apollo

Atualizado em 03/11/2026

## O que é
O menu **"Consultar"** ("Pesquise documentos, pedidos e registros financeiros") é uma tela **só de consulta**: permite achar documentos, pedidos e títulos sem entrar em cada módulo. Não aprova, não edita e não exporta.

## Abas
**Empresas com Protheus:**
- **"Documentos"**: documentos avulsos (A pagar, provisões, taxas, guias) em qualquer status.
- **"Pedidos"**: pedidos de compra vindos do Protheus.
- **"Documentos no financeiro"**: títulos que já chegaram ao Financeiro depois da aprovação do Fiscal.

Cada aba só fica habilitada para quem tem a permissão correspondente.

**Empresas na nuvem:** só a aba **"Documentos"** (contas a pagar e a receber).

## Como pesquisar
1. Menu "Consultar" › escolha a aba.
2. Use as abas de status ("Todos", "Pendentes", "Rejeitados", "Finalizados", "Parcial", conforme a aba).
3. Para filtrar por período ("Data inicial"/"Data final") ou filial/espécie, abra a **"Busca Avançada"**.

Os resultados aparecem na tabela; não há tela de detalhe. Para agir sobre um item (aprovar, anexar, reenviar), vá ao módulo dele (Documentos, Fiscal ou Financeiro).

## Quem pode
O administrador da empresa libera em Configuração › Usuários:
- Aba Documentos: SEARCH_SINGLE_DOCUMENTS
- Aba Pedidos: SEARCH_PURCHASE_ORDER
- Aba Documentos no financeiro: SEARCH_FINANCIAL
- Acesso básico ao menu: SEARCH_BASIC (ou perfis de administrador)

## Perguntas frequentes

**Não consigo abrir a aba "Pedidos". Por quê?**
Ela só existe em empresas com Protheus e exige a permissão de consultar pedidos. Peça ao administrador da sua empresa.

**Qual a diferença entre "Documentos" e "Documentos no financeiro"?**
"Documentos" mostra os documentos avulsos em qualquer etapa. "Documentos no financeiro" mostra os títulos que o Fiscal já aprovou e estão no Financeiro.

**Dá para exportar daqui?**
Não. Use a exportação do módulo do documento (por exemplo, Financeiro › A pagar › "Exportar") ou o menu Relatórios.

**Dá para clicar e ver os detalhes do item?**
Não, a tela é só de consulta. Abra o item no módulo de origem.
