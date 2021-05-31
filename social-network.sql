-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 26 mai 2021 à 15:52
-- Version du serveur :  10.4.17-MariaDB
-- Version de PHP : 7.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `social-network`
--

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

CREATE TABLE `comment` (
  `comment_pk_id` int(11) NOT NULL,
  `comment_name` varchar(255) NOT NULL,
  `post_content` text NOT NULL,
  `comment_fk_post_id` int(11) NOT NULL,
  `comment_fk_likes_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `education`
--

CREATE TABLE `education` (
  `education_pk_id` int(11) NOT NULL,
  `education_date` date NOT NULL,
  `education_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE `likes` (
  `likes_pk_id` int(11) NOT NULL,
  `likes_likes` int(11) NOT NULL,
  `likes_disslikes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `post`
--

CREATE TABLE `post` (
  `post_pk_id` int(11) NOT NULL,
  `post_name` varchar(255) NOT NULL,
  `post_date` datetime NOT NULL,
  `post_picture` blob NOT NULL,
  `post_fk_user_id` int(11) NOT NULL,
  `post_fk_likes_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `profil`
--

CREATE TABLE `profil` (
  `profil_pk_id` int(11) NOT NULL,
  `profil_fk_wexperience_id` int(11) NOT NULL,
  `profil_fk_education_id` int(11) NOT NULL,
  `profil_fk_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `rights`
--

CREATE TABLE `rights` (
  `rights_pk_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `rights`
--

INSERT INTO `rights` (`rights_pk_id`) VALUES
(1),
(1337);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `user_pk_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_firstname` varchar(255) NOT NULL,
  `user_mail` varchar(255) NOT NULL,
  `user_picture` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `wexperience`
--

CREATE TABLE `wexperience` (
  `wexperience_pk_id` int(11) NOT NULL,
  `weperience_date` date NOT NULL,
  `weperience_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`comment_pk_id`),
  ADD KEY `comment_fk_post_id` (`comment_fk_post_id`),
  ADD KEY `comment_fk_likes_id` (`comment_fk_likes_id`);

--
-- Index pour la table `education`
--
ALTER TABLE `education`
  ADD PRIMARY KEY (`education_pk_id`);

--
-- Index pour la table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`likes_pk_id`);

--
-- Index pour la table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`post_pk_id`),
  ADD KEY `post_fk_user_id` (`post_fk_user_id`),
  ADD KEY `post_fk_likes_id` (`post_fk_likes_id`);

--
-- Index pour la table `profil`
--
ALTER TABLE `profil`
  ADD PRIMARY KEY (`profil_pk_id`),
  ADD KEY `profil_fk_wexperience_id` (`profil_fk_wexperience_id`),
  ADD KEY `profil_fk_education_id` (`profil_fk_education_id`),
  ADD KEY `profil_fk_user_id` (`profil_fk_user_id`);

--
-- Index pour la table `rights`
--
ALTER TABLE `rights`
  ADD PRIMARY KEY (`rights_pk_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_pk_id`);

--
-- Index pour la table `wexperience`
--
ALTER TABLE `wexperience`
  ADD PRIMARY KEY (`wexperience_pk_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `comment`
--
ALTER TABLE `comment`
  MODIFY `comment_pk_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `education`
--
ALTER TABLE `education`
  MODIFY `education_pk_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `likes`
--
ALTER TABLE `likes`
  MODIFY `likes_pk_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `post`
--
ALTER TABLE `post`
  MODIFY `post_pk_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `profil`
--
ALTER TABLE `profil`
  MODIFY `profil_pk_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `rights`
--
ALTER TABLE `rights`
  MODIFY `rights_pk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1338;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `user_pk_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `wexperience`
--
ALTER TABLE `wexperience`
  MODIFY `wexperience_pk_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_fk_likes_id` FOREIGN KEY (`comment_fk_likes_id`) REFERENCES `likes` (`likes_pk_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_fk_post_id` FOREIGN KEY (`comment_fk_post_id`) REFERENCES `post` (`post_pk_id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_fk_likes_id` FOREIGN KEY (`post_fk_likes_id`) REFERENCES `likes` (`likes_pk_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `post_fk_user_id` FOREIGN KEY (`post_fk_user_id`) REFERENCES `user` (`user_pk_id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `profil`
--
ALTER TABLE `profil`
  ADD CONSTRAINT `profil_fk_education_id` FOREIGN KEY (`profil_fk_education_id`) REFERENCES `education` (`education_pk_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `profil_fk_user_id` FOREIGN KEY (`profil_fk_user_id`) REFERENCES `user` (`user_pk_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `profil_fk_wexperience_id` FOREIGN KEY (`profil_fk_wexperience_id`) REFERENCES `wexperience` (`wexperience_pk_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
