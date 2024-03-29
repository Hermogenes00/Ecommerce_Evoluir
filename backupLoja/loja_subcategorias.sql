-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: loja
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `subcategorias`
--

DROP TABLE IF EXISTS `subcategorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `categoriaId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoriaId` (`categoriaId`),
  CONSTRAINT `subcategorias_ibfk_1` FOREIGN KEY (`categoriaId`) REFERENCES `categorias` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategorias`
--

LOCK TABLES `subcategorias` WRITE;
/*!40000 ALTER TABLE `subcategorias` DISABLE KEYS */;
INSERT INTO `subcategorias` VALUES (1,'Padrão','Padrao','2021-02-12 20:21:35','2021-03-02 13:46:59',1),(2,'Vinil','Vinil','2021-02-26 14:29:22','2021-02-26 14:29:22',2),(3,'Brilho','Brilho','2021-02-26 14:29:47','2021-02-26 14:29:47',2),(4,'Fosco','Fosco','2021-02-26 14:29:54','2021-02-26 14:29:54',2),(5,'Couchê 50g','Couche-50gm','2021-02-26 14:37:14','2021-02-26 14:37:21',3),(6,'Verniz Total','Verniz-Total','2021-02-26 14:37:43','2021-02-26 14:37:43',3),(7,'Agenda Diária','Agenda-diaria','2021-02-26 14:41:21','2021-02-26 14:41:57',4),(8,'Agenda Escolar','Agenda-Escolar','2021-02-26 14:41:30','2021-02-26 14:41:30',4),(9,'Agenda Planner','Agenda-Planner','2021-02-26 14:41:40','2021-02-26 14:41:40',4),(10,'4 Páginas com dobra','4-Paginas-com-dobra','2021-02-26 14:42:45','2021-02-26 14:42:45',5),(11,'8 páginas com dobra','8-paginas-com-dobra','2021-02-26 14:42:59','2021-02-26 14:42:59',5),(12,'PVC','PVC','2021-02-26 14:43:22','2021-02-26 14:43:22',5),(13,'Simples','Simples','2021-02-26 14:43:28','2021-02-26 14:43:28',5),(14,'Vincado','Vincado','2021-02-26 14:43:39','2021-02-26 14:43:39',5),(15,'Wire O','Wire-O','2021-02-26 14:43:51','2021-02-26 14:43:51',5);
/*!40000 ALTER TABLE `subcategorias` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-17  8:44:11
