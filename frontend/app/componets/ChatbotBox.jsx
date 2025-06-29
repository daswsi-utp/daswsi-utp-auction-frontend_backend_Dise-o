'use client';

import { useState, useRef, useEffect } from 'react';
import { FaGavel, FaRegCommentDots } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import './Chatbot.css';

export default function ChatbotBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [hasNewReply, setHasNewReply] = useState(false);
  const chatRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('chatMessages');
      if (stored && JSON.parse(stored).length > 0) {
        setMessages(JSON.parse(stored));
      } else {
        const bienvenida = {
          sender: 'Chatbot',
          content: 'Hola 😊 ¿En qué puedo ayudarte hoy?',
          quickReplies: [
            { text: '📝 Crear subasta', value: 'crear subasta' },
            { text: '📜 Ver historial', value: 'ver historial' },
            { text: '💬 Otra pregunta', value: 'otra pregunta' },
          ]
        };
        setMessages([bienvenida]);
        localStorage.setItem('chatMessages', JSON.stringify([bienvenida]));
      }
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    await sendQuickMessage(input);
    setInput('');
  };

  const sendQuickMessage = async (text) => {
    const userMsg = { sender: 'Tú', content: text };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch('http://localhost:8083/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender: 'Usuario', content: text }),
      });

      const data = await res.json();
      const botMsg = {
        sender: data.sender,
        content: data.content,
        actionText: data.actionText,
        actionUrl: data.actionUrl,
      };
      setMessages((prev) => [...prev, botMsg]);
      if (!isOpen) setHasNewReply(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: 'Chatbot', content: 'Ocurrió un error al conectarme 🛠️' },
      ]);
    }
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
      <button onClick={toggleChat} className="chatbot-floatingButton">
        💬
        {hasNewReply && <span className="chatbot-notificationDot"></span>}
      </button>

      <div
        className="chatbot-container"
        style={{
          transform: isOpen ? 'scale(1)' : 'scale(0)',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="chatbot-header">
          <span><FaGavel style={{ marginRight: 8 }} />Asistente Virtual</span>
          <button onClick={toggleChat} className="chatbot-closeBtn">✖</button>
        </div>

        <div className="chatbox" ref={chatRef}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chatbot-message ${msg.sender === 'Tú' ? 'chatbot-user' : 'chatbot-bot'}`}
            >
              {msg.sender !== 'Tú' && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <FaRegCommentDots style={{ marginTop: 4, color: '#3b82f6' }} />
                    <div>{msg.content}</div>
                  </div>

                  {msg.actionText && msg.actionUrl && (
                    <button
                      onClick={() => router.push(msg.actionUrl)}
                      className="chatbot-actionButton"
                    >
                      👉 {msg.actionText}
                    </button>
                  )}

                  {msg.quickReplies && (
                    <div className="chatbot-quickReplies">
                      {msg.quickReplies.map((btn, i) => (
                        <button
                          key={i}
                          onClick={() => sendQuickMessage(btn.value)}
                          className="chatbot-quickReplyButton"
                        >
                          {btn.text}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
              {msg.sender === 'Tú' && <div>{msg.content}</div>}
            </div>
          ))}
        </div>

        <div className="chatbot-inputSection">
          <input
            type="text"
            value={input}
            placeholder="Escribe tu mensaje..."
            onChange={(e) => setInput(e.target.value)}
            className="chatbot-input"
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage} className="chatbot-sendButton">📤</button>
        </div>
      </div>
    </>
  );
}
