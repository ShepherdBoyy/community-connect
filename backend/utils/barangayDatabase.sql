-- Community Connect — Database Schema
-- Import this file to set up the required tables before running the backend.
--
-- Usage:
--   mysql -u your_username -p barangay_database < schema.sql
--
-- Note: This file creates empty tables only. No real data is included.
-- After importing, create your own admin account via the "Add Account" flow
-- in the app (or insert one manually with a bcrypt-hashed password).

CREATE DATABASE IF NOT EXISTS barangay_database;
USE barangay_database;

-- --------------------------------------------------------
-- Table: admin
-- --------------------------------------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(140) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Table: barangay_officials
-- --------------------------------------------------------
DROP TABLE IF EXISTS `barangay_officials`;
CREATE TABLE `barangay_officials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `name` varchar(60) NOT NULL,
  `age` int(60) NOT NULL,
  `position` varchar(60) NOT NULL,
  `image` varchar(60) NOT NULL,
  `time` time NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Table: residents
-- --------------------------------------------------------
DROP TABLE IF EXISTS `residents`;
CREATE TABLE `residents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `time` time NOT NULL DEFAULT current_timestamp(),
  `name` varchar(60) NOT NULL,
  `age` int(11) NOT NULL,
  `sex` varchar(60) NOT NULL,
  `birthdate` date NOT NULL,
  `purok` varchar(60) NOT NULL,
  `house_number` int(11) NOT NULL,
  `kinship` varchar(60) NOT NULL,
  `address` varchar(120) NOT NULL,
  `education` varchar(500) NOT NULL,
  `occupation` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Table: history
-- Stores a log of deleted resident records and the reason for deletion.
-- --------------------------------------------------------
DROP TABLE IF EXISTS `history`;
CREATE TABLE `history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `reason` varchar(120) NOT NULL,
  `other_reason` varchar(255) DEFAULT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;