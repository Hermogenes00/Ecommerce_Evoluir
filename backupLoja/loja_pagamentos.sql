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
-- Table structure for table `pagamentos`
--

DROP TABLE IF EXISTS `pagamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagamentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total` decimal(10,2) NOT NULL,
  `referencia` text NOT NULL,
  `status` varchar(255) NOT NULL,
  `comprovante` longtext,
  `informe` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `pedidoId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pedidoId` (`pedidoId`),
  CONSTRAINT `pagamentos_ibfk_1` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagamentos`
--

LOCK TABLES `pagamentos` WRITE;
/*!40000 ALTER TABLE `pagamentos` DISABLE KEYS */;
INSERT INTO `pagamentos` VALUES (1,45.00,'1613162638422','RECEBIDO','data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlFNEVGNzhDMkNCRDExRTY4MjQ5QkQxMzlCNjJCMDQ1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlFNEVGNzhEMkNCRDExRTY4MjQ5QkQxMzlCNjJCMDQ1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUU0RUY3OEEyQ0JEMTFFNjgyNDlCRDEzOUI2MkIwNDUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUU0RUY3OEIyQ0JEMTFFNjgyNDlCRDEzOUI2MkIwNDUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAACAgICAgICAgICAwICAgMEAwIC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','Aceito','2021-02-12 20:43:52','2021-02-12 20:48:56',3),(2,46.00,'1613219701729','RECEBIDO','data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlFNEVGNzhDMkNCRDExRTY4MjQ5QkQxMzlCNjJCMDQ1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlFNEVGNzhEMkNCRDExRTY4MjQ5QkQxMzlCNjJCMDQ1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUU0RUY3OEEyQ0JEMTFFNjgyNDlCRDEzOUI2MkIwNDUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUU0RUY3OEIyQ0JEMTFFNjgyNDlCRDEzOUI2MkIwNDUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAACAgICAgICAgICAwICAgMEAwICAwQFBAQEBAQFBgUFBQUFBQYGBwcIBwcGCQkKCgkJDAwMDAwMDAwMDAwMDAwMAQMDAwUEBQkGBgkNCwkLDQ8ODg4ODw8MDAwMDA8PDAwMDAwMDwwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCACYALQDAREAAhEBAxEB/8QAsQABAAEEAwEBAAAAAAAAAAAAAAcEBQYJAgMIAQoBAQACAgMBAAAAAAAAAAAAAAADBQQGAQIHCBAAAQQBAgMFBQQHBgcBAAAAAQACAwQFEQYhEgcxQSITCFFhcTIUgZGhUrHBQrIjMxVicrMkFhfR4YKSosKkCREAAgECAwQHBgQEBwEAAAAAAAECEQMhMQRBYRIFUXGB0SIyBpGhsUITFPDB4QfxUmKScqLC0iMzFkP/2gAMAwEAAhEDEQA/AN/iAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAID4SACSdAOJKAir/AFBlGyySQ3HiN7y5sbtHgAnUDxA6ezggK2PduUZoHMglA01LmEE+35XAcfggKpu8bQJL6cTgdOUBzmke3U8ddfggOs7vvaHlrwA66gkOOg17NOYcdO/8O5AXza+56u5q+QdAx8djEXZsdkY3DQCeBxa4s4nwu01b7igMnQHi3dnrU2ftje2e2pDtXIZ/H4Kz9G/cFGxDyzTR+GyGRSBnCN+rAefRxB7G6E0Go9Q2bNxw4W0sKqnaa9f9RWrV2UOFtLCqpntLlQ9aXTS5/N23uiodfDzVqbwR7fBcKg/9XpVmpexd53h6hsS+WXsXeZDF6sunE41jxG4ye4GrWGv/ANShn6y0Mdk/Yu8yI84tSyUvYu8+u9Um15APo9q5uV2vETCtENPaC2aT9Cwrvr3RxyhN/wBq/Nky5hGWUX7u8o2+ojO5R3lYbY8UBd8k9u46Qa+9jIWfvLC/947rpas9rl+SX5nb7qcso+86c3u/rDexr7ovVdv1XcA6jWaHHm7PFYMztfe3RS3+cczuW+Oqgty/3VI7k77WdOpd5k3p4mzlrHbwuZ3MXs1ZkykcbbV2d85aGQNJYznceUDm10HDirb0pfu37V2dyTk+KmLrsXec8vUqScm3jtPRS2ssQgCAIAgCAIAgCAt2WmFfGXZe8ROa3X8z/C38SgIgQBAEAQFf06/ym6d90uxl/wDp2Xhb3ASwGq/75Kzj9qAwD1R9YT012WcHhLRi3pvGOWrinxkh9OqAG2Lmo+VzQ7lj/tnmGoY5UvO+Y/aWuGL8csty2vu3lNzrmH21rhi/HLBbltfdvNUeKxLTyjl4BeZ3r1DSLVqpJmJwrTy+BVF/Ulvp9NUkvFYNhDfB+CpNRqi90+jRIuKwlVhabFF9pn5I5RET9pa5YEdZaUv+WrW4ubOi3Ex7IfjX5htSvtGtWx2MhN3cOZvXZbH09duvK1sbGRMMkhGjQSe86HReh+l73Lr0Z3Vaat21WU5ybS7FRVewlnYcGlRHTvXfb8kyaOJja9MEirVaAA1g4NB079Fgcy9WPVtqKpHYuhbCO9boi4dHeoe19rYDK0sxfMWSvZh8zKrW6ktdBA1p+3Rb96DbloJTfzXH8Iog0ypF9Z6trzMswQ2GAhkzA9mvA6OGoW6mSdyAIAgCAIAgCAIDGd1zeXixHrobEzWae5ur/wBLQgI1QBAEAQFGdy4fY9+1u3P3G0MNVwVtmTsuPEmtPBJWjY39p7jNKGgdpUd69GzBzk6JIivXo2YOc3RJVNVW/N+ZfqlvXLbyzWscl94jx9Dm5mU6cZIgrsPsaDq4gDmcXO08S8t5lrJaq67ktuS6FsR51qdVLVXXcltyXQti/G0qsRA3wcFQX5GRYiSdiYWjl7FSaiRe6aKJMxbGDlVHqGzYNMkZ7RcSYYa0JsW7D2xVK47XyO+Ua9w7ye4cVgWdJc1V2NqGbZc25xgqmZZ25U2/im7Tx8zZ5jJ9VujIs4fU3CB/DB/JEOAHu9q2vn+shpbEOV6V+CGN2X89z+Xqj8eoji8XOWbIZy9xpDuKoNNbZW6q6ixbGof1rfWPqBvMJ8hDqO3g2KEH90r6D9E2+Dldve5P/MyLTYwqbPo2COOONo0bG0NA9wGi2wnOaAIAgCAIAgCAIDBd4zEvo1w7gGvke34kBp/AoDCUAQBAO3gOJPYEBrr9T3Vlu5dwN6f4KyJMFtmcuzdiM6ts5FvhLAR2sg1Lfe/X2BaZz/mH1ZfRg/DHPe/0+JpHqDmP1Z/Rg/DHPfL9Pieesa4AtWo3UUdtkh4uYDlVVfiWVmRIuNtBvLx7FUX7dS509yhIVSaeGCOxJE+OFx0ZI4aA/DXtVbe0s0uJrAuLN6hl2J3G3FedkYiBfeww43U6+S13B8n949gXfS3XpFKdvCbwT6N/Zs347DNWpRYrWaJDiZNSdSSTxJPaSsCGmxOlzVmFZPLah3iVnY05U6jU1JU9N1H+q9QmWS3mjx8d23Ie0DlldEz9IXv3py19Pl1mP9Kftx/Ms9J/1R6jYeroyQgCAIAgCAIAgCAhzqxfyeGgx2Rw2OOStSudHajfFJNGImDUfy3sLTq7gddPcUBCUfVxsB5Mxs7KVSPmkpnz/wDwmZX0/wC8oC9VOquzrXB8mUou/JYxtl5++sycfigMpqbmwN4A1b73g9nmVLcP+LCxAQf6jessPTHZramGttO8d2Mkr4Hk+arDpyzXHA9nIDys17Xn+yVV811321qkfNLLdvKbnXMftLNI+eWC3dL7t5rV23ivr6z7lrzZnWTNFQYx4D5LDWF3O8uB1aHEa95OvwPlvMNe7M+GNMKOTarSLeS3tV6tvStFs2eJVe2tOskyrtXFCEzwbogEb5WMqSTNDI/LMPOJp3uczyxJIHNYNCe8qilzzUcXDLTutG3R1deKnDFJPicY0lJ4LYjMWkhSqmvws30VeCMorbTykTWvrXKt5prxz6wmTQeb/Lj1LNPMd3NP26LGfqHTydJxlHxOONPl80s/Kv5vZUyYaSayaeFdvYssysMlrEXpaNwCK5TeBK0ODwDoHDiNQeBCyLN23qrUb1t1jLFYU9zJlJ25cMs0ZRLui1e8v6iUFsepYxo5WgntOntKahSu+YzI6ps5f1rh86xftiX7sorGa4HxqSGmIp6oxm5ludwHP8xAWbbsGBe1B7R9HWP8+DdOecOyGnUidp3zB1iT/wBV7nobf09Pbh0RS9xuunjw24rcvge31lEwQBAEAQBAEAQBAEB1mGJ3zRMPxaCgOIrwDshjHwaP+CAx3ee79v8AT7amd3lue6zG4DbtR9zI2T28rPlYxv7T5HEMY0cXOIaOJUd25G3FylkiK9ejZg5ydEj8/e9N/bo9QfU3Obvymlc2I3y16fOPLxmIqn+HC0nTm5A/xEDxPc52nHh5zzzmqtp3rm1qMVvflj+bfWec6i7c199zf8Ir8e0y51Czi3Q6UZn0HCvByzauDfJETHNe6Elsfhe2TnAbzgsbo7n46Lb1UNQn41x+J4Yebiaa4sZYpw4XXgak6x4cJZW3DZhh7qdGXTXbhnUvPmRQ6xl8jYnTRSR1avK8NHPpE4B7/LBDGniebgObsGg6QcpY0VaNVlVbPFkuJqrWGGLpm8Tovdl7txachk8dLZNujdmtWLr5Jbsj2iNvicdAAADxHb3FXOisXoQ4LkVGMUlGjrsMa7ci3WLbbzO+DKHXVzy4+0nU8FNKythzG6Xmvk3vfHHHq+SVwZGxva5zjoAB7yVC9PUmjePcmD6RbE2d06v2+sGjtzWMnHAIsPa865SE5ZHBCAx4aSdTI/mHAH3LddF6Z08NO/ul429jxj0Lo3s2a1obduy3f81djxX4zMBwPSTpruDdtjbh6h5ukyKF9oyW8VHShZFCyN8jX27ExYX/AMTgGs18LjpyjVQ2vSthzp9V06qe9sxoaC1O5w8b9lPe2QN1qxFLZm/87g8LjrdDBYzyYcVZtOdJ9WGVo3vstlPhcJXEu8PAA8AFWa7l8bWpduEWo1SVduWPaU/MLSt6h24ppVSW/LHtNivpNw5xvSSndezlfmr9my13eY4i2sz/AAivUUqKh6ElRHplcnIQBAEAQBAEAQBAEAQBAaO/Xd6k/wDcfeQ6RbMvun2Zsm6WZ6zA7wZTNRkscwafPFUOrG9zpOZ3ENjctZ5tq/qS+nHJZ73+hpfPdf8AWn9KHli8d7/T4nkbHxP23yx7gwNoB9hkjc1SsmOVkLWObJFDJGXRHnL2kk8Rpp3qku2U2lNeFVqs+LKmeHhphhtzKZSVuDjKGLaaltSVapddceolzAb7yNZzJNu9Rpa2ro+XE5+PRrhGNGCSwwPY7TlaWk6cQ3U+EKg1vpXlmrT4rcU8f6Wq50awxx2Uo5dLJLeruR8lzsl3/j3F+O/clkYeTL4ClnHxWXtku40MDG13EB0PltjcH6ND/KLiWjn5i1xDdKqPpNWJN6e7KKpk25eNVpLiqqVfDxUVWo0Ukm6nrZTXjinjmujop7adZWRZvptbDZsjhL2FuB8ks1WuHNgmbIYuVkLWv1jEbRIGa68x0c92mrRjz0XOrD4bd2M40STl5lTixlVeLifDxUyVVFVo3x9TSyxlFp7stmXRTGnvLjFV6byRWHR7quRSQxvfWjLNXWNWNcwHnhjZG8EOaW8xb8vj4lRPV85jKKeni02quuEcWnlKTlGnC1Kifm8GCOyt6Vp+N7t/uVHn7sTq6ZMfl987ZrN3HjNqGvdiuPz+WlZFVrCq8Sl58zRr3eHwMPzHgtx0ljivRpJRxrV5Kn4yINEnO7FcSjjWryVDZD1Z6XOu7pgzWysS9s92nJNmMlUxgsss25J22XTPkMc0cjpOTQDl5Wau7ec6eiXNGpviTp2Z7zfrvL43JcUXTsTrtqY90t6C4mxuPIZTfGJL8Zj4CyOnlMV9Iyw9zPKbKJpWRuaYw3XwntPDTjr0hoIRdZOq6iK3yqEJcUmmuo8xerPqPX3H1AOx8fha2PxmwXx4/F3q1gyNnilhi4NiZ/CY1vMGgDU8O7sVBrb33GthbSwjJfkyi12o+411uylhGSXwfUbR+lGE/wBO9Ndj4csLJKmGqmww8CJpYxLLr/1vK283MkFAEAQBAEAQBAEAQBAEB5S9ZG9+q2yei+Zk6QbTy24NyZtxx9zNYmIzy4SjIxxsXWwxkzOfyjkY5jSIyfMcRyAOxNbcnC2+BNv4FfzO7dt2X9JNt9GzefnLwOTOHvNnkqebLAHMbFISx0T+zmGoOjm+8LU8maCnwsn3bnUCnPXfUdmDh/MBYIbQcIiH6ueWSsa9rCXcSXaarsrmytCaN5ZVoXmzPgZpnQXWYi3YmYSJK7o2T/xZOdsjZYHsY4ga/MHewqOai86Ec4xedDk3bLGkWqVm1BWLuWK20CWMSN0Jj8xnLxaDrrqoJWNqIXp9qKuKHOwNLK+WE0DHBjY5ublJeeADXte3j8VG7clkzrwTWTKWXHZuPzZpauvi1lLXx8C7j8oII+5QysvoI3bltRjGQ3Rj8X5IvTlhnBMYDS/gO8gLHm4xzNx9Ift5zr1Yr0uWWVcVrh4qyjDGVaJOTSbweGwr6nViStEIaO8MnSh00EMNq3EzT2crSAuY6hLKbXazZrv7J+trGH2M3/huW38JlLb6gQ3x/nNyz3R7LFieT98lHei85V7StuftF6xWfLr7/tf+oyfpcKe9Oo2ytq0bLLEuczVKr5TNfkfM0vPZ3NBKtOTOM9VBJ5VfuOtv9ufUPKZx1Wu0V21Zi8ZSSSTdVFZ7WfpBYxsbGsYA1jAGtaOwAcAFvpanJAEAQBAEAQBAEAQBAEBR3rbKNaWw8Ehg1DR3lAeBetPRrpR1SuXMlufZtSDM2CSc/jGijeJP7T5IgGynj2yNcsa9pLV7zLHp2mFqeX2NR5449OT9pr03r6RpcVLLNsvdjLsA4x47LR+TKB7BNEHMcfi1qqb3Jn8kvb3/AKFFqPTjztT7H3ruPPmZ6cb62y54ye3rHksJ1tVwLEJHt54i4D7VV3uX3recX2YlJf5VqbOcG1ux+BacdnctiXn6LIW8c8ah4hlfF8QQ0gH7Vh4x3FfWUXRNoyKLe2dcZDNkDaEo5ZGzNa4Ea69wCOcjn6kukrLu+5/oLpuNr14jCRYtt1byRg8x7SeGmo/5rjGWCWY4pT8KWLIy6edU9iQ7nuZve+OZufCZClcpNwUU8UE8TJW8kJY+aORrH6A6uA1aXEt4gLpc007d7xWpSilTD4n2p+113lHKfS9rS2eY2LOsuXPrXeOVKSrRQkm414YKOFaN1TwbPR1Pqr6bbP1ccvSiRuKluXXfRx1astixXsSR2YHfWtsMkq/TSGWMRxNPPEY2uk8BB6u9p1VStNKr2dueymKw2UxPQLa197hdnmticuGOKvKicU4y8GKnxrhlxSfhmpNR8WHdi+ofpyyWAii3jsauzOjDVKPNjqDqMcU9izbkyEsRrTEPkiMsToXPH8tnl+0HrHUaWUfHDGiWCptdcuym7Az7vLOewv10mprb45Sxmp1UYwVtPiWEZUkppfNLi6KS76Q6Gyt+eqnYmW2Vt+LCYva+3Mhlc5RgZK2JtuGWzXruaJpZnEiKxWDnc3ieHO04qz5D9O5q+KColB+2vcaZ+7D1mj9PKxqrjnKepjwt0rwRt1flUf8A6VaVME0jewt0PmMIAgCAIAgCAIAgCAIAgOLmteC17Q5p7QRqEBj2S2ngcq1zbePjcXdrmjlP4ICJ8/0C23lg81Llii93Z+0NUBBuf9KefcXyYbPQTflbKCw/eEBA+5fSb1AlLzZ2rRzreP8AEb5Tnn4Odo78VHOzCfmSfWQ3dPbuqk4p9aIOzfpT3FXL3TdPM1RI7ZKbJJG/dpKFhXOVaeXy06iuu8j0k/lp1N/wIpzfpryT4ZK09PLQQv8Anr3cfI5p07nEcuv3LFfJYp1hNp/jqMJ+nIRdbdxp9SfcYPL0DzWNGlGrRaG9g+nfCfxi/Wse5ye88p166/qYd309qHlcT66rvLVP0u3vB4Y8UJ9OwRPYfwJBWNLlGoXQ+0wZendSvli+3voW/wD2q6i3HGODYeUyLjwDIKUlgn4CNrtVE+W6hfK/au84jyzXW/LGS6pdzNlH/wCcvRndWyd0dSt3br2Nk9mulxdLGYh+SoTUfqhZmfNYMQmYznDPpotS38yuOVae5bcncTWVPebFyWGrjx/cOTypxNvprSre42wq5L0IAgCAIAgCAIAgCAIAgCAIAgCAIAgPha13BzQ4e8aoCndTpv8Anqwv/vMaf1IDi2hRadW04Gn2iNo/UgKprWtGjWho9gGgQH1AEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAf/Z','Aceito','2021-02-13 12:35:02','2021-02-13 14:03:03',4),(3,43.70,'1613222799402','RECEBIDO','data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlFNEVGNzhDMkNCRDExRTY4MjQ5QkQxMzlCNjJCMDQ1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlFNEVGNzhEMkNCRDExRTY4MjQ5QkQxMzlCNjJCMDQ1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUU0RUY3OEEyQ0JEMTFFNjgyNDlCRDEzOUI2MkIwNDUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUU0RUY3OEIyQ0JEMTFFNjgyNDlCRDEzOUI2MkIwNDUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAACAgICAgICAgICAwICAgMEAwIC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','Aceito','2021-02-13 13:26:40','2021-02-13 14:04:05',5),(4,25.60,'1613494988686','AGUARDANDO PAGAMENTO',NULL,NULL,'2021-02-16 17:03:09','2021-02-16 17:03:09',8);
/*!40000 ALTER TABLE `pagamentos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-26  9:27:24
