'use client';

import { useState, useRef, useEffect } from 'react';

export default function ChatbotBox() {
  const [messages, setMessages] = useState([
    { sender: 'Chatbot', content: '¡Hola! ¿En qué puedo ayudarte hoy?' },
  ]);
  const [input, setInput] = useState('');
  const chatRef = useRef(null);

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
      setMessages((prev) => [...prev, { sender: data.sender, content: data.content }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'Chatbot', content: 'Ocurrió un error al conectarme 🛠️' },
      ]);
    }

    setInput('');
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={styles.container}>
      <div style={styles.chatBox} ref={chatRef}>
        {messages.map((msg, idx) => (
          <div key={idx} style={msg.sender === 'Tú' ? styles.userMsg : styles.botMsg}>
            <strong>{msg.sender}: </strong>{msg.content}
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
        <button onClick={sendMessage} style={styles.button}>Enviar</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    width: 320,
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: 10,
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 1000,
  },
  chatBox: {
    maxHeight: 300,
    overflowY: 'auto',
    padding: 10,
    fontSize: '0.9rem',
  },
  userMsg: {
    textAlign: 'right',
    margin: '5px 0',
    color: '#1d4ed8',
  },
  botMsg: {
    textAlign: 'left',
    margin: '5px 0',
    color: '#111827',
  },
  inputSection: {
    display: 'flex',
    borderTop: '1px solid #e5e7eb',
  },
  input: {
    flex: 1,
    border: 'none',
    padding: '10px',
    outline: 'none',
  },
  button: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
  },
};
