DROP DATABASE IF EXISTS chatbot_db;
CREATE DATABASE chatbot_db;
USE chatbot_db;

CREATE TABLE IF NOT EXISTS chat_response (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    keyword VARCHAR(255),
    response VARCHAR(255),
    action_text VARCHAR(255),
    action_url VARCHAR(255)
);

-- 1 CREAR SUBASTA
INSERT INTO chat_response (keyword, response, action_text, action_url)
VALUES ('Crear subasta', 'Haz clic en el botón para crear subasta', 'Crear subasta', '/create-auction');

-- 2 VER HISTORIAL
INSERT INTO chat_response (keyword, response, action_text, action_url)
VALUES ('historial', 'Para ver tu historial de subastas ve a tu perfil y abre la pestaña "Subastas"', 'Ver perfil', '/login/profile');

-- Como pujar
INSERT INTO chat_response (keyword, response, action_text, action_url)
VALUES ('pujar', 'Para subastar elige un producto y realiza una puja superior a la puja mínima', null, null);

-- Como editar perfil
INSERT INTO chat_response (keyword, response, action_text, action_url)
VALUES ('editar perfil', 'Puedes editar tu perfil desde aquí:', 'Editar perfil', '/login/profile');