# DFe (Documentos Fiscais Eletrônicos) - Apollo

## Visão Geral
O módulo **DFe** do Apollo gerencia a recepção, consulta e manifestação de **NF-e (Nota Fiscal Eletrônica)** e **NFS-e (Nota Fiscal de Serviço Eletrônica)**. A empresa recebe notas fiscais eletrônicas emitidas por seus fornecedores diretamente da SEFAZ, sem depender de e-mail ou papel.

---

## NF-e — Nota Fiscal de Produtos

### 1. Sincronização Automática (Distribuição DFe por NSU)

**Como funciona:**
- Apollo consulta a SEFAZ automaticamente via NSU (Número Sequencial Único) a cada ciclo
- A SEFAZ retorna documentos novos em fila (tipo: resumo `resNFe` ou completo `procNFe`)
- Notas novas são salvas automaticamente no banco

**Tipos de documento retornados:**
| Schema | Tipo | Conteúdo |
|--------|------|----------|
| `resNFe_v1.01.xsd` | Resumo | Dados básicos + chave + situação |
| `procNFe_v4.00.xsd` | Completo | XML integral da NF-e |
| `procEventoNFe_v1.00.xsd` | Evento | Cancelamento, CCe, Desconhecimento |

⚠️ **IMPORTANTE:** A sincronização só pode ser feita 1x por hora por empresa. Tentar antes retorna erro de cooldown.

---

### 2. Consulta de Nota por Chave (Busca Manual)

**Quando usar:** quando a nota não apareceu na sincronização normal.

**Como funciona:**
1. Usuário informa a chave de acesso da NF-e (44 dígitos)
2. Apollo consulta a SEFAZ via `ConsultaDFeEnum.CHAVE`
3. Se a SEFAZ retornar XML completo (`procNFe`), nota é salva com todos os dados
4. Se retornar apenas resumo (`resNFe`), nota é salva com dados básicos e **status derivado do `cSitNFe`**:
   - `cSitNFe = 1` → status `100` (Autorizada)
   - `cSitNFe = 2` → status `110` (Denegada)
   - `cSitNFe = 3` → status `101` (Cancelada)

---

### 3. Status da NF-e

| Código | Significado | Pode Manifestar? |
|--------|-------------|-----------------|
| `100` | Autorizada | ✅ Sim |
| `101` | Cancelada | ❌ Não |
| `102` | Inutilizada | ❌ Não |
| `110` | Denegada | ❌ Não |
| `null` | Não consultado ainda | ❌ Não (aguardar consulta) |

O status é atualizado automaticamente pelo scheduler `CheckStatus` (a cada ~100 min) via consulta individual à SEFAZ.

---

### 4. Manifestação do Destinatário

**O que é:** o destinatário (empresa que recebe a nota) deve se manifestar perante a SEFAZ informando sua posição em relação à nota.

**Tipos de manifestação:**

| Tipo | Quando usar |
|------|-------------|
| `CIENCIA_DA_OPERACAO` | Tomou conhecimento da nota (não confirma entrega) |
| `CONFIRMACAO_DA_OPERACAO` | Confirma que recebeu as mercadorias/serviços |
| `DESCONHECIMENTO_DA_OPERACAO` | Não reconhece a operação |
| `OPERACAO_NAO_REALIZADA` | Reconhece a nota mas a operação não ocorreu |

**Regras para manifestar:**
- ✅ A nota precisa ter **status `100`** (autorizada)
- ✅ Prazo SEFAZ: até 90 dias após a emissão (prazo legal; verificar para `CIENCIA`)
- ❌ Nota com manifestação finalística já registrada não pode ser manifestada novamente com o mesmo tipo finalístico
- ❌ Manifestação de Ciência já registrada não pode ser repetida
- ⏱️ Cooldown de 1 hora entre manifestações da mesma nota

**Manifestações finalísticas** (impedem nova manifestação do mesmo tipo):
- `CONFIRMACAO_DA_OPERACAO`
- `DESCONHECIMENTO_DA_OPERACAO`
- `OPERACAO_NAO_REALIZADA`

**Após a manifestação:**
- Apollo baixa automaticamente o XML completo da nota da SEFAZ
- Se o download falhar, a manifestação permanece registrada e o XML é baixado posteriormente

---

### 5. Manifestação em Lote

Permite manifestar múltiplas notas de uma vez. O sistema processa cada nota individualmente e retorna:
- ✅ **Successes:** notas manifestadas com sucesso
- ❌ **Failures:** notas que falharam (com motivo)
- ⏭️ **Skipped:** notas ignoradas (motivo: já manifestada, cooldown, status inválido)

