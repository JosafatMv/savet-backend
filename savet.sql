
-- -----------------------------------------------------
-- Schema savet
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `savet` DEFAULT CHARACTER SET utf8 ;
USE `savet` ;

-- -----------------------------------------------------
-- Table `savet`.`categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `savet`.`categories` ;
CREATE TABLE IF NOT EXISTS `savet`.`categories` (
  `category_id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`category_id`),
<<<<<<< HEAD
  UNIQUE INDEX `category_id_UNIQUE` (`category_id` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `savet`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `savet`.`users` ;
CREATE TABLE IF NOT EXISTS `savet`.`users` (
  `user_id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  `surname` VARCHAR(30) NOT NULL,
  `lastname` VARCHAR(30) NOT NULL,
  `birthdate` DATE NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `role` VARCHAR(15) NOT NULL,
  `status` TINYINT NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `savet`.`pets`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `savet`.`pets` ;
CREATE TABLE IF NOT EXISTS `savet`.`pets` (
  `pet_id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  `breed` VARCHAR(30) NOT NULL,
  `gender` VARCHAR(15) NOT NULL,
  `weight` DOUBLE NOT NULL,
  `status` TINYINT NOT NULL,
  `user_id` BIGINT NOT NULL,
  PRIMARY KEY (`pet_id`),
  UNIQUE INDEX `pet_id_UNIQUE` (`pet_id` ASC) VISIBLE,
  INDEX `fk_pets_users1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_pets_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `savet`.`users` (`user_id`));


-- -----------------------------------------------------
-- Table `savet`.`consultations`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `savet`.`consultations` ;
CREATE TABLE IF NOT EXISTS `savet`.`consultations` (
  `consultation_id` BIGINT NOT NULL AUTO_INCREMENT,
  `consultation_date` TIMESTAMP NOT NULL,
  `pet_id` BIGINT NOT NULL,
  PRIMARY KEY (`consultation_id`),
  UNIQUE INDEX `consultation_id_UNIQUE` (`consultation_id` ASC) VISIBLE,
  INDEX `fk_consultations_pets1_idx` (`pet_id` ASC) VISIBLE,
  CONSTRAINT `fk_consultations_pets1`
    FOREIGN KEY (`pet_id`)
    REFERENCES `savet`.`pets` (`pet_id`));


-- -----------------------------------------------------
-- Table `savet`.`medicines`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `savet`.`medicines` ;
CREATE TABLE IF NOT EXISTS `savet`.`medicines` (
  `medicine_id` BIGINT NOT NULL AUTO_INCREMENT,
  `tradename` VARCHAR(50) NOT NULL,
  `scientific_name` VARCHAR(50) NOT NULL,
  `brand` VARCHAR(30) NOT NULL,
  `batch` VARCHAR(30) NOT NULL,
  `date_expiry` DATE NOT NULL,
  `price` DOUBLE NOT NULL,
  `status` TINYINT NOT NULL,
  PRIMARY KEY (`medicine_id`),
  UNIQUE INDEX `medicine_id_UNIQUE` (`medicine_id` ASC) VISIBLE,
  UNIQUE INDEX `batch_UNIQUE` (`batch` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `savet`.`consultations_has_medicines`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `savet`.`consultations_has_medicines` ;
CREATE TABLE IF NOT EXISTS `savet`.`consultations_has_medicines` (
  `consultation_id` BIGINT NOT NULL,
  `medicine_id` BIGINT NOT NULL,
  PRIMARY KEY (`consultation_id`, `medicine_id`),
  INDEX `fk_consultations_has_medicines_medicines1_idx` (`medicine_id` ASC) VISIBLE,
  INDEX `fk_consultations_has_medicines_consultations1_idx` (`consultation_id` ASC) VISIBLE,
  CONSTRAINT `fk_consultations_has_medicines_consultations1`
    FOREIGN KEY (`consultation_id`)
    REFERENCES `savet`.`consultations` (`consultation_id`),
  CONSTRAINT `fk_consultations_has_medicines_medicines1`
    FOREIGN KEY (`medicine_id`)
    REFERENCES `savet`.`medicines` (`medicine_id`));


-- -----------------------------------------------------
-- Table `savet`.`products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `savet`.`products` ;
CREATE TABLE IF NOT EXISTS `savet`.`products` (
  `product_id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  `price` DOUBLE NOT NULL,
  `status` TINYINT NOT NULL,
  `category_id` BIGINT NOT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE INDEX `product_id_UNIQUE` (`product_id` ASC) VISIBLE,
  INDEX `fk_products_categories_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `fk_products_categories`
    FOREIGN KEY (`category_id`)
    REFERENCES `savet`.`categories` (`category_id`));


-- -----------------------------------------------------
-- Table `savet`.`consultations_has_products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `savet`.`consultations_has_products` ;
CREATE TABLE IF NOT EXISTS `savet`.`consultations_has_products` (
  `consultation_id` BIGINT NOT NULL,
  `product_id` BIGINT NOT NULL,
  PRIMARY KEY (`consultation_id`, `product_id`),
  INDEX `fk_consultations_has_products_products1_idx` (`product_id` ASC) VISIBLE,
  INDEX `fk_consultations_has_products_consultations1_idx` (`consultation_id` ASC) VISIBLE,
  CONSTRAINT `fk_consultations_has_products_consultations1`
    FOREIGN KEY (`consultation_id`)
    REFERENCES `savet`.`consultations` (`consultation_id`),
  CONSTRAINT `fk_consultations_has_products_products1`
    FOREIGN KEY (`product_id`)
    REFERENCES `savet`.`products` (`product_id`));


-- -----------------------------------------------------
-- Table `savet`.`payments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `savet`.`payments` ;
CREATE TABLE IF NOT EXISTS `savet`.`payments` (
  `payment_id` BIGINT NOT NULL,
  `date` DATE NOT NULL,
  `amount` DOUBLE NOT NULL,
  `consultation_id` BIGINT NOT NULL,
  PRIMARY KEY (`payment_id`, `consultation_id`),
  UNIQUE INDEX `id_payment_UNIQUE` (`payment_id` ASC) VISIBLE,
  INDEX `fk_payments_consultations1_idx` (`consultation_id` ASC) VISIBLE,
  CONSTRAINT `fk_payments_consultations1`
    FOREIGN KEY (`consultation_id`)
    REFERENCES `savet`.`consultations` (`consultation_id`));


-- -----------------------------------------------------
-- Table `savet`.`services`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `savet`.`services` ;
CREATE TABLE IF NOT EXISTS `savet`.`services` (
  `service_id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  `price` DOUBLE NOT NULL,
  `status` TINYINT NOT NULL,
  PRIMARY KEY (`service_id`),
  UNIQUE INDEX `service_id_UNIQUE` (`service_id` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `savet`.`services_has_consultations`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `savet`.`services_has_consultations` ;
CREATE TABLE IF NOT EXISTS `savet`.`services_has_consultations` (
  `service_id` BIGINT NOT NULL,
  `consultation_id` BIGINT NOT NULL,
  PRIMARY KEY (`service_id`, `consultation_id`),
  INDEX `fk_services_has_consultations_consultations1_idx` (`consultation_id` ASC) VISIBLE,
  INDEX `fk_services_has_consultations_services1_idx` (`service_id` ASC) VISIBLE,
  CONSTRAINT `fk_services_has_consultations_consultations1`
    FOREIGN KEY (`consultation_id`)
    REFERENCES `savet`.`consultations` (`consultation_id`),
  CONSTRAINT `fk_services_has_consultations_services1`
    FOREIGN KEY (`service_id`)
    REFERENCES `savet`.`services` (`service_id`));
    
INSERT INTO `pets` VALUES (1,'Gatote','Cat','Male',7,1,5),(2,'Rodolfo','Gato','Masculino',5,1,1);
INSERT INTO `users` VALUES (1,'Josafat','Muñoz','Valverde','2003-04-19','josafatmunoz5@gmail.com','$2a$10$N0hNFKnxiGvjnEHfB7ID9eJ6DsS.o/DGtrHH/xkoC8aC/rK9l7Us.','admin',1),(2,'Jonathan','Ramirez','Garcia','2003-09-20','jonathanramirez@gmail.com','$2a$10$hU2VgoPNa4N8.Y50jJpmtuujFvXn0Zq//2sTevJD3Zehhpw6susdW','veterinary',1),(3,'Cristopher','Soto','Ventura','2003-07-21','cristophersoto@gmail.com','$2a$10$azOUAGd/WrQnDR2E.9wJEuRCS1jvk8O7H6DijwPOUwzktirFvWRGS','admin',1),(4,'Yahir','Degante','Salinas','2003-12-08','yahirdegante@gmail.com','$2a$10$gGI5SiEGwti.Z/KePFazHu7rE715O24V6XgfXBsgm71CbvfzoukAG','admin',1),(5,'Cabron','James',NULL,'2003-02-12','cabronjames@gmail.com','$2a$10$cZl4P80IKjXUmgba3ewel.rkri59RsAXRzMKXs8aCG4NqzYjvcilS','client',1),(6,'Lionel Andres','Messi','Cuccitini','1985-09-20','messi@gmail.com','$2a$10$CkiN3Omzx3impHHuI49BuOmwbLlwl0Aka7WuZnODUbJxeP.K0kOCW','client',1);

=======
  UNIQUE KEY `category_id_UNIQUE` (`category_id`)
);
DROP TABLE IF EXISTS `personal`;
CREATE TABLE `personal` (
  `personal_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `surname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `birthdate` date NOT NULL,
  PRIMARY KEY (`personal_id`),
  UNIQUE KEY `user_id_UNIQUE` (`personal_id`)
);
INSERT INTO `personal` VALUES (2,'Josafat','Muñoz','Valverde','2003-04-19');
DROP TABLE IF EXISTS `pets`;
CREATE TABLE `pets` (
  `pet_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `breed` varchar(30) NOT NULL,
  `gender` varchar(15) NOT NULL,
  `weight` double NOT NULL,
  `personal_id` bigint NOT NULL,
  PRIMARY KEY (`pet_id`),
  UNIQUE KEY `pet_id_UNIQUE` (`pet_id`),
  KEY `fk_pets_users1_idx` (`personal_id`),
  CONSTRAINT `fk_pets_users1` FOREIGN KEY (`personal_id`) REFERENCES `personal` (`personal_id`)
);
INSERT INTO `pets` VALUES (1,'Gatote','Cat','Male',5,2),(2,'Gatote','Cat','Male',5,2);
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `product_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `description` varchar(100) NOT NULL,
  `price` double NOT NULL,
  `category_id` bigint NOT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `product_id_UNIQUE` (`product_id`),
  KEY `fk_products_categories_idx` (`category_id`),
  CONSTRAINT `fk_products_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
);
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `role` varchar(15) NOT NULL,
  `status` tinyint NOT NULL,
  `personal_id` bigint NOT NULL,
  PRIMARY KEY (`user_id`,`personal_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_users_personals1_idx` (`personal_id`),
  CONSTRAINT `fk_users_personals1` FOREIGN KEY (`personal_id`) REFERENCES `personal` (`personal_id`)
);
DROP TABLE IF EXISTS `consultations`;
CREATE TABLE `consultations` (
  `consultation_id` bigint NOT NULL AUTO_INCREMENT,
  `consultation_date` timestamp NOT NULL,
  `pet_id` bigint NOT NULL,
  PRIMARY KEY (`consultation_id`),
  UNIQUE KEY `consultation_id_UNIQUE` (`consultation_id`),
  KEY `fk_consultations_pets1_idx` (`pet_id`),
  CONSTRAINT `fk_consultations_pets1` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`pet_id`)
);
DROP TABLE IF EXISTS `consultations_has_medicines`;
CREATE TABLE `consultations_has_medicines` (
  `consultation_id` bigint NOT NULL,
  `medicine_id` bigint NOT NULL,
  PRIMARY KEY (`consultation_id`,`medicine_id`),
  KEY `fk_consultations_has_medicines_medicines1_idx` (`medicine_id`),
  KEY `fk_consultations_has_medicines_consultations1_idx` (`consultation_id`),
  CONSTRAINT `fk_consultations_has_medicines_consultations1` FOREIGN KEY (`consultation_id`) REFERENCES `consultations` (`consultation_id`),
  CONSTRAINT `fk_consultations_has_medicines_medicines1` FOREIGN KEY (`medicine_id`) REFERENCES `medicines` (`medicine_id`)
);
DROP TABLE IF EXISTS `consultations_has_products`;
CREATE TABLE `consultations_has_products` (
  `consultation_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  PRIMARY KEY (`consultation_id`,`product_id`),
  KEY `fk_consultations_has_products_products1_idx` (`product_id`),
  KEY `fk_consultations_has_products_consultations1_idx` (`consultation_id`),
  CONSTRAINT `fk_consultations_has_products_consultations1` FOREIGN KEY (`consultation_id`) REFERENCES `consultations` (`consultation_id`),
  CONSTRAINT `fk_consultations_has_products_products1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
);
DROP TABLE IF EXISTS `medicines`;
CREATE TABLE `medicines` (
  `medicine_id` bigint NOT NULL AUTO_INCREMENT,
  `tradename` varchar(50) NOT NULL,
  `scientific_name` varchar(50) NOT NULL,
  `brand` varchar(30) NOT NULL,
  `batch` varchar(30) NOT NULL,
  `date_expiry` date NOT NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`medicine_id`),
  UNIQUE KEY `medicine_id_UNIQUE` (`medicine_id`),
  UNIQUE KEY `batch_UNIQUE` (`batch`)
);
DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments` (
  `payment_id` bigint NOT NULL,
  `date` date NOT NULL,
  `amount` double NOT NULL,
  `consultation_id` bigint NOT NULL,
  PRIMARY KEY (`payment_id`,`consultation_id`),
  UNIQUE KEY `id_payment_UNIQUE` (`payment_id`),
  KEY `fk_payments_consultations1_idx` (`consultation_id`),
  CONSTRAINT `fk_payments_consultations1` FOREIGN KEY (`consultation_id`) REFERENCES `consultations` (`consultation_id`)
);


DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
  `service_id` bigint NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` varchar(100) NOT NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`service_id`),
  UNIQUE KEY `service_id_UNIQUE` (`service_id`)
);*


