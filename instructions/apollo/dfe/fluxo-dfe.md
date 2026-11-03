# Gestão Fiscal (DF-e) - Apollo

Atualizado em 03/11/2026

## O que é
A **Gestão Fiscal** é o módulo que busca automaticamente na SEFAZ as notas emitidas contra o CNPJ da empresa (NF-e, CT-e e NFS-e), faz a manifestação das NF-e, acompanha certificados, certidões e fornecedores, e ajuda a fechar o mês. Funciona igual para empresas com Protheus e na nuvem.

Não confunda com o menu **Fiscal** (aprovação de pedidos e documentos, só para empresas com Protheus).

## Menu
Gestão Fiscal tem três grupos:
- **Monitoramento:** "Visão Geral", "Certificados", "Regularidade" (certidões), "Fechamento mensal", "Fornecedores"
- **Documentos:** "NF-e Recebidas", "NF-e Emitidas", "CT-e", "NFS-e Recebidas", "NFS-e Emitidas", "Emissão NFS-e"
- **Análises:** "NF-e × EFD", "Estimativas", "Relatórios"

Nomes antigos que o usuário pode usar: Resumo DFe = Visão Geral; Certidões = Regularidade; Situação dos Emitentes = Fornecedores; NF-e Entrada = NF-e Recebidas; NF-e Saída = NF-e Emitidas; Análise NF-e = NF-e × EFD; Estimativa Tributária = Estimativas.

Cada item só aparece para quem tem acesso a ele.

---

## Captura automática de documentos
O Apollo busca os documentos sozinho, usando o certificado digital A1 da empresa. **Não existe botão "Sincronizar" nas telas de notas.**
- NF-e recebidas: a cada hora, mais ou menos, das 5h às 23h.
- NFS-e recebidas: a cada hora, mais ou menos, das 5h às 23h (só municípios do Padrão Nacional).
- CT-e: de hora em hora, inclusive de madrugada.

Para a captura funcionar, a empresa precisa de:
1. Certificado A1 válido (Gestão Fiscal › Monitoramento › "Certificados").
2. Captura ligada em Configuração › Empresas › (empresa) › card **"Captura de documentos"**: chave **"Captura automática"** e, em **"Quais documentos capturar"**, os tipos desejados (NF-e de entrada, NFS-e, CT-e).

Sincronização manual: só existe em Configuração › Empresas (ação de sincronizar NF-e da empresa), para quem tem permissão. Só pode ser feita uma vez por hora.

### Saúde da captura
Em Configuração › Empresas, cada empresa mostra um chip por tipo de documento: verde (OK), âmbar (atenção), vermelho (falha), cinza (não monitorado) e riscado (desligado). Passe o mouse para ver a última captura. Filtros rápidos: "certificado vencendo/vencido", "captura pausada", "captura com falha".

Na Visão Geral a mesma informação aparece na coluna **"Captura"**:
- **Falha:** nenhuma captura com sucesso há mais de 24 h, ou certificado vencido. A empresa fica com status "Pendência".
- **Atenção:** sem sucesso há mais de 12 h, ou as duas últimas tentativas falharam. A empresa fica com status "Atenção".

Quando a SEFAZ acusa consumo indevido, a captura da NF-e pausa sozinha e volta em cerca de 3 horas. Não é preciso fazer nada.

---

## Visão Geral (Monitoramento › "Visão Geral")
Saúde fiscal de todas as empresas do usuário: certificado, certidões, manifestação e captura. Só para administradores.
- Status por empresa: "Em dia", "Atenção", "Pendência".
- Bloco **"Atenção necessária"** com cards por assunto (certificados, regularidade, NF-e recebidas, captura de notas).
- Filtro "Captura com falha".
- Botão "Atualizar visão" recarrega os dados.
- Clicar em uma empresa troca para ela (mesmo efeito do seletor de empresa no topo).

---

## NF-e Recebidas (Documentos › "NF-e Recebidas")
Notas de produto emitidas por fornecedores contra o CNPJ da empresa.

