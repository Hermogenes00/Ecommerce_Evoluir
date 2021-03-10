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
-- Table structure for table `itenspedidos`
--

DROP TABLE IF EXISTS `itenspedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itenspedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `valor` decimal(10,2) NOT NULL,
  `qtd` decimal(10,2) NOT NULL,
  `arquivo` text,
  `status` text,
  `altura` decimal(10,2) DEFAULT NULL,
  `largura` decimal(10,2) DEFAULT NULL,
  `posicaoTab` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `produtoId` int DEFAULT NULL,
  `pedidoId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `produtoId` (`produtoId`),
  KEY `pedidoId` (`pedidoId`),
  CONSTRAINT `itenspedidos_ibfk_1` FOREIGN KEY (`produtoId`) REFERENCES `produtos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `itenspedidos_ibfk_2` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itenspedidos`
--

LOCK TABLES `itenspedidos` WRITE;
/*!40000 ALTER TABLE `itenspedidos` DISABLE KEYS */;
INSERT INTO `itenspedidos` VALUES (42,30.00,100.00,'cartao de visita verniz localizado fr 4x1 e 4x4-1614946006745.pdf','CONCLUÍDO',NULL,NULL,'40','2021-03-05 12:06:38','2021-03-05 13:41:48',3,32),(43,30.00,100.00,'cartao de visita verniz localizado fr 4x1 e 4x4-1614975197356.pdf','EM_PRODUCAO',NULL,NULL,'10','2021-03-05 20:13:10','2021-03-06 11:03:50',3,33),(44,530.00,10000.00,'cartao de visita verniz localizado fr 4x1 e 4x4-1615032584716.pdf',NULL,NULL,NULL,NULL,'2021-03-06 12:09:35','2021-03-06 12:09:44',7,34);
/*!40000 ALTER TABLE `itenspedidos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-10 17:08:09
