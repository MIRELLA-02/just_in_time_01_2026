# 🏭 Just in Time — Gestão da Produção

> **Sistema Web Full Stack para gerenciamento de produtos, estoque e produção utilizando o conceito Just in Time.**

---

## 📌 Sobre o Projeto

O **Just in Time — Gestão da Produção** é um sistema Web Full Stack desenvolvido para auxiliar uma fabricante de produtos em **MDF (Medium Density Fiberboard)** no controle de estoque e gerenciamento da produção.

O sistema foi desenvolvido com o objetivo de substituir processos manuais por uma solução informatizada, permitindo acompanhar produtos, movimentações de estoque e produção de forma mais organizada, rápida e segura.

A proposta utiliza o conceito de **Just in Time (JIT)**, buscando manter o estoque em níveis adequados e produzir de acordo com a demanda, evitando desperdícios de matéria-prima e excesso de produtos armazenados.

---

## 🎯 Objetivo

O projeto tem como objetivo desenvolver uma aplicação Web Full Stack capaz de:

* 🔐 Controlar o acesso dos usuários por meio de autenticação;
* 📦 Cadastrar e gerenciar produtos;
* 📊 Controlar a quantidade disponível em estoque;
* ⚠️ Definir e acompanhar o estoque mínimo;
* 🏭 Registrar produtos fabricados;
* 🛒 Registrar saídas de estoque provenientes de pedidos;
* 📅 Registrar a data das movimentações;
* 👤 Identificar o usuário responsável por cada ação;
* 🔔 Alertar quando o estoque estiver abaixo do mínimo estabelecido;
* 📈 Facilitar o acompanhamento da produção.

---

## 🏢 Contextualização

Uma fabricante local de produtos em MDF enfrenta dificuldades na gestão da produção devido à utilização de processos manuais.

A ausência de um sistema informatizado pode ocasionar:

* atrasos na produção;
* erros no controle de estoque;
* dificuldade no acompanhamento dos pedidos;
* desperdício de matéria-prima;
* excesso ou falta de produtos;
* dificuldade para analisar as movimentações realizadas.

Com a implantação do sistema **Just in Time**, a empresa poderá trabalhar com um estoque mínimo e produzir de acordo com a demanda dos clientes e revendedores.

---

## 💡 Solução Proposta

O sistema centraliza as principais informações relacionadas à produção e ao estoque em uma única aplicação.

Por meio dele, o usuário pode cadastrar produtos contendo informações como:

* Nome;
* Descrição;
* Custo;
* Quantidade em estoque;
* Estoque mínimo.

Além disso, é possível registrar dois tipos de movimentação:

### 🏭 Fabricado

Representa a entrada de produtos no estoque.

**Exemplo:**

> MDF Branco → +20 unidades

### 🛒 Pedido

Representa a saída de produtos do estoque.

**Exemplo:**

> MDF Branco → -5 unidades

Quando uma saída faz com que o estoque fique abaixo do mínimo configurado, o sistema apresenta um **alerta ao usuário**.

---

# ⚙️ Funcionalidades

## 🔐 Autenticação

* Login utilizando e-mail e senha;
* Validação das credenciais;
* Mensagem em caso de dados incorretos;
* Identificação do usuário logado;
* Logout do sistema.

---

## 🏠 Página Principal

A interface principal apresenta uma visão geral do sistema e permite acessar suas principais funcionalidades.

### Recursos:

* Menu de navegação;
* Identificação do usuário;
* Acesso ao cadastro de produtos;
* Acesso à gestão de produção;
* Logout.

---

## 📦 Cadastro de Produtos

Permite realizar o gerenciamento completo dos produtos cadastrados.

### Recursos:

* ➕ Cadastro de novos produtos;
* 📋 Listagem dos produtos;
* 🔎 Busca de produtos;
* ✏️ Edição de produtos;
* 🗑️ Exclusão de produtos;
* ✅ Validação dos dados;
* 📊 Visualização do estoque atual;
* ⚠️ Controle do estoque mínimo.

---

## 🏭 Gestão de Produção

Área responsável pelo controle das movimentações de estoque.

### Recursos:

* Listagem dos produtos em ordem alfabética;
* Seleção do produto;
* Registro de produtos fabricados;
* Registro de pedidos;
* Registro da data da movimentação;
* Atualização automática do estoque;
* Identificação do usuário responsável;
* Verificação do estoque mínimo;
* Alertas de estoque abaixo do mínimo.

