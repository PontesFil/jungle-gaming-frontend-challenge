# Arquitetura — Kurio NFT Marketplace

## Visão geral

O Kurio é uma aplicação React com TypeScript construída sobre Vite. O frontend consome uma API REST simulada pelo Mock Service Worker (MSW) e recebe eventos de atualização de preços de um servidor Socket.IO separado.

O objetivo desta arquitetura é demonstrar a separação entre interface, estado de aplicação, serviços de dados e comunicação em tempo real.

## Organização do projeto

```text
src/
├── components/
│   ├── home/
│   └── layout/
├── contexts/
│   ├── AuthContext.tsx
│   └── CartContext.tsx
├── data/
│   └── mockNfts.ts
├── hooks/
│   └── useRealtimePrices.ts
├── mocks/
│   ├── browser.ts
│   └── handlers.ts
├── pages/
├── services/
│   ├── checkoutService.ts
│   ├── nftService.ts
│   └── socket.ts
├── types/
├── main.tsx
└── router.tsx

server/
└── index.ts

tests/
├── auth.spec.ts
├── catalog.spec.ts
├── checkout.spec.ts
└── idempotency.spec.ts
```

## Navegação

O TanStack Router gerencia as rotas da aplicação, incluindo catálogo, detalhes do NFT, carrinho, checkout, autenticação e confirmação de pedidos.

O deploy na Vercel utiliza uma regra de rewrite para permitir acesso direto às rotas do frontend sem retornar erro 404.

## API REST e MSW

O Mock Service Worker intercepta requisições HTTP no navegador e fornece respostas simuladas.

Entre os endpoints utilizados estão:


| Método | Endpoint | Responsabilidade |
|---|---|---|
| GET | `/api/nfts` | Retorna o catálogo simulado de NFTs |
| POST | `/api/auth/register` | Cadastra uma conta simulada; retorna 409 para e-mail duplicado |
| POST | `/api/auth/login` | Valida credenciais simuladas; retorna 401 para credenciais inválidas |
| POST | `/api/checkout` | Valida a estrutura do pedido e aplica a regra de idempotência |
| GET | `/api/orders/:orderId` | Consulta um pedido associado à sessão simulada |

O cadastro e o login são interceptados pelo MSW. As contas são armazenadas no navegador e as senhas são transformadas em hashes SHA-256 para a simulação. Isso não equivale ao armazenamento seguro de senhas ou à autenticação de um backend de produção.
O checkout utiliza uma chave de idempotência. Repetir uma requisição com a mesma chave, os mesmos NFTs e os mesmos preços esperados retorna o pedido original. Reutilizar a chave com itens ou preços diferentes retorna HTTP 409. A verificação não representa revalidação dos preços atuais do servidor.

O Axios centraliza as chamadas HTTP nos módulos de serviço.

A confirmação de compra consulta a API antes de apresentar o estado de sucesso. A criação de pedidos utiliza uma chave de idempotência para evitar a criação duplicada do mesmo pedido em tentativas repetidas.

Os pedidos são armazenados localmente no navegador. Esse mecanismo não representa um backend persistente de produção.

## Estado e cache

O TanStack Query gerencia os dados assíncronos do catálogo e a consulta de pedidos.

O `CartContext` gerencia os itens do carrinho, enquanto o `AuthContext` mantém a sessão simulada.

O `AuthContext` mantém uma sessão demonstrativa no localStorage', utilizando a chave kurio-user. O cadastro e o login consultam endpoints simulados pelo MSW. O CartContext persiste o carrinho por conta simulada, enquanto os pedidos são armazenados localmente e consultados por meio da API mockada.
A separação dos dados depende de informações controladas pelo próprio navegador. Não há tokens de autenticação, sessão validada no servidor ou isolamento de segurança entre usuários. Esses mecanismos servem exclusivamente à demonstração.

## Comunicação em tempo real

O servidor Node.js com Socket.IO mantém preços de NFTs em memória e emite atualizações periódicas.

Eventos utilizados:

- `prices:snapshot`: envia um conjunto de preços ao conectar.
- `nft:price-updated`: informa alterações de preço.

O hook `useRealtimePrices` recebe os eventos e atualiza o cache do TanStack Query. O `CartContext` também escuta esses eventos para atualizar os preços dos itens adicionados.

O cliente utiliza a URL configurada por `VITE_SOCKET_URL` e possui suporte básico à reconexão.

### Limitações do tempo real

A implementação atual é demonstrativa. Os preços são atualizados aleatoriamente no servidor Socket.IO, enquanto o MSW possui dados próprios.

Ainda são necessárias melhorias para implementar um fluxo totalmente consistente, incluindo versionamento de eventos, tratamento de eventos duplicados, sincronização entre REST e Socket.IO e revalidação do pedido no servidor.

## Fluxo de compra

1. O usuário navega pelo catálogo e acessa os detalhes de um NFT.
2. Adiciona o item ao carrinho.
3. Realiza login simulado, se necessário.
4. Preenche os dados de checkout e revisa o pedido.
5. O frontend envia `POST /api/checkout` com os IDs dos NFTs e a chave de idempotência.
6. O MSW valida os dados e registra o pedido simulado.
7. O frontend navega para a página de confirmação.
8. A página consulta `GET /api/orders/:orderId`.
9. O sucesso só é apresentado quando a consulta retorna um pedido confirmado para a sessão simulada.

O checkout ainda não realiza uma revalidação transacional de preço e disponibilidade no momento da confirmação.


## Testes

O projeto utiliza Playwright para testes E2E.

A suíte contém oito testes automatizados que verificam:

- Exibição do catálogo.
- Navegação para os detalhes de um NFT.
- Exigência de login antes da compra.
- Finalização do checkout após autenticação.
- Cadastro de usuário e persistência da sessão simulada.
- Rejeição de login com senha incorreta.
- Rejeição de cadastro com e-mail duplicado.
- Idempotência do checkout, incluindo reutilização válida da chave e rejeição de alterações nos itens ou preços.

Comandos disponíveis:

```bash
npm run typecheck
npm run lint
npm run build
npm run test:e2e
npm run lighthouse
```

O Lighthouse CI audita a compilação local e salva relatórios em `lighthouse-reports/`.

A cobertura não contempla todos os cenários de falha, regressão visual ou reconexão avançada do Socket.IO.


## Deploy

**Frontend:** Vercel

**Socket.IO:** Render

Variáveis de ambiente utilizadas:

| Variável | Serviço | Finalidade |
|---|---|---|
| `VITE_ENABLE_MOCKS` | Frontend | Habilitar MSW |
| `VITE_SOCKET_URL` | Frontend | Endereço do servidor Socket.IO |
| `FRONTEND_URL` | Servidor | Autorizar origem no CORS |
| `PORT` | Servidor | Porta HTTP definida pelo ambiente |

O endpoint `/health` permite verificar a disponibilidade básica do servidor Socket.IO.

## Melhorias futuras

As próximas evoluções incluem autenticação segura em backend real, isolamento de dados por usuário, revalidação transacional do checkout, sincronização consistente de preços, gerenciamento de carteiras, filtros por URL, paginação, testes de regressão visual, acessibilidade e avaliação de desempenho com Lighthouse.