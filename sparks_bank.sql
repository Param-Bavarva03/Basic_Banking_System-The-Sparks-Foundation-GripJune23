-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2023 at 07:07 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sparks_bank`
--

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `sno` int(50) NOT NULL,
  `Sender` varchar(50) DEFAULT NULL,
  `Receiver` varchar(50) DEFAULT NULL,
  `Amount` int(255) DEFAULT NULL,
  `Date` varchar(200) NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`sno`, `Sender`, `Receiver`, `Amount`, `Date`) VALUES
(4, 'Param Bavarva', 'Adam Doe', 100, '06/14/2023, 01:07:01 PM'),
(5, 'Param Bavarva', 'Eva Patel', 100, '06/14/2023, 01:23:12 PM'),
(6, 'Eva Patel', 'Harry Potter', 1000, '06/14/2023, 06:41:09 PM'),
(7, 'Shubham sagar', 'Harry Potter', 20000, '06/14/2023, 06:42:15 PM'),
(8, 'Shubham sagar', 'Harry Potter', 2000, '06/14/2023, 06:42:22 PM'),
(9, 'Param Bavarva', 'Elon Musk', 20000, '06/14/2023, 06:52:19 PM'),
(10, 'Vishal Bhatt', 'John Doe', 20000, '06/14/2023, 06:56:05 PM'),
(11, 'Vishal Bhatt', 'John Doe', 2000, '06/14/2023, 06:56:15 PM'),
(12, 'Harry Potter', 'Alok Patel', 30000, '06/14/2023, 07:18:31 PM'),
(13, 'Harry Potter', 'Alok Patel', 3000, '06/14/2023, 07:18:44 PM');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `amount` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `mobile`, `amount`) VALUES
(24, 'Param Bavarva', 'bavarvaparam2@gmail.com', '1234567898', '400'),
(25, 'Shubham sagar', '21dce003@charusat.edu.in', '987654122', '4100'),
(26, 'Adam Doe', 'AdamDoe333@gmail.com', '976334322', '1200'),
(27, 'Eva Patel', 'Evapatel222@gmail.com', '487654122', '5100'),
(28, 'Kavan Gandhi', 'KavanGandhi111@gmail.com', '787654122', '1600'),
(29, 'Ram Charan', 'ramcharan444@gmail.com', '987654321', '5000'),
(30, 'Vishal Bhatt', 'vishalbhatt190@gmail.com', '933654322', '3300'),
(31, 'Gourav Das', 'gauravdas@charusat.edu.in', '987545122', '20000'),
(32, 'Vatsal Jajadiya', 'vatsal493@gmail.com', '1876244322', '6000'),
(33, 'karam Kothiya', 'karmkothiya@gmail.com', '4393527492', '3500'),
(34, 'Harry Potter', 'HarryPotter234@gmail.com', '987664322', '20000'),
(35, 'Elon Musk', 'elonmusk222@gmail.com', '987654324', '10000'),
(36, 'John Doe', 'johndoe@gmail.com', '9822354322', '8000'),
(37, 'Alok Patel', 'alokpatel@gmail.com', '985554322', '17000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`sno`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `mobile` (`mobile`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `sno` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