### Situação da nota
"Autorizada", "Cancelada", "Denegada". Para consultar na SEFAZ, use **"Consultar situação"** na coluna de situação (abre a janela "Status Nfe").

### Como manifestar uma nota
1. Na linha da nota, abra o menu de ações › **"Manifestar"**.
2. Escolha: **"Ciente"** (Ciência da Operação), **"Confirmar"** (Confirmação), **"Desconhecer"** (Desconhecimento) ou **"Não realizada"** (Operação não realizada).
3. Confirme em "Sim, manifestar".

Também dá para manifestar várias notas de uma vez selecionando-as. No lote, a nota que falhar é pulada e as outras seguem.

Regras:
- A manifestação **não pode ser desfeita**.
- A Ciência não pode ser repetida. Depois de uma manifestação conclusiva (Confirmar, Desconhecer, Não realizada), nada mais pode ser feito na nota.
- Entre uma manifestação e outra na mesma nota é preciso esperar 1 hora.
- Só notas autorizadas podem ser manifestadas.
- Prazos da SEFAZ, contados da emissão: Ciência em até 10 dias; manifestação conclusiva em até 90 dias. O Apollo avisa quando faltam 15 dias. Quem recusa fora do prazo é a SEFAZ.

### Ciência automática
O Apollo dá Ciência sozinho nas notas novas (até 9 dias da emissão), a cada 2 horas. Para desligar, em Configuração › Empresas › (empresa) › "Manifestação da NF-e", escolha "Manual".

### XML e DANFE
- Selecione as notas e use **"Baixar"** › "Baixar XML das selecionadas" ou "Baixar PDF das selecionadas".
- "Ver DANFE" no menu da linha.
- Só existe XML completo e DANFE depois que a nota recebe a Ciência (antes disso a SEFAZ só envia o resumo).

### Outros recursos
- **"Consultar por chave"**: busca uma nota pela chave de 44 dígitos.
- Filtros por etapa da manifestação: "Sem Ciência · no prazo", "Sem Ciência · após o prazo", "Aguardando manifestação conclusiva", "Manifestação conclusiva próxima do prazo", "Manifestação conclusiva com prazo vencido", "Manifestação conclusiva registrada".
- "Tag" (etiquetas nas notas), "Histórico" (histórico de manifestação), "Enviar por e-mail", "Exportar".
- Ícone de risco do fornecedor quando o CNPJ estava irregular na emissão.

---

## NF-e Emitidas (Documentos › "NF-e Emitidas")
Notas de produto emitidas pela própria empresa. O Apollo **não emite NF-e**; esta tela guarda e organiza as notas.
- **"Importar XML"**: envie XML, ZIP ou cole as chaves (uma por linha). Há uma pré-visualização antes de importar ("Nova", "Já existe", "Outra empresa").
- Captura automática quando a empresa está configurada como destinatária do XML (autXML) e, para empresas do Ceará, pelo SIGA-CE.
- "Obter XML completo (SERPRO)": quando o XML original não está disponível, o Apollo pode gerar um XML a partir dos dados oficiais. Esse XML aparece como **"Gerado (SERPRO)"** e não tem assinatura digital.
- "Enviar por e-mail".

---

## CT-e (Documentos › "CT-e")
Conhecimentos de transporte em que a empresa aparece (remetente, destinatário, tomador etc.). Filtro pelo papel da empresa.
- Ação disponível: **"Baixar XML"**. O Apollo não gera DACTE.

---

## NFS-e Recebidas e Emitidas
- **"NFS-e Recebidas"**: notas de serviço tomadas pela empresa (empresa é a tomadora). Ações: "Baixar XML", "Gerar PDF (DANFSe Apollo)", exportar PDF/XLS.
- **"NFS-e Emitidas"**: notas de serviço prestadas pela empresa, vindas do Ambiente Nacional.
- Só funciona para municípios que aderiram à NFS-e Padrão Nacional, e a captura de NFS-e precisa estar marcada no card "Captura de documentos" da empresa.

