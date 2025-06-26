'use client';

import { useState, useRef, useEffect } from 'react';
import { FaGavel, FaRegCommentDots } from 'react-icons/fa';

export default function ChatbotBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'Chatbot', content: '¡Hola! ¿En qué puedo ayudarte hoy?' }]);
  const [input, setInput] = useState('');
  const [hasNewReply, setHasNewReply] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('chatMessages');
      if (stored) setMessages(JSON.parse(stored));
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'Tú', content: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch('http://localhost:8083/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender: 'Usuario', content: input }),
      });

      const data = await res.json();
      const botMsg = { sender: data.sender, content: data.content };
      setMessages((prev) => [...prev, botMsg]);
      if (!isOpen) setHasNewReply(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: 'Chatbot', content: 'Ocurrió un error al conectarme 🛠️' },
      ]);
    }

    setInput('');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setHasNewReply(false);
  };

  return (
    <>
      <button onClick={toggleChat} style={styles.floatingButton}>
        💬
        {hasNewReply && <span style={styles.notificationDot}></span>}
      </button>

      <div
        style={{
          ...styles.container,
          transform: isOpen ? 'scale(1)' : 'scale(0)',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div style={styles.header}>
          <span><FaGavel style={{ marginRight: 8 }} />Asistente Virtual</span>
          <button onClick={toggleChat} style={styles.closeBtn}>✖</button>
        </div>

        <div style={styles.chatBox} ref={chatRef} className="chatbox">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                ...styles.message,
                alignSelf: msg.sender === 'Tú' ? 'flex-end' : 'flex-start',
                background: msg.sender === 'Tú'
                  ? 'linear-gradient(to right, #93c5fd, #60a5fa)'
                  : 'linear-gradient(to right, #c7d2fe, #a5b4fc)',
                color: '#111827',
                display: 'flex',
                alignItems: 'flex-start',
                gap: msg.sender === 'Tú' ? 0 : 8,
                animation: 'fadeIn 0.4s ease-in-out',
              }}
            >
              {msg.sender !== 'Tú' && (
                <FaRegCommentDots style={{ marginTop: 4, color: '#3b82f6' }} />
              )}
              <div>{msg.content}</div>
            </div>
          ))}
        </div>

        <div style={styles.inputSection}>
          <input
            type="text"
            value={input}
            placeholder="Escribe tu mensaje..."
            onChange={(e) => setInput(e.target.value)}
            style={styles.input}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage} style={styles.sendButton}>📤</button>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .chatbox::-webkit-scrollbar {
          width: 6px;
        }
        .chatbox::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 8px;
        }
        .chatbox {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
          overflow-x: hidden;
        }
      `}</style>
    </>
  );
}

const styles = {
  floatingButton: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    zIndex: 1001,
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: 60,
    height: 60,
    fontSize: 28,
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    cursor: 'pointer',
  },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 12,
    height: 12,
    backgroundColor: '#ef4444',
    borderRadius: '50%',
    border: '2px solid white',
  },
  container: {
    position: 'fixed',
    bottom: 90,
    right: 20,
    width: 340,
    backgroundColor: 'white',
    borderRadius: 15,
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 1000,
    transition: 'transform 0.3s ease, opacity 0.3s ease',
    transformOrigin: 'bottom right',
  },
  header: {
    backgroundColor: '#1e40af',
    color: 'white',
    padding: '12px 16px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: 16,
    cursor: 'pointer',
  },
  chatBox: {
    maxHeight: 300,
    overflowY: 'scroll',
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    backgroundColor: '#f3f4f6',
  },
  message: {
    maxWidth: '85%',
    padding: '8px 12px',
    borderRadius: 10,
    fontSize: '0.9rem',
    wordWrap: 'break-word',
  },
  inputSection: {
    display: 'flex',
    borderTop: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
  },
  input: {
    flex: 1,
    border: 'none',
    padding: '10px',
    outline: 'none',
    backgroundColor: 'transparent',
  },
  sendButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    cursor: 'pointer',
  },
};