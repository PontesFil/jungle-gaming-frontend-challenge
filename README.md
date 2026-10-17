# Kurio — NFT Marketplace

Aplicação frontend de marketplace de NFTs desenvolvida
para o desafio técnico da **Jungle Gaming**.

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
- Cenário determinístico de indisponibilidade do checkout via MSW (HTTP 503), com preservação do carrinho e possibilidade de nova tentativa.
- Criação de pedidos via API mockada, com chave de idempotência.
- Reutilização da chave de idempotência com os mesmos NFTs e preços retorna o pedido original; alterações nos itens ou preços com a mesma chave retornam HTTP 409.
- Consulta do pedido pela API antes da exibição da confirmação.
- Persistência local da sessão simulada e dos pedidos.
- Integração de componente Button do shadcn/ui no checkout.
- Testes E2E dos principais fluxos de navegação e compra.
- Interface responsiva para desktop e dispositivos móveis, com adaptação das principais telas a partir do Figma.
- Navegação inferior dedicada a dispositivos móveis.
- Páginas demonstrativas de perfil e carteira, com informações da sessão e estado do carrinho.

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
npm run dev:server
```

Em outro terminal, inicie o frontend:

```bash
npm run dev
```

Acesse o endereço informado pelo Vite.


## Testes e validação

Os comandos abaixo permitem executar as verificações do projeto:

```bash
# Verificação de tipos
npm run typecheck

# Análise estática
npm run lint

# Build de produção
npm run build

# Testes E2E
npm run test:e2e

# Interface interativa do Playwright
npx playwright test --ui

# Auditoria Lighthouse CI (após o build)
npm run lighthouse

# Preview da compilação
npm run preview
```

A suíte contém dez testes E2E com Playwright, cobrindo catálogo, detalhes dos NFTs, autenticação simulada, checkout, idempotência, isolamento de pedidos entre contas e recuperação após indisponibilidade simulada do checkout (HTTP 503).

Os testes de isolamento verificam que um pedido confirmado para uma conta não é exibido para outra conta ou para um visitante sem sessão. O teste de recuperação verifica que uma falha simulada não conclui a compra, preserva o carrinho e permite uma nova tentativa após a restauração do serviço.

## Cenários determinísticos do MSW

A API simulada utiliza o Mock Service Worker (MSW) para reproduzir respostas HTTP controladas e permitir a validação de cenários de sucesso, falha e recuperação.

### Simular indisponibilidade do checkout

Com a aplicação aberta, acesse o Console das ferramentas de desenvolvedor do navegador e execute:

```js
localStorage.setItem('kurio-mock-scenario', 'checkout-error')
```

Ao tentar finalizar uma compra, a API mockada retornará **HTTP 503 (Service Unavailable)**.

Nesse cenário:

- O pedido não é confirmado.
- A interface apresenta uma mensagem de erro.
- Os itens permanecem no carrinho.
- O usuário pode realizar uma nova tentativa.

### Restaurar o checkout

Para desativar a falha simulada, execute:

```js
localStorage.removeItem('kurio-mock-scenario')
```

Em seguida, tente confirmar o pedido novamente. A API voltará a executar o fluxo normal, permitindo a conclusão da compra.

O cenário é determinístico e configurado por origem do navegador, sem necessidade de modificar o código-fonte. Não representa uma indisponibilidade real de um serviço de pagamento.

## Reset dos dados simulados

Para reiniciar o ambiente de demonstração:

1. Abra a aplicação no navegador.
2. Acesse as ferramentas de desenvolvedor.
3. Na aba Application (Aplicativo), abra Local Storage.
4. Selecione a origem da aplicação.
5. Limpe os dados armazenados.
6. Atualize a página.

Isso remove as contas simuladas, a sessão, os carrinhos e os pedidos persistidos localmente naquela origem.

**Atenção:** a limpeza é irreversível para os dados locais daquela origem e não altera o servidor Socket.IO.


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

- O cadastro e o login utilizam endpoints REST simulados pelo MSW, com verificação das credenciais armazenadas localmente. A sessão permanece no localStorage, sem tokens ou autenticação validada por um backend seguro. Não é uma implementação apropriada para produção.
- A separação dos carrinhos é realizada por identificador de usuário no `localStorage`; não constitui isolamento de segurança entre contas autenticadas em um backend.
- Os dados dos pedidos são persistidos no `localStorage`, sem armazenamento remoto seguro ou sincronização entre dispositivos.
- O carrinho ainda não possui gerenciamento de quantidades, cupons ou taxas de rede.
- A busca e a ordenação não são sincronizadas com parâmetros da URL; não há paginação.
- As carteiras e redes são selecionadas apenas de forma ilustrativa, sem integração com carteiras reais.
- As páginas de perfil e carteira são demonstrativas e permitem visualizar informações da sessão, mas não oferecem edição de dados, conexão real de carteiras ou gerenciamento de credenciais.
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