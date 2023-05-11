-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 09, 2023 at 02:07 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `backend`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `middlename` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `business_unit` varchar(100) NOT NULL,
  `position` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `firstname`, `middlename`, `lastname`, `username`, `password`, `email`, `business_unit`, `position`) VALUES
(1, '', '', '', 'User1', 'hernandez', 'phernandez@tgsi.com', '', ''),
(2, '', '', '', 'User2', 'delara', 'vdelara@tgsi.com', '', ''),
(3, '', '', '', 'User3', 'leigh', 'kleigh@tgsi.com', '', ''),
(4, '', '', '', 'User4', 'aleligay', 'aaleligay@tgsi.com', '', ''),
(6, '', '', '', 'User5', 'lopez', 'clopez@tgsi.com', '', ''),
(7, '', '', '', 'User6', 'santos', 'asantos@tgsi.com', '', ''),
(8, 'Mario', 'Middle', 'Wiseman', 'mario', 'mario123', 'mario@gg.com', 'dev', 'sde'),
(9, 'dsa', 'das', 'dsa', 'dsa', 'aa', 'dsa', 'dev', 'sde'),
(10, 'Justin', 'Douche', 'Bieber', 'justin', 'justin123', 'justin@gg.com', 'ba', 'sde');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
