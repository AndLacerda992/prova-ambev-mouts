![CI](https://github.com/SEU_USUARIO/SEU_REPOSITORIO/actions/workflows/ci.yml/badge.svg)

# Automação Serverest - Cypress + Cucumber

Este projeto contém automações de testes para o site [Serverest](https://front.serverest.dev/) e sua API [https://serverest.dev/](https://serverest.dev/) utilizando Cypress com BDD (Behavior Driven Development) e Cucumber.

## 🚀 Tecnologias Utilizadas

- **Cypress**: Framework de automação de testes
- **Cucumber**: Framework BDD para escrita de cenários
- **JavaScript**: Linguagem de programação
- **ESBuild**: Bundler para processamento de arquivos

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone <https://github.com/AndLacerda992/prova-ambev-mouts.git>
cd serverest-automation
```

2. Instale as dependências:
```bash
npm install
```

## 🏃‍♂️ Como Executar os Testes

### Executar todos os testes
```bash
npm test
```

### Executar testes com interface gráfica
```bash
npm run cypress:open
```

### Executar testes específicos por tag
```bash
# Executar apenas testes de smoke
npx cypress run --env grepTags="@smoke"

# Executar apenas testes de login
npx cypress run --env grepTags="@login"

# Executar apenas testes de cadastro
npx cypress run --env grepTags="@cadastro"

# Executar apenas testes de API
npx cypress run --env grepTags="@api"

# Executar apenas testes de UI (login + cadastro)
npm run test:ui

# Executar apenas testes de API
npm run test:api
```

### Executar testes em modo headed (com navegador visível)
```bash
npm run test:headed
```

## 📁 Estrutura do Projeto

```
serverest-automation/
├── cypress/
│   ├── e2e/
│   │   ├── step_definitions/
│   │   │   ├── login.steps.js
│   │   │   ├── cadastro.steps.js
│   │   │   └── api.steps.js
│   │   ├── login.feature
│   │   ├── cadastro.feature
│   │   └── api.feature
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── cypress.config.js
├── .cucumberrc.js
├── package.json
└── README.md
```

## 🧪 Cenários de Teste

### Login (UI)
- ✅ Login com credenciais válidas
- ✅ Login com email inválido
- ✅ Login com senha inválida
- ✅ Login com campos vazios
- ✅ Logout do sistema

### Cadastro (UI)
- ✅ Cadastro com dados válidos
- ✅ Cadastro com email já existente
- ✅ Cadastro com senhas diferentes
- ✅ Cadastro com campos vazios
- ✅ Validação de email inválido
- ✅ Validação de senha curta

### API (5 Cenários com Ampla Cobertura)
- ✅ **Cadastrar usuário e fazer login** - Testa fluxo completo de autenticação
- ✅ **Gerenciar produtos (CRUD completo)** - Testa todas as operações de produtos
- ✅ **Gerenciar carrinho de compras** - Testa fluxo completo do carrinho
- ✅ **Validações e tratamento de erros** - Testa cenários de erro e validações
- ✅ **Testes de performance e limites** - Testa limites e comportamento sob carga

## 🏷️ Tags de Teste

- `@smoke`: Testes críticos para verificação básica
- `@login`: Testes relacionados ao login/logout (UI)
- `@cadastro`: Testes relacionados ao cadastro de usuários (UI)
- `@api`: Testes de API do Serverest

## 📊 Relatórios

Os relatórios são gerados automaticamente após a execução dos testes:

- **HTML**: `cypress/reports/cucumber-html/cucumber-report.html`
- **JSON**: `cypress/reports/cucumber-json/cucumber-report.json`

## 🔧 Configurações

### Cypress
- **Base URL**: https://front.serverest.dev (UI)
- **API URL**: https://serverest.dev (API)
- **Viewport**: 1280x720
- **Timeouts**: 10 segundos
- **Vídeos**: Habilitados
- **Screenshots**: Habilitados em caso de falha

### Cucumber
- **Step Definitions**: `cypress/e2e/step_definitions/**/*.js`
- **Features**: `cypress/e2e/**/*.feature`

## 🎯 Comandos Customizados

### UI
- `cy.login(email, password)`: Realiza login
- `cy.logout()`: Realiza logout
- `cy.checkSuccessMessage(message)`: Verifica mensagem de sucesso
- `cy.checkErrorMessage(message)`: Verifica mensagem de erro

### API
- `cy.generateRandomData(type)`: Gera dados aleatórios para testes
- `cy.apiLogin(email, password)`: Faz login via API
- `cy.apiCreateUser(userData)`: Cadastra usuário via API
- `cy.apiCreateProduct(productData, token)`: Cadastra produto via API
- `cy.apiGetProduct(productId, token)`: Busca produto via API
- `cy.apiUpdateProduct(productId, productData, token)`: Atualiza produto via API
- `cy.apiDeleteProduct(productId, token)`: Deleta produto via API
- `cy.apiCreateCart(cartData, token)`: Cria carrinho via API
- `cy.expectStatus(statusCode)`: Verifica status da resposta
- `cy.expectResponseProperty(property)`: Verifica propriedade da resposta
- `cy.expectErrorMessage(message)`: Verifica mensagem de erro

## 🌐 Endpoints da API Testados

### Usuários
- `POST /usuarios` - Cadastrar usuário
- `POST /login` - Fazer login
- `GET /usuarios` - Listar usuários (requer autenticação)

### Produtos
- `POST /produtos` - Cadastrar produto (requer autenticação)
- `GET /produtos` - Listar produtos
- `GET /produtos/:id` - Buscar produto por ID
- `PUT /produtos/:id` - Atualizar produto (requer autenticação)
- `DELETE /produtos/:id` - Deletar produto (requer autenticação)

### Carrinhos
- `POST /carrinhos` - Criar carrinho (requer autenticação)
- `GET /carrinhos/:id` - Consultar carrinho (requer autenticação)
- `DELETE /carrinhos/:id/produtos/:idProduto` - Remover produto do carrinho
- `DELETE /carrinhos/concluir-compra` - Finalizar compra

## 🐛 Troubleshooting

### Problemas Comuns

1. **Erro de dependências**: Execute `npm install` novamente
2. **Timeout nos testes**: Verifique a conexão com a internet
3. **Elementos não encontrados**: Verifique se o site está acessível
4. **Erro de API**: Verifique se a API está disponível em https://serverest.dev

### Logs e Debug

Para executar com logs detalhados:
```bash
DEBUG=cypress:* npm test
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório do projeto. 