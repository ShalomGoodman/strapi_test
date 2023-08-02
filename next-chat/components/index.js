import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import "antd/dist/antd.css";
// import "font-awesome/css/font-awesome.min.css";
import Header from "./Header";
import Messages from "./Messages";
import List from "./List";
import socket from "socket.io-client";
import {
  ChatContainer,
  StyledContainer,
  ChatBox,
  StyledButton,
  SendIcon,
} from "../pages/chat/styles";

function ChatRoom({ username, id }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [chatroom, setChatroom] = useState(`${id}`);
  const [joinedChats, setJoinedChats] = useState([]);
  const [chatName, setChatName] = useState("");

  // useEffect(() => {
  //   if (Object.keys(joinData).length > 0) {
  //     setMessages([joinData]);

  //     socket.on("message", (message, error) => {
  //       setMessages((msgs) => [...msgs, message]);
  //     });

  //     socket.on("roomInfo", (users) => {
  //       setUsers(users);
  //     });
  //   } else {
  //     history.push("/join");
  //   }
  // }, [joinData]);
  const io = socket("http://localhost:1337");
  let welcome;
useEffect(() => {
  io.on("disconnect", () => {
    io.off();
    location.replace("http://localhost:3000/");
    console.log("disconnected");
  });

  io.emit("join", { username, chatroom }, (error) => {
    if (error) return alert(error);
  });

  io.on("welcome", async (data, error) => {
    let welcomeMessage = {
      user: data.user,
      message: data.text,
    };
    welcome = welcomeMessage;
    setMessages([welcomeMessage]);

    await fetch(`http://localhost:1337/api/chatrooms/${chatroom}?populate=messages`)
      .then(async (res) => {
        const response = await res.json();
        let arr = [welcome];

        if (!response.data || !response.data.attributes || !response.data.attributes.messages || !response.data.attributes.messages.data) {
          console.log("Response data or messages data is undefined:", response);
          return;
        }

        response.data.attributes.messages.data.forEach((message) => {
          arr = [...arr, message.attributes];
        });

      
        setMessages((msgs) => arr);
      })
      .catch((e) => console.log(e.message));

      await fetch(`http://localhost:1337/api/active-users/${id}?populate=chatrooms`)
      .then(async (res) => {
        const response = await res.json();
    
        if (!response.data || !response.data.attributes || !response.data.attributes.chatrooms || !response.data.attributes.chatrooms.data) {
          console.log("Response data or chatrooms data is undefined:", response);
          return;
        }
    
        let arr = response.data.attributes.chatrooms.data.map((chatroom) => chatroom);
        console.log(arr);
        setJoinedChats(arr);
      })
      .catch((e) => console.log(e.message));
    
  });

  io.on("roomData", async (data) => {
    await fetch("http://localhost:1337/api/active-users").then(async (e) => {
      setUsers(await e.json());
    }); 
  });

  io.on("message", async (data, error) => {
    await fetch(`http://localhost:1337/api/chatrooms/${chatroom}?populate=messages`)
      .then(async (res) => {
        const response = await res.json();
        let arr = [welcome];

        if (!response.data || !response.data.attributes || !response.data.attributes.messages || !response.data.attributes.messages.data) {
          console.log("Response data or messages data is undefined:", response);
          return;
        }

        response.data.attributes.messages.data.forEach((message) => {
          arr = [...arr, message.attributes];
        });

        setMessages((msgs) => arr);
      })
      .catch((e) => console.log(e.message));
  });
}, [username, chatroom]);

    
  // useEffect(() => {
  //   io.on("message", (data) => {
  //     setMessages((msg) => [...msg, data]);
  //     console.log("message", messages);
  //   });
  // }, [users]);
  const sendMessage = (message, chatroom) => {
    console.log("message", message, "chatroom", chatroom);
    if (message) {
      let strapiData = {
        data: {
          user: username,
          message: message,
          chatroom: chatroom,
        },
      };
      io.emit("sendMessage", strapiData, (error) => {
        if (error) {
          alert(error);
        }
      });
      setMessage("");
    } else {
      alert("Message can't be empty");
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    setChatName(e.target.value);
  };

  const handleClick = () => {
    sendMessage(message, chatroom);
  };

  const handleChatCreate = async () => {
    let strapiData = {
      data: {
        chat_name: chatName,
        active_users: [{"id": 1}]
      },
    };
    await fetch("http://localhost:1337/api/chatrooms", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(strapiData),
    })
      .then(async (e) => {
        const response = await e.json();
        console.log(response);
        setChatroom(response.data.id);
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <ChatContainer>
      <Header room="Group Chat" />
      <StyledContainer>
        <List users={users} id={id} username={username} />
        
        <ChatBox>
          <Messages messages={messages} username={username} />
          <Input
            type="text"
            placeholder="Type your message"
            value={message}
            onChange={handleChange}
          />
          <StyledButton onClick={handleClick}>
            <SendIcon>
              <i className="fa fa-paper-plane" />
            </SendIcon>
          </StyledButton>
        </ChatBox>
      </StyledContainer>
      <h3>Joined Chats</h3>
      <input onChange={handleChange} type="text" placeholder="Make a chat name" /><Button onClick={handleChatCreate}>Create Chat</Button>
      <ul>
        {joinedChats.map((chat) => (
          <li onClick={() => setChatroom(chat.id)} key={chat.id}>{chat.attributes.chat_name}</li>
        ))}
      </ul>
    </ChatContainer>
  );
}

export default ChatRoom;
