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
  UNIQUE INDEX `category_id_UNIQUE` (`category_id` ASC) VISIBLE);
  
-- -----------------------------------------------------
-- Table `savet`.`emails_users`
-- -----------------------------------------------------

CREATE TABLE `savet`.`email_users` (
  `email_id` BIGINT NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `role` VARCHAR(15) NOT NULL,
  `status` TINYINT NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`email_id`),
  UNIQUE INDEX `email_id_UNIQUE` (`email_id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

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
  `email_id` BIGINT NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  /*UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);*/
  INDEX `email_id_idx` (`email_id` ASC) VISIBLE,
  CONSTRAINT `email_id`
  FOREIGN KEY (`email_id`)
  REFERENCES `savet`.`email_users` (`email_id`));

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