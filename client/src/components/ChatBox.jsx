import React, { useEffect, useState, useRef, useContext } from 'react';
import { io } from 'socket.io-client';
import { getChatHistory } from '../services/chatService';
import { AuthContext } from '../context/AuthContext';

let socket;

const ChatBox = ({ eventId }) => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const scrollRef = useRef();

  const BACKEND_SOCKET = import.meta.env.VITE_BACKEND_SOCKET_URL || import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
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
    socket = io(BACKEND_SOCKET, { transports: ['websocket'] });
    socket.on('connect', () => {
      if (eventId) socket.emit('joinEvent', eventId);
    });
    socket.on('receiveMessage', (msg) => {
      if (msg?.eventId?.toString() === eventId?.toString() || String(msg.eventId) === String(eventId)) {
        setMessages((prev) => [...prev, msg]);
      }
    });
    socket.on('connect_error', (err) => console.warn('Socket connect error:', err));
    return () => {
      if (socket) { socket.off('receiveMessage'); socket.disconnect(); }
    };
  }, [eventId, BACKEND_SOCKET]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const send = (e) => {
    e?.preventDefault();
    if (!text.trim()) return;
    socket.emit('sendMessage', {
      eventId,
      senderId: user?._id || null,
      senderName: user?.name || 'Anonymous',
      text,
    });
    setText('');
  };

  return (
    <div className="border border-stone bg-light flex flex-col" style={{ height: '380px' }}>
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-10 h-px bg-stone mb-3" />
            <p className="text-sm font-sans text-muted">No messages yet. Be the first to say hello.</p>
            <div className="w-10 h-px bg-stone mt-3" />
          </div>
        )}
        {messages.map((m) => {
          const isMe = m.senderName === user?.name;
          return (
            <div key={m._id || Math.random()} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <div className="flex items-baseline gap-2 mb-1">
                <span className={`text-xs font-sans font-medium tracking-wide ${isMe ? 'text-primary' : 'text-charcoal'}`}>
                  {m.senderName}
                </span>
                <span className="text-xs font-sans text-muted">
                  {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className={`max-w-xs px-4 py-2.5 text-sm font-sans leading-relaxed ${
                isMe
                  ? 'bg-dark text-stone'
                  : 'bg-white border border-stone text-charcoal'
              }`}>
                {m.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="border-t border-stone p-4 flex gap-3 bg-white">
        <input
          className="flex-1 input-elegant text-sm py-2.5"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send(e)}
          placeholder="Write a message..."
        />
        <button
          onClick={send}
          className="btn-gold text-xs tracking-widest uppercase px-5 py-2.5"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