---

### 6. Consulta de Situação Individual

**Quando usar:** verificar o status atual de uma nota diretamente na SEFAZ.

**Como funciona:**
1. Apollo consulta `Nfe.consultaXml` na SEFAZ para a chave informada
2. Retorna o `cStat` atual (100, 101, 110, etc.)
3. Atualiza o `status` da nota no banco

⚠️ Cooldown de 1 hora por nota para evitar sobrecarga na SEFAZ.

---

### 7. Download Manual do XML

Se o XML ainda estiver como resumo (`resNFe`), é possível baixar o XML completo manualmente:

`PUT /purchase-invoice/key/{key}/download-xml`

⚠️ Cooldown de 1 hora. Se a nota ainda não estiver autorizada na SEFAZ, o download não retorna XML.

---

### 8. DANFE (PDF da NF-e)

O Apollo gera o PDF do DANFE para notas com **XML completo (`procNFe`)**. Notas ainda com resumo não geram DANFE.

`GET /purchase-invoice/{id}/danfe`

---

## NFS-e — Nota Fiscal de Serviço

### Sincronização

A NFS-e é sincronizada via distribuição DFe específica de serviços. O fluxo é acionado manualmente ou automaticamente:

`POST /service-invoice/sync/{companyId}`

### Consulta e Filtros

A listagem de NFS-e suporta filtros por período, emitente, valor, etc.

### XML e PDF

- XML disponível por ID: `GET /service-invoice/{id}/xml`
- PDF disponível por ID: `GET /service-invoice/{id}/pdf`
- Download em ZIP de múltiplos XMLs: `POST /service-invoice/xml/zipper`

---

## Fluxograma NF-e

```
[SEFAZ] Emite NF-e (fornecedor emissor)
    ↓
[Apollo] Sincroniza via NSU (automático)
    ├─→ resNFe (resumo) → status derivado de cSitNFe
    └─→ procNFe (completo) → status consultado pelo scheduler
    ↓
[Apollo] CheckStatus (a cada ~100 min) consulta SEFAZ
    → Atualiza status (100=autorizada, 101=cancelada...)
    ↓
[Usuário] Manifesta nota (status 100 obrigatório)
    ↓
    ├─→ CIÊNCIA → SEFAZ registra ciência
    ├─→ CONFIRMAÇÃO → SEFAZ registra confirmação
    ├─→ DESCONHECIMENTO → SEFAZ registra desconhecimento
    └─→ NÃO REALIZADA → SEFAZ registra operação não realizada
    ↓
[Apollo] Baixa XML completo automaticamente
    ↓
✅ Nota disponível com XML + DANFE
```

---

## Regras de Negócio Importantes

### 1. Status para Manifestar
- ✅ Somente notas com `status = '100'` podem ser manifestadas
- ❌ `status = null`, `101`, `102`, `110` bloqueiam a manifestação

### 2. Resumo vs. Completo
- ✅ Resumo (`resNFe`) permite manifestar se `cSitNFe = 1` (status será `100`)
- ❌ DANFE só é gerado para notas com XML completo (`procNFe`)

### 3. Sincronização
- ✅ Máximo 1x por hora por empresa
- ✅ Sistema automático via scheduler
- ❌ Consumo indevido na SEFAZ bloqueia por 2 horas

### 4. Manifestações Finalísticas
- ✅ Uma vez registrada confirmação/desconhecimento/não realizada, não pode ser refeita
- ✅ Ciência pode ser registrada apenas uma vez por nota

---

## Perguntas Frequentes

### Como sincronizo as notas fiscais?
Acesse o módulo DFe e clique em "Sincronizar". O sistema buscará automaticamente todas as novas NF-e da sua empresa junto à SEFAZ.

### Por que não consigo manifestar uma nota?
Verifique o status da nota. Somente notas autorizadas (status 100) podem ser manifestadas. Se a nota está como "Resumido/Processando", aguarde o sistema consultar o status na SEFAZ (pode levar até ~100 minutos) ou consulte manualmente em "Verificar Situação".

### Qual é a diferença entre os tipos de manifestação?
- **Ciência:** apenas informa que você tomou conhecimento da nota
- **Confirmação:** confirma que recebeu as mercadorias/serviços
- **Desconhecimento:** você não reconhece essa operação
- **Operação não realizada:** você reconhece a nota mas a entrega não aconteceu

### O que é DANFE?
É o Documento Auxiliar da Nota Fiscal Eletrônica — o PDF imprimível da NF-e. Disponível apenas para notas com XML completo.

