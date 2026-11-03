# Home e Dashboards — Apollo
Atualizado em 03/11/2026

A **Home** é a primeira tela depois do login. Ela tem três partes: as ações recomendadas, o carrossel de notícias e os dashboards em abas.

## Ações recomendadas ("Configuração inicial")
Banner "Vamos deixar seu ambiente pronto": "Complete as etapas abaixo pra liberar todos os módulos do Apollo."

Etapas:
- "Criar conta Apollo" e "Fazer login" (já concluídas ao entrar);
- "Conectar sua empresa";
- "Cadastrar certificado digital": envie o certificado A1 (.pfx);
- "Configurar sincronização": captura automática de documentos;
- "Convidar sua equipe": usuários e permissões.

Cada etapa tem "Resolver" (leva à tela certa) e "Pular". Quando o certificado vence, aparece "Atualizar certificado →".

## Notícias e alertas
- **Carrossel de anúncios:** avisos publicados pela Coffee ou pelo administrador (Configuração › Noticias).
- **Alertas de vencimento de pedidos** (só Protheus): "Seus pedidos estão próximos do vencimento no financeiro!" e "Pedidos com vencimento próximo — envie ao fiscal!". O botão "Ver pedidos críticos" leva aos pedidos.

## Abas de dashboard
Cada usuário só vê as abas a que tem acesso. Aba sem acesso não aparece. Quando a aba **NFE** está disponível, ela vem primeiro.

| Aba | Quando aparece | O que mostra |
|---|---|---|
| **Pedido/Documentos** (Protheus) ou **Documentos** (nuvem) | Usuários de pedidos/documentos | Visão Geral (Total, Pendentes, Finalizados, Rejeitados), Documentos por status, por tipo e por forma de pagamento, distribuição por faixa de valor, últimos 12 meses |
| **Fiscal** | Só Protheus, para o Fiscal | "Documentos aguardando aprovação" por tempo em espera, Status, Método de pagamento, "Pedidos aprovados por você aguardando baixa no financeiro!" |
| **Orçamentos** | Só nuvem | Taxa de conversão, Em análise, Ticket médio, Valor em aberto |
| **NFE** | Só nuvem, para quem tem NF-e | NF-e do mês atual e do mês passado, Valor do mês, Autorizadas, Sem manifestação, NF-e por status, evolução mensal, Top emissores, Exposição por emissor (risco) |

As abas Caixinha, Financeiro e Fornecedores ainda não estão disponíveis.

## Visão Geral da Gestão Fiscal
O painel de saúde das empresas, com o bloco "Atenção necessária" (Certificados, Regularidade, NF-e recebidas, Captura de notas), não fica na Home. Ele fica em Gestão Fiscal › Monitoramento › Visão Geral, só para administradores (ver doc de Gestão Fiscal).

## Perguntas frequentes
- **Não vejo a aba Fiscal/NFE.** A aba depende da permissão e do tipo de empresa (Protheus ou nuvem). Peça acesso ao administrador da sua empresa.
- **Os números estão desatualizados.** Os dashboards refletem o que já está no Apollo. Para pedidos do Protheus, sincronize em Documentos › Pedidos; notas chegam pela captura automática.
- **Como some o banner de configuração inicial?** Conclua as etapas ou use "Pular".
- **De qual empresa são os dados?** Da empresa selecionada no topo. Para ver outra, use "Trocar empresa".