---

# 🧩 Tecnologias Utilizadas

### Front-end
* HTML5
* CSS3
* JavaScript

### Back-end

* Node.js
* Express
* API REST

### Banco de Dados
* MySQL
* Prisma ORM

### Ferramentas
* Git
* GitHub
* Visual Studio Code
* Insomnia
* Google Chrome

---

# 🗂️ Estrutura do Projeto

```text
just_in_time_01_2026/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── data/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── documentacao/
│   ├── requisitos.md
│   ├── casos-de-teste.md
│   └── infraestrutura.md
│
├── DER/
│   └── der.png
│
└── README.md
```

---

# 🗃️ Modelagem do Banco de Dados

O banco de dados foi desenvolvido para armazenar as informações necessárias para o funcionamento do sistema, incluindo usuários, produtos e movimentações de estoque.

### Principais entidades

* 👤 **Usuário**
* 📦 **Produto**
* 🔄 **Movimentação**

---

# 🧪 Testes

Foram planejados casos de teste para verificar o funcionamento das principais funcionalidades do sistema.

### Exemplos de testes

| ID   | Funcionalidade      | Resultado esperado                       |
| ---- | ------------------- | ---------------------------------------- |
| CT01 | Login válido        | Usuário acessa o sistema                 |
| CT02 | Login inválido      | Sistema informa erro                     |
| CT03 | Cadastro de produto | Produto é cadastrado                     |
| CT04 | Busca de produto    | Sistema retorna produtos correspondentes |
| CT05 | Edição              | Dados do produto são atualizados         |
| CT06 | Exclusão            | Produto é removido                       |
| CT07 | Produto fabricado   | Estoque aumenta                          |
| CT08 | Pedido              | Estoque diminui                          |
| CT09 | Estoque mínimo      | Sistema apresenta alerta                 |
| CT10 | Logout              | Usuário retorna ao login                 |

---

# 🚀 Como Executar o Projeto

## 1. Clone o repositório


git clone https://github.com/SEU-USUARIO/just_in_time_01_2026.git

---

Entre na pasta:

cd just_in_time_01_2026


---

## 2. Instale as dependências do Back-end


- cd backend
- npm install


---

## 3. Configure o banco de dados

Crie o banco de dados **preparacao_db** no MySQL.

Depois configure as variáveis de ambiente no arquivo `.env`.

Exemplo:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/preparacao_db"
PORT_APP=3000
```

---

## 4. Configure o Prisma

Execute:

npx prisma generate


---

## 5. Inicie o Back-end

npm run dev

O servidor ficará disponível na porta configurada no projeto.

---

## 6. Execute o Front-end

Abra o arquivo:

```text
frontend/index.html
```

no navegador ou utilize uma extensão como **Live Server** no Visual Studio Code.

---

# 📸 Interface do Sistema

## 🔐 Login

![Tela de Login](./Assets/telalogin.png)

---

## 🏠 Página Inicial


![Página Inicial](./Assets/telahome.png)

---

## 📦 Produtos


![Home de Produtos](./Assets/telaproduto.png)
![Cadastro de Produtos](./Assets/telacadastroproduto.png)

---

## 🏭 Gestão de Produção

> Insira aqui um print da gestão de produção.

![Gestão de Produção](./Assets/telaproducao1.png)
![Histórico de Movimentações](./Assets/telaproducao2.png)

---

# 📚 Entregas do Projeto

O projeto contempla as seguintes entregas:

* [x] Requisitos funcionais
* [x] Diagrama Entidade-Relacionamento
* [x] Banco de dados
* [x] Autenticação de usuários
* [x] Interface principal
* [x] Cadastro de produtos
* [x] Gestão de produção
* [x] Casos de teste
* [x] Requisitos de infraestrutura

---

# 🎓 Projeto Acadêmico

Este projeto foi desenvolvido como parte das atividades de formação técnica em **Desenvolvimento de Sistemas**, tendo como foco a aplicação prática de conceitos de:

* Análise de requisitos;
* Modelagem de banco de dados;
* Desenvolvimento Front-end;
* Desenvolvimento Back-end;
* APIs REST;
* Banco de dados relacional;
* ORM;
* Testes de software;
* Git e GitHub;
* Desenvolvimento Full Stack.

---

# 👩‍💻 Desenvolvido por 

Mirella Brolezi de Oliveira


---