### A nota foi manifestada mas o XML ainda está incompleto. O que fazer?
Tente o download manual em "Baixar XML". Se não funcionar, aguarde o próximo ciclo do sistema ou entre em contato com o suporte.

### Não encontrei a nota na lista. Como buscar por chave?
Acesse "Buscar nota por chave", informe a chave de acesso (44 dígitos) e o sistema consultará diretamente na SEFAZ.

---

## Consulta de CNPJ

**Localização no Apollo:** Menu DFe → Consulta CNPJ (rota `/dfe/consulta-cnpj`)

### Como usar
1. Digite o CNPJ da empresa (com ou sem formatação)
2. Clique em **"Consultar CNPJ"**
3. O Apollo consulta as fontes disponíveis e exibe os dados da empresa

### Abas disponíveis

#### Aba 1 — Receita Federal
Consulta os dados cadastrais oficiais da Receita Federal (via BrasilAPI). Retorna:
- Razão Social e Nome Fantasia
- **Situação cadastral** (Ativa, Baixada, Inapta, Suspensa) — exibida em destaque colorido
- Tipo: Micro Empresa, EPP, etc.
- Capital Social
- Natureza jurídica (ex.: Sociedade Empresária Limitada)
- Porte Social
- Data de abertura
- CNAE principal e secundários
- Endereço completo (logradouro, número, bairro, cidade, UF, CEP)
- **QSA — Quadro de Sócios e Administradores**

#### Aba 2 — SEFAZ CE
Consulta a situação cadastral do CNPJ perante a **SEFAZ do Ceará**. Útil para verificar se o emitente de uma nota está regularizado no estado.

#### Aba 3 — Simples Nacional
Consulta se o CNPJ é optante do **Simples Nacional** e o regime tributário atual.

---

### Quando usar
- Verificar dados de um fornecedor antes de cadastrá-lo
- Confirmar situação cadastral (Receita Federal e SEFAZ CE) de um emitente de notas
- Verificar se o fornecedor é optante do Simples Nacional
- Validar endereço e razão social antes de emitir documentos

⚠️ **IMPORTANTE:** Os dados da aba Receita Federal vêm da BrasilAPI (base federal). Pode haver pequena defasagem em relação ao momento atual.

---

---

## Resumo DFe (`/dfe/resumo-dfe`)

Painel de **saúde fiscal consolidada por empresa**. Exibe o status geral de cada empresa cadastrada em relação ao cumprimento fiscal de DFe.

### Status possíveis

| Status | Significado |
|--------|-------------|
| `EM_DIA` | Empresa sem pendências fiscais |
| `ATENCAO` | Empresa com itens que merecem atenção |
| `PENDENCIA` | Empresa com pendências fiscais abertas |

### Visualização
- Cards ou tabela (preferência salva no navegador)
- Filtro por status: Todas / Pendência / Atenção / Em dia
- Contador por categoria no topo da página

---

## Análise NF-e (`/dfe/analise-nfe`)

Visão analítica mensal das NF-e recebidas, cruzando o que a SEFAZ registrou com o que foi declarado no EFD e registrado no SITAM.

### Filtros
- Empresa (seletor)
- Ano (últimos 3 anos disponíveis)

### Abas
- **NF-e por Município:** notas agrupadas por município de emissão
- **NF-e Geral:** visão consolidada anual, linha por mês

### Colunas da tabela mensal

| Coluna | Descrição |
|--------|-----------|
| Mês | Nome do mês |
| Status | `regular` ou `atencao` |
| Autorizadas | Qtd e valor total das NF-e autorizadas |
| Não Declaradas | NF-e não lançadas no EFD (declaredInEfd=false) |
| Declaradas c/ Diferença | NF-e declaradas com valor divergente do EFD |
| Não Registradas | NF-e não registradas no SITAM (registeredInSitam=false) |

### Regras
- Cada coluna exibe quantidade, valor e percentual em relação às autorizadas
- Mês sem notas aparece sem status (`null`)
- Linha com qualquer pendência recebe status `atencao`

---

## NF-e Saída (`/dfe/nfe-saida`)

Listagem das **NF-e emitidas** pela empresa (notas de saída). Diferente das NF-e de entrada (recebidas de fornecedores), aqui estão as notas emitidas pela própria empresa.

### Colunas principais
- Número, Série, CFOP (badge colorido por família), Emissão, Destinatário, CNPJ, Valor, Situação, Eventos (CC-e, Cancelada)

