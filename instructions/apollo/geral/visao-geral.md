# Apollo: visão geral, menu e acesso

Atualizado em 03/11/2026

Leia este arquivo antes dos fluxos de cada módulo. Ele explica onde fica cada coisa no menu, por que uma tela pode não aparecer e como o Apollo muda conforme a empresa.

## Como responder

- Oriente sempre pelo caminho na tela: **Menu › Submenu › "Botão"**, com os nomes exatamente como aparecem no Apollo.
- Nunca mostre rotas de API, endpoints (GET, POST, PUT...), nomes de tabela ou códigos internos de status. O usuário não usa nada disso.
- Nomes antigos que o usuário ainda pode usar, e o nome atual:
  - "DFe", "módulo DFe" → **Gestão Fiscal**
  - "Resumo DFe" → **Visão Geral**
  - "Certificado Digital" → **Certificados**
  - "Certidões" → **Regularidade**
  - "Situação dos Emitentes" → **Fornecedores**
  - "Consulta CNPJ" → **Fornecedores › "Consultar CNPJ"**
  - "NF-e Entrada" → **NF-e Recebidas**
  - "NF-e Saída" → **NF-e Emitidas**
  - "Análise NF-e" → **NF-e × EFD**
  - "Estimativa Tributária" → **Estimativas**
  - "Relatórios NF-e" → **Gestão Fiscal › Análises › Relatórios**
- Se a dúvida for sobre uma tela que a pessoa diz não ver, explique primeiro a parte de acesso (abaixo) antes de mandar para o suporte.

## Menu lateral (de cima para baixo)

Cada item só aparece para quem tem permissão para ele.

- **Home**: painéis (dashboards) e ações recomendadas.
- **Cadastros**: Clientes, Fornecedores, Produtos (Produtos, Categorias de Produto, Unidades de Medida), Categorias de Serviço, Serviços, Contextos.
- **Documentos**: Pedidos, Pedidos de Venda, Documentos, Caixa geral, Caixinha (Manutenção, Movimentos, Resumos), Sincronização, A pagar, A receber.
- **Fiscal**: Pedidos, Pedidos de Venda, Documentos, Caixinha. É a aprovação fiscal de pedidos e documentos, só em empresas com Protheus. Não confundir com Gestão Fiscal.
- **Financeiro**: Documentos, Caixinha, A pagar, A receber.
- **Gestão Fiscal** (o antigo "DFe"). Notas fiscais eletrônicas, em três grupos:
  - **Monitoramento**: Visão Geral, Certificados, Regularidade, Fechamento mensal, Fornecedores (com a ação "Consultar CNPJ").
  - **Documentos**: NF-e Recebidas, NF-e Emitidas, CT-e, NFS-e Recebidas, NFS-e Emitidas, Emissão NFS-e.
  - **Análises**: NF-e × EFD, Estimativas, Relatórios.
- **Consultar**: busca de documentos, pedidos e financeiro (empresas com Protheus).
- **Orçamentos**: só na nuvem.
- **Relatórios**
- **Melhoria**: sugestões de melhoria.
- **Suporte**: abre o canal de atendimento.
- **Configuração**: Usuários, Setores, Noticias, Empresas, Sistema (Parâmetros do Sistema, Integração Protheus).

No topo da tela ficam a troca de empresa, o sino de notificações e o perfil.

## "Não aparece o módulo / a tela / o botão"

O menu mostra só o que o usuário pode acessar. Quando algo não aparece, quase sempre é uma destas causas, nesta ordem:

1. **Empresa errada selecionada.** O usuário pode ter acesso a mais de uma empresa. Peça para conferir a empresa no topo da tela e trocar, se for o caso.
2. **Falta de permissão.** As permissões são dadas pelo **administrador da empresa** em **Configuração › Usuários**. Oriente o usuário a pedir a ele. Para a Gestão Fiscal, o perfil de administração fiscal libera o módulo inteiro. Também há permissões por tipo de documento: NF-e, NF-e emitidas, CT-e, NFS-e.
3. **Botão de ação sem permissão.** Ver uma tela não dá direito a agir nela. Manifestar, sincronizar, emitir ou cancelar NFS-e e fechar ou reabrir o mês exigem permissões próprias. Sem elas o botão some.
4. **Recurso de outro tipo de empresa.** Veja a seção abaixo.
5. **O módulo não está contratado.** Só nesse caso, ou se o administrador da empresa não conseguir resolver, indique o suporte.

Nunca diga ao cliente para pedir "acesso de administrador do sistema" à Coffee. A liberação é feita pelo administrador da própria empresa.

## Empresas com Protheus × empresas na nuvem

O Apollo funciona de dois jeitos, e algumas telas só existem em um deles:

- **Com Protheus** (o ERP TOTVS da empresa integrado ao Apollo): pedidos de compra e de venda vêm do Protheus. Existem o menu **Fiscal**, **Documentos › Documentos** (documentos avulsos), **Financeiro › Documentos** e **Consultar**.
- **Na nuvem** (sem Protheus): existem **A pagar**, **A receber** e **Orçamentos**, e o saldo da Caixinha é controlado no próprio Apollo.

Se o usuário perguntar por uma tela do outro modo, explique que ela não se aplica à empresa dele. Não peça para "habilitar".

A **Gestão Fiscal**, os **Cadastros** e a **Caixinha** existem nos dois modos.

## Tarefas comuns: onde fazer

- **Baixar XML ou PDF de NF-e recebidas**: Gestão Fiscal › Documentos › NF-e Recebidas. Selecione as notas e clique em "Baixar" › "Baixar XML das selecionadas" ou "Baixar PDF das selecionadas". Dá para baixar várias de uma vez.
- **XML de NF-e emitidas, CT-e e NFS-e**: na tela de cada um dentro de Gestão Fiscal › Documentos (detalhes em fluxo-dfe).
- **Ver se a captura de notas está funcionando**: Gestão Fiscal › Monitoramento › Visão Geral (coluna "Captura" e bloco "Atenção necessária").
- **Certificado digital**: Gestão Fiscal › Monitoramento › Certificados.
- **Fechar o mês fiscal**: Gestão Fiscal › Monitoramento › Fechamento mensal.
- **Usuários e permissões**: Configuração › Usuários (administrador da empresa).
- **Falar com o suporte**: item **Suporte** no menu (detalhes em suporte).