## Emissão NFS-e (Documentos › "Emissão NFS-e")
Emitir, cancelar e substituir NFS-e pelo Padrão Nacional e baixar o DANFSe.
1. "Emitir NFS-e": escolha o serviço cadastrado (Cadastros › Serviços), o tomador, o valor e a competência. A alíquota de ISS vem do serviço se ficar em branco.
2. Cancelar: informe o motivo do cancelamento.
3. Substituir: informe o motivo da substituição (mínimo de 15 caracteres).
Filtros: "Todas", "Autorizadas", "Canceladas", "Substituídas".

---

## Fechamento mensal (Monitoramento › "Fechamento mensal")
Conferência e fechamento de cada mês (competência) por empresa. Escolha o tipo no seletor **"NF-e de entrada | CT-e"**. Disponível a partir da competência novembro/2026.

Checklist por empresa: Captura, Resumo (NF-e) ou Processamento (CT-e), Eventos, EFD e Certificado.

Status: "Pronta para fechar", "Com pendências", "Fechada", "Mês em andamento", "Aguardando prazo de cancelamento" (CT-e: só fecha 7 dias depois do fim do mês), "Não monitorada" (sem certificado ou captura desligada), "Sem dados".

Como fechar:
1. Escolha o mês com "Mês anterior"/"Próximo mês".
2. Abra a empresa e clique em **"Fechar mês"**. Se houver item pendente, a justificativa é obrigatória.
3. Para fechar várias de uma vez: **"Fechar prontas"** (fecha só as que estão "Pronta para fechar").
4. Para desfazer: **"Reabrir mês"**, com motivo obrigatório. O fechamento anterior continua no histórico.

No detalhe da NF-e, as notas sem Ciência podem receber **"Dar ciência"**, mas só na empresa em que você está logado ("Para dar ciência daqui, entre nesta empresa pelo seletor de empresas").

Nota fora de hora: se chegar uma nota de um mês já fechado, o Apollo avisa no sino de notificações.

---

## Certificados (Monitoramento › "Certificados")
Vencimento do certificado de cada empresa ("Válidos", "Vencendo", "Vencidos", "Sem certificado") e troca do certificado.
- Só certificado **A1 (.pfx)**. O CNPJ do certificado precisa ser da empresa.
- Na tela de gerenciar certificado: certificado principal, backups (promover backup a principal), permissões de quem pode ver/gerenciar, ver a senha (pede sua senha de novo) e "Auditoria" (quem viu, baixou ou trocou).
- Avisos por e-mail perto do vencimento.

## Regularidade (Monitoramento › "Regularidade")
Certidões da empresa: CND Federal, FGTS, CND Trabalhista e, só para empresas do Ceará, as estaduais.
- Contadores: "Regulares", "Com pendência", "Sem resultado (falha na consulta)", "Não consultadas".
- **"Consultar todas agora"** consulta todas as certidões da empresa. A consulta é **só manual** (não renova sozinha) porque cada consulta tem custo.
- Não há certidão municipal.

## Fornecedores (Monitoramento › "Fornecedores")
Situação cadastral dos emitentes das NF-e recebidas (ativa, inapta etc.), atualizada todo dia de madrugada. Indica "Irregular na emissão" / "Irregular após a emissão". Dá para cadastrar o emitente como fornecedor em Cadastros.
- Ação **"Consultar CNPJ"** no topo da tela. Quem só tem permissão de consulta vê um item próprio "Consulta CNPJ" no menu.

### Consulta CNPJ
Preencha "CPF / CNPJ" e clique em **"Buscar"**. Abas: "Receita Federal", "SEFAZ" (inscrição estadual, no estado do CNPJ consultado) e "Simples Nacional".

---

