# Short Links

Este é um projeto simples de gerenciamento de URLs encurtadas, onde você pode criar e gerenciar links curtos para redirecionamento. Ele foi desenvolvido usando [Redis](https://redis.io/docs/data-types/) e [Postgres](https://www.postgresql.org/docs/) como banco de dados.

## Funcionalidades

- **Encurtamento de URLs:** Converta URLs longas em links curtos.
- **Redirecionamento:** Redirecione os visitantes para URLs originais a partir dos links encurtados.
- **Gerenciamento de Links:** Visualize, edite e exclua links encurtados.

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes requisitos instalados em sua máquina:

- NodeJS com TypeScript
- Redis
- Postgres

## Instalação e Configuração

1. Clone este repositório em sua máquina local:

```bash
git clone https://github.com/cancarlose/short-links.git


## Instalação e Configuração

npm install

## Configure as variáveis de ambiente no arquivo .env, incluindo as configurações do Redis e Postgres:

REDIS_URL=URL_DO_SEU_REDIS
POSTGRES_URL=URL_DO_SEU_POSTGRES


## Inicie o servidor:

npm start

## Uso

- Acesse o aplicativo em seu navegador, geralmente em [http://localhost:3333](http://localhost:3333).

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request com melhorias.

## Licença

Este projeto está licenciado sob a licença [MIT](https://github.com/cancarlose/short-links/blob/main/LICENSE).