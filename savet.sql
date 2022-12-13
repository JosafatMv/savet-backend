
--
-- `categories`
--
DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `category_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `status` tinyint NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_id_UNIQUE` (`category_id`)
);
INSERT INTO `categories` VALUES (1,'Ropa',1),(2,'Comida',1),(3,'Collares',1),(4,'Juguetes',1);


--
-- `consultations`
--
DROP TABLE IF EXISTS `consultations`;
CREATE TABLE `consultations` (
  `consultation_id` bigint NOT NULL AUTO_INCREMENT,
  `consultation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `pet_id` bigint NOT NULL,
  PRIMARY KEY (`consultation_id`),
  UNIQUE KEY `consultation_id_UNIQUE` (`consultation_id`),
  KEY `fk_consultations_pets1_idx` (`pet_id`),
  CONSTRAINT `fk_consultations_pets1` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`pet_id`)
);


--
-- `consultations_has_medicines`
--
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

--
-- `consultations_has_medicines`
--
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

--
-- view `madeservices`
--
DROP TABLE IF EXISTS `madeservices`;
/*!50001 DROP VIEW IF EXISTS `madeservices`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `madeservices` AS SELECT 
 1 AS `consultation_id`,
 1 AS `service_id`,
 1 AS `name`,
 1 AS `description`,
 1 AS `price`,
 1 AS `status`*/;
SET character_set_client = @saved_cs_client;

--
-- `medicines`
--

DROP TABLE IF EXISTS `medicines`;
CREATE TABLE `medicines` (
  `medicine_id` bigint NOT NULL AUTO_INCREMENT,
  `tradename` varchar(50) NOT NULL,
  `scientific_name` varchar(50) NOT NULL,
  `brand` varchar(30) NOT NULL,
  `batch` varchar(30) NOT NULL,
  `date_expiry` date NOT NULL,
  `price` double NOT NULL,
  `status` tinyint NOT NULL,
  PRIMARY KEY (`medicine_id`),
  UNIQUE KEY `medicine_id_UNIQUE` (`medicine_id`),
  UNIQUE KEY `batch_UNIQUE` (`batch`)
);


--
-- `payments`
--
DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments` (
  `payment_id` bigint NOT NULL AUTO_INCREMENT,
  `date` timestamp NULL DEFAULT NULL,
  `amount` double NOT NULL,
  `paid` tinyint NOT NULL,
  `consultation_id` bigint NOT NULL,
  PRIMARY KEY (`payment_id`,`consultation_id`),
  UNIQUE KEY `id_payment_UNIQUE` (`payment_id`),
  KEY `fk_payments_consultations1_idx` (`consultation_id`),
  CONSTRAINT `fk_payments_consultations1` FOREIGN KEY (`consultation_id`) REFERENCES `consultations` (`consultation_id`)
);

--
-- `payments`
--

--
-- view `paymentsinformation`
--

DROP TABLE IF EXISTS `paymentsinformation`;
/*!50001 DROP VIEW IF EXISTS `paymentsinformation`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `paymentsinformation` AS SELECT 
 1 AS `payment_id`,
 1 AS `date`,
 1 AS `amount`,
 1 AS `paid`,
 1 AS `consultation_id`,
 1 AS `name`,
 1 AS `pet_id`,
 1 AS `user_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `pets`
--
DROP TABLE IF EXISTS `pets`;
CREATE TABLE `pets` (
  `pet_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `breed` varchar(30) NOT NULL,
  `gender` varchar(15) NOT NULL,
  `weight` double NOT NULL,
  `status` tinyint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`pet_id`),
  UNIQUE KEY `pet_id_UNIQUE` (`pet_id`),
  KEY `fk_pets_users1_idx` (`user_id`),
  CONSTRAINT `fk_pets_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);

--
-- `pets`
--

--
-- `products`
--
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `product_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `description` varchar(100) NOT NULL,
  `price` double NOT NULL,
  `status` tinyint NOT NULL,
  `img_url` varchar(100) NOT NULL,
  `category_id` bigint NOT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `product_id_UNIQUE` (`product_id`),
  KEY `fk_products_categories_idx` (`category_id`),
  CONSTRAINT `fk_products_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
);


--
-- view `purchasedproducts`
--
DROP TABLE IF EXISTS `purchasedproducts`;
/*!50001 DROP VIEW IF EXISTS `purchasedproducts`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `purchasedproducts` AS SELECT 
 1 AS `consultation_id`,
 1 AS `product_id`,
 1 AS `name`,
 1 AS `description`,
 1 AS `price`,
 1 AS `status`,
 1 AS `img_url`,
 1 AS `category_id`*/;
SET character_set_client = @saved_cs_client;

--
-- `services`
--
DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
  `service_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `description` varchar(100) NOT NULL,
  `price` double NOT NULL,
  `status` tinyint NOT NULL,
  PRIMARY KEY (`service_id`),
  UNIQUE KEY `service_id_UNIQUE` (`service_id`)
);

--
-- Table structure for table `services_has_consultations`
--
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

--
-- view `usedmedicines`
--

DROP TABLE IF EXISTS `usedmedicines`;
/*!50001 DROP VIEW IF EXISTS `usedmedicines`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `usedmedicines` AS SELECT 
 1 AS `consultation_id`,
 1 AS `medicine_id`,
 1 AS `tradename`,
 1 AS `scientific_name`,
 1 AS `brand`,
 1 AS `batch`,
 1 AS `date_expiry`,
 1 AS `price`,
 1 AS `status`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `surname` varchar(30) NOT NULL,
  `lastname` varchar(30) DEFAULT NULL,
  `birthdate` date NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `role` varchar(15) NOT NULL,
  `status` tinyint NOT NULL,
  `email_confirmation` tinyint NOT NULL,
  `code` varchar(200) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);


--
-- Final view structure for view `madeservices`
--

/*!50001 DROP VIEW IF EXISTS `madeservices`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `madeservices` AS select `shc`.`consultation_id` AS `consultation_id`,`s`.`service_id` AS `service_id`,`s`.`name` AS `name`,`s`.`description` AS `description`,`s`.`price` AS `price`,`s`.`status` AS `status` from (`services_has_consultations` `shc` join `services` `s` on((`shc`.`service_id` = `s`.`service_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `paymentsinformation`
--

/*!50001 DROP VIEW IF EXISTS `paymentsinformation`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `paymentsinformation` AS select `p`.`payment_id` AS `payment_id`,`p`.`date` AS `date`,`p`.`amount` AS `amount`,`p`.`paid` AS `paid`,`p`.`consultation_id` AS `consultation_id`,`pe`.`name` AS `name`,`pe`.`pet_id` AS `pet_id`,`pe`.`user_id` AS `user_id` from ((`payments` `p` join `consultations` `c` on((`c`.`consultation_id` = `p`.`consultation_id`))) join `pets` `pe` on((`pe`.`pet_id` = `c`.`pet_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `purchasedproducts`
--

/*!50001 DROP VIEW IF EXISTS `purchasedproducts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `purchasedproducts` AS select `chp`.`consultation_id` AS `consultation_id`,`p`.`product_id` AS `product_id`,`p`.`name` AS `name`,`p`.`description` AS `description`,`p`.`price` AS `price`,`p`.`status` AS `status`,`p`.`img_url` AS `img_url`,`p`.`category_id` AS `category_id` from (`consultations_has_products` `chp` join `products` `p` on((`chp`.`product_id` = `p`.`product_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `usedmedicines`
--

/*!50001 DROP VIEW IF EXISTS `usedmedicines`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `usedmedicines` AS select `chm`.`consultation_id` AS `consultation_id`,`m`.`medicine_id` AS `medicine_id`,`m`.`tradename` AS `tradename`,`m`.`scientific_name` AS `scientific_name`,`m`.`brand` AS `brand`,`m`.`batch` AS `batch`,`m`.`date_expiry` AS `date_expiry`,`m`.`price` AS `price`,`m`.`status` AS `status` from (`consultations_has_medicines` `chm` join `medicines` `m` on((`chm`.`medicine_id` = `m`.`medicine_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

