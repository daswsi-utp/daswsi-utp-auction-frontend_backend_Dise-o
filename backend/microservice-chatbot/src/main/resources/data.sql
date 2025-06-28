CREATE DATABASE chatbot_db;
USE chatbot_db;
CREATE TABLE IF NOT EXISTS chat_response (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    keywords TEXT,
    response TEXT,
    action_text VARCHAR(255),
    action_url VARCHAR(255)
);

-- QUERIDO GRUPO AQUI PONEMOS LOS VALORES QUE CONOCERÁ EL CHATBOT
INSERT INTO chat_response (keywords, response, action_text, action_url) VALUES
('crear subasta, nueva subasta, publicar artículo, hacer subasta',
 'Haz clic en el botón para crear subasta',
 '👉 Crear subasta',
 '/create-auction'),

('ver productos, mostrar artículos, productos disponibles, ver catálogo',
 'Aquí puedes explorar todos los productos disponibles.',
 '🛍️ Ver productos',
 '/'),

('ver historial, historial de subastas, mis subastas pasadas',
 'Aquí tienes tu historial de subastas.',
 '📜 Ver historial',
 '/history'),

('editar perfil, cambiar nombre, actualizar datos, modificar cuenta',
 'Puedes editar tu perfil desde el siguiente botón.',
 '⚙️ Editar perfil',
 '/login/profile'),

('otra pregunta, algo más, diferente duda',
 'Claro, dime qué necesitas y trataré de ayudarte.',
 null,
 null);

-- Por si toca borrar por bug o algo
DROP DATABASE IF EXISTS chatbot_db; 