"use strict";

const axios = require("axios");

module.exports = {
  bootstrap(/* { strapi } */) {
    var io = require("socket.io")(strapi.server.httpServer, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });

    io.on("connection", function (socket) {
      // This holds the username and active chatroom for this connection
      const userState = { username: null, chatroom: null };

      socket.on("join", async ({ username, chatroom }) => {
        if (!username || !chatroom) {
          console.log("Missing username or chatroom for join event");
          return;
        }

        console.log(`${username} connected to ${chatroom}`);
        socket.join(chatroom);
        userState.username = username;
        userState.chatroom = chatroom;

        socket.emit("welcome", {
          user: "bot",
          text: `Hello ${username}, You are in room: ${chatroom}`,
        });

        let strapiData = {
          data: {
            users: username,
            socketid: socket.id,
            chatrooms: [chatroom],  // assuming chatroom is the ID of the chatroom
          },
        };

        await axios
          .post("http://localhost:1337/api/active-users", strapiData)
          .then(async (e) => {
            socket.emit("roomData", { done: "true" });
          })
          .catch((e) => {
            if (e.message == "Request failed with status code 400") {
              socket.emit("roomData", { done: "existing" });
            }
          });
      });

      socket.on("sendMessage", async (data) => {
        const { user, message, chatroom } = data.data; // Extract properties from data.data
      
        if (!message || !user || !chatroom) {
          console.log("Missing message, username, or chatroom for sendMessage event");
          return;
        }
      
        let strapiData = {
          data: {
            user: user,
            message: message,
            chatroom: chatroom,
          },
        };
      
        await axios
          .post("http://localhost:1337/api/messages", strapiData)
          .then((e) => {
            socket.broadcast.to(chatroom).emit("message", {
              user: user,
              text: message,
            });
          })
          .catch((e) => console.log("error", e.message));
      });
      

      socket.on("privateMessage", async ({ recipient, message }) => {
        if (!recipient || !message || !userState.username) {
          console.log("Missing recipient, message, or username for privateMessage event");
          return;
        }

        // Sending a private message to the recipient
        socket.broadcast.to(recipient).emit("privateMessage", {
          sender: userState.username,
          text: message,
        });
      });

      socket.on("kick", (data) => {
        io.sockets.sockets.forEach((socket) => {
          if (socket.id === data.socketid) {
            socket.disconnect();
            socket.removeAllListeners();
            return console.log("kicked", socket.id, data.socketid);
          } else {
            console.log("Couldn't kick", socket.id, data.socketid);
          }
        });
      });
    });
  },
};
