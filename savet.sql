
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `category_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_id_UNIQUE` (`category_id`)
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

DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
  `service_id` bigint NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` varchar(100) NOT NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`service_id`),
  UNIQUE KEY `service_id_UNIQUE` (`service_id`)
);

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

INSERT INTO `users` VALUES (1,'josafatmunoz5@gmail.com','$2a$10$5qqIVsBeD1d0U3yTFomFA.SMp1hIpyVadzLmkSlSZzlQ53Zd8lDIa','admin',1,2);
