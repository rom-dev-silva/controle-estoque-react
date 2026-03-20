📦 Controle de Estoque

Sistema simples de controle de estoque desenvolvido com React e Google Sheets como banco de dados, usando Google Apps Script como API. Permite adicionar, listar e excluir produtos, com notificações visuais para cada ação.

🚀 Tecnologias utilizadas

React – Biblioteca para construção da interface do usuário.

JavaScript – Linguagem principal do projeto.

Google Sheets – Banco de dados para armazenar os produtos.

Google Apps Script – Criação de uma API para comunicação entre React e Google Sheets.

React-Toastify – Biblioteca para exibir notificações de sucesso ou erro.

⚙️ Funcionalidades

✅ Adicionar produtos com nome e preço

✅ Listar todos os produtos cadastrados

✅ Excluir produtos individualmente

✅ Atualizar lista manualmente

✅ Notificações visuais para cada ação (adicionar, excluir ou erro de conexão)

🧠 Como funciona

O React renderiza a interface e gerencia o estado da aplicação.

O Google Sheets funciona como banco de dados, armazenando cada produto com ID, nome e preço.

A API do Google Apps Script permite:

Listar produtos (action=list)

Adicionar produtos (POST)

Deletar produtos (action=delete&id=ID)

Cada operação exibe uma notificação usando React-Toastify:

✅ Sucesso: produto adicionado ou excluído

❌ Erro: problema de conexão ou validação do formulário

🖼️ Fluxo visual do app

Adicionar produto

Usuário digita nome e preço → clica “➕ Adicionar”

API adiciona no Google Sheets

Toast de sucesso aparece:


Excluir produto

Usuário clica “🗑️ Excluir” → confirma

API remove do Google Sheets

Toast de sucesso aparece:


Erro de conexão ou validação

Se o fetch falhar ou input inválido

Toast de erro aparece:


📂 Estrutura do projeto
/controle-estoque-react
│
├─ /src
│   └─ App.jsx           # Componente principal
├─ /public
├─ estoque.gs            # Script Google Apps Script
├─ package.json
└─ .gitignore
▶️ Como rodar o projeto

Instale as dependências:

npm install

Inicie o servidor de desenvolvimento:

npm run dev

Abra o navegador em http://localhost:5173 (ou porta indicada pelo Vite/React).

Interaja com o app: adicione, exclua e atualize a lista de produtos.

💡 Dicas importantes

O Google Apps Script deve estar publicado como Web App com acesso “Qualquer pessoa, mesmo anônima” para funcionar com fetch.

Cada produto possui um ID único incremental.

Use o botão de atualizar lista caso queira garantir que os dados estejam sincronizados com o Google Sheets.

Notificações aparecem no canto superior direito da tela, indicando sucesso ou erro de cada ação.
