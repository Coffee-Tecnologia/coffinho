# Cadastros — Apollo
Atualizado em 03/11/2026

Menu **Cadastros**: os registros base usados pelos outros módulos (Orçamentos, Documentos, Caixinha).

Itens do menu:
- **Clientes**
- **Fornecedores**
- **Produtos** › "Produtos", "Categorias de Produto", "Unidades de Medida"
- **Categorias de Serviço**
- **Serviços**
- **Contextos**

As telas têm busca, filtros (abas Todos / Ativo / Inativo na maioria), "Exportar" (PDF ou XLS) e o menu de linha com "Editar" e "Excluir"/"Deletar".

## Clientes
Cadastros › Clientes › "Criar cliente".
- Campos: "Tipo *" (Pessoa Física/Jurídica), "CPF/CNPJ", "Loja *", "Código", "Inscrição Estadual", "E-mail", "Telefone / WhatsApp", "Contato" e o endereço (CEP, Logradouro, Número, Bairro, Cidade/UF).
- Ao digitar o CNPJ, o Apollo consulta os dados da empresa e preenche o formulário automaticamente.
- O cliente é obrigatório nos Orçamentos e nos documentos "A receber" (nuvem).

## Fornecedores
Cadastros › Fornecedores › "Criar fornecedor". Os campos são parecidos com os de Clientes ("Tipo *", "CPF/CNPJ", "Loja *", "Código", "E-mail").
- Em empresa com Protheus, a lista também mostra os fornecedores do Protheus.
- Situação cadastral e risco dos fornecedores ficam em outro lugar: Gestão Fiscal › Monitoramento › Fornecedores (ver doc de Gestão Fiscal).

## Produtos
Cadastros › Produtos › Produtos › "Criar Produto".
- Campos: "Código*" (sugerido automaticamente), "Descrição*", "Preço*", "Categoria" e "Unidade de Medida*".
- Dados fiscais opcionais: NCM, CFOP, CST, ICMS (%), PIS, COFINS e ST.
- **Unidade de medida é obrigatória.** Se a unidade desejada não aparecer na lista, ela está inativa: ative em Unidades de Medida.

## Unidades de Medida
Cadastros › Produtos › Unidades de Medida.
- É um catálogo padrão do mercado (Nome, Abreviação, Tipo). O usuário só **ativa ou desativa** unidades; não há botão para criar.
- Unidade nova só pela equipe Coffee, via suporte.

## Categorias (de Produto e de Serviço)
Cadastros › Produtos › Categorias de Produto ou Cadastros › Categorias de Serviço › "Criar Categoria". Campos: "Nome*" e "Descrição". A categoria é opcional, mas ajuda na busca.

## Serviços
Cadastros › Serviços › "Criar Serviço". O formulário é dividido em seções (Geral, Comercial, Fiscal, Planejamento e Materiais):
- **Geral / Comercial:** "Código do Serviço*", "Descrição Comercial*", "Família / Categoria", "Unidade de Medida", "Preço Base de Venda".
- **Fiscal** (usado na NFS-e): "Item LC 116", "NBS", "CNAE vinculado", "Alíquota ISS (%)".
- **Planejamento e Materiais:** "Tempo estimado de execução (h)", "Tipo de mão de obra" e a lista de materiais ("Adicionar Material": produto + quantidade).
- Materiais no orçamento: ao adicionar o serviço, o Apollo pergunta se quer incluir os materiais vinculados. Se o usuário aceitar, eles entram como **itens separados** (quantidade do material × quantidade do serviço). O custo não é somado ao preço do serviço.

## Contextos
Cadastros › Contextos › "Criar Contexto".
- Contextos são **obras ou projetos** usados para separar documentos.
- Campos: "Nome*", "CNO" (cadastro de obra) e "Observação". Podem ser ativados e inativados.
- O campo "Contexto" aparece nos documentos quando o parâmetro "Usar Contexto" está ligado (Configuração › Sistema › Parâmetros do Sistema).

## Quem pode
- Clientes: CLIENT. Fornecedores: PROVIDER ou LITTLE_BOX. Produtos, Serviços, Categorias e Unidades: PRODUCT. Contextos: ENTITY.
- Os administradores da empresa (ADMIN_BASIC) acessam tudo.
- Sem o item no menu, peça acesso ao administrador da sua empresa.

## Perguntas frequentes
- **Como cadastro um fornecedor?** Cadastros › Fornecedores › "Criar fornecedor", preencha e salve.
- **Como coloco materiais num serviço?** Edite o serviço › aba "Planejamento e Materiais" › "Adicionar Material".
- **Excluí um cadastro que estava em uso; os documentos antigos somem?** Não. A exclusão só tira o cadastro das listas, e os documentos antigos continuam com os dados. Se pode voltar a usar, prefira inativar.
- **Posso criar uma unidade de medida?** Não. Ative uma do catálogo ou peça ao suporte.
- **Para que serve Contexto?** Para separar documentos por obra ou projeto.

## Problemas comuns
- "Não foi possível salvar o cliente. Tente novamente." / "Não foi possível salvar o fornecedor. Tente novamente.": confira os campos obrigatórios (Tipo, CPF/CNPJ, Loja) e se o documento já não está cadastrado.
- A unidade de medida não aparece no produto: ela está inativa em Unidades de Medida.
- "Erro ao gerar relatório!" ao exportar: tente de novo com menos filtros. Se persistir, acione o suporte.
