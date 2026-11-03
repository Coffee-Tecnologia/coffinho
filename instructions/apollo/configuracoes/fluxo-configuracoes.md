# Configuração, conta e telas gerais — Apollo
Atualizado em 03/11/2026

O menu **Configuração** (só para administradores da empresa) tem: Usuários, Setores, Noticias, Empresas e Sistema (Parâmetros do Sistema, Integração Protheus). No fim desta doc estão as telas que todo usuário vê.

## Usuários
Configuração › Usuários: "Quem acessa o Apollo, com qual perfil e em quais empresas."
- Abas Todos / Ativos / Inativos, com contagem. Busca: "Nome, login ou e-mail...".
- Colunas: Usuário (foto e @login), E-mail, Empresas (quantas), Status.
- Menu "Mais opções" da linha: "Editar usuário", "Ativar usuário" / "Inativar usuário".
- **Criar:** "Novo usuário". Preencha:
  - **Dados do usuário:** "Nome completo:", "Email:", "Login:"; em empresa Protheus, também o "Código Protheus:";
  - **Configurações de acesso:** "Acesso ao Sistema:" e a senha (mínimo de 8 caracteres, com maiúscula, minúscula e número);
  - **Permissões por empresa:** "Defina o acesso do usuário em cada empresa". Use "Expandir tudo" ou "Fechar tudo".
- O **setor** não fica mais no cadastro do usuário. Ele é definido em Configuração › Setores.
- Erro comum: "Selecione permissão de acesso a pelo menos uma empresa".

## Setores (pedidos por setor)
Configuração › Setores. É usado para dividir os pedidos de compra e venda por área (ex.: Compras). Só para empresa com Protheus.
- "Criar setor" → nome → "Criar e adicionar pessoas".
- Papéis no setor:
  - **Responsável:** gerencia as pessoas do setor e vê os pedidos dele;
  - **Membro:** os pedidos da pessoa pertencem ao setor. Cada pessoa é membro de um setor só; ao mudar, os pedidos dela vão junto;
  - **Acesso:** vê e trabalha os pedidos do setor sem ser membro.
- Ações: "Adicionar pessoa ao setor", "Trocar pessoa", "Mudar para acesso", "Desativar setor" / "Reativar setor", "Excluir", "Histórico geral".
- Quem é **responsável** de um setor também vê esta tela, mas só com os seus setores. Ninguém (exceto o administrador) altera o próprio vínculo.

## Noticias
Configuração › Noticias ("Anúncios"). Os avisos do carrossel da Home. "Novo anúncio" (Titulo, Descrição, Arquivos), ativar/desativar, "Deletar".

## Empresas
Configuração › Empresas: "Filiais cadastradas e situação da captura de documentos."
- Na lista, cada empresa mostra o **certificado** (Válido, Vencido, Não enviado, Sem informação) e um chip de **captura** por tipo (NF-e de entrada, NFS-e, CT-e):
  - verde: OK;
  - âmbar: atenção;
  - vermelho: falha;
  - cinza: não monitorado;
  - riscado: desligado.

  Passe o mouse para ver a última captura.
- Filtros rápidos: Todas, "Certificado vencendo ou vencido", "Captura pausada", "Captura com falha".
- Ações: editar, "Informações do certificado", "Sincronizar NF-e agora". Este último exige a permissão de sincronizar e não funciona com "Empresa sem certificado" ou "Captura pausada".
- **Editar a empresa ("Configuração de Empresa")** tem os blocos:
  - **Dados:** "Razão Social *", "CNPJ *", "Nome Fantasia", IE, endereço.
  - **Captura de documentos** ("Ativa" ou "Desligada"):
    - a chave "Captura automática" liga a busca periódica de notas na SEFAZ e no ambiente nacional;
    - em "Quais documentos capturar", escolha NF-e de entrada, NFS-e e CT-e, cada um com a sua chave;
    - desligar um tipo para a captura dele e tira o tipo do monitoramento.
  - **Manifestação da NF-e › "Ciência da operação":** "Automática" registra a ciência assim que a nota é encontrada e libera o XML completo. "Manual" deixa a ciência para o usuário.
  - **Certificado:** "Adicionar certificado" / "Atualizar certificado" (arquivo .pfx + "Senha *" → "Salvar certificado"). Também há a gestão dos certificados: "Promover a principal", "Restaurar", "Conceder acesso", "Ver senha" (pede a sua senha de novo) e a aba "Auditoria".
- Detalhes da captura, da manifestação e do fechamento: ver doc de Gestão Fiscal.

## Sistema
- **Parâmetros do Sistema:** chave e valor que mudam o comportamento da empresa. Os principais:
  - "Configuração de Nuvem" (empresa sem Protheus);
  - "Integração Protheus";
  - "Usar Parcelamento";
  - "Usar Provisão";
  - "Usar Contexto" / "Nome do Contexto";
  - "Permitir Saldo Negativo na Caixinha".

  Mude só com orientação do suporte.
- **Integração Protheus** (só Protheus, consulta): "Como cada operação conversa com o Protheus: REST ou legado (JDBC)." Mostra a URL base e o modo de cada operação. Mudanças são feitas pela equipe Coffee.

## Telas de todo usuário
- **Trocar empresa:** no topo da tela, "Trocar empresa", com "Buscar por nome ou CNPJ..." e as listas Atual / Recentes / Todas as empresas. Tudo o que o usuário vê é da empresa selecionada.
- **Sino de notificações:** últimos avisos, lembretes em aberto, vencimento do certificado digital, período de teste e a última atualização das sincronizações. A lista completa fica em **Notificações**, com as abas Todas / Não Visualizadas / Visualizadas.
- **Perfil:** dados do usuário, dados de acesso, permissões e os setores pelos quais é responsável. É só leitura; mudanças são feitas pelo administrador. A troca de senha fica no menu do usuário, no topo.
- **Últimas atualizações** (Novidades): changelog do Apollo, com Novidades, Mudanças e Correções.
- **Melhoria** ("Sugestões de Melhoria"): "Adicionar" → "Titulo: *", "Descrição:", "Sua sugestão é destinada a qual módulo?:" (Compras, Financeiro, Fiscal, Outro) → "Enviar". Também é possível curtir e comentar.
  - A sugestão e os comentários **só aparecem para todos depois da moderação**, feita pela equipe Coffee.
- **Suporte:** o item Suporte do menu abre o canal de atendimento (ver doc de Suporte).
- **Licença expirada / período de teste encerrado:** o Apollo leva à tela de licença. "Ver planos e assinar" abre a assinatura. Se aparecer "Não foi possível gerar o link de assinatura. Tente novamente mais tarde.", acione o suporte.
- **Primeiro acesso:** o assistente pede para criar a empresa (por certificado ou CNPJ) e trocar a senha.

## Quem pode
O menu Configuração é dos administradores da empresa. A tela Setores também aparece para responsáveis de setor. Sem acesso, peça ao administrador da sua empresa.

## Perguntas frequentes
- **Como adiciono um colega?** Configuração › Usuários › "Novo usuário", e marque as permissões em cada empresa.
- **Como desativo um usuário?** "Mais opções" › "Inativar usuário".
- **Onde coloco o usuário num setor?** Configuração › Setores, não no cadastro do usuário.
- **Como paro de capturar CT-e?** Configuração › Empresas › editar › "Captura de documentos" › desligue CT-e › "Salvar alterações".
- **Como troco o certificado?** Configuração › Empresas › editar › "Atualizar certificado" (.pfx + senha).
- **Minha sugestão sumiu.** Ela aguarda moderação da equipe Coffee e aparece depois de aprovada.
