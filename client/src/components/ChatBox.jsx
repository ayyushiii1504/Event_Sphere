import React, { useEffect, useState, useRef, useContext } from 'react';
import { io } from 'socket.io-client';
import { getChatHistory } from '../services/chatService';
import { AuthContext } from '../context/AuthContext';

let socket; // single client instance per component lifetime

const ChatBox = ({ eventId }) => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const scrollRef = useRef();

  const BACKEND_SOCKET = import.meta.env.VITE_BACKEND_SOCKET_URL || import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    // fetch existing messages from REST API
    const loadHistory = async () => {
      try {
        const hist = await getChatHistory(eventId);
        setMessages(hist || []);
      } catch (err) {
        console.error('Failed to load chat history', err);
      }
    };

    if (eventId) loadHistory();
  }, [eventId]);

  useEffect(() => {
    // connect socket
    socket = io(BACKEND_SOCKET, { transports: ['websocket'] });

    socket.on('connect', () => {
      if (eventId) socket.emit('joinEvent', eventId);
    });

    // receive messages broadcast by server
    socket.on('receiveMessage', (msg) => {
      // only push messages for this event (server already emits to room, so it's safe)
      if (msg?.eventId?.toString() === eventId?.toString() || String(msg.eventId) === String(eventId)) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    socket.on('connect_error', (err) => {
      console.warn('Socket connect error:', err);
    });

    return () => {
      if (socket) {
        socket.off('receiveMessage');
        socket.disconnect();
      }
    };
  }, [eventId, BACKEND_SOCKET]);

  useEffect(() => {
    // scroll to bottom on new message
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const send = (e) => {
    e?.preventDefault();
    if (!text.trim()) return;

    // rely on server broadcast (sender will also receive the server's 'receiveMessage')
    socket.emit('sendMessage', {
      eventId,
      senderId: user?._id || null,
      senderName: user?.name || 'Anonymous',
      text,
    });

    setText('');
  };

  return (
    <div className="border rounded p-3 h-80 flex flex-col bg-white">
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 mb-2 px-1">
        {messages.length === 0 && <div className="text-center text-gray-400">No messages yet. Say hi 👋</div>}
        {messages.map((m) => (
          <div key={m._id || Math.random()} className="text-sm">
            <div className="flex items-baseline gap-2">
              <strong className="text-primary">{m.senderName}</strong>
              <span className="text-gray-400 text-xs">• {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="ml-0 text-gray-800">{m.text}</div>
          </div>
        ))}
      </div>

      <form onSubmit={send} className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit" className="bg-primary-gradient text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
