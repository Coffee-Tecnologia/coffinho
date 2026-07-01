# Cadastros - Apollo

## Visão Geral
O módulo **Cadastros** centraliza os registros base do sistema: clientes, fornecedores, produtos, serviços e suas categorias. Esses cadastros são utilizados por outros módulos (orçamentos, pedidos, caixinha, etc.).

---

## 1. Clientes (`/cadastros/clientes`)

Cadastro de clientes da empresa para uso em orçamentos e documentos a receber.

### Campos principais
- Razão Social / Nome
- CPF ou CNPJ
- E-mail, telefone
- Endereço completo
- Observações

### Uso
- Vinculado obrigatoriamente aos **Orçamentos**
- Referenciado em documentos **A Receber**

---

## 2. Fornecedores (`/cadastros/fornecedores`)

Cadastro de fornecedores da empresa para uso em pedidos de compra, documentos avulsos e caixinha.

### Campos principais
- Razão Social / Nome Fantasia
- CNPJ / CPF
- E-mail, telefone
- Endereço
- Observações

### Uso
- Referenciado em títulos de **Caixinha**
- Referenciado em **Documentos Avulsos**
- Disponível para consulta em **Pedidos de Compra**

---

## 3. Produtos (`/cadastros/produtos`)

Catálogo de produtos da empresa, utilizados principalmente nos **Orçamentos**.

### Campos principais
- Descrição do produto
- Preço unitário
- Categoria do produto
- Código interno

### Funcionalidades
- Busca e filtro por nome/categoria
- Exportação da lista de produtos
- Visualização em lista ou cards

### Uso
- Itens de **Orçamentos** (tipo produto)

---

## 4. Serviços (`/cadastros/servicos`)

Catálogo de serviços oferecidos pela empresa, utilizados nos **Orçamentos**.

### Campos principais
- Descrição do serviço
- Preço unitário
- Categoria do serviço
- Materiais vinculados (insumos do serviço com quantidade e produto)

### Materiais vinculados
Cada serviço pode ter uma lista de materiais/insumos. Quando um serviço é adicionado a um orçamento com a opção "Incluir materiais" ativada, o custo dos materiais é somado automaticamente ao valor do item.

### Uso
- Itens de **Orçamentos** (tipo serviço)

---

## 5. Categorias de Produto (`/cadastros/categorias-produto`)

Agrupamento de produtos por categoria para facilitar navegação e relatórios.

**Exemplos:** Materiais, Equipamentos, Insumos, etc.

---

## 6. Categorias de Serviço (`/cadastros/categorias-servico`)

Agrupamento de serviços por categoria.

**Exemplos:** Manutenção, Consultoria, Instalação, etc.

---

## 7. Contextos (`/cadastros/contextos`)

Configuração de contextos de negócio — agrupamentos ou segmentos que organizam a operação da empresa dentro do Apollo. Usado para segmentar permissões e visualizações por área/unidade.

---

## Regras de Negócio

### 1. Produto vs. Serviço
- **Produto:** item físico com preço unitário
- **Serviço:** prestação com preço e opcionalmente materiais inclusos
- Ambos podem coexistir em um mesmo orçamento

### 2. Materiais de Serviço
- ✅ Um serviço pode ter N materiais (produtos) vinculados com quantidade
- ✅ O custo dos materiais é somado ao orçamento quando "Incluir materiais" está ativo
- ✅ Atualizar o preço do produto reflete automaticamente no cálculo

### 3. Exclusão de Cadastros
- ⚠️ Não é possível excluir clientes, fornecedores, produtos ou serviços que estejam vinculados a documentos ativos
- ✅ Inativação é a alternativa para cadastros em uso

---

## Perguntas Frequentes

### Como cadastro um novo fornecedor?
Acesse Cadastros → Fornecedores → Novo. Preencha os dados e salve.

### Como adiciono materiais a um serviço?
Acesse Cadastros → Serviços → edite o serviço desejado. Na seção "Materiais", adicione os produtos e quantidades.

### Por que não consigo excluir um produto?
Provavelmente ele está vinculado a um orçamento ativo ou a materiais de algum serviço. Inative o produto em vez de excluir.

### A categoria é obrigatória?
Não, mas é recomendável para facilitar buscas e relatórios.

### Onde uso o cadastro de contextos?
Contextos organizam a operação por área ou unidade de negócio. Consulte o administrador do sistema para entender como sua empresa usa esse recurso.

---

## Glossário

- **Cliente:** empresa ou pessoa que compra ou recebe serviços
- **Fornecedor:** empresa ou pessoa que vende ou presta serviços para a empresa
- **Produto:** item físico do catálogo com preço unitário
- **Serviço:** prestação do catálogo com preço unitário e possíveis materiais
- **Materiais vinculados:** insumos associados a um serviço, com produto e quantidade
- **Categoria:** agrupamento de produtos ou serviços para organização
- **Contexto:** segmento ou unidade de negócio dentro do Apollo

---

**Última atualização:** Junho 2026
**Versão do documento:** 1.0
