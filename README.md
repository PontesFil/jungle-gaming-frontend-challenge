# Kurio — NFT Marketplace

Aplicação frontend de marketplace de NFTs desenvolvida para o desafio técnico da Jungle Gaming.

O projeto demonstra navegação entre catálogo, detalhes de NFTs, carrinho e checkout simulado, com comunicação em tempo real via Socket.IO, API REST mockada com MSW e testes E2E com Playwright.

## Demonstração

- **Aplicação:** https://jungle-gaming-frontend-challenge-beta.vercel.app/
- **Servidor Socket.IO:** https://jungle-gaming-frontend-challenge.onrender.com/
- **Health check:** https://jungle-gaming-frontend-challenge.onrender.com/health

> Este projeto utiliza dados simulados. Não realiza transações reais com criptomoedas ou carteiras digitais.

## Tecnologias

- React e TypeScript
- Vite
- Tailwind CSS
- TanStack Router
- TanStack Query
- Axios
- Mock Service Worker (MSW)
- Socket.IO
- Playwright

## Funcionalidades implementadas

- Catálogo de NFTs com busca por nome ou criador e ordenação por preço ou nome.
- Página de detalhes de NFT.
- Carrinho com adição e remoção de itens.
- Atualização de preços em tempo real no catálogo e no carrinho.
- Login e cadastro simulados.
- Checkout com dados do colecionador, seleção simulada de carteira e rede e revisão do pedido.
- Criação de pedidos por API mockada com chave de idempotência.
- Consulta do pedido pela API antes de exibir a confirmação.
- Persistência local do carrinho, sessão simulada e pedidos.
- Testes automatizados dos principais fluxos de navegação e compra.

## Executando localmente

**Pré-requisitos:** Node.js e npm compatíveis com a versão do Vite utilizada no projeto.

Clone o repositório:

```bash
git clone https://github.com/PontesFil/jungle-gaming-frontend-challenge.git
cd jungle-gaming-frontend-challenge
npm ci
```

Crie um arquivo `.env` na raiz:

```env
VITE_ENABLE_MOCKS=true
VITE_SOCKET_URL=http://localhost:3001
```

Inicie o servidor Socket.IO em um terminal:

```bash
npx tsx server/index.ts
```

Em outro terminal, inicie o frontend:

```bash
npm run dev
```

Acesse o endereço informado pelo Vite no terminal.

## Testes e validação

Execute o build de produção:

```bash
npm run build
```

Execute os testes E2E:

```bash
npx playwright test
```

Para abrir a interface de execução dos testes:

```bash
npx playwright test --ui
```

## Arquitetura

Consulte [ARCHITECTURE.md](./ARCHITECTURE.md) para conhecer a organização do código, o funcionamento dos mocks, a comunicação em tempo real e as decisões técnicas.

## Limitações conhecidas

Este projeto representa uma implementação parcial do escopo do desafio.

- A autenticação é simulada no navegador; não há validação real de credenciais por um servidor.
- Os dados de pedidos são persistidos no `localStorage`, sem segurança ou compartilhamento entre dispositivos.
- O carrinho ainda não possui gerenciamento de quantidades, cupons ou taxas de rede.
- A busca e a ordenação não são sincronizadas com parâmetros da URL; não há paginação.
- A seleção de carteiras é ilustrativa, sem conexão com carteiras reais.
- Não foram implementadas telas completas de perfil e gerenciamento de carteiras.
- O servidor Socket.IO demonstra atualizações de preços, mas ainda não implementa o protocolo completo de eventos versionados e revalidação de pedidos.
- Os dados do servidor de preços e da API mockada não compartilham uma fonte única de verdade.
- Ainda não há suíte dedicada de regressão visual ou relatório Lighthouse documentado.
- A interface utiliza Tailwind CSS, mas ainda não incorpora componentes shadcn/ui.

## Hospedagem

O frontend está hospedado na Vercel, e o servidor Socket.IO, no Render. A configuração do frontend utiliza `VITE_SOCKET_URL` para apontar para o servidor publicado.

Em hospedagem gratuita, o servidor pode entrar em estado de inatividade, causando atraso na primeira conexão.

## Contexto

Desenvolvido como exercício prático de arquitetura frontend, integração REST, comunicação em tempo real, testes e deploy.