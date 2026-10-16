# Kurio — NFT Marketplace

Aplicação frontend de marketplace de NFTs desenvolvida para o desafio técnico da **Jungle Gaming**.

O projeto demonstra uma jornada de navegação e compra simulada de NFTs, com catálogo, detalhes dos itens, carrinho, checkout e confirmação de pedidos. Utiliza API REST mockada com MSW, comunicação em tempo real via Socket.IO e testes automatizados com Playwright.

## Demonstração

- **Aplicação:** https://jungle-gaming-frontend-challenge-beta.vercel.app/
- **Servidor Socket.IO:** https://jungle-gaming-frontend-challenge.onrender.com/
- **Health check:** https://jungle-gaming-frontend-challenge.onrender.com/health

> **Aviso:** este projeto utiliza dados simulados. Não realiza transações reais com criptomoedas nem conexões efetivas com carteiras digitais.

## Tecnologias

- React e TypeScript
- Vite
- Tailwind CSS 4
- shadcn/ui
- TanStack Router
- TanStack Query
- Axios
- Mock Service Worker (MSW)
- Socket.IO
- Playwright

## Funcionalidades implementadas

- Catálogo de NFTs com busca por nome ou criador e ordenação por preço ou nome.
- Página de detalhes dos NFTs.
- Carrinho com adição e remoção de itens.
- Persistência do carrinho por conta simulada, com separação dos dados entre usuários no navegador.
- Atualização de preços em tempo real no catálogo e no carrinho via Socket.IO.
- Login e cadastro simulados.
- Checkout com dados do colecionador, seleção simulada de carteira e rede e revisão do pedido.
- Validação de itens e estrutura dos preços enviados ao checkout mockado.
- Criação de pedidos via API mockada, com chave de idempotência.
- Consulta do pedido pela API antes da exibição da confirmação.
- Persistência local da sessão simulada e dos pedidos.
- Integração de componente Button do shadcn/ui no checkout.
- Testes E2E dos principais fluxos de navegação e compra.

## Executando localmente

**Pré-requisitos:** Node.js e npm compatíveis com a versão do Vite utilizada no projeto.

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/PontesFil/jungle-gaming-frontend-challenge.git
cd jungle-gaming-frontend-challenge
npm ci
```

Crie um arquivo `.env` na raiz do projeto:

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

Acesse o endereço informado pelo Vite.

## Testes e validação

Execute o build de produção:

```bash
npm run build
```

Execute os testes E2E:

```bash
npx playwright test
```

Para abrir a interface de execução:

```bash
npx playwright test --ui
```

A suíte atual contém quatro testes E2E, executados com sucesso durante o desenvolvimento. Também foram realizadas verificações manuais de persistência do carrinho, alternância entre contas simuladas e finalização de compra.

## Auditoria Lighthouse

Auditoria realizada em **16/10/2026**, na aplicação publicada na Vercel, utilizando **Lighthouse 13.4.1**, com simulação de dispositivo móvel Moto G Power e conexão 4G lenta.

| Categoria | Pontuação |
|---|---:|
| Desempenho | **93** |
| Acessibilidade | **100** |
| Boas práticas | **100** |
| SEO | **100** |

**Métricas da auditoria:**

- First Contentful Paint (FCP): 2,1 s
- Largest Contentful Paint (LCP): 2,9 s
- Total Blocking Time (TBT): 10 ms
- Cumulative Layout Shift (CLS): 0

O relatório completo está disponível em [docs/lighthouse-mobile.pdf](docs/lighthouse-mobile.pdf).

Os resultados representam uma execução específica da auditoria e podem variar conforme dispositivo, rede e ambiente. As pontuações do Lighthouse não substituem testes funcionais, auditorias de segurança ou avaliações manuais de acessibilidade.

## Arquitetura

Consulte [ARCHITECTURE.md](./ARCHITECTURE.md) para conhecer a estrutura do projeto, o funcionamento da API mockada, a comunicação em tempo real, os testes e as decisões técnicas.

## Limitações conhecidas

Este projeto representa uma implementação parcial do escopo do desafio.

- A autenticação é simulada no navegador, sem validação real de credenciais por um servidor.
- A separação dos carrinhos é realizada por identificador de usuário no `localStorage`; não constitui isolamento de segurança entre contas autenticadas em um backend.
- Os dados dos pedidos são persistidos no `localStorage`, sem armazenamento remoto seguro ou sincronização entre dispositivos.
- O carrinho ainda não possui gerenciamento de quantidades, cupons ou taxas de rede.
- A busca e a ordenação não são sincronizadas com parâmetros da URL; não há paginação.
- As carteiras e redes são selecionadas apenas de forma ilustrativa, sem integração com carteiras reais.
- Não foram implementadas telas completas de perfil e gerenciamento de carteiras.
- O servidor Socket.IO demonstra atualizações de preços, mas não implementa o protocolo completo de eventos versionados ou eventos de atualização de pedidos.
- O serviço de preços em tempo real e a API mockada não compartilham uma fonte autoritativa de preços. Por esse motivo, o checkout valida a estrutura dos valores enviados, mas **não realiza uma revalidação real de preços contra o servidor**.
- Ainda não há uma suíte dedicada de testes de regressão visual.
- A integração com shadcn/ui é inicial, utilizando seu componente Button no checkout.
- Configurações adicionais de segurança, como políticas CSP e cabeçalhos de proteção, permanecem como oportunidades de melhoria.

## Hospedagem

O frontend está hospedado na **Vercel** e o servidor Socket.IO, no **Render**.

O frontend utiliza as variáveis de ambiente `VITE_ENABLE_MOCKS` e `VITE_SOCKET_URL` para configurar a API mockada e a conexão em tempo real.

Em hospedagem gratuita, o servidor pode entrar em estado de inatividade, ocasionando atraso na primeira conexão.

## Contexto

Desenvolvido como exercício prático de arquitetura frontend, integração REST, comunicação em tempo real, gerenciamento de estado, testes automatizados, documentação e deploy.