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
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `cnpjCpf` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tel` varchar(255) NOT NULL,
  `cel1` varchar(255) NOT NULL,
  `cel2` varchar(255) NOT NULL,
  `cep` varchar(255) NOT NULL,
  `rua` text NOT NULL,
  `bairro` varchar(255) NOT NULL,
  `numero` varchar(255) NOT NULL,
  `complemento` varchar(255) NOT NULL,
  `cidade` varchar(255) NOT NULL,
  `uf` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'João Souza Santos','28547390006','joao@email.com','$2b$10$kDTFTphoXBIjv4hISDm37OstDyJ.r28Zzmq2kj3XM1eGSWkYfQnwW','71 3909-3575','71 99602-3852','71 99602-3852','40725305','Largo da Cruz','Praia Grande','SN','casa','Salvador','BA','2021-02-12 20:31:06','2021-02-12 20:31:06'),(2,'Hermógenes Batista dos Santos Neto','96364566073','neto@gmail.com','$2b$10$Tywpf7N8fXMo0uLuDST6munMLR3uFBAHMYqYkTUzjF.PT0c9hOpfW','75 0123-4567','75 91234-5678','75 91234-5678','48030000','Conjunto Alagoinhas IV','Alagoinhas Velha','0','CASA','Alagoinhas','BA','2021-02-16 14:30:32','2021-02-16 14:30:32'),(3,'Elaine Renata Moraes','72662544180','elaine@email.com','$2b$10$ZpkGPG1HbPvPqvuNXm1l7.EvsL06cHHas7MeZWNRnGb0JIcAH2./C','75 0123-4567','75 90123-1234','75 90123-1234','78705588','Rua Laudelino Martins Portela','Jardim Belo Horizonte','SN','CASA','Rondonópolis','MT','2021-02-22 20:04:03','2021-02-22 20:04:03'),(4,'Renan Guilherme Carlos da Mata','03837768481','renan@email.com','$2b$10$nnFrFRSy3bL3gsA8qqYTxexoH4aZuSNjjmkVQFdrZuiC3f.cLb.JS','75 1234-5678','75 91234-5678','75 91234-5678','23057720','Rua Um','Inhoaíba','158','CASA','Rio de Janeiro','RJ','2021-02-26 12:22:04','2021-02-26 12:22:04'),(5,'Márcia Daniela Porto','64429720037','marcia@email.com','$2b$10$nnFrFRSy3bL3gsA8qqYTxexoH4aZuSNjjmkVQFdrZuiC3f.cLb.JS','75 1234-5678','75 91234-5678','75 91234-5678','91792040','Acesso T','Restinga','995','CASA','Porto Alegre','RS','2021-02-26 12:23:28','2021-02-26 12:23:28'),(6,'Sueli Sara Silveira','43655773528','sueli@email.com','$2b$10$nnFrFRSy3bL3gsA8qqYTxexoH4aZuSNjjmkVQFdrZuiC3f.cLb.JS','75 1234-5678','75 91234-5678','75 91234-5678','76820226','Rua Abnatal Bentes de Lima','Agenor de Carvalho','462','CASA','Porto Velho','RO','2021-02-26 12:24:25','2021-02-26 12:24:25'),(7,'Oliver Nelson Nunes','15372722339','oliver@email.com','$2b$10$BYCEWYzJNPvIxzuznFREOerlOnNKXbfu8p3H04rYszLKzkA7pITsO','75 1234-5678','75 91234-5678','75 91234-5678','48020660','Rua Areia Branca','Kennedy','165','CASA','Alagoinhas','BA','2021-03-01 12:15:26','2021-03-01 12:15:26');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-02 11:42:16
