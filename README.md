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
├── catalog.spec.ts
└── checkout.spec.ts
```

## Navegação

O TanStack Router gerencia as rotas da aplicação, incluindo catálogo, detalhes do NFT, carrinho, checkout, autenticação e confirmação de pedidos.

O deploy na Vercel utiliza uma regra de rewrite para permitir acesso direto às rotas do frontend sem retornar erro 404.

## API REST e MSW

O Mock Service Worker intercepta requisições HTTP no navegador e fornece respostas simuladas.

Entre os endpoints utilizados estão:

| Método | Endpoint | Responsabilidade |
|---|---|---|
| GET | `/api/nfts` | Consultar catálogo |
| POST | `/api/checkout` | Criar pedido simulado |
| GET | `/api/orders/:orderId` | Consultar pedido existente |

O Axios centraliza as chamadas HTTP nos módulos de serviço.

A confirmação de compra consulta a API antes de apresentar o estado de sucesso. A criação de pedidos utiliza uma chave de idempotência para evitar a criação duplicada do mesmo pedido em tentativas repetidas.

Os pedidos são armazenados localmente no navegador. Esse mecanismo não representa um backend persistente de produção.

## Estado e cache

O TanStack Query gerencia os dados assíncronos do catálogo e a consulta de pedidos.

O `CartContext` gerencia os itens do carrinho, enquanto o `AuthContext` mantém a sessão simulada.

O `localStorage` é utilizado para preservar dados entre atualizações da página. A sessão e o carrinho não possuem isolamento seguro por usuário, e a autenticação não deve ser considerada adequada para produção.

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

O Playwright é utilizado para testar fluxos essenciais, como visualização do catálogo, abertura de detalhes, exigência de login e conclusão do checkout.

O TypeScript e o build de produção também fazem parte das verificações locais.

A cobertura atual não inclui todos os estados de erro, múltiplos usuários, regressão visual ou cenários avançados de reconexão.

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

As próximas evoluções incluem autenticação via API, isolamento de dados por usuário, revalidação transacional do checkout, sincronização consistente de preços, gerenciamento de carteiras, filtros por URL, paginação, testes de regressão visual, acessibilidade e avaliação de desempenho com Lighthouse.
