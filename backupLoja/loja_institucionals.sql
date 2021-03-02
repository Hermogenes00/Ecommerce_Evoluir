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
-- Table structure for table `institucionals`
--

DROP TABLE IF EXISTS `institucionals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institucionals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `conteudo` longtext,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `slug` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institucionals`
--

LOCK TABLES `institucionals` WRITE;
/*!40000 ALTER TABLE `institucionals` DISABLE KEYS */;
INSERT INTO `institucionals` VALUES (10,'EVOLUIR GRÁFICA RÁPIDA ','<p style=\"margin: 0px 0px 15px; padding: 0px; text-align: justify; font-family: \'Open Sans\', Arial, sans-serif; font-size: 14px; background-color: #ffffff;\">Curabitur a ullamcorper est, id elementum augue. Aenean ornare risus leo, vitae finibus est posuere ut. Sed eget massa non elit dictum mattis in sed tortor. Morbi maximus lacinia semper. Etiam ligula quam, iaculis sed venenatis quis, facilisis id metus. Etiam odio velit, volutpat in sapien ac, elementum sollicitudin leo. Praesent ligula quam, commodo eget facilisis quis, euismod vitae purus. Curabitur quis felis convallis est lobortis pellentesque. Phasellus eu tincidunt lacus. Donec non scelerisque augue. Proin vitae nulla ullamcorper, dictum risus quis, rutrum velit. Morbi fringilla sodales turpis, quis venenatis mi venenatis quis. Maecenas rhoncus, ex nec vehicula facilisis, felis sapien euismod est, sit amet pellentesque diam orci at mi.</p>\r\n<p style=\"margin: 0px 0px 15px; padding: 0px; text-align: justify; font-family: \'Open Sans\', Arial, sans-serif; font-size: 14px; background-color: #ffffff;\">Donec ut sem elit. Duis hendrerit enim sed rutrum efficitur. Ut venenatis lobortis viverra. Nullam id justo rutrum, vulputate ipsum egestas, imperdiet metus. Morbi vitae arcu in est fermentum pretium ut vitae ligula. Donec a elit in lorem pretium tristique in et metus. Sed aliquet lectus ac ante sollicitudin blandit. Vestibulum id enim sit amet lectus accumsan fermentum et quis nunc. Nulla laoreet dapibus odio non vestibulum. Integer facilisis enim at lectus mollis finibus. Nullam sed mauris id diam fermentum aliquet vitae laoreet ipsum. Morbi sodales tortor nec convallis scelerisque.</p>\r\n<p style=\"margin: 0px 0px 15px; padding: 0px; text-align: justify; font-family: \'Open Sans\', Arial, sans-serif; font-size: 14px; background-color: #ffffff;\">Maecenas eget lectus nulla. Donec consequat, metus pretium bibendum feugiat, sem lacus egestas ipsum, non rutrum mi nunc a diam. Vivamus sed tortor in augue egestas euismod id maximus magna. Aliquam vestibulum sit amet massa vitae tincidunt. Nullam id purus id turpis scelerisque mollis id sed magna. Pellentesque tincidunt rhoncus convallis. Cras ornare nec ante quis faucibus. Morbi nec ex ac sapien fermentum ullamcorper. Quisque et dolor quis nibh pretium aliquam. Curabitur posuere urna elit, accumsan dignissim nisl aliquet id. Praesent scelerisque, turpis eu tincidunt dignissim, odio ante ultricies neque, id sollicitudin purus mi a magna. Cras sed maximus leo. Morbi ac tempor mi.</p>','2021-02-22 19:41:06','2021-02-26 19:41:39','EVOLUIR-GRAFICA-RAPIDA'),(11,' História das gráficas','<p style=\"box-sizing: border-box; margin: 0px 0px 20px; padding: 0px; border: 0px; outline: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: 23px; vertical-align: baseline; font-family: Roboto, sans-serif; font-size: 16px; background-color: #ffffff;\">Para se ter conhecimento sobre <a style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: 0px; font-variant: inherit; font-stretch: inherit; line-height: inherit; vertical-align: baseline; font-family: inherit; font-style: inherit; font-weight: inherit; background-color: transparent; color: #333333; text-decoration-line: none; transition: all 0.3s ease 0s;\" href=\"https://bgd.com.br/\">gr&aacute;fica digital</a>&nbsp;&eacute; necess&aacute;rio sim saber o que &eacute; e, antes de tudo, que a principal fun&ccedil;&atilde;o de uma gr&aacute;fica digital &eacute; oferecer servi&ccedil;os de impress&atilde;o.No entanto, at&eacute; chegar a esse resultado &eacute; interessante voltar um pouquinho no tempo para conhecer a hist&oacute;ria da palavra, do papel e da prensa por estar bastante ligada &agrave; hist&oacute;ria da gr&aacute;fica digital.Realmente, a necessidade &eacute; inerente ao homem, especialmente a de comunica&ccedil;&atilde;o.</p>\r\n<p style=\"box-sizing: border-box; margin: 0px 0px 20px; padding: 0px; border: 0px; outline: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: 23px; vertical-align: baseline; font-family: Roboto, sans-serif; font-size: 16px; background-color: #ffffff;\"><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://bgd.com.br/wp-content/uploads/2017/08/tudo-sobre-grafica-digital.png\" alt=\"\" width=\"800\" height=\"488\" />&nbsp;Em tempos remotos, o homem primitivo percebeu a necessidade de comunica&ccedil;&atilde;o e come&ccedil;ou rudemente a se comunicar.Inicialmente com os gestos e sinais, depois com a fala (sons, ru&iacute;dos) que lentamente foi desenvolvida e a escrita, nas figuras e pinturas, desenhos e s&iacute;mbolos impressos nas cavernas e superf&iacute;cies rochosas.Com o passar do tempo, todas essas formas de comunica&ccedil;&atilde;o passaram a ser organizadas e compreendidas.No entanto, era preciso imprimi-los de alguma forma e, assim, o homem desenvolveu t&eacute;cnicas para suporte da escrita at&eacute; chegar ao papel.</p>','2021-02-26 19:41:14','2021-02-26 19:41:14','Historia-das-graficas');
/*!40000 ALTER TABLE `institucionals` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-02 11:42:15