### CFOP — código de operação
Exibido como badge colorido. Primeiro dígito indica tipo de operação (5=saída estadual, 6=saída interestadual, etc.).

### Status / Situação

| Status | Exibição |
|--------|----------|
| `100` | Autorizada |
| `101` | Cancelada |
| `102` | Inutilizada |
| outro | Processando |

### Ações por nota
- **Ver DANFE** — abre o PDF da nota
- **Baixar XML** — download do XML da nota

### Funcionalidades adicionais
- **Consultar por chave:** busca manual de NF-e de saída pela chave de acesso de 44 dígitos
- **Importar XML:** importação manual de NF-e (upload de arquivo XML)
- Filtro por empresa, CFOP, período de emissão, faixa de valor

---

## NFS-e Emissão (`/dfe/nfse-emissao`)

Gestão das **NFS-e emitidas** pela empresa (notas de serviço de saída). Permite emitir, cancelar e substituir notas fiscais de serviço.

### Status (Situação)

| Situação | Exibição |
|----------|----------|
| `NORMAL` | Autorizada |
| `CANCELADA` | Cancelada |
| `SUBSTITUIDA` | Substituída |

### Abas de filtro
- Todas / Autorizadas / Canceladas / Substituídas

### Colunas
- Nº, Emissão, Competência, Tomador, Doc. (CPF/CNPJ do tomador), Valor, Situação

### Ações por nota
| Ação | Condição |
|------|----------|
| **Cancelar** | Apenas notas com situação `NORMAL` |
| **Substituir** | Apenas notas com situação `NORMAL` |
| **PDF (DANFSE)** | Sempre disponível |

### Emitir nova NFS-e
Clique em **"+ Emitir NFS-e"** e preencha o formulário com dados do serviço e do tomador.

---

## NFS-e Saída (`/dfe/nfse-saida`)

Listagem das **NFS-e recebidas** onde a empresa figura como tomadora de serviços (perspectiva de entrada para NFS-e). Complementar à NFS-e Emissão.

### Status possíveis
| Status | Descrição |
|--------|-----------|
| `100` | Autorizada |
| `101` | Cancelada |
| `102` | Substituída |
| `103` | Rejeitada |
| `0` | Recebida |
| `107` | Processando |

### Ações
- Visualizar XML, baixar PDF, filtrar por período, valor, município e situação

---

## CT-e (`/dfe/cte`)

Gestão dos **CT-e (Conhecimentos de Transporte Eletrônico)** recebidos pela empresa.

### Modais de transporte
- `AEREO` — Aéreo
- `RODOVIARIO` — Rodoviário
- `FERROVIARIO` — Ferroviário
- `AQUAVIARIO` — Aquaviário
- `DUTOVIARIO` — Dutoviário

### Status / Situação
| Status | Exibição |
|--------|----------|
| `100` | Autorizado |
| `101` | Cancelado |
| `110` | Denegado |

### Colunas principais
- Chave, Emitente, CNPJ, Modal, Valor, Emissão, Situação

### Ações por CT-e
- **Ver DACTE** — PDF do Documento Auxiliar do CT-e
- **Baixar XML** — download do XML do CT-e

### Filtros disponíveis
- Empresa, período de emissão, modal (tipo de transporte), UF, situação, faixa de valor

---

## Estimativa Tributária (`/dfe/estimativa-tributaria`)

Projeção de **ICMS e ISS** estimados com base nas notas do período selecionado. Útil para planejamento tributário.

⚠️ **Importante:** é uma estimativa de planejamento, não substitui a apuração oficial do SPED/EFD.

### Filtros
- Mês e Ano (seletor)

### Como usar
1. Selecione o mês e o ano desejado
2. Clique em **"Calcular"**
3. O sistema processa as notas do período e exibe a projeção

### Dados exibidos
- Regime tributário (Simples Nacional / Lucro Real / Lucro Presumido)
- Data do cálculo
- Estimativa de ICMS a recolher
- Estimativa de ISS a recolher
- Base de cálculo e alíquotas aplicadas

---

## Certidões (`/dfe/certidoes`)

Monitoramento de **regularidade fiscal** via certidões negativas automáticas.

### Tipos de certidão monitorados
| Tipo | Descrição |
|------|-----------|
| `CND_FEDERAL` | Certidão Negativa de Débitos — Receita Federal |
| `FGTS` | Regularidade do FGTS |
| `ESTADUAL_CE` | Certidão estadual — SEFAZ Ceará |
| `DEBITOS_ESTADUAIS` | Débitos estaduais |
| `CND_TRABALHISTA` | Certidão Negativa de Débitos Trabalhistas |

