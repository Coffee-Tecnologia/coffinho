# Relatórios — Apollo
Atualizado em 03/11/2026

Menu **Relatórios**: central com um card por relatório. Use "Buscar relatório..." ou as categorias (Todos, Financeiro, Documentos, Fiscal, Caixinha). Clique no card para abrir os filtros.

## O que funciona hoje
Estes geram o arquivo de verdade:

| Card | Como usar | Saída |
|---|---|---|
| **Nota Fiscal de Entrada** | Período, status (Autorizada, Cancelada, Denegada, Inutilizada) e faixa de valor ("Valor total (de)" / "Valor total (até)") | "Visualizar PDF" |
| **NF-e de Saída** | Período | "Visualizar PDF" |
| **NFS-e** | Período | "Visualizar PDF" |
| **CT-e** | Período e "Papel no CT-e" (Tomador, Emitente, Remetente, Destinatário, Expedidor, Recebedor) | "Visualizar PDF" |
| **Impressão de DANFE** | "Chave de acesso (44 dígitos)" de uma NF-e | "Imprimir DANFE" |

"Limpar filtros" (ou "Limpar") zera o formulário.

## Ainda não geram arquivo
Os cards abaixo já aparecem na tela, mas os botões "Gerar Relatório", "Exportar XLS" e "Exportar PDF" **ainda não fazem nada**: Relatório Financeiro, Relatório de Pedidos, Relatório de Caixinha, Relatório A Pagar, Relatório A Receber, Relatório de Orçamentos e Documentos Fiscais.

Se o usuário pedir um desses, diga que ainda está em desenvolvimento e ofereça a alternativa: o botão "Exportar" (PDF/XLS) da própria tela gera a lista com os filtros aplicados:
- Financeiro › A pagar / A receber: "Exportar" (PDF, XLS e "Pagos por Prazo");
- Documentos › Caixa geral;
- Documentos › Pedidos: "Exportar";
- Cadastros;
- Orçamentos: PDF/XLS de cada orçamento.

## Outros relatórios do sistema
- **Gestão Fiscal › Análises › Relatórios:** relatórios de NF-e da Gestão Fiscal, com "Visualizar PDF" (ver doc de Gestão Fiscal).
- **DANFE de uma nota da lista:** em Gestão Fiscal › NF-e Recebidas, selecione as notas e use "Baixar".

## Quem pode
Permissão REPORT, ou administrador da empresa (ADMIN_BASIC). Sem o menu Relatórios, peça acesso ao administrador da sua empresa.

## Perguntas frequentes
- **Cliquei em "Exportar XLS" no Relatório Financeiro e nada aconteceu.** Esse card ainda não gera arquivo. Use o "Exportar" da tela Financeiro › A pagar / A receber.
- **Como imprimo o DANFE de uma nota?** Relatórios › Impressão de DANFE › cole a chave de 44 dígitos › "Imprimir DANFE".
- **Dá para filtrar por empresa?** O relatório usa a empresa selecionada no topo. Para outra empresa, troque a empresa no topo da tela.

## Problemas comuns
- O DANFE não sai: a chave precisa ter 44 dígitos, e a nota precisa estar no Apollo com o XML completo. Se o Apollo só tiver o resumo da nota, não há DANFE: é preciso registrar a Ciência antes.
- "Erro ao gerar relatório!": tente um período menor. Se persistir, acione o suporte.
