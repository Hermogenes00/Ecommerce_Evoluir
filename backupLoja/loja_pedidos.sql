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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (3,'2021-02-12 20:43:52',20.70,'CONCLUÍDO','40725305','Largo da Cruz','Praia Grande','SN','casa',24.30,45.00,'PAC_VISTA','2021-02-12 20:40:20','2021-02-12 20:54:50',1,1,NULL),(4,'2021-02-13 12:35:01',46.00,'EM_PRODUCAO','40725305','Largo da Cruz','Praia Grande','SN','casa',0.00,46.00,'BALCAO','2021-02-13 12:34:40','2021-02-13 14:03:03',1,1,NULL),(5,'2021-02-13 13:26:39',43.70,'CONCLUÍDO','40725305','Largo da Cruz','Praia Grande','SN','casa',0.00,43.70,'BALCAO','2021-02-13 13:26:26','2021-02-16 18:08:52',1,1,NULL),(8,'2021-02-16 17:03:08',4.60,'AGUARDANDO PAGAMENTO','48030000','Conjunto Alagoinhas IV','Alagoinhas Velha','0','CASA',21.00,25.60,'PAC_VISTA','2021-02-16 17:02:18','2021-02-16 17:03:08',2,2,NULL),(11,'2021-02-23 11:54:01',4.60,'CANCELADO','78705588','Rua Laudelino Martins Portela','Jardim Belo Horizonte','SN','CASA',0.00,4.60,'BALCAO','2021-02-23 11:53:38','2021-02-23 12:01:14',3,3,NULL),(14,NULL,60.00,'CARRINHO','78705588','Rua Laudelino Martins Portela','Jardim Belo Horizonte','SN','CASA',0.00,60.00,'BALCAO','2021-02-26 12:40:37','2021-02-26 12:43:49',3,3,NULL),(17,'2021-03-01 12:43:41',240.00,'EM_PRODUCAO','40725305','Largo da Cruz','Praia Grande','SN','casa',30.00,270.00,'RETIRA_BASE','2021-03-01 12:43:09','2021-03-01 12:49:32',1,1,1),(19,'2021-03-01 13:34:29',40.00,'AGUARDANDO PAGAMENTO','23057720','Rua Um','Inhoaíba','158','CASA',0.00,40.00,'BALCAO','2021-03-01 13:12:36','2021-03-01 13:34:29',4,4,NULL),(20,'2021-03-01 19:15:24',160.00,'AGUARDANDO PAGAMENTO','23057720','Rua Um','Inhoaíba','158','CASA',0.00,160.00,'BALCAO','2021-03-01 19:14:58','2021-03-01 19:15:24',4,4,NULL);
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

-- Dump completed on 2021-03-02 11:42:17
