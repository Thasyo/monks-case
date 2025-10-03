# Monks - Case Técnico

Este documento fornece as instruções de inicialização rápida para colocar a aplicação em funcionamento no **localhost** usando o Docker Compose.

## A aplicação é composta por três serviços: 

- Banco de Dados (MySQL)
- API de Backend (PYTHON - FastAPI)
- Interface do Usuário (REACT)

## 🚀 1. Pré-requisitos

Para executar o projeto, você deve ter as seguintes ferramentas instaladas em sua máquina:

- Docker: A ferramenta de conteinerização.

- Docker Compose: Usado para gerenciar e orquestrar os múltiplos contêineres do projeto (Geralmente é instalado junto com o Docker).

Link para instalar o Docker: https://www.docker.com/get-started/

## ⚙️ 2. Estrutura Necessária

É necessário que o seu arquivo de inicialização do banco de dados ( <code>monks_case_dump.sql</code> ) esteja presente em um caminho específico para que o contêiner do MySQL possa carregar o esquema ( <code>monks_case</code> ) e as tabelas ( <code>users, metrics</code> ) na primeira execução.

Certifique-se de que o seu arquivo SQL de dump esteja no seguinte local, em relação ao <strong>docker-compose.yml</strong>:

<code>./backend/app/db-init/monks_case_dump.sql</code>

## ✅ 3. Inicialização Completa

### ANTES DE MAIS NADA

Clone o repositório para sua máquina:

```
git clone https://github.com/Thasyo/monks-case.git
```

Ou se achar melhor, você pode "zipar" o projeto:

<img width="661" height="508" alt="image" src="https://github.com/user-attachments/assets/d80ee4c8-9c40-48a8-9c83-dbd3db660eaa" />

#### Com o projeto baixado na sua máquina, agora podemos inicializar o projeto!

### Passo 1: Limpeza e Inicialização do Banco de Dados

É essencial garantir que o banco de dados seja inicializado corretamente com o esquema. O comando a seguir remove quaisquer dados de banco de dados persistentes e força a recriação do MySQL, que carregará o monks_case_dump.sql.

Execute este comando no diretório onde está o seu docker-compose.yml:

```
docker-compose down -v
```

### Passo 2: Construir e Subir os Serviços

Este comando irá construir as imagens, iniciar os três serviços e gerenciar as dependências de inicialização (o Backend só inicia depois que o DB estiver pronto).

```
docker-compose up --build
```

### 🌐 4. Acesso à Aplicação

Após a conclusão da inicialização, a aplicação estará acessível nos seguintes endereços:

| Serviço | Endereço |
| :--- | :--- |
| **Interface do Usuário** (Frontend) | `http://localhost:5173` |
| **API do Backend** (FastAPI) | `http://localhost:8000` |
| **Documentação da API** (Swagger UI) | `http://localhost:8000/docs` |

### ⚠️⚠️ INFORMAÇÕES IMPORTANTES ⚠️⚠️

- Para fazer o login na aplicação, utilize os seguintes usuários:

    - ADMIN:
        
        - email: user1@email.com
        - senha: oeiruhn56146

    - USER:

        - email: user2@email.com
        - senha: 908ijofff 

### 🛠️ Comandos Adicionais Úteis

| Comando | Descrição |
| :--- | :--- |
| `docker-compose down` | Para e remove apenas os contêineres e redes (mantém os dados). |
| `docker-compose logs -f` | Exibe os logs de todos os serviços em tempo real. |
| `docker-compose down -v` | Parada Completa: Remove contêineres, redes e o volume de dados do DB. |

| `docker-compose up -d --build` | Constrói os contêineres em playground. |

