INSERT INTO users(username, password, email) VALUES 
('theo', 'pwd', 'email@email'), ('fred', 'la compta', 'fred@labite'); 

INSERT INTO services (user_id, name) VALUES
(1, 'chirurgie'), (2, 'histoire'), (2, 'geo');

INSERT INTO actions (service_id, name) VALUES
(2, 'dire bonjour'), (1, 'voler'), (1, 'donner'), (2, 'dire au revoir'), (3, 'se moucher');

SELECT a.id, a.name, s.name
FROM actions a
JOIN services s ON (a.service_id = s.id)
join users u on (u.id = s.user_id)
where u.id = 2