let socket = null;
let token = null;
let currentChatUser = null;

const chatBox = document.getElementById("chatBox");

function showToast(message, type="info") {
  const toast = document.createElement("div");
  toast.className = "toast " + type;
  toast.innerText = message;
  document.getElementById("toastContainer").appendChild(toast);
  setTimeout(() => toast.remove(), 4500);
}

function addMessage(user, msg, time, me=false) {
  const div = document.createElement("div");
  div.className = "message " + (me ? "me" : "other");
  div.innerHTML = `<b>${user}</b><br>${msg}<br><small>${new Date(time).toLocaleTimeString()}</small>`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

/* AUTH */
async function signup() {
  const res = await fetch("/api/v1/user/signup", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username: username.value, password: password.value })
  });
  const data = await res.json();
  data.success ? showToast("Signup successful 🎉", "success") : showToast("Signup failed ❌", "error");
}

async function login() {
  const res = await fetch("/api/v1/user/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username: username.value, password: password.value })
  });
  const data = await res.json();
  if (!data.success) return showToast("Login failed ❌", "error");
  token = data.data;
  showToast("Login successful 🔐", "success");
  connectSocket();
}

/* SOCKET */
function connectSocket() {
  socket = io("http://localhost:3000", { auth: { token } });

  socket.on("connect", () => showToast("Connected to server ⚡", "success"));

  socket.on("receive-message", msg => {
    addMessage(msg.from, msg.content, msg.time);
  });

  socket.on("chat_history", messages => {
    chatBox.innerHTML = "";
    messages.forEach(m => addMessage(m.from?.username || "User", m.content, m.time));
    showToast("Chat history loaded 📜", "info");
  });

  socket.on("connect_error", err => showToast("Socket auth failed 🚫", "error"));
}

/* CHAT */
function loadHistory() {
  currentChatUser = chatUser.value;
  socket.emit("history", currentChatUser);
}

function sendMessage() {
  const msg = messageInput.value;
  if(!msg) return;
  socket.emit("send", { to: currentChatUser, content: msg });
  addMessage("Me", msg, new Date(), true);
  messageInput.value = "";
}