## Análises
- **"NF-e × EFD"**: compara as NF-e recebidas com o EFD importado e mostra notas não declaradas ou divergentes. Permite registrar a verificação SITRAM. A importação do EFD ainda não tem tela: é feita pela equipe Coffee.
- **"Estimativas"**: projeção de ICMS, DIFAL e ISS do mês. Botão "Calcular estimativa" / "Recalcular estimativa". É uma estimativa, não apuração (não calcula o ICMS de débito).
- **"Relatórios"**: relatório mensal e relatórios de NF-e, NFS-e e CT-e com "Visualizar PDF".

---

## Quem pode
O acesso é dado pelo administrador da sua empresa em Configuração › Usuários. Ver uma tela não dá direito às ações; cada ação tem permissão própria:
- Ver NF-e Recebidas: NFE · NF-e Emitidas: INBOUND_NFE · CT-e: CTE · NFS-e: NFSE
- Manifestar: DFE_MANIFEST
- Sincronizar manualmente: DFE_SYNC
- Emitir/cancelar/substituir NFS-e: NFSE_EMIT
- Fechar mês: MONTHLY_CLOSING · Reabrir mês: MONTHLY_CLOSING_REOPEN
- Certidões: CERTIDAO · Certificados: ADMIN_CERTIFICATE · Consulta CNPJ: COMPANY_STATUS_QUERY
- Visão Geral: administradores da empresa (ADMIN_DFE e afins)

Sem a permissão, o botão simplesmente não aparece.

---

## Perguntas frequentes

**Por que não vejo o botão "Manifestar"?**
Falta a permissão de manifestar (DFE_MANIFEST). Peça ao administrador da sua empresa.

**Onde clico para sincronizar as notas?**
Não precisa: a captura é automática, a cada hora mais ou menos. Se as notas não estão chegando, veja a saúde da captura em Configuração › Empresas ou na Visão Geral.

**Por que a nota não tem XML nem DANFE?**
A SEFAZ só libera o XML completo depois da Ciência. Dê "Ciente" (ou aguarde a Ciência automática) e espere a próxima captura.

**Posso desfazer uma manifestação?**
Não. A manifestação é definitiva na SEFAZ.

**Recebi "Desconhecer" por engano, e agora?**
Não dá para reverter no Apollo nem na SEFAZ. Fale com o fornecedor/contador.

**Onde estão as NFS-e que minha empresa contratou?**
Em "NFS-e Recebidas". "NFS-e Emitidas" são as que a sua empresa prestou.

**Por que a NFS-e não aparece?**
O município precisa estar no Padrão Nacional e a captura de NFS-e precisa estar marcada no card "Captura de documentos" da empresa.

**O Apollo emite NF-e de produto?**
Não. Só NFS-e (Emissão NFS-e). As NF-e emitidas são importadas ou capturadas.

**Como renovo as certidões?**
Em "Regularidade", clique em "Consultar todas agora". Não há renovação automática.

**Posso usar certificado A3?**
Não. Só A1 (.pfx).

**Onde vejo o espelho da nota / a pré-nota?**
O espelho da nota é um PDF do módulo Orçamentos. A pré-nota é do Protheus e aparece na aprovação de pedidos (menu Fiscal), não na Gestão Fiscal.

---

## Problemas comuns
- **"A sincronização só poderá ser realizada após 1 hora"**: a sincronização manual tem intervalo mínimo de 1 hora. Aguarde.
- **Captura com chip vermelho / "Captura parada"**: verifique se o certificado está válido em "Certificados". Se estiver, aguarde o próximo ciclo; se continuar mais de um dia, abra chamado no suporte.
- **Manifestação recusada pela SEFAZ**: geralmente prazo vencido (Ciência após 10 dias, conclusiva após 90 dias) ou nota cancelada.
- **"Cancelamento rejeitado pela SEFIN"** (NFS-e): o município/ambiente nacional recusou o cancelamento, normalmente por prazo. Use "Substituir" ou procure o município.
- **"Sem resultado (falha na consulta)"** em certidões: o órgão não respondeu. Tente "Consultar todas agora" mais tarde.
- **Fechamento com "Não monitorada"**: a empresa não tem certificado ou está com a captura desligada. Configure em Configuração › Empresas.
