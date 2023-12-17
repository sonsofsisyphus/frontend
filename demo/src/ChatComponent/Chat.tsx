import React, { useEffect, useState } from 'react';
import './Chat.css'; // Make sure to create a corresponding CSS file
import ChatMessages from './ChatMessages';
import ChattingComponent from './ChattingComponent';
import { ChatSendRequest, messageSendRequest } from './ChatMessageRow';
import { GetAllChats, GetMessages, SendMessage } from '../logic/backend';


const messageData = [
  {
    profileImage: 'url-to-image-1.jpg',
    nickname: 'Alice Johnson',
    lastMessage: 'Hey, are you free to talk?',
    userID: '1',
  },
  {
    profileImage: 'url-to-image-2.jpg', 
    nickname: 'Charlie Smith', 
    lastMessage: 'Meeting got rescheduled to 3 pm.',
    userID: '2',
  },
  // ... more message data
];

const messageData2Initial = [
  {
      messageID: "1",
      senderID: 'us',
      receiverID: 'them',
      content: "hi",
      dateTime: "15:00",
  },
  {
      messageID: "2",
      senderID: 'them',
      receiverID: 'us',
      content: "hi too",
      dateTime: "15:15",
  },
  // ... more message data
];
interface IChatProps {
  onClose: () => void;
}
const Chat: React.FC<IChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<messageSendRequest[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUserID, setSelectedUserID] = useState<string | null>(null);
  const [chats, setChats] = useState<ChatSendRequest[]>([]); 
  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUserID) {
      SendMessage(selectedUserID, newMessage);
      //setMessages([...messages, newMsg]);
      setNewMessage('');
      //setMessageData2([...messageData2, newMsg]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        if(selectedUserID !== null) {
          let response = await GetMessages(selectedUserID);
          console.log(response);
          setMessages(response);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 2000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        if(chats.length !== 0 && selectedUserID !== null) {
          let response = await GetMessages(selectedUserID);
          console.log(response);
          setMessages(response);
        }

      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 2000);

    return () => clearInterval(intervalId);
  }, [selectedUserID]);

  useEffect(() => {
    const fetchData = async () => {
      try {
          let response = await GetAllChats();
          setChats(response);

      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const handleRowClick = (userID: string) => {
    setSelectedUserID(userID);
  };
  return (
    <div className='chat-main-container' >
   <div className="chat-container">
      <div className="chat-header">
        <h2>Chat Room</h2>
      </div>
      <div className="chat-header2">
      <h2>
  {selectedUserID !== null
    ? (
      // Use optional chaining (?.) to safely access properties
      chats.find(a => a?.user.userID === selectedUserID)?.user.nickname || "None"
    )
    : "None"
  }
</h2>

      </div>
      <div className="chat-messages">
      <ChattingComponent messages={messages} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="chat-input-field"
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage} className="chat-send-button">Send</button>
      </div>
      
    </div>
   
    <br />
      <div className='chat-messages-box'>
    {chats && chats.length !== 0 ? <ChatMessages messageData= {chats} onRowClick={handleRowClick} />: "No chats here sir." }
    
    </div>
  
    </div>
 
  );
};

export default Chat;
