let stompClient = null;
let username = null;
let currentRoom = null;

function connect() {
  username = document.getElementById("username").value.trim();
  currentRoom = document.getElementById("roomName").value.trim();

  if (!username) {
    alert("Por favor, digite seu nome!");
    return;
  }

  if (!currentRoom) {
    alert("Por favor, digite o nome da sala!");
    return;
  }

  const socket = new SockJS("http://localhost:8080/ws");
  stompClient = Stomp.over(socket);

  stompClient.connect(
    {},
    function (frame) {
      console.log("Conectado: " + frame);

      stompClient.subscribe("/topic/chat/" + currentRoom, function (message) {
        showMessage(JSON.parse(message.body));
      });

      document.getElementById("loginContainer").style.display = "none";
      document.getElementById("chatContainer").style.display = "flex";
      document.getElementById(
        "userInfo"
      ).textContent = `${username} na sala: ${currentRoom}`;

      addSystemMessage(`Você entrou na sala ${currentRoom}`);

      document.getElementById("messageInput").focus();
    },
    function (error) {
      console.error("Erro na conexão:", error);
      alert(
        "Erro ao conectar ao servidor. Verifique se o servidor está rodando na porta 8080."
      );
    }
  );
}

function disconnect() {
  if (stompClient !== null) {
    stompClient.disconnect();
  }

  document.getElementById("loginContainer").style.display = "block";
  document.getElementById("chatContainer").style.display = "none";
  document.getElementById("messagesContainer").innerHTML = "";
  document.getElementById("username").value = "";

  addSystemMessage("Você saiu do chat");

  console.log("Desconectado");
}

function sendMessage() {
  const messageInput = document.getElementById("messageInput");
  const messageContent = messageInput.value.trim();

  if (messageContent && stompClient) {
    const chatMessage = {
      from: username,
      content: messageContent,
      timestamp: new Date().toISOString(),
    };

    stompClient.send(
      "/app/chat.send/" + currentRoom,
      {},
      JSON.stringify(chatMessage)
    );
    messageInput.value = "";
  }
}

function showMessage(message) {
  const messagesContainer = document.getElementById("messagesContainer");
  const messageDiv = document.createElement("div");

  const isOwnMessage = message.from === username;
  messageDiv.className = isOwnMessage ? "message own" : "message other";

  const time = formatTime(message.timestamp);

  messageDiv.innerHTML = `
        <div class="message-content">
            ${
              !isOwnMessage
                ? `<div class="message-sender">${message.from}</div>`
                : ""
            }
            <div class="message-text">${escapeHtml(message.content)}</div>
            <div class="message-time">${time}</div>
        </div>
    `;

  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addSystemMessage(text) {
  const messagesContainer = document.getElementById("messagesContainer");
  const messageDiv = document.createElement("div");
  messageDiv.className = "system-message";
  messageDiv.textContent = text;
  messagesContainer.appendChild(messageDiv);
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("messageInput")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        sendMessage();
      }
    });

  document
    .getElementById("username")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        document.getElementById("roomName").focus();
      }
    });

  document
    .getElementById("roomName")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        connect();
      }
    });
});
