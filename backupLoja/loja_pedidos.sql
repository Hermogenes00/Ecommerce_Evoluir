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
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdOrder` datetime DEFAULT NULL,
  `total` decimal(10,2) NOT NULL DEFAULT '0.00',
  `status` varchar(255) NOT NULL,
  `cep` varchar(255) NOT NULL,
  `rua` text NOT NULL,
  `bairro` varchar(255) NOT NULL,
  `numero` varchar(255) NOT NULL,
  `complemento` varchar(255) NOT NULL,
  `valorFrete` decimal(10,2) NOT NULL DEFAULT '0.00',
  `valorFinal` decimal(10,2) NOT NULL DEFAULT '0.00',
  `metodoEnvio` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `clienteId` int DEFAULT NULL,
  `enderecoId` int DEFAULT NULL,
  `regiaoEntregaId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `clienteId` (`clienteId`),
  KEY `enderecoId` (`enderecoId`),
  KEY `regiaoEntregaId` (`regiaoEntregaId`),
  CONSTRAINT `pedidos_ibfk_3` FOREIGN KEY (`regiaoEntregaId`) REFERENCES `regiaoentregas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_6` FOREIGN KEY (`regiaoEntregaId`) REFERENCES `regiaoentregas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_7` FOREIGN KEY (`clienteId`) REFERENCES `clientes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_8` FOREIGN KEY (`enderecoId`) REFERENCES `enderecos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_9` FOREIGN KEY (`regiaoEntregaId`) REFERENCES `regiaoentregas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (32,'2021-03-05 12:06:53',30.00,'CONCLUÍDO','40725305','Largo da Cruz','Praia Grande','SN','casa',0.00,30.00,'ENTREGA_A_DOMICILIO','2021-03-05 12:06:38','2021-03-05 13:41:48',1,1,NULL),(33,'2021-03-05 20:13:27',30.00,'CONCLUÍDO','40725305','Largo da Cruz','Praia Grande','SN','casa',0.00,30.00,'ENTREGA_A_DOMICILIO','2021-03-05 20:13:10','2021-03-15 19:33:08',1,1,NULL),(34,'2021-03-06 12:09:48',530.00,'CONCLUÍDO','40725305','Largo da Cruz','Praia Grande','SN','casa',0.00,530.00,'ENTREGA_A_DOMICILIO','2021-03-06 12:09:35','2021-03-15 19:33:10',1,1,NULL),(53,'2021-03-15 18:09:32',879.20,'AGUARDANDO PAGAMENTO','40725305','Largo da Cruz','Praia Grande','SN','casa',0.00,879.20,'ENTREGA_A_DOMICILIO','2021-03-15 18:08:11','2021-03-15 18:09:32',1,1,NULL),(56,NULL,150530.00,'CARRINHO','40725305','Largo da Cruz','Praia Grande','SN','casa',0.00,150530.00,'ENTREGA_A_DOMICILIO','2021-03-16 20:21:09','2021-03-16 20:24:16',1,1,NULL);
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-17  8:44:12
