-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jul 23, 2021 at 07:23 AM
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
  `comment_content` text NOT NULL,
  `comment_fk_post_id` int(11) NOT NULL,
  `comment_fk_user_id` int(11) NOT NULL,
  `comment_fk_likes_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`comment_pk_id`, `comment_name`, `comment_content`, `comment_fk_post_id`, `comment_fk_user_id`, `comment_fk_likes_id`) VALUES
(5, 'Un commentaire sur un autre post', '', 3, 3, 4),
(9, 'ouai', 'ca va ?', 3, 3, 20),
(12, 'zedz', 'zedzed', 14, 3, NULL),
(13, 'caca', 'cacacacacaca', 25, 3, 21),
(14, 'Beau goss', 'Ouai ouai', 26, 4, 24),
(17, 'tg', 'cono', 26, 3, 28),
(19, 'y a pas les fotos', 'et oauiiii', 29, 3, 31),
(21, 'test comment', 'salut commentaire', 36, 3, 35),
(22, 'Un deuxieme', 'Salut commentaire 2', 36, 3, NULL),
(23, 'hey', 'oh', 39, 3, NULL),
(24, 'Test comment', 'Can\'t be editer', 53, 3, 38),
(25, 'Autre', 'Une autre commentaire', 53, 3, 39),
(26, '&lt;u&gt;Underline&lt;/u&gt;', '&lt;b&gt;Bold&lt;/b&gt;', 54, 3, 41);

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

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`likes_pk_id`, `likes_likes`, `likes_disslikes`) VALUES
(1, 2, 3),
(2, 3, 5),
(3, 2, 2),
(4, 21, 12),
(9, 23, 4),
(10, 13, 1),
(11, 1, 0),
(12, 1, 0),
(13, 0, 1),
(14, 1, 0),
(15, 4, 2),
(16, 4, 3),
(17, 4, 4),
(18, 0, 1),
(19, 3, 0),
(20, 1, 0),
(21, 6, 0),
(22, 3, 0),
(23, 18, 6),
(24, 8, 7),
(25, 2, 1),
(26, 33, 4),
(27, 8, 0),
(28, 7, 0),
(29, 1, 1),
(30, 1, 2),
(31, 0, 15),
(32, 1, 1),
(33, 1, 1),
(34, 1, 1),
(35, 1, 1),
(36, 2, 0),
(37, 3, 0),
(38, 0, 1),
(39, 0, 1),
(40, 14, 8),
(41, 2, 0);

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
(2, 'hey', 'salut mes copains', '2021-05-31 15:20:56', '', 4, 9),
(3, 'sdc', 'jhzdvjhed', '2021-06-01 09:10:07', '', 3, 10),
(4, 'qsd', 'qsdqsd', '2021-06-01 10:50:36', '', 3, 11),
(5, 'azdazd', 'azdazdadz', '2021-06-01 10:57:44', '', 3, NULL),
(6, 'azdazd', 'azdazdadz', '2021-06-01 10:58:15', '', 3, NULL),
(7, 'azdazd', 'azdazdadz', '2021-06-01 10:59:10', '', 3, NULL),
(8, 'azdazd', 'azdazdadz', '2021-06-01 10:59:14', '', 3, NULL),
(9, 'azdazd', 'azdazdadz', '2021-06-01 10:59:18', '', 3, NULL),
(14, 'pierrreee', 'azazazazazazaza', '2021-06-01 11:17:22', '', 4, NULL),
(15, 'azd', 'azdaz', '2021-06-04 10:27:40', '', 4, NULL),
(16, 'hey', 'helllo', '2021-06-05 19:42:37', '', 4, NULL),
(17, 'he', 'je', '2021-06-05 20:02:27', '', 4, NULL),
(18, 'Noouveau post', 'Hey commen ca va akakakak', '2021-06-05 20:21:55', '', 4, 14),
(19, 'dernier en dat', 'huuu', '2021-06-05 20:24:39', '', 4, 15),
(20, 'encore 1', 'a', '2021-06-05 20:32:58', '', 4, 18),
(25, 'Pierre ?', 'Hello toi', '2021-06-07 09:34:26', '', 4, 22),
(26, '', 'test les pioupiou !', '2021-06-07 09:38:54', '', 5, 23),
(29, 'Post de walid', 'Hello world, subissez mon courroux !!!', '2021-06-22 19:10:16', '', 8, 33),
(36, 'New refresh function', 'Again ? is it going to work ?', '2021-06-30 10:33:44', '', 3, 34),
(39, 'No title ?', 'ho! !', '2021-06-30 16:44:33', '', 6, 36),
(52, 'hi guys', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n', '2021-07-01 11:45:35', '', 3, NULL),
(53, 'Airpot', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ds', '2021-07-01 14:07:01', 'a060680964149f14.png', 3, 37),
(54, 'Hey', 'Heyyyyyyyyyyy duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum', '2021-07-04 23:57:46', 'b259be416cfb3ed1.png', 3, 40);

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
  `rights_pk_id` int(11) NOT NULL,
  `rights_value` int(9) NOT NULL DEFAULT '1',
  `rights_type` varchar(255) NOT NULL DEFAULT 'USER'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rights`
