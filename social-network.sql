-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jun 04, 2021 at 02:16 PM
-- Server version: 5.7.30
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `social-network`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `comment_pk_id` int(11) NOT NULL,
  `comment_name` varchar(255) NOT NULL,
  `comment_fk_post_id` int(11) NOT NULL,
  `comment_fk_user_id` int(11) NOT NULL,
  `comment_fk_likes_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`comment_pk_id`, `comment_name`, `comment_fk_post_id`, `comment_fk_user_id`, `comment_fk_likes_id`) VALUES
(3, 'Comment name ? ou comment content ?!,', 1, 3, 1),
(4, 'Deuxième commentaire', 1, 4, NULL),
(5, 'Un commentaire sur un autre post', 3, 3, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`comment_pk_id`),
  ADD KEY `comment_fk_post_id` (`comment_fk_post_id`),
  ADD KEY `comment_fk_likes_id` (`comment_fk_likes_id`),
  ADD KEY `comment_fk_user_id` (`comment_fk_user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `comment_pk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_fk_likes_id` FOREIGN KEY (`comment_fk_likes_id`) REFERENCES `likes` (`likes_pk_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_fk_post_id` FOREIGN KEY (`comment_fk_post_id`) REFERENCES `post` (`post_pk_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_fk_user_id` FOREIGN KEY (`comment_fk_user_id`) REFERENCES `user` (`user_pk_id`) ON DELETE CASCADE;
