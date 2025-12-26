# 💬 Chat em Tempo Real - WebSocket

Aplicação de chat em tempo real desenvolvida com Spring Boot e WebSocket, permitindo comunicação instantânea entre múltiplos usuários em diferentes salas.

## 📋 Sobre o Projeto

Este é um sistema de chat moderno que utiliza WebSocket para comunicação bidirecional em tempo real. Os usuários podem criar ou entrar em salas de chat e trocar mensagens instantaneamente com outros participantes da mesma sala.

### Principais Funcionalidades

- ✅ Comunicação em tempo real via WebSocket
- ✅ Suporte a múltiplas salas de chat
- ✅ Interface web moderna e responsiva
- ✅ Timestamp nas mensagens
- ✅ Identificação de usuários
- ✅ Conexão/desconexão dinâmica

## 🛠️ Tecnologias Utilizadas

### Backend
- **Java 17**
- **Spring Boot 4.0.1**
- **Spring WebSocket** - Comunicação em tempo real
- **Spring Messaging** - Sistema de mensageria
- **STOMP Protocol** - Protocolo de mensagens
- **SockJS** - Fallback para navegadores sem suporte a WebSocket
- **Maven** - Gerenciamento de dependências

### Frontend
- **HTML5** - Estrutura da página
- **CSS3** - Estilização moderna com gradientes
- **JavaScript (ES6)** - Lógica da aplicação


## 🚀 Como Executar

### Pré-requisitos

- Java 17 ou superior
- Maven 3.6+
- Navegador web moderno

### Passos para execução

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd demo
```

2. **Compile e execute o backend**
```bash
mvn clean install
mvn spring-boot:run
```

Ou use os arquivos wrapper:
```bash
# Windows
mvnw.cmd spring-boot:run

# Linux/Mac
./mvnw spring-boot:run
```

3. **Abra o frontend**
- Navegue até a pasta `Front-end/`
- Abra o arquivo `index.html` no navegador

4. **Acesse a aplicação**
- Backend: `http://localhost:8080`
- Frontend: Abra `Front-end/index.html` diretamente ou via servidor local

## 📝 Como Usar

1. **Entrar no Chat**
   - Digite seu nome de usuário
   - Escolha ou crie uma sala (padrão: "geral")
   - Clique em "Entrar"

2. **Enviar Mensagens**
   - Digite sua mensagem no campo de texto
   - Pressione Enter ou clique em "Enviar"
   - Suas mensagens aparecerão à direita em roxo
   - Mensagens de outros usuários aparecerão à esquerda

3. **Trocar de Sala**
   - Clique em "Sair"
   - Digite um novo nome de sala
   - Clique em "Entrar"

## 🔧 Configuração WebSocket

### Endpoints
- **Conexão WebSocket:** `/ws`
- **Envio de mensagens:** `/app/chat.send/{room}`
- **Recebimento de mensagens:** `/topic/chat/{room}`

### Fluxo de Comunicação

1. Cliente conecta ao endpoint `/ws`
2. Se inscreve no tópico `/topic/chat/{room}`
3. Envia mensagens para `/app/chat.send/{room}`
4. Servidor processa e retransmite para todos os inscritos

## 🎨 Interface

A interface foi desenvolvida com design moderno apresentando:
- Mensagens diferenciadas (próprias vs outros)
- Scrollbar customizada
- Timestamp nas mensagens

## 🔒 CORS e Segurança

O projeto está configurado para aceitar conexões de qualquer origem (`setAllowedOriginPatterns("*")`). Para produção, configure origens específicas:

```java
registry.addEndpoint("/ws")
    .setAllowedOrigins("https://seu-dominio.com")
    .withSockJS();
```



Desenvolvido como projeto de demonstração de WebSocket com Spring Boot.

---

Certifique-se de que o servidor backend está rodando na porta 8080 antes de abrir o frontend.