--

INSERT INTO `rights` (`rights_pk_id`, `rights_value`, `rights_type`) VALUES
(1, 1, 'USER'),
(2, 2, 'MODERATOR'),
(3, 3, 'ADMINISTRATOR'),
(4, 0, 'NOT_WELCOME');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_pk_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_firstname` varchar(255) NOT NULL,
  `user_mail` varchar(255) NOT NULL,
  `user_picture` varchar(255) NOT NULL,
  `user_fk_rights_id` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_pk_id`, `user_name`, `user_firstname`, `user_mail`, `user_picture`, `user_fk_rights_id`) VALUES
(3, 'ARBONA', 'Robin', 'robin.arbona@laplateforme.io', 'https://lh3.googleusercontent.com/a/AATXAJwMs81yGY84ReZ5QzYXqPOOz1gM4csZC0NqZjcN=s96-c', 3),
(4, 'MALARDIER', 'Pierre', 'pierre.malardier@laplateforme.io', 'https://lh3.googleusercontent.com/a-/AOh14Gg75LONUMSN_0v3J7gPxUsOu1FQ9FSYqhcxS-rv=s96-c', 1),
(5, 'BENRABAH', 'Samy', 'samy.benrabah@laplateforme.io', 'https://lh3.googleusercontent.com/a/AATXAJzKgni9nW-TptSiKM5XR88RpwqJPjqysvizfnnW=s96-c', 1),
(6, 'Robin', 'Arbona', 'arbona.robin@gmail.com', 'https://lh3.googleusercontent.com/a/AATXAJwWCnvSTx6_pij5FV4am6byxA38E0cGMdd14gDb=s96-c', 1),
(7, 'PAPAZIAN', 'Robin', 'robin.papazian@laplateforme.io', 'https://lh3.googleusercontent.com/a/AATXAJyh_YOLffAqj7jI613Z0SQuTBenBBbElL1oypc8=s96-c', 1),
(8, 'BRICHE', 'Walid', 'walid.briche@laplateforme.io', 'https://lh3.googleusercontent.com/a/AATXAJziFmSXnxopfJGP_I5i9_sxZFcJVL-MT-anl064=s96-c', 1);

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
  ADD KEY `comment_fk_likes_id` (`comment_fk_likes_id`),
  ADD KEY `comment_fk_user_id` (`comment_fk_user_id`);

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
  ADD PRIMARY KEY (`user_pk_id`),
  ADD KEY `user_fk_rights_id` (`user_fk_rights_id`);

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
  MODIFY `comment_pk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `education`
--
ALTER TABLE `education`
  MODIFY `education_pk_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `likes_pk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `post_pk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `profil`
--
ALTER TABLE `profil`
  MODIFY `profil_pk_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rights`
--
ALTER TABLE `rights`
  MODIFY `rights_pk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_pk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
  ADD CONSTRAINT `comment_fk_post_id` FOREIGN KEY (`comment_fk_post_id`) REFERENCES `post` (`post_pk_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_fk_user_id` FOREIGN KEY (`comment_fk_user_id`) REFERENCES `user` (`user_pk_id`) ON DELETE CASCADE;

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

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_fk_rights_id` FOREIGN KEY (`user_fk_rights_id`) REFERENCES `rights` (`rights_pk_id`);
