-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: facebook
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `user_role` enum('admin','user','moderator') NOT NULL,
  `hashed_password` varchar(255) NOT NULL,
  `school` varchar(255) NOT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `isOnline` tinyint(1) DEFAULT '0',
  `user_profile_pic` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `mobile` (`mobile`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Priyanka01','katre01','PriyankaKatre01','p01@gmail.com','moderator','12345','DEF','2323214','2000-12-12',0,'http://localhost:8000/uploads/user_profile_pic-1739815938545-237130689.jpeg','2025-02-04 21:24:51'),(7,'Priyanka04','katre04','priyankakatre04','p04@gmail.com','admin','12345','ABC','123457890','2000-12-12',0,'http://localhost:8000/uploads/user_profile_pic-1738706200485-487124309.jpeg','2025-02-04 21:56:40'),(8,'Priyanka05','katre05','priyankakatre05','p05@gmail.com','admin','12345','ABC','12457890','2000-12-12',0,'http://localhost:8000/uploads/user_profile_pic-1738706270820-819285381.jpeg','2025-02-04 21:57:50'),(11,'Priyanka06','katre06','priyankakatre06','p06@gmail.com','admin','12345','ABC','1245789011','2000-12-12',0,'http://localhost:8000/','2025-02-05 16:58:49'),(12,'Priyanka07','katre07','priyankakatre07','p07@gmail.com','admin','12345','ABC','124578901134','2000-12-12',0,'http://localhost:8000/','2025-02-05 16:59:43'),(13,'Priyanka08','katre08','priyankakatre08','p08@gmail.com','admin','12345','ABC','124578901834','2000-12-12',0,'http://localhost:8000/uploads/user_profile_pic-1739014494627-912504799.jpeg','2025-02-08 11:34:54'),(14,'Priyanka09','katre09','priyankakatre09','p09@gmail.com','admin','12345','ABC','1245789018348','2000-12-12',0,'http://localhost:8000/uploads/user_profile_pic-1739014544300-236987626.jpeg','2025-02-08 11:35:44'),(16,'Priyanka11','katre11','priyankakatre11','p11@gmail.com','admin','12345','ABC','12457890174rer','2000-12-12',0,'http://localhost:8000/uploads/user_profile_pic-1739113473403-4731742.jpeg','2025-02-09 15:04:33'),(17,'Priyanka12','katre12','priyankakatre12','p12@gmail.com','admin','$2b$10$9B8yR1GEcIk2FnvdX2GXaOmHZ7z0H9fBxBdJ46mEaojXOgpp86DcW','ABC','124578901745656','2000-12-12',0,'http://localhost:8000/uploads/user_profile_pic-1739113611822-243833023.jpeg','2025-02-09 15:06:51'),(18,'Priyanka12','katre13','priyankakatre13','p13@gmail.com','admin','$2b$10$IAQjlyO0ttvBKGCYNnmzOOAttEJubdn9cAptfZ/XXoKgXzvNMYJau','ABC','1245789017456560','2000-12-12',0,'http://localhost:8000/uploads/user_profile_pic-1739114024306-269595575.jpeg','2025-02-09 15:13:44'),(23,'Vamsi','Krishna','vamsikrishna','vamsi01@gmail.com','moderator','$2b$10$ymZeXSiYEadPrhL/5tJ84.zTKZ4ZvX5BtXRm25NodjOc7YyixthWq','ABC','12457890174565609889','2000-12-12',0,'http://localhost:8000/uploads/user_profile_pic-doctor3.png','2025-02-23 13:35:45');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-26 10:40:53
