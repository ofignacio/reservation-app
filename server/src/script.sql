-- VERIFY AND CREATE DATABASE
DROP SCHEMA IF EXISTS `bethelspa`;
CREATE SCHEMA `bethelspa`;
USE `bethelspa`;

-- CREATE TABLES
CREATE TABLE `users` (
    `username` VARCHAR(20) NOT NULL,
    `password` BLOB NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(80) NOT NULL,
    `phone` VARCHAR(9) NOT NULL,
    `active` TINYINT(1) DEFAULT 1,
    `verified` TINYINT(1) DEFAULT 0,
    `code` VARCHAR(10) NOT NULL,
    `admin` TINYINT(1) DEFAULT 0,
    `type` VARCHAR(10) NOT NULL DEFAULT 'CI',
    `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY(`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `notifications` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    `title` VARCHAR(50) NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `type` VARCHAR(50) NULL,
    `idClass` INT(11) NULL,
    `idUsername` VARCHAR(20) NOT NULL,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`idUsername`) REFERENCES `users`(`username`) 
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `classes` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    `quota` VARCHAR(100) NOT NULL DEFAULT 1,
    `type` VARCHAR(50) NULL,
    `name` VARCHAR(50) NULL,
    `area` VARCHAR(50) NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `books` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    `idUsername` VARCHAR(20) NOT NULL,
    `idClass` INT(11) NOT NULL,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`idUsername`) REFERENCES `users`(`username`) 
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `primary` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `day` VARCHAR(50),
    `time` VARCHAR(50),
    `name` VARCHAR(50),
    `area` VARCHAR(50),
    `type` VARCHAR(50),
    `quota` INT(5),
    PRIMARY KEY(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

INSERT INTO `users`(`username`, `password`, `name`, `email`, `admin`, `code`, `verified`, `phone`, `type`) VALUES
    ('32150003', AES_ENCRYPT('test', 'avdfhHpPeEfqSmSXzW.15'), 'Mateo', 'mateo@bethelspa.com', 0, 'sdfsas', 1, '091111111', 'CI'),
    ('26751663', AES_ENCRYPT('test', 'avdfhHpPeEfqSmSXzW.15'), 'Lucas', 'lucas@bethelspa.com', 1, 'gdfsfsd', 1, '092222222', 'CI'),
    ('31937862', AES_ENCRYPT('test', 'avdfhHpPeEfqSmSXzW.15'), 'Juan', 'juan@bethelspa.com', 0, 'fdsfxzc', 1, '093333333', 'CI')
;

INSERT INTO `notifications`(`title`, `description`, `type`, `idUsername`) VALUES
    ('Bienvenido', 'Gracias por formar parte de nuestro espacio', NULL, '32150003'),
    ('Recordatorio', 'Recuerda que tienes una clase el 20/07 a las 22:00', 'CLASS', '31937862')
;

INSERT INTO `classes`(`date`, `quota`, `type`, `area`) VALUES
    ('2020/07/24 10:00', 20, NULL, 'MALVIN'),
    ('2020/07/24 11:00', 20, NULL, 'MALVIN'),
    ('2020/07/24 12:00', 20, NULL, 'MALVIN'),
    ('2020/07/24 16:00', 20, NULL, 'MALVIN'),
    ('2020/07/24 18:00', 20, NULL, 'MALVIN'),
    ('2020/07/24 20:00', 20, NULL, 'MALVIN'),
    ('2020/07/27 10:00', 20, NULL, 'MALVIN'),
    ('2020/07/27 11:00', 20, NULL, 'MALVIN'),
    ('2020/07/27 12:00', 20, NULL, 'MALVIN'),
    ('2020/07/27 16:00', 20, NULL, 'MALVIN'),
    ('2020/07/27 18:00', 20, NULL, 'MALVIN'),
    ('2020/07/27 20:00', 20, NULL, 'MALVIN'),
    ('2020/07/28 10:00', 20, NULL, 'MALVIN'),
    ('2020/07/28 11:00', 20, NULL, 'MALVIN'),
    ('2020/07/28 12:00', 20, NULL, 'MALVIN'),
    ('2020/07/28 16:00', 20, NULL, 'MALVIN'),
    ('2020/07/28 18:00', 20, NULL, 'MALVIN'),
    ('2020/07/28 20:00', 20, NULL, 'MALVIN'),
    ('2020/07/29 10:00', 20, NULL, 'MALVIN'),
    ('2020/07/29 11:00', 20, NULL, 'MALVIN'),
    ('2020/07/29 12:00', 20, NULL, 'MALVIN'),
    ('2020/07/29 16:00', 20, NULL, 'MALVIN'),
    ('2020/07/29 18:00', 20, NULL, 'MALVIN'),
    ('2020/07/29 20:00', 20, NULL, 'MALVIN'),
    ('2020/07/24 10:00', 20, 'SPINNING', 'CARRASCO'),
    ('2020/07/24 11:00', 20, 'FITNESS', 'CARRASCO'),
    ('2020/07/24 12:00', 20, 'FITNESS', 'CARRASCO'),
    ('2020/07/24 15:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/24 16:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/24 17:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/24 18:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/24 19:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/24 19:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/27 10:00', 20, 'SPINNING', 'CARRASCO'),
    ('2020/07/27 11:00', 20, 'FITNESS', 'CARRASCO'),
    ('2020/07/27 12:00', 20, 'FITNESS', 'CARRASCO'),
    ('2020/07/27 15:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/27 16:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/27 17:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/27 18:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/27 19:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/27 19:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/28 10:00', 20, 'SPINNING', 'CARRASCO'),
    ('2020/07/28 11:00', 20, 'FITNESS', 'CARRASCO'),
    ('2020/07/28 12:00', 20, 'FITNESS', 'CARRASCO'),
    ('2020/07/28 15:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/28 16:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/28 17:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/28 18:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/28 19:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/28 19:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/29 10:00', 20, 'SPINNING', 'CARRASCO'),
    ('2020/07/29 11:00', 20, 'FITNESS', 'CARRASCO'),
    ('2020/07/29 12:00', 20, 'FITNESS', 'CARRASCO'),
    ('2020/07/29 15:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/29 16:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/29 17:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/29 18:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/29 19:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/29 19:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/30 10:00', 20, 'SPINNING', 'CARRASCO'),
    ('2020/07/30 11:00', 20, 'FITNESS', 'CARRASCO'),
    ('2020/07/30 12:00', 20, 'FITNESS', 'CARRASCO'),
    ('2020/07/30 15:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/30 16:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/30 17:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/30 18:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/30 19:00', 10, 'SPINNING', 'CARRASCO'),
    ('2020/07/30 19:00', 10, 'SPINNING', 'CARRASCO')
;

INSERT INTO `books`(`idUsername`, `idClass`) VALUES
('32150003', 1),
('32150003', 2),
('32150003', 3),
('32150003', 4),
('32150003', 5),
('32150003', 6),
('32150003', 7),
('31937862', 1),
('31937862', 2),
('31937862', 3),
('31937862', 4),
('31937862', 5),
('31937862', 6),
('31937862', 7),
('32150003', 11),
('32150003', 12),
('32150003', 13),
('32150003', 14),
('32150003', 15),
('32150003', 16),
('32150003', 17),
('31937862', 11),
('31937862', 12),
('31937862', 13),
('31937862', 14),
('31937862', 15),
('31937862', 16),
('31937862', 17),
('32150003', 21),
('32150003', 22),
('32150003', 23),
('32150003', 24),
('32150003', 25),
('32150003', 26),
('32150003', 27),
('31937862', 21),
('31937862', 22),
('31937862', 23),
('31937862', 24),
('31937862', 25),
('31937862', 26),
('31937862', 27),
('32150003', 31),
('32150003', 32),
('32150003', 33),
('32150003', 34),
('32150003', 35),
('32150003', 36),
('32150003', 37),
('31937862', 31),
('31937862', 32),
('31937862', 33),
('31937862', 34),
('31937862', 35),
('31937862', 36),
('31937862', 37),
('32150003', 31),
('32150003', 32),
('32150003', 33),
('32150003', 34),
('32150003', 35),
('32150003', 36),
('32150003', 37),
('31937862', 38),
('31937862', 39),
('31937862', 40),
('31937862', 41),
('31937862', 42),
('31937862', 43),
('31937862', 44)
;

ALTER TABLE `notifications` DROP FOREIGN KEY notifications_ibfk_1;
ALTER TABLE `notifications` MODIFY `idUsername` VARCHAR(20) NULL;