-- --------------------------------------------------------
-- 호스트:                          stg-yswa-kr-practice-db-master.mariadb.database.azure.com
-- 서버 버전:                        10.3.23-MariaDB - MariaDB Server
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- S09P12A602 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `s09p12a602` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin */;
USE `S09P12A602`;

-- 테이블 S09P12A602.cell 구조 내보내기
CREATE TABLE IF NOT EXISTS `cell` (
  `status` char(1) COLLATE utf8mb4_bin NOT NULL DEFAULT 'N',
  `time` int(11) DEFAULT 0,
  `created_at` datetime(6) DEFAULT NULL,
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `name` varchar(50) CHARACTER SET utf8 NOT NULL DEFAULT '무명의 칸',
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- 테이블 데이터 S09P12A602.cell:~21 rows (대략적) 내보내기
INSERT INTO `cell` (`status`, `time`, `created_at`, `id`, `updated_at`, `name`) VALUES
	('E', 3, NULL, 1, NULL, '한 칸 앞으로 이동'),
	('E', 3, NULL, 2, NULL, '한 칸 뒤로 이동'),
	('E', 3, NULL, 3, NULL, '두 칸 앞으로 이동'),
	('E', 3, NULL, 4, NULL, '두 칸 뒤로 이동'),
	('E', 3, NULL, 5, NULL, '벌칙 제거 (없으면 까비)'),
	('E', 3, NULL, 6, NULL, '한 턴 영어 금지'),
	('E', 3, NULL, 7, NULL, '한 턴 안주 금지'),
	('P', 3, NULL, 8, NULL, '목소리 변조 벌칙'),
	('P', 3, NULL, 9, NULL, '페이스 필터 벌칙'),
	('G', 60, NULL, 10, NULL, '걸린 사람 빼고 원샷'),
	('B', 60, NULL, 11, NULL, '원샷'),
	('B', 120, NULL, 12, NULL, '건배사'),
	('B', 180, NULL, 13, NULL, '물 1L 마시기'),
	('G', 60, NULL, 14, NULL, '한 명 지목해서 같이 원샷'),
	('B', 300, NULL, 15, NULL, '코끼리코 52바퀴'),
	('B', 120, NULL, 16, NULL, '웃긴 썰 풀기'),
	('B', 120, NULL, 17, NULL, '파워댄스'),
	('B', 60, NULL, 18, NULL, '카메라를 향해 뽀뽀'),
	('B', 60, NULL, 19, NULL, '다 함께 원샷'),
	('B', 120, NULL, 20, NULL, '성대모사'),
	('B', 60, NULL, 21, NULL, '지금 바로 한잔 마시기');

-- 테이블 S09P12A602.chat 구조 내보내기
CREATE TABLE IF NOT EXISTS `chat` (
  `created_at` datetime(6) DEFAULT NULL,
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `message` varchar(500) CHARACTER SET utf8 NOT NULL,
  `player_id` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `room_id` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6mgi5bifces7oiq5jalcqo5rx` (`player_id`),
  KEY `FKm38tfuuhbqvc3jrrat6q4k01j` (`room_id`),
  CONSTRAINT `FK6mgi5bifces7oiq5jalcqo5rx` FOREIGN KEY (`player_id`) REFERENCES `player` (`id`),
  CONSTRAINT `FKm38tfuuhbqvc3jrrat6q4k01j` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- 테이블 데이터 S09P12A602.chat:~0 rows (대략적) 내보내기

-- 테이블 S09P12A602.minigame 구조 내보내기
CREATE TABLE IF NOT EXISTS `minigame` (
  `tagger` bit(1) NOT NULL DEFAULT b'0',
  `time` int(11) NOT NULL DEFAULT 0,
  `winner_cnt` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime(6) DEFAULT NULL,
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `name` varchar(20) CHARACTER SET utf8 NOT NULL DEFAULT '무명의 게임',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- 테이블 데이터 S09P12A602.minigame:~3 rows (대략적) 내보내기
INSERT INTO `minigame` (`tagger`, `time`, `winner_cnt`, `created_at`, `id`, `updated_at`, `name`) VALUES
	(b'0', 60, 4, NULL, 1, NULL, '두더지 게임'),
	(b'1', 0, 3, NULL, 2, NULL, '라이어 게임'),
	(b'0', 60, 3, NULL, 3, NULL, '훈민정음');

-- 테이블 S09P12A602.penalty 구조 내보내기
CREATE TABLE IF NOT EXISTS `penalty` (
  `cell_id` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `api_url` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 NOT NULL DEFAULT '무명의 벌칙',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_e9y9bokpey8dfy96gpxr9j6a0` (`cell_id`),
  CONSTRAINT `FK8m60gnrroyo0geklwxfkx0jb` FOREIGN KEY (`cell_id`) REFERENCES `cell` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- 테이블 데이터 S09P12A602.penalty:~0 rows (대략적) 내보내기

-- 테이블 S09P12A602.player 구조 내보내기
CREATE TABLE IF NOT EXISTS `player` (
  `head` bit(1) NOT NULL DEFAULT b'0',
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `id` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `nickname` varchar(20) CHARACTER SET utf8 NOT NULL,
  `room_id` varchar(20) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_nickname` (`nickname`),
  KEY `idx_room_id` (`room_id`),
  CONSTRAINT `FK5ngp5074vt6ns2dixliw5ry36` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- 테이블 데이터 S09P12A602.player:~0 rows (대략적) 내보내기

-- 테이블 S09P12A602.room 구조 내보내기
CREATE TABLE IF NOT EXISTS `room` (
  `progress` bit(1) NOT NULL DEFAULT b'0',
  `secret` bit(1) NOT NULL DEFAULT b'0',
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `id` varchar(20) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_room_secret` (`secret`),
  KEY `idx_room_progress` (`progress`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- 테이블 데이터 S09P12A602.room:~0 rows (대략적) 내보내기

-- 테이블 S09P12A602.test 구조 내보내기
CREATE TABLE IF NOT EXISTS `test` (
  `id` bigint(20) NOT NULL,
  `info` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- 테이블 데이터 S09P12A602.test:~0 rows (대략적) 내보내기

-- 테이블 S09P12A602.test_seq 구조 내보내기
CREATE TABLE IF NOT EXISTS `test_seq` (
  `next_not_cached_value` bigint(21) NOT NULL,
  `minimum_value` bigint(21) NOT NULL,
  `maximum_value` bigint(21) NOT NULL,
  `start_value` bigint(21) NOT NULL COMMENT 'start value when sequences is created or value if RESTART is used',
  `increment` bigint(21) NOT NULL COMMENT 'increment value',
  `cache_size` bigint(21) unsigned NOT NULL,
  `cycle_option` tinyint(1) unsigned NOT NULL COMMENT '0 if no cycles are allowed, 1 if the sequence should begin a new cycle when maximum_value is passed',
  `cycle_count` bigint(21) NOT NULL COMMENT 'How many cycles have been done'
) ENGINE=InnoDB SEQUENCE=1;

-- 테이블 데이터 S09P12A602.test_seq:~1 rows (대략적) 내보내기
INSERT INTO `test_seq` (`next_not_cached_value`, `minimum_value`, `maximum_value`, `start_value`, `increment`, `cache_size`, `cycle_option`, `cycle_count`) VALUES
	(1, 1, 9223372036854775806, 1, 50, 1000, 0, 0);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