### Status das certidões
| Status | Significado |
|--------|-------------|
| `NEGATIVA` | Regular — sem débitos |
| `POSITIVA_COM_EFEITO_NEGATIVA` | Possui débitos mas com efeito de negativa |
| `COM_PENDENCIA` / `POSITIVA` | Com pendências |
| `ERRO_CONSULTA` | Falha na consulta automática |

### Painel de resumo
- Contador de certidões regulares, vencendo em 30 dias, e vencidas

### Ações
- **Atualizar todas:** consulta todas as certidões de uma vez
- Cada card exibe a validade e alerta quando restam ≤ 30 dias para vencer

---

## Certificado Digital (`/dfe/certificado-digital`)

Monitoramento do **vencimento dos certificados digitais A1/A3** por empresa.

### Painel de resumo
- Total de empresas com certificado
- Empresas com certificado vencendo em até 30 dias (alerta laranja)
- Empresas com certificado vencido (alerta vermelho)

### Filtros
- Todos / Vencendo / Vencidos

### Ações
- Visualizar detalhes do certificado por empresa
- Renovar/atualizar certificado

---

## Relatórios NF-e (`/dfe/relatorios-nfe`)

Relatórios específicos do módulo DFe, focados em documentos fiscais eletrônicos.

### Relatórios disponíveis

| Relatório | Descrição |
|-----------|-----------|
| **Relatório Mensal** | Visão consolidada: manifestações, compliance fiscal e principais fornecedores |
| **Nota Fiscal de Entrada** | NF-e de entrada por tipo, status, faixa de valor e período |
| **NF-e de Saída** | NF-e emitidas no período |
| **NFS-e** | Notas fiscais de serviço emitidas no período |
| **CT-e** | Conhecimentos de transporte do período, com filtro por papel no CT-e |

> Veja também `/relatorios` para relatórios de outros módulos (financeiro, pedidos, caixinha, orçamentos, etc.)

---

## Situação dos Emitentes (`/dfe/issuer-situation`)

Visão consolidada da **situação cadastral dos emitentes** das NF-e recebidas. Permite identificar fornecedores com situação irregular perante a Receita Federal.

### Situações cadastrais

| Situação | Risco |
|----------|-------|
| `ATIVA` | Regular |
| `INAPTA` | Risco Alto |
| `SUSPENSA` | Risco Alto |
| `BAIXADA` | Risco Alto |
| `NULA` | Risco Alto |

### Funcionalidades
- Ordenação por nome, CNPJ ou situação
- Badge de risco (Regular / Risco Alto) por emitente
- **Importar como fornecedor:** cria um novo fornecedor no cadastro diretamente a partir do emitente
- **Abrir no cadastro:** navega para o fornecedor já cadastrado
- Busca por CNPJ ou nome do emitente

### Quando usar
- Auditar fornecedores com situação irregular antes de pagar notas
- Identificar emitentes que ainda não estão no cadastro de fornecedores

---

## Glossário

- **NF-e:** Nota Fiscal Eletrônica (produtos/mercadorias)
- **NFS-e:** Nota Fiscal de Serviço Eletrônica
- **CT-e:** Conhecimento de Transporte Eletrônico
- **DFe:** Documento Fiscal Eletrônico (termo genérico)
- **NSU:** Número Sequencial Único — controla quais documentos já foram baixados da SEFAZ
- **SEFAZ:** Secretaria da Fazenda — servidor fiscal que armazena os documentos
- **resNFe:** Resumo da NF-e — dados básicos sem o XML completo
- **procNFe:** Processo da NF-e — XML integral da nota
- **cStat:** Código de status retornado pela SEFAZ (100=autorizada, 101=cancelada, 110=denegada)
- **cSitNFe:** Situação da NF-e no resumo (1=autorizada, 2=denegada, 3=cancelada)
- **Manifestação:** declaração do destinatário sobre a nota à SEFAZ
- **DANFE:** Documento Auxiliar da NF-e (PDF)
- **DACTE:** Documento Auxiliar do CT-e (PDF)
- **DANFSE:** Documento Auxiliar da NFS-e (PDF)
- **Distribuição DFe:** serviço da SEFAZ para entrega de documentos ao destinatário
- **EFD:** Escrituração Fiscal Digital — obrigação acessória do SPED
- **SITAM:** Sistema de controle tributário estadual (CE)
- **CND:** Certidão Negativa de Débitos
- **Certidão:** documento emitido por órgão público atestando regularidade fiscal

---

**Última atualização:** Junho 2026
**Versão do documento:** 1.1