DROP TABLE IF EXISTS `services_has_consultations`;
CREATE TABLE `services_has_consultations` (
  `service_id` bigint NOT NULL,
  `consultation_id` bigint NOT NULL,
  PRIMARY KEY (`service_id`,`consultation_id`),
  KEY `fk_services_has_consultations_consultations1_idx` (`consultation_id`),
  KEY `fk_services_has_consultations_services1_idx` (`service_id`),
  CONSTRAINT `fk_services_has_consultations_consultations1` FOREIGN KEY (`consultation_id`) REFERENCES `consultations` (`consultation_id`),
  CONSTRAINT `fk_services_has_consultations_services1` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`)
);

#-----`services_has_consultations`----
insert insert`services_has_consultations` values (1 ,1);
insert insert`services_has_consultations` values (2 ,2);
insert insert`services_has_consultations` values (3 ,3);
insert insert`services_has_consultations` values (4 ,4);
insert insert`services_has_consultations` values (5 ,5);

#-----`services`-----
insert into `services` values (1, 'Dermatología', 'Se realiza estudios de la piel y pelo', 350.00);
insert into `services` values (2, 'Alimentación', 'Te recomiendan consejos para una buena alimentacion', 200.00);
insert into `services` values (3, 'Estomatología', 'Se realiza estudios de la dentadura', 180.00);
insert into `services` values (4, 'Higiene y prevención', 'Productos para cuidar a tu mascota', 600.00);
insert into `services` values (5, 'Oftalmología', 'Se realiza estudios oculares', 250.00);


#-----`payments`----
insert into `payments` values (1, '01-12-2022', '350.00', 1, 1);
insert into `payments` values (2, '10-11-2022', '220.00', 2, 2);
insert into `payments` values (3, '30-11-2022', '620.00', 3, 3);
insert into `payments` values (4, '06-12-2022', '317.00', 4, 4);
insert into `payments` values (5, '25-06-2022', '511.00', 5, 5);


#-----`medicines`----
insert into `medicines` values (1, 'Piroflox', 'Enrofloxacina', 'PiSa', '25486', '11-05-2023', 1);
insert into `medicines` values (2, 'Omepra', 'Inhibidor', 'MederiLab', '14789', '12-04-2023', 2);
insert into `medicines` values (3, 'Micofin', 'Terbinafina', 'Riverfarma', '98756', '02-03-2024', 3);
insert into `medicines` values (4, 'Espiranide', 'Metronidazol', 'PiSa', '85367', '25-09-2024', 4);
insert into `medicines` values (5, 'Vermiplex ', 'Puppy', 'PiSa', '59731', '14-01-2023', 5);

#----`consultations_has_products`----
insert into `consultations_has_products` values (21, 1, 21, 1);
insert into `consultations_has_products` values (22, 2, 22, 2);
insert into `consultations_has_products` values (23, 3, 23, 3);
insert into `consultations_has_products` values (24, 4, 24, 4);

#-----Inserts consultations_has_medicines ----
insert into `consultations_has_medicines` values (11, 1, 11, 1 );
insert into `consultations_has_medicines` values (12, 2, 12, 2 );
insert into `consultations_has_medicines` values (13, 3, 13, 3 );
insert into `consultations_has_medicines` values (14, 4, 14, 4 );
insert into `consultations_has_medicines` values (15, 5, 15, 5 );

#-----Inserts consultations---
insert into `consultations` values (1,'01-12-2022', 1, 1, 1);
insert into `consultations` values (2,'10-11-2022', 2, 2, 2);
insert into `consultations` values (3,'30-11-2022', 3, 3, 3);
insert into `consultations` values (4,'06-12-2022', 4, 4, 4);
insert into `consultations` values (5,'25-06-2022', 5, 5, 5);

INSERT INTO `users` VALUES (1,'josafatmunoz5@gmail.com','$2a$10$5qqIVsBeD1d0U3yTFomFA.SMp1hIpyVadzLmkSlSZzlQ53Zd8lDIa','admin',1,2);
#-----Inserts Pets-----
INSERT INTO `pets` VALUES (1,'Gatote','Cat','Male',5,2);
INSERT INTO `pets` VALUES (2,'Pepote','Dog','Male',7,3);
INSERT INTO `pets` VALUES (3,'Capibara','Capybara','Male',15,2);
INSERT INTO `pets` VALUES (4,'Gatito','Cat','Male',5,3);
INSERT INTO `pets` VALUES (5,'Rocky','Dog','Male',9,2);

#-----Inserts personal-----
INSERT INTO `personal` VALUES (2,'Josafat','Muñoz','Valverde','2003-04-19');
INSERT INTO `personal` VALUES (3,'Cristopher','Soto','Ventura','2003-06-06');
INSERT INTO `personal` VALUES (4,'Yahir','Degante','Salinas','2003-12-08');
INSERT INTO `personal` VALUES (5,'Jonathan','Ramirez','Garcia','2003-08-19');
INSERT INTO `personal` VALUES (6,'Cabron','James','Ortiz','2003-10-22');

#-----Inserts users------- 
INSERT INTO `users` VALUES ('josafatmunoz5@gmail.com','$2a$10$5qqIVsBeD1d0U3yTFomFA.SMp1hIpyVadzLmkSlSZzlQ53Zd8lDIa','admin',1,2);
INSERT INTO `users` VALUES ('cristophersoto@gmail.com','$2a$10$D3rWK86w6Dwk.wIjYKm1qO/ebCQIAWfELydb06M1LvyBnpwgTZGd6','admin',1,3);
INSERT INTO `users` VALUES ('yahirdegante@gmail.com','$2a$10$faNl2cYtbyH5hV.UFY8nOeWfGm9TvvN6D.2bA3ZvAneSyK94Vtzn2','admin',1,4);
INSERT INTO `users` VALUES ('jonathanramirez@gmail.com','$2a$10$3iNM.AIjH3rHDS.gs1BVfuSlhd1USEgEoPQyYB7sgQuLyhzy0ZX1i','veterinary',1,5);
INSERT INTO `users` VALUES ('cabronjames@gmail.com','$2a$10$hNEZ9qC1OKqvhTcw33ohsOhUqlyHLgGLHcdFlrAZzh52HO/05RJ9a','cliente',1,6);

#-----Inserts categories-----
INSERT INTO `categories` VALUES (1,'Alimentos');
INSERT INTO `categories` VALUES (2,'Juguetes');
INSERT INTO `categories` VALUES (3,'Accesorios');

#-----Inserts categories-----
INSERT INTO `products` VALUES (1,'Pedigre','alimento para perro adulto 10 kg',257.00,1);
INSERT INTO `products` VALUES (2,'Minino','alimento para gato 5 kg',66.00,1);
INSERT INTO `products` VALUES (3,'Pelota','pelota de goma',50.00,2);
INSERT INTO `products` VALUES (4,'Correa para gallo','Correa con pechera para gallo',250.00,3);
>>>>>>> 26c8aace062984bc60dfe1a51d065d6d4b40592e
