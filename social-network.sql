-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jun 01, 2021 at 09:19 AM
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
  `comment_fk_likes_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `education`
--

CREATE TABLE `education` (
  `education_pk_id` int(11) NOT NULL,
  `education_date` date NOT NULL,
  `education_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `likes_pk_id` int(11) NOT NULL,
  `likes_likes` int(11) NOT NULL,
  `likes_disslikes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `post_pk_id` int(11) NOT NULL,
  `post_name` varchar(255) NOT NULL,
  `post_content` text NOT NULL,
  `post_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `post_picture` varchar(255) NOT NULL,
  `post_fk_user_id` int(11) NOT NULL,
  `post_fk_likes_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`post_pk_id`, `post_name`, `post_content`, `post_date`, `post_picture`, `post_fk_user_id`, `post_fk_likes_id`) VALUES
(1, 'heyo', 'salut mes copains', '2021-05-31 14:56:30', 'yous.jpg', 3, NULL),
(2, 'hey', 'salut mes copains', '2021-05-31 15:20:56', 'you.jpg', 3, NULL),
(3, 'sdc', 'jhzdvjhed', '2021-06-01 09:10:07', 'sdcsdc,jog', 3, NULL),
(4, 'qsd', 'qsdqsd', '2021-06-01 10:50:36', 'qsdqsdqsdqds', 3, NULL),
(5, 'azdazd', 'azdazdadz', '2021-06-01 10:57:44', 'azdadza', 3, NULL),
(6, 'azdazd', 'azdazdadz', '2021-06-01 10:58:15', 'azdadza', 3, NULL),
(7, 'azdazd', 'azdazdadz', '2021-06-01 10:59:10', 'azdadza', 3, NULL),
(8, 'azdazd', 'azdazdadz', '2021-06-01 10:59:14', 'azdadza', 3, NULL),
(9, 'azdazd', 'azdazdadz', '2021-06-01 10:59:18', 'azdadza', 3, NULL),
(10, 'azdazd', 'azdazdadz', '2021-06-01 10:59:22', 'azdadza', 3, NULL),
(11, 'azdazd', 'azdazdadz', '2021-06-01 10:59:26', 'azdadza', 3, NULL),
(12, 'azdazd', 'azdazdadz', '2021-06-01 10:59:30', 'azdadza', 3, NULL),
(13, 'azdazd', 'azdazdadz', '2021-06-01 11:09:51', 'azdadza', 3, NULL),
(14, 'pierrreee', 'azazazazazazaza', '2021-06-01 11:17:22', 'azazaz', 4, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `profil`
--

CREATE TABLE `profil` (
  `profil_pk_id` int(11) NOT NULL,
  `profil_fk_wexperience_id` int(11) NOT NULL,
  `profil_fk_education_id` int(11) NOT NULL,
  `profil_fk_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `rights`
--

CREATE TABLE `rights` (
  `rights_pk_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rights`
--

INSERT INTO `rights` (`rights_pk_id`) VALUES
(1),
(1337);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_pk_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_firstname` varchar(255) NOT NULL,
  `user_mail` varchar(255) NOT NULL,
  `user_picture` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_pk_id`, `user_name`, `user_firstname`, `user_mail`, `user_picture`) VALUES
(3, 'ARBONA', 'Robin', 'robin.arbona@laplateforme.io', 'https://lh3.googleusercontent.com/a/AATXAJwMs81yGY84ReZ5QzYXqPOOz1gM4csZC0NqZjcN=s96-c'),
(4, 'MALARDIER', 'Pierre', 'pierre.malardier@laplateforme.io', 'https://lh3.googleusercontent.com/a-/AOh14Gg75LONUMSN_0v3J7gPxUsOu1FQ9FSYqhcxS-rv=s96-c');

-- --------------------------------------------------------

--
-- Table structure for table `wexperience`
--

CREATE TABLE `wexperience` (
  `wexperience_pk_id` int(11) NOT NULL,
  `weperience_date` date NOT NULL,
  `weperience_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`comment_pk_id`),
  ADD KEY `comment_fk_post_id` (`comment_fk_post_id`),
  ADD KEY `comment_fk_likes_id` (`comment_fk_likes_id`);

--
-- Indexes for table `education`
--
ALTER TABLE `education`
  ADD PRIMARY KEY (`education_pk_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`likes_pk_id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`post_pk_id`),
  ADD KEY `post_fk_user_id` (`post_fk_user_id`),
  ADD KEY `post_fk_likes_id` (`post_fk_likes_id`);

--
-- Indexes for table `profil`
--
ALTER TABLE `profil`
  ADD PRIMARY KEY (`profil_pk_id`),
  ADD KEY `profil_fk_wexperience_id` (`profil_fk_wexperience_id`),
  ADD KEY `profil_fk_education_id` (`profil_fk_education_id`),
  ADD KEY `profil_fk_user_id` (`profil_fk_user_id`);

--
-- Indexes for table `rights`
--
ALTER TABLE `rights`
  ADD PRIMARY KEY (`rights_pk_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_pk_id`);

--
-- Indexes for table `wexperience`
--
ALTER TABLE `wexperience`
  ADD PRIMARY KEY (`wexperience_pk_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `comment_pk_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `education`
--
ALTER TABLE `education`
  MODIFY `education_pk_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `likes_pk_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `post_pk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `profil`
--
ALTER TABLE `profil`
  MODIFY `profil_pk_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rights`
--
ALTER TABLE `rights`
  MODIFY `rights_pk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1338;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_pk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `wexperience`
--
ALTER TABLE `wexperience`
  MODIFY `wexperience_pk_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_fk_likes_id` FOREIGN KEY (`comment_fk_likes_id`) REFERENCES `likes` (`likes_pk_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_fk_post_id` FOREIGN KEY (`comment_fk_post_id`) REFERENCES `post` (`post_pk_id`) ON DELETE CASCADE;

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_fk_likes_id` FOREIGN KEY (`post_fk_likes_id`) REFERENCES `likes` (`likes_pk_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `post_fk_user_id` FOREIGN KEY (`post_fk_user_id`) REFERENCES `user` (`user_pk_id`) ON DELETE CASCADE;

--
-- Constraints for table `profil`
--
ALTER TABLE `profil`
  ADD CONSTRAINT `profil_fk_education_id` FOREIGN KEY (`profil_fk_education_id`) REFERENCES `education` (`education_pk_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `profil_fk_user_id` FOREIGN KEY (`profil_fk_user_id`) REFERENCES `user` (`user_pk_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `profil_fk_wexperience_id` FOREIGN KEY (`profil_fk_wexperience_id`) REFERENCES `wexperience` (`wexperience_pk_id`) ON DELETE CASCADE;
